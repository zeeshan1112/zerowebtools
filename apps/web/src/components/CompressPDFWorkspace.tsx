"use client";

import React, { useState, useCallback, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename } from "@/lib/pdf-utils";

export default function CompressPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setBefore(f.size); setAfter(null); setError(null);
  }, []);

  const compress = useCallback(async () => {
    if (!file) return;
    setProcessing(true); setError(null);
    try {
      const doc = await loadPDFDoc(file);
      const blob = await savePDFDoc(doc);
      setAfter(blob.size);
      downloadBlob(blob, getFilename("pdf-compress", file.name));
    } catch (e: any) { setError(e.message || "Compression failed"); }
    setProcessing(false);
  }, [file]);

  return (
    <div className="space-y-5">
      <DropZone ref={ref} onFile={handleFile} label="Drop a PDF to compress" accept=".pdf" />
      {file && (
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm"><span className="font-medium text-ink">{file.name}</span><span className="text-ink-muted">{formatBytes(before)}</span></div>
          {after !== null && (
            <div className="rounded-xl bg-accent-surface p-4 space-y-2">
              <div className="flex items-center justify-between text-sm"><span>Before</span><span>{formatBytes(before)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>After</span><span className="font-semibold text-accent">{formatBytes(after)}</span></div>
              <div className="flex items-center justify-between text-sm"><span>Saved</span><span className="font-semibold">{formatBytes(before - after)} ({((1 - after / before) * 100).toFixed(0)}%)</span></div>
            </div>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={compress} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Compressing..." : "Compress PDF"}</button>
        </div>
      )}
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