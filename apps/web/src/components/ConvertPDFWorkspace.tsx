"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename, renderPDFPageToJPG, renderAllPDFPages } from "@/lib/pdf-utils";
import JSZip from "jszip";
import ProcessingOverlay from "./ProcessingOverlay";

const JPG_TO_PDF_STEPS = [
  "Loading input image sources...",
  "Formatting layout sizing...",
  "Injecting image streams into pages...",
  "Compiling final combined PDF...",
];

const PDF_TO_JPG_STEPS = [
  "Parsing source PDF pages...",
  "Initializing rasterization workers...",
  "Converting pages to high-res JPGs...",
  "Bundling images into ZIP package...",
];

interface ImageItem {
  id: string;
  file: File;
  url: string;
}

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
  const [files, setFiles] = useState<ImageItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Result and Preview states
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  // Revoke object URLs to prevent leaks
  useEffect(() => {
    return () => {
      files.forEach((item) => URL.revokeObjectURL(item.url));
      for (const url of previewPages) URL.revokeObjectURL(url);
    };
  }, [files, previewPages]);

  const add = useCallback((fs: FileList | File[]) => {
    const items: ImageItem[] = Array.from(fs)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        url: URL.createObjectURL(f),
      }));
    setFiles((p) => [...p, ...items]);
    setPdfBlob(null);
  }, []);

  const remove = useCallback((id: string) => {
    setFiles((p) => {
      const target = p.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return p.filter((x) => x.id !== id);
    });
    setPdfBlob(null);
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDrop = useCallback((targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    setFiles((p) => {
      const nextList = [...p];
      const [draggedItem] = nextList.splice(draggedIndex, 1);
      nextList.splice(targetIndex, 0, draggedItem);
      return nextList;
    });
    setDraggedIndex(null);
    setPdfBlob(null);
  }, [draggedIndex]);

  const handleClear = useCallback(() => {
    files.forEach((item) => URL.revokeObjectURL(item.url));
    for (const url of previewPages) URL.revokeObjectURL(url);
    setFiles([]);
    setPdfBlob(null);
    setPreviewPages([]);
    setShowPreview(false);
    setError(null);
    setDraggedIndex(null);
  }, [files, previewPages]);

  const convert = useCallback(async () => {
    if (!files.length) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const item of files) {
        const buf = await item.file.arrayBuffer();
        let img;
        if (item.file.type === "image/png") {
          img = await doc.embedPng(buf);
        } else {
          img = await doc.embedJpg(buf);
        }
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setPdfBlob(blob);
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Conversion failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [files]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current) {
      setPdfBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, []);

  const download = useCallback(() => {
    if (!pdfBlob) return;
    downloadBlob(pdfBlob, getFilename("jpg-to-pdf"));
  }, [pdfBlob]);

  const openPreview = useCallback(async () => {
    if (!pdfBlob) return;
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const pages = await renderAllPDFPages(pdfBlob, 1.5);
      setPreviewPages(pages);
    } catch {
      setPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [pdfBlob]);

  const closePreview = useCallback(() => {
    setShowPreview(false);
    setPreviewPages([]);
  }, []);

  useEffect(() => {
    if (!showPreview) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPreview, closePreview]);

  return (
    <div className="relative space-y-5">
      {/* Upload zone */}
      <div onDrop={(e) => { e.preventDefault(); e.dataTransfer.files.length && add(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()} className="rounded-2xl border-2 border-dashed border-border hover:border-zinc-300 bg-surface-elevated p-10 text-center cursor-pointer">
        <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => { e.target.files?.length && add(e.target.files); e.target.value = ""; }} id="jpg-in" />
        <label htmlFor="jpg-in" className="cursor-pointer block">
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">Drop JPG/PNG images here or click to browse</p>
            <p className="text-xs text-ink-muted">Arrange, re-order, and preview before converting</p>
          </div>
        </label>
      </div>

      {/* Grid of image thumbnails */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono">Image Order ({files.length} file{files.length !== 1 ? "s" : ""})</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((item, i) => {
              const isDragged = draggedIndex === i;
              const canDrag = !processing && pdfBlob === null;
              return (
                <div
                  key={item.id}
                  draggable={canDrag}
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(i)}
                  className={`relative rounded-xl border p-2 group flex flex-col justify-between shadow-sm select-none transition-all duration-200 ${
                    canDrag ? "cursor-grab active:cursor-grabbing hover:border-accent/40" : ""
                  } ${
                    isDragged
                      ? "opacity-40 border-dashed border-accent bg-accent-surface/30 scale-95"
                      : "border-border bg-surface-elevated/70"
                  }`}
                >
                  {/* Image Box */}
                  <div className="relative aspect-[4/3] rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-border/50">
                    <img src={item.url} alt={item.file.name} className="w-full h-full object-cover pointer-events-none" />
                    <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  {/* Detail and controls */}
                  <div className="mt-2 space-y-1.5">
                    <div className="text-xs text-ink font-medium truncate font-sans px-1" title={item.file.name}>
                      {item.file.name}
                    </div>
                    <div className="text-[10px] text-ink-muted font-mono px-1">
                      {formatBytes(item.file.size)}
                    </div>
                    {/* Actions row */}
                    <div className="flex items-center justify-between border-t border-border/40 pt-2 px-1">
                      <span className="text-[9px] text-zinc-400 font-mono tracking-wider">DRAG TO SORT</span>
                      <button
                        onClick={() => remove(item.id)}
                        disabled={processing || pdfBlob !== null}
                        className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 transition-colors"
                        title="Remove Image"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {!pdfBlob ? (
            <button
              onClick={convert}
              disabled={processing}
              className="rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 font-mono uppercase tracking-wider"
            >
              {processing ? "Creating PDF..." : "Create PDF"}
            </button>
          ) : (
            <>
              <button
                onClick={download}
                className="rounded-lg bg-accent hover:bg-accent-hover text-white px-5 py-2.5 text-sm font-medium active:scale-[0.98] transition-all shadow-sm flex items-center gap-2 font-mono uppercase tracking-wider"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                </svg>
                Download PDF
              </button>
              <button
                onClick={openPreview}
                className="rounded-lg border border-border bg-surface-elevated hover:bg-surface px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink active:scale-[0.98] transition-all flex items-center gap-2 font-mono uppercase tracking-wider"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Preview Result
              </button>
              <button
                onClick={handleClear}
                className="text-xs text-ink-muted hover:text-ink transition-colors font-mono uppercase tracking-wider ml-2"
              >
                Start Over
              </button>
            </>
          )}
        </div>
      )}

      {/* Preview Modal (portal to body) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showPreview && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closePreview}
                  className="absolute inset-0 bg-zinc-950/60 dark:bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative z-10 bg-surface-elevated border border-border rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden mx-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
                    <div>
                      <h3 className="text-sm font-semibold text-ink">Preview Converted PDF</h3>
                      <p className="text-xs text-ink-muted">{previewPages.length} page{previewPages.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={closePreview}
                        className="p-1.5 rounded-lg border border-border hover:bg-surface text-ink-secondary hover:text-ink transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Page viewer - Continuous Vertical Scroll */}
                  <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6">
                    {previewLoading ? (
                      <div className="h-64 flex flex-col items-center justify-center space-y-3">
                        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"/>
                        <p className="text-xs text-ink-muted">Rendering preview pages...</p>
                      </div>
                    ) : previewPages.length > 0 ? (
                      <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
                        {previewPages.map((url, idx) => (
                          <div key={idx} className="relative group w-full flex flex-col items-center">
                            <img
                              src={url}
                              alt={`Page ${idx + 1}`}
                              className="max-w-full h-auto rounded-lg shadow-md border border-border bg-white dark:bg-zinc-900 transition-shadow duration-200 hover:shadow-lg"
                              style={{ maxHeight: "75vh" }}
                            />
                            <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[9px] font-bold text-ink-secondary bg-surface/90 border border-border rounded shadow-sm select-none opacity-80 group-hover:opacity-100 transition-opacity font-mono">
                              Page {idx + 1} of {previewPages.length}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-xs text-ink-muted">Failed to render preview</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between shrink-0 px-5 py-3 border-t border-border">
                    <button onClick={download} className="rounded-lg bg-accent hover:bg-accent-hover text-white px-4 py-2 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer font-mono uppercase tracking-wider">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                      </svg>
                      Download PDF
                    </button>
                    <div className="text-[9px] text-ink-muted font-medium uppercase tracking-wider font-mono">Esc to close · Scroll to view all pages</div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={JPG_TO_PDF_STEPS}
        loadingText="Creating your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function PdfToJpgWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setError(null);
    try { const doc = await loadPDFDoc(f); setPages(doc.getPageCount()); } catch { setError("Could not read PDF"); }
  }, []);

  const convert = useCallback(async () => {
    if (!file || !pages) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const zip = new JSZip();
      for (let i = 0; i < pages; i++) {
        const blob = await renderPDFPageToJPG(file, i, 0.92);
        zip.file(`page-${i + 1}.jpg`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      pendingBlobRef.current = zipBlob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(zipBlob, getFilename("pdf-to-jpg"));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Conversion failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, pages]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-to-jpg"));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, []);

  return (
    <div className="relative space-y-5">
      <DropZone onFile={handleFile} label="Drop a PDF to convert to JPG" accept=".pdf" />
      {file && <div className="space-y-3"><div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)} · {pages} pages</span></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={convert} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 font-mono uppercase tracking-wider">{processing ? "Converting..." : `Convert ${pages} pages to JPG`}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={PDF_TO_JPG_STEPS}
        loadingText="Converting PDF to JPG..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}