"use client";
import React, { useState, useCallback, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";

const ROTATE_STEPS = [
  "Reading document catalog page structures...",
  "Applying rotation transformation matrices...",
  "Updating layout dimensions & bounding boxes...",
  "Packaging rotated output PDF...",
];

export default function RotatePDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const handleFile = useCallback((f: File) => { setFile(f); setError(null); }, []);

  const rotate = useCallback(async () => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const pages = doc.getPages();
      for (const p of pages) {
        const r = p.getRotation().angle;
        p.setRotation({ angle: (r + angle) % 360, type: "degrees" as any });
      }
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-rotate", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Rotation failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, angle]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-rotate", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);
  return (
    <div className="space-y-5">
      <DropZone ref={ref} onFile={handleFile} label="Drop a PDF to rotate" accept=".pdf" />
      {file && (
        <div className="space-y-4">
          <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
          <div className="flex items-center gap-2 flex-wrap">
            {[90, 180, 270].map((a) => (
              <button key={a} onClick={() => setAngle(a)} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${angle === a ? "bg-ink text-white border-ink" : "bg-surface-elevated text-ink-muted border-border hover:border-zinc-300"}`}>{a}° clockwise</button>
            ))}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={rotate} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Rotating..." : "Rotate PDF"}</button>
        </div>
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={ROTATE_STEPS}
        loadingText="Rotating your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}
function DropZone({ ref, onFile, label, accept }: any) {
  const [drag, setDrag] = useState(false);
  return (
    <div onDrop={(e: any) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onDragOver={(e: any) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onClick={() => ref.current?.click()} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
      <div className="space-y-2"><div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg></div><p className="text-sm font-medium text-ink">{label}</p></div>
    </div>
  );
}