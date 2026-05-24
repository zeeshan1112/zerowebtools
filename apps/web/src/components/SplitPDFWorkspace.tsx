"use client";

import React, { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";

const SPLIT_STEPS = [
  "Analyzing PDF page layout tree...",
  "Isolating selected page streams...",
  "Discarding unreferenced stream resources...",
  "Packaging split output document...",
];

export default function SplitPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [ranges, setRanges] = useState("");
  const [mode, setMode] = useState<"extract" | "remove">("extract");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setError(null);
    try {
      const doc = await loadPDFDoc(f);
      setTotalPages(doc.getPageCount());
    } catch { setError("Could not read PDF"); }
  }, []);

  const process = useCallback(async () => {
    if (!file || !ranges.trim()) { setError("Enter page ranges"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const indices: number[] = [];
      for (const part of ranges.split(",")) {
        const trimmed = part.trim();
        if (trimmed.includes("-")) {
          const [a, b] = trimmed.split("-").map(Number);
          for (let i = Math.max(1, a) - 1; i < Math.min(b, totalPages); i++) indices.push(i);
        } else {
          const n = Number(trimmed) - 1;
          if (n >= 0 && n < totalPages) indices.push(n);
        }
      }
      const unique = [...new Set(indices)].sort((a, b) => a - b);
      const outDoc = await PDFDocument.create();
      if (mode === "extract") {
        for (const i of unique) {
          const [page] = await outDoc.copyPages(doc, [i]);
          outDoc.addPage(page);
        }
      } else {
        const keep = Array.from({ length: totalPages }, (_, i) => i).filter((i) => !unique.includes(i));
        for (const i of keep) {
          const [page] = await outDoc.copyPages(doc, [i]);
          outDoc.addPage(page);
        }
      }
      const blob = await savePDFDoc(outDoc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename(mode === "extract" ? "pdf-split" : "pdf-organize", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Split failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, ranges, mode, totalPages]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename(mode === "extract" ? "pdf-split" : "pdf-organize", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file, mode]);

  return (
    <div className="relative space-y-5">
      <DropZone ref={ref} onFile={handleFile} label="Drop a PDF here" accept=".pdf" />
      {file && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm"><span className="text-ink font-medium">{file.name}</span><span className="text-ink-muted">{formatBytes(file.size)} · {totalPages} pages</span></div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-ink-muted uppercase tracking-wider">Mode</label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["extract", "remove"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`px-3.5 py-1.5 text-xs font-medium ${mode === m ? "bg-ink text-white" : "bg-surface-elevated text-ink-muted hover:text-ink"}`}>{m === "extract" ? "Extract" : "Remove"}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Page ranges</label>
            <input value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="e.g. 1-3, 5, 7-9" className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
            <p className="text-[11px] text-ink-muted mt-1">Comma-separated. Pages range: 1-{totalPages}</p>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={process} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Processing..." : mode === "extract" ? "Extract Pages" : "Remove Pages"}</button>
        </div>
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={SPLIT_STEPS}
        loadingText="Splitting your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

function DropZone({ ref, onFile, label, accept }: { ref: React.RefObject<HTMLInputElement | null>; onFile: (f: File) => void; label: string; accept: string }) {
  const [drag, setDrag] = useState(false);
  return (
    <div onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onClick={() => ref.current?.click()} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
      <div className="space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
        </div>
        <p className="text-sm font-medium text-ink">{label}</p>
      </div>
    </div>
  );
}