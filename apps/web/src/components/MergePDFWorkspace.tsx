"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, renderPDFThumbnail, renderAllPDFPages, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";
import MicroChainLinks from "./MicroChainLinks";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

interface MergeJob {
  id: string;
  file: File;
  name: string;
  size: number;
  thumbnailUrl: string | null;
  pageCount: number | null;
}

export default function MergePDFWorkspace() {
  const t = useWorkspaceTranslation();

  const mergeSteps = [
    t("step_1", "Reading and parsing PDF file structures..."),
    t("step_2", "Merging document catalogs and page pools..."),
    t("step_3", "Optimizing resource dictionaries..."),
    t("step_4", "Generating final combined PDF..."),
  ];
  const [jobs, setJobs] = useState<MergeJob[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPreviewingMerged, setIsPreviewingMerged] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("Preview PDF");
  const fileRef = useRef<HTMLInputElement>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      for (const job of jobs) {
        if (job.thumbnailUrl) URL.revokeObjectURL(job.thumbnailUrl);
      }
      for (const url of previewPages) {
        URL.revokeObjectURL(url);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const pdfs = Array.from(incoming).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
    );
    if (pdfs.length === 0) return;

    const newJobs: MergeJob[] = pdfs.map((f) => ({
      id: `pdf-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: f,
      name: f.name,
      size: f.size,
      thumbnailUrl: null,
      pageCount: null,
    }));

    setJobs((prev) => [...prev, ...newJobs]);
    setError(null);
    setMergedBlob(null);

    // Async: generate thumbnails + page counts for each new file
    for (const job of newJobs) {
      (async () => {
        // Get page count from pdf-lib (lightweight — reads catalog only)
        try {
          const doc = await PDFDocument.load(await job.file.arrayBuffer(), { ignoreEncryption: true });
          const count = doc.getPageCount();
          setJobs((prev) =>
            prev.map((j) => (j.id === job.id ? { ...j, pageCount: count } : j))
          );
        } catch {
          setJobs((prev) =>
            prev.map((j) => (j.id === job.id ? { ...j, pageCount: 0 } : j))
          );
        }

        // Generate thumbnail
        try {
          const thumb = await renderPDFThumbnail(job.file);
          setJobs((prev) =>
            prev.map((j) => (j.id === job.id ? { ...j, thumbnailUrl: thumb } : j))
          );
        } catch {
          // thumbnail fails silently — purely cosmetic
        }
      })();
    }
  }, []);

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      addFiles([shared]);
    }
  }, [addFiles]);

  const removeFile = useCallback((id: string) => {
    setJobs((prev) => {
      const found = prev.find((j) => j.id === id);
      if (found?.thumbnailUrl) URL.revokeObjectURL(found.thumbnailUrl);
      return prev.filter((j) => j.id !== id);
    });
    setMergedBlob(null);
  }, []);

  const clearAll = useCallback(() => {
    for (const job of jobs) {
      if (job.thumbnailUrl) URL.revokeObjectURL(job.thumbnailUrl);
    }
    setJobs([]);
    setMergedBlob(null);
  }, [jobs]);

  // HTML5 native drag-to-reorder
  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDragIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
      (e.currentTarget as HTMLElement).style.opacity = "0.4";
    },
    []
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dragIndex !== null && dragIndex !== index) {
        setDragOverIndex(index);
      }
    },
    [dragIndex]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIdx: number) => {
      e.preventDefault();
      setDragIndex(null);
      setDragOverIndex(null);
      if (dragIndex === null || dragIndex === dropIdx) return;

      setJobs((prev) => {
        const next = [...prev];
        const [item] = next.splice(dragIndex, 1);
        next.splice(dropIdx, 0, item);
        return next;
      });

      // Reset merged state when reordering files to allow re-merging
      setMergedBlob(null);
      setToastMessage(null);
    },
    [dragIndex]
  );

  // Merge
  const merge = useCallback(async () => {
    if (jobs.length < 2) {
      setError("Add at least 2 PDF files to merge");
      return;
    }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const merged = await PDFDocument.create();
      for (const job of jobs) {
        const doc = await loadPDFDoc(job.file);
        const copied = await merged.copyPages(doc, doc.getPageIndices());
        copied.forEach((p) => merged.addPage(p));
      }
      const blob = await savePDFDoc(merged);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setMergedBlob(blob);
        setShowProcessingOverlay(false);
        setProcessing(false);
        setToastMessage("PDFs merged successfully!");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Merge failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [jobs]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current) {
      setMergedBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
      setToastMessage("PDFs merged successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, []);

  const download = useCallback(() => {
    if (!mergedBlob) return;
    downloadBlob(mergedBlob, "merged.pdf");
  }, [mergedBlob]);

  // Preview modal
  const openPreview = useCallback(async (targetFile?: File | Blob, isMerged = false, fileName = "") => {
    const fileToPreview = targetFile || mergedBlob;
    if (!fileToPreview) return;
    setIsPreviewingMerged(isMerged);
    setPreviewTitle(isMerged ? t("preview_merged_pdf", "Preview merged PDF") : t("preview_individual_pdf", "Preview: {name}").replace("{name}", fileName || "Individual PDF"));
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const pages = await renderAllPDFPages(fileToPreview, 1.5);
      setPreviewPages(pages);
    } catch {
      setPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [mergedBlob, t]);

  const closePreview = useCallback(() => {
    setShowPreview(false);
    setPreviewPages([]);
  }, []);

  // Keyboard shortcuts for preview modal
  useEffect(() => {
    if (!showPreview) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPreview, closePreview]);

  const totalPages = jobs.reduce((acc, j) => acc + (j.pageCount ?? 0), 0);

  return (
    <div className="relative space-y-5">
      {/* Drop zone */}
      <div
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="rounded-2xl border-2 border-dashed border-border hover:border-accent/40 bg-surface-elevated p-10 text-center cursor-pointer transition-all duration-200"
      >
        <input ref={fileRef} type="file" multiple accept=".pdf,application/pdf" className="hidden"
          onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ""; }} />
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
            </svg>
          </div>
          <p className="text-sm font-medium text-ink">{t("drop_zone_prompt", "Drop PDF files here or click to browse")}</p>
          <p className="text-xs text-ink-muted">{t("add_at_least_2_pdfs", "Add at least 2 PDFs — drag to reorder after upload")}</p>
        </div>
      </div>

      {/* File list with thumbnails + drag handles */}
      {jobs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-ink-muted px-1">
            <span>{jobs.length} file{jobs.length > 1 ? "s" : ""} — {totalPages} total pages</span>
            <button onClick={clearAll} className="hover:text-red-500 transition-colors">{t("clear_all", "Clear all")}</button>
          </div>

          <div className="space-y-2">
            {jobs.map((job, i) => {
              const isDragging = dragIndex === i;
              const isDragOver = dragOverIndex === i;

              return (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, i)}
                  className={`flex items-center gap-4 rounded-xl border bg-surface-elevated p-3 transition-all duration-200 select-none ${
                    isDragging
                      ? "opacity-40 border-accent/30"
                      : isDragOver
                      ? "border-accent bg-accent-surface/30 scale-[1.01] shadow-sm"
                      : "border-border hover:border-zinc-300"
                  }`}
                >
                  <div className="shrink-0 text-zinc-400 cursor-grab active:cursor-grabbing touch-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="9" cy="6" r="1.5"/>
                      <circle cx="15" cy="6" r="1.5"/>
                      <circle cx="9" cy="12" r="1.5"/>
                      <circle cx="15" cy="12" r="1.5"/>
                      <circle cx="9" cy="18" r="1.5"/>
                      <circle cx="15" cy="18" r="1.5"/>
                    </svg>
                  </div>

                  <div className="shrink-0 w-14 h-[72px] rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center">
                    {job.thumbnailUrl ? (
                      <img src={job.thumbnailUrl} alt={job.name}
                        className="w-full h-full object-cover" />
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
                    <p className="text-sm font-medium text-ink truncate">{job.name}</p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {formatBytes(job.size)}
                      {job.pageCount != null && ` · ${job.pageCount} page${job.pageCount !== 1 ? "s" : ""}`}
                    </p>
                  </div>

                  {/* Preview Button */}
                  <button
                    onClick={() => openPreview(job.file, false, job.name)}
                    className="shrink-0 text-zinc-400 hover:text-ink transition-colors p-1 cursor-pointer mr-1"
                    title="Preview file"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </button>

                  <button
                    onClick={() => removeFile(job.id)}
                    className="shrink-0 text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            {!mergedBlob ? (
              <button
                onClick={merge}
                disabled={processing || jobs.length < 2}
                className="rounded-lg bg-accent hover:bg-accent-hover text-white px-5 py-2.5 text-sm font-medium active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
                    {t("merging", "Merging...")}
                  </span>
                ) : (
                  t("merge_n_pdfs", "Merge {count} PDFs").replace("{count}", String(jobs.length))
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={download}
                  className="rounded-lg bg-accent hover:bg-accent-hover text-white px-5 py-2.5 text-sm font-medium active:scale-[0.98] transition-all shadow-sm flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                  </svg>
                  {t("download", "Download")}
                </button>
                <button
                  onClick={() => openPreview(undefined, true, "Merged PDF")}
                  className="rounded-lg border border-border bg-surface-elevated hover:bg-surface px-5 py-2.5 text-sm font-medium text-ink-secondary hover:text-ink active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {t("preview", "Preview")}
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  {t("start_over", "Start over")}
                </button>
              </>
            )}
          </div>

          {mergedBlob && (
            <div className="space-y-4">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {t("merged_success", "Merged successfully")} — {formatBytes(mergedBlob.size)}
              </p>
              <MicroChainLinks
                blob={mergedBlob}
                filename={getFilename("pdf-merge", jobs[0]?.name || "document.pdf")}
                currentToolId="pdf-merge"
              />
            </div>
          )}
        </div>
      )}

      {/* Stark Monochromatic Success Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3.5 px-4 py-3 rounded-xl border border-border bg-surface-elevated text-ink shadow-xl backdrop-blur-md select-none"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <span className="text-xs font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <h3 className="text-sm font-semibold text-ink">{previewTitle}</h3>
                      <p className="text-xs text-ink-muted">{previewPages.length} page{previewPages.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={closePreview}
                        className="p-1.5 rounded-lg border border-border hover:bg-surface text-ink-secondary hover:text-ink transition-colors cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
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
                        <p className="text-xs text-ink-muted">{t("rendering_preview", "Rendering preview pages...")}</p>
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
                            <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[9px] font-bold text-ink-secondary bg-surface/90 border border-border rounded shadow-sm select-none opacity-80 group-hover:opacity-100 transition-opacity">
                              Page {idx + 1} of {previewPages.length}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-xs text-ink-muted">{t("failed_to_render_preview", "Failed to render preview")}</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className={`flex items-center shrink-0 px-5 py-3 border-t border-border ${isPreviewingMerged ? "justify-between" : "justify-end"}`}>
                    {isPreviewingMerged && (
                      <button onClick={download} className="rounded-lg bg-accent hover:bg-accent-hover text-white px-4 py-2 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                        </svg>
                        {t("download_merged_pdf", "Download merged PDF")}
                      </button>
                    )}
                    <div className="text-[9px] text-ink-muted font-medium uppercase tracking-wider font-mono">{t("esc_to_close", "Esc to close · Scroll to view all pages")}</div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={mergeSteps}
        loadingText={t("merging_overlay_title", "Merging your PDF documents...")}
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}