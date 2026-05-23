"use client";
import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename, renderPDFPageToJPG } from "@/lib/pdf-utils";
import JSZip from "jszip";

function DropZone({ onFile, label, accept }: { onFile: (f: File) => void; label: string; accept: string }) {
  const [drag, setDrag] = useState(false);
  return (
    <div onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}>
      <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} id="drop-input" />
      <label htmlFor="drop-input" className="cursor-pointer block">
        <div className="space-y-2"><div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg></div><p className="text-sm font-medium text-ink">{label}</p></div>
      </label>
    </div>
  );
}

export function JpgToPdfWorkspace() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const add = useCallback((fs: FileList | File[]) => setFiles((p) => [...p, ...Array.from(fs).filter((f) => f.type.startsWith("image/"))]), []);
  const remove = useCallback((i: number) => setFiles((p) => p.filter((_, j) => j !== i)), []);
  const convert = useCallback(async () => {
    if (!files.length) return;
    setProcessing(true); setError(null);
    try {
      const doc = await PDFDocument.create();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        let img; if (f.type === "image/png") img = await doc.embedPng(buf); else img = await doc.embedJpg(buf);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const blob = await savePDFDoc(doc);
      downloadBlob(blob, getFilename("jpg-to-pdf"));
    } catch (e: any) { setError(e.message || "Conversion failed"); }
    setProcessing(false);
  }, [files]);
  return (
    <div className="space-y-4">
      <div onDrop={(e) => { e.preventDefault(); e.dataTransfer.files.length && add(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()} className="rounded-2xl border-2 border-dashed border-border hover:border-zinc-300 bg-surface-elevated p-12 text-center cursor-pointer">
        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => { e.target.files?.length && add(e.target.files); e.target.value = ""; }} id="jpg-in" />
        <label htmlFor="jpg-in" className="cursor-pointer block"><div className="space-y-2"><div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg></div><p className="text-sm font-medium text-ink">Drop JPG/PNG images here</p><p className="text-xs text-ink-muted">Images are embedded at full resolution</p></div></label>
      </div>
      {files.length > 0 && <div className="space-y-2">{files.map((f, i) => <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated p-3"><span className="flex-1 text-sm truncate">{f.name}</span><span className="text-xs text-ink-muted">{formatBytes(f.size)}</span><button onClick={() => remove(i)} className="text-zinc-400 hover:text-red-500"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button></div>)}</div>}
      {error && <p className="text-xs text-red-500">{error}</p>}
      {files.length > 0 && <button onClick={convert} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Creating PDF..." : "Create PDF"}</button>}
    </div>
  );
}

export function PdfToJpgWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleFile = useCallback(async (f: File) => {
    setFile(f); setError(null);
    try { const doc = await loadPDFDoc(f); setPages(doc.getPageCount()); } catch { setError("Could not read PDF"); }
  }, []);
  const convert = useCallback(async () => {
    if (!file || !pages) return;
    setProcessing(true); setError(null);
    try {
      const zip = new JSZip();
      for (let i = 0; i < pages; i++) {
        const blob = await renderPDFPageToJPG(file, i, 0.92);
        zip.file(`page-${i + 1}.jpg`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, getFilename("pdf-to-jpg"));
    } catch (e: any) { setError(e.message || "Conversion failed"); }
    setProcessing(false);
  }, [file, pages]);
  return (
    <div className="space-y-5">
      <DropZone onFile={handleFile} label="Drop a PDF to convert to JPG" accept=".pdf" />
      {file && <div className="space-y-3"><div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)} · {pages} pages</span></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={convert} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Converting..." : `Convert ${pages} pages to JPG`}</button>
      </div>}
    </div>
  );
}