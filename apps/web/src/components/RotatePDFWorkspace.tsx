"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename, renderPDFThumbnail, renderAllPDFPages } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";
import MicroChainLinks from "./MicroChainLinks";

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
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // Result and Preview states
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
      for (const url of previewPages) URL.revokeObjectURL(url);
    };
  }, [thumbnailUrl, previewPages]);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setError(null);
    setRotatedBlob(null);
    setThumbnailUrl(null);
    try {
      const doc = await loadPDFDoc(f);
      setTotalPages(doc.getPageCount());
      const thumb = await renderPDFThumbnail(f);
      setThumbnailUrl(thumb);
    } catch {
      setError("Could not read PDF");
    }
  }, []);

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      handleFile(shared);
    }
  }, [handleFile]);

  const handleClear = useCallback(() => {
    if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    for (const url of previewPages) URL.revokeObjectURL(url);
    setFile(null);
    setAngle(90);
    setRotatedBlob(null);
    setThumbnailUrl(null);
    setPreviewPages([]);
    setShowPreview(false);
    setError(null);
  }, [thumbnailUrl, previewPages]);

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
        setRotatedBlob(blob);
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
      setRotatedBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  const download = useCallback(() => {
    if (!rotatedBlob || !file) return;
    downloadBlob(rotatedBlob, getFilename("pdf-rotate", file.name));
  }, [rotatedBlob, file]);

  const openPreview = useCallback(async () => {
    if (!rotatedBlob) return;
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const pages = await renderAllPDFPages(rotatedBlob, 1.5);
      setPreviewPages(pages);
    } catch {
      setPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [rotatedBlob]);

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
      {!file && <DropZone ref={ref} onFile={handleFile} label="Drop a PDF here to rotate" accept=".pdf" />}
      {file && (
        <div className="space-y-5">
          {/* Thumbnail / Meta card */}
          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-3 select-none">
            <div className="shrink-0 w-14 h-[72px] rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center border border-border/40">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={file.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-zinc-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                  </svg>
                  <div className="w-6 h-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse"/>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate" title={file.name}>{file.name}</p>
              <p className="text-xs text-ink-secondary mt-0.5">{formatBytes(file.size)} · {totalPages} pages</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono">Rotation Angle</div>
            <div className="flex items-center gap-2 flex-wrap">
              {[90, 180, 270].map((a) => (
                <button
                  key={a}
                  onClick={() => { setAngle(a); setRotatedBlob(null); }}
                  disabled={processing || rotatedBlob !== null}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    angle === a ? "bg-ink text-white border-ink" : "bg-surface-elevated text-ink-muted border-border hover:border-zinc-300"
                  } ${(processing || rotatedBlob !== null) ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {a}° clockwise
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!rotatedBlob ? (
              <button
                onClick={rotate}
                disabled={processing}
                className="rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 font-mono uppercase tracking-wider"
              >
                {processing ? "Rotating..." : "Rotate PDF"}
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
                  Download Rotated PDF
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
        </div>
      )}

      {file && rotatedBlob && (
        <MicroChainLinks
          blob={rotatedBlob}
          filename={getFilename("pdf-rotate", file.name)}
          currentToolId="pdf-rotate"
        />
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
                      <h3 className="text-sm font-semibold text-ink">Preview Rotated PDF</h3>
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
                    <button onClick={download} className="rounded-lg bg-accent hover:bg-accent-hover text-white px-4 py-2 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                      </svg>
                      Download Rotated PDF
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
        steps={ROTATE_STEPS}
        loadingText="Rotating your PDF document..."
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