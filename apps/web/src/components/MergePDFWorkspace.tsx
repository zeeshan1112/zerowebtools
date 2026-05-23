"use client";

import React, { useState, useCallback, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes } from "@/lib/pdf-utils";

interface MergeJob {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function MergePDFWorkspace() {
  const [jobs, setJobs] = useState<MergeJob[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const pdfs = Array.from(incoming).filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (pdfs.length === 0) return;
    setJobs((prev) => [
      ...prev,
      ...pdfs.map((f) => ({ id: `pdf-${Date.now()}-${Math.random()}`, file: f, name: f.name, size: f.size })),
    ]);
    setError(null);
  }, []);

  const remove = useCallback((id: string) => setJobs((prev) => prev.filter((j) => j.id !== id)), []);
  const moveUp = useCallback(
    (idx: number) =>
      setJobs((prev) => {
        if (idx <= 0) return prev;
        const next = [...prev];
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
        return next;
      }),
    [],
  );
  const moveDown = useCallback(
    (idx: number) =>
      setJobs((prev) => {
        if (idx >= prev.length - 1) return prev;
        const next = [...prev];
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
        return next;
      }),
    [],
  );

  const merge = useCallback(async () => {
    if (jobs.length < 2) {
      setError("Add at least 2 PDF files");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const job of jobs) {
        const doc = await loadPDFDoc(job.file);
        const copied = await merged.copyPages(doc, doc.getPageIndices());
        copied.forEach((p) => merged.addPage(p));
      }
      const blob = await savePDFDoc(merged);
      downloadBlob(blob, "merged.pdf");
    } catch (e: any) {
      setError(e.message || "Merge failed");
    }
    setProcessing(false);
  }, [jobs]);

  return (
    <div className="space-y-5">
      <DropZone onAdd={addFiles} label="Drop PDF files here" detail="Add at least 2 PDFs — drag to reorder" />
      {jobs.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-ink-muted">{jobs.length} file{jobs.length > 1 ? "s" : ""} added</div>
          <div className="space-y-1.5">
            {jobs.map((job, i) => (
              <div key={job.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated p-3">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveUp(i)} className="text-zinc-400 hover:text-ink transition-colors leading-none" title="Move up">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2L2 7h8L6 2z"/></svg>
                  </button>
                  <button onClick={() => moveDown(i)} className="text-zinc-400 hover:text-ink transition-colors leading-none" title="Move down">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 10l4-5H2l4 5z"/></svg>
                  </button>
                </div>
                <span className="flex-1 text-sm truncate">{job.name}</span>
                <span className="text-xs text-ink-muted">{formatBytes(job.size)}</span>
                <button onClick={() => remove(job.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={merge} disabled={processing || jobs.length < 2} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">
            {processing ? "Merging..." : "Merge PDFs"}
          </button>
        </div>
      )}
    </div>
  );
}

function DropZone({ onAdd, label, detail }: { onAdd: (f: FileList | File[]) => void; label: string; detail?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  return (
    <div
      onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files.length) onAdd(e.dataTransfer.files); }}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onClick={() => ref.current?.click()}
      className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}
    >
      <input ref={ref} type="file" multiple accept=".pdf,application/pdf,image/*" className="hidden" onChange={(e) => { if (e.target.files?.length) onAdd(e.target.files); e.target.value = ""; }} />
      <div className="space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
          </svg>
        </div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {detail && <p className="text-xs text-ink-muted">{detail}</p>}
      </div>
    </div>
  );
}