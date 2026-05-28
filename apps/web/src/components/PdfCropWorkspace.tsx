"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadPDFDoc, savePDFDoc, downloadBlob, renderAllPDFPages, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";
import MicroChainLinks from "./MicroChainLinks";

const CROP_STEPS = [
  "Loading PDF catalog tree...",
  "Recalculating layout cropboxes...",
  "Applying paper sizing transformations...",
  "Compiling cropped PDF bytes...",
];

export default function PdfCropWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [showProcessing, setShowProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading PDF...");
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [croppedPreviewPages, setCroppedPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Cropping settings
  const [cropMode, setCropMode] = useState<"crop" | "resize">("crop");
  
  // Crop Margins (percentages)
  const [cropLeft, setCropLeft] = useState(10);
  const [cropRight, setCropRight] = useState(10);
  const [cropTop, setCropTop] = useState(10);
  const [cropBottom, setCropBottom] = useState(10);

  // Resize settings
  const [targetSize, setTargetSize] = useState<"A4" | "Letter" | "Legal" | "custom">("A4");
  const [customWidth, setCustomWidth] = useState(595); // pts (A4 width)
  const [customHeight, setCustomHeight] = useState(842); // pts (A4 height)

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
  }>({ x: 0, y: 0, left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    setCroppedBlob(null);
  }, [cropMode, targetSize, customWidth, customHeight]);

  useEffect(() => {
    return () => {
      for (const url of croppedPreviewPages) {
        URL.revokeObjectURL(url);
      }
    };
  }, [croppedPreviewPages]);

  const handlePointerDown = (e: React.PointerEvent, handle: string) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(handle);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      left: cropLeft,
      right: cropRight,
      top: cropTop,
      bottom: cropBottom,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartRef.current.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.y) / rect.height) * 100;

    let newLeft = dragStartRef.current.left;
    let newRight = dragStartRef.current.right;
    let newTop = dragStartRef.current.top;
    let newBottom = dragStartRef.current.bottom;

    if (isDragging.includes("left")) {
      newLeft = Math.min(40, Math.max(0, dragStartRef.current.left + deltaX));
    }
    if (isDragging.includes("right")) {
      newRight = Math.min(40, Math.max(0, dragStartRef.current.right - deltaX));
    }
    if (isDragging.includes("top")) {
      newTop = Math.min(40, Math.max(0, dragStartRef.current.top + deltaY));
    }
    if (isDragging.includes("bottom")) {
      newBottom = Math.min(40, Math.max(0, dragStartRef.current.bottom - deltaY));
    }

    if (100 - newLeft - newRight >= 20) {
      setCropLeft(Math.round(newLeft));
      setCropRight(Math.round(newRight));
    }
    if (100 - newTop - newBottom >= 20) {
      setCropTop(Math.round(newTop));
      setCropBottom(Math.round(newBottom));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsDragging(null);
    }
  };

  const openPreview = useCallback(async () => {
    if (!croppedBlob) return;
    setShowPreviewModal(true);
    setPreviewLoading(true);
    try {
      const pages = await renderAllPDFPages(croppedBlob, 1.5);
      setCroppedPreviewPages(pages);
    } catch {
      setCroppedPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [croppedBlob]);

  const closePreview = useCallback(() => {
    setShowPreviewModal(false);
    setCroppedPreviewPages([]);
  }, []);

  const download = useCallback(() => {
    if (!croppedBlob || !file) return;
    const suffix = cropMode === "crop" ? "-cropped.pdf" : "-resized.pdf";
    const outName = getFilename("pdf-watermark", file.name).replace("-watermarked.pdf", suffix);
    downloadBlob(croppedBlob, outName);
  }, [croppedBlob, file, cropMode]);

  useEffect(() => {
    if (!showPreviewModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPreviewModal, closePreview]);

  const handleFile = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setPagePreviews([]);
    setActivePageIndex(0);
    setCroppedBlob(null);

    setLoadingText("Rendering page guides...");
    setShowProcessing(true);
    try {
      const previews = await renderAllPDFPages(selectedFile);
      setPagePreviews(previews);
    } catch (err) {
      console.error("Failed to render PDF previews:", err);
    } finally {
      setShowProcessing(false);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      handleFile(shared);
    }
  }, [handleFile]);

  const handleClear = () => {
    setFile(null);
    setPagePreviews([]);
    setCroppedBlob(null);
  };

  const handleCropAndResize = async () => {
    if (!file) return;

    setLoadingText("Applying changes to PDF document...");
    setShowProcessing(true);

    try {
      const doc = await loadPDFDoc(file);
      const pages = doc.getPages();

      pages.forEach((page) => {
        // Resolve original bounding dimensions
        const cropBox = page.getCropBox();
        const { x, y, width, height } = cropBox;

        if (cropMode === "crop") {
          // Calculate new coordinates based on percentage crops
          const cropLeftAmt = (cropLeft / 100) * width;
          const cropRightAmt = (cropRight / 100) * width;
          const cropTopAmt = (cropTop / 100) * height;
          const cropBottomAmt = (cropBottom / 100) * height;

          const newX = x + cropLeftAmt;
          const newY = y + cropBottomAmt;
          const newW = width - cropLeftAmt - cropRightAmt;
          const newH = height - cropTopAmt - cropBottomAmt;

          // Set cropped bounds
          page.setCropBox(newX, newY, Math.max(50, newW), Math.max(50, newH));
        } else {
          // Resize mode
          let targetW = customWidth;
          let targetH = customHeight;

          if (targetSize === "A4") {
            targetW = 595.28; // A4 pt dimensions
            targetH = 841.89;
          } else if (targetSize === "Letter") {
            targetW = 612.0; // Letter pt dimensions
            targetH = 792.0;
          } else if (targetSize === "Legal") {
            targetW = 612.0;
            targetH = 1008.0;
          }

          page.setSize(targetW, targetH);
        }
      });

      const outBlob = await savePDFDoc(doc);
      setCroppedBlob(outBlob);
    } catch (err) {
      console.error("Failed to crop/resize PDF:", err);
    } finally {
      setShowProcessing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload Zone */}
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-3xl p-12 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors flex flex-col items-center justify-center text-center select-none cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-12 h-12 text-ink-muted/60 mb-4" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span className="text-sm font-bold text-ink mb-1">Click to Upload PDF for Cropping & Resizing</span>
          <span className="text-xs text-ink-muted">All layout transformations execute locally</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
          {/* Left Column: Crop/Resize controls panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              {/* Tab switcher */}
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                <button
                  onClick={() => setCropMode("crop")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    cropMode === "crop" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Visual Crop
                </button>
                <button
                  onClick={() => setCropMode("resize")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    cropMode === "resize" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Page Resize
                </button>
              </div>

              {/* Crop Controls */}
              {cropMode === "crop" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">Crop Margins</span>
                    <p className="text-xs text-ink-secondary">
                      Drag the red boundaries on the preview screen to adjust margins.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/40 p-3 border border-border/50 text-center font-mono">
                        <div className="text-[9px] font-bold text-ink-muted uppercase block">Top / Bottom</div>
                        <div className="text-sm font-bold text-ink mt-1">
                          {cropTop}% / {cropBottom}%
                        </div>
                      </div>
                      <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/40 p-3 border border-border/50 text-center font-mono">
                        <div className="text-[9px] font-bold text-ink-muted uppercase block">Left / Right</div>
                        <div className="text-sm font-bold text-ink mt-1">
                          {cropLeft}% / {cropRight}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resize Controls */}
              {cropMode === "resize" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label htmlFor="resize-page-size" className="text-[10px] font-bold text-ink-muted uppercase block">Target Page Size</label>
                    <select
                      id="resize-page-size"
                      value={targetSize}
                      onChange={(e) => setTargetSize(e.target.value as any)}
                      className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
                    >
                      <option value="A4">A4 (595 x 842 pt)</option>
                      <option value="Letter">Letter (612 x 792 pt)</option>
                      <option value="Legal">Legal (612 x 1008 pt)</option>
                      <option value="custom">Custom Dimensions</option>
                    </select>
                  </div>

                  {targetSize === "custom" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="custom-width-input" className="text-[9px] font-bold text-ink-muted uppercase">Width (pt)</label>
                        <input
                          id="custom-width-input"
                          type="number"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(Number(e.target.value))}
                          className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="custom-height-input" className="text-[9px] font-bold text-ink-muted uppercase">Height (pt)</label>
                        <input
                          id="custom-height-input"
                          type="number"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(Number(e.target.value))}
                          className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!croppedBlob ? (
                <button
                  onClick={handleCropAndResize}
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                >
                  Apply Crop & Resize
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={download}
                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download {cropMode === "crop" ? "Cropped" : "Resized"} PDF
                  </button>
                  <button
                    onClick={openPreview}
                    className="w-full py-3 border border-border bg-surface-elevated hover:bg-surface text-ink-secondary hover:text-ink rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Preview Result
                  </button>
                </div>
              )}
            </div>

            {/* Document Details Card */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Layout Stats
              </h4>
              <div className="text-xs space-y-2 text-ink-secondary">
                <p><span className="font-bold text-ink-muted">Name:</span> {file.name}</p>
                <p><span className="font-bold text-ink-muted">Sizing mode:</span> {cropMode === "crop" ? "Visible margins crop" : "Paper resize"}</p>
              </div>
              <button
                onClick={handleClear}
                className="w-full py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/5 transition-colors cursor-pointer"
              >
                Clear Document
              </button>
            </div>

            {croppedBlob && (
              <MicroChainLinks
                blob={croppedBlob}
                filename={getFilename("pdf-watermark", file.name).replace("-watermarked.pdf", cropMode === "crop" ? "-cropped.pdf" : "-resized.pdf")}
                currentToolId="pdf-crop"
              />
            )}
          </div>

          {/* Right Column: PDF Preview Render & Cropbox bounding overlay */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Page Nav */}
            {pagePreviews.length > 1 && (
              <div className="flex items-center gap-3 bg-surface-elevated border border-border/60 p-2 rounded-xl mb-4">
                <button
                  onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activePageIndex === 0}
                  className="p-1 px-2.5 border border-border disabled:opacity-40 rounded-lg text-xs font-bold text-ink hover:text-accent cursor-pointer"
                >
                  ◀ Prev
                </button>
                <span className="text-xs font-mono font-bold text-ink">
                  Page {activePageIndex + 1} of {pagePreviews.length}
                </span>
                <button
                  onClick={() => setActivePageIndex((prev) => Math.min(pagePreviews.length - 1, prev + 1))}
                  disabled={activePageIndex === pagePreviews.length - 1}
                  className="p-1 px-2.5 border border-border disabled:opacity-40 rounded-lg text-xs font-bold text-ink hover:text-accent cursor-pointer"
                >
                  Next ▶
                </button>
              </div>
            )}

            {/* Visual sheet boundaries */}
            {pagePreviews.length > 0 ? (
              <div className="relative border border-border bg-white shadow-lg max-w-full rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="relative" ref={containerRef}>
                  {/* PDF Page Image Preview */}
                  <img
                    src={pagePreviews[activePageIndex]}
                    alt={`PDF layout preview`}
                    className="max-h-[550px] w-auto h-auto max-w-full block select-none pointer-events-none rounded-lg"
                  />

                  {/* Visible Crop Box Bounding Guide (Draggable) */}
                  {cropMode === "crop" && (
                    <div className="absolute inset-0 select-none">
                      {/* Darkened overlays for cropped-out margins */}
                      <div
                        className="absolute bg-zinc-950/40 top-0 left-0 right-0 pointer-events-none"
                        style={{ height: `${cropTop}%` }}
                      />
                      <div
                        className="absolute bg-zinc-950/40 bottom-0 left-0 right-0 pointer-events-none"
                        style={{ height: `${cropBottom}%` }}
                      />
                      <div
                        className="absolute bg-zinc-950/40 left-0 pointer-events-none"
                        style={{
                          top: `${cropTop}%`,
                          bottom: `${cropBottom}%`,
                          width: `${cropLeft}%`,
                        }}
                      />
                      <div
                        className="absolute bg-zinc-950/40 right-0 pointer-events-none"
                        style={{
                          top: `${cropTop}%`,
                          bottom: `${cropBottom}%`,
                          width: `${cropRight}%`,
                        }}
                      />

                      {/* Visual Crop Box borders */}
                      <div
                        className="absolute border border-dashed border-red-500 bg-transparent"
                        style={{
                          left: `${cropLeft}%`,
                          top: `${cropTop}%`,
                          width: `${100 - cropLeft - cropRight}%`,
                          height: `${100 - cropTop - cropBottom}%`,
                        }}
                      >
                        {/* Corner Handles */}
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "top-left")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-3.5 h-3.5 bg-red-600 border border-white rounded-full -top-1.75 -left-1.75 cursor-nwse-resize z-10 hover:scale-125 transition-transform"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "top-right")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-3.5 h-3.5 bg-red-600 border border-white rounded-full -top-1.75 -right-1.75 cursor-nesw-resize z-10 hover:scale-125 transition-transform"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "bottom-left")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-3.5 h-3.5 bg-red-600 border border-white rounded-full -bottom-1.75 -left-1.75 cursor-nesw-resize z-10 hover:scale-125 transition-transform"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "bottom-right")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-3.5 h-3.5 bg-red-600 border border-white rounded-full -bottom-1.75 -right-1.75 cursor-nwse-resize z-10 hover:scale-125 transition-transform"
                        />

                        {/* Edge Handles */}
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "top")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute h-2 left-4 right-4 -top-1 cursor-ns-resize z-10"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "bottom")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute h-2 left-4 right-4 -bottom-1 cursor-ns-resize z-10"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "left")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-2 top-4 bottom-4 -left-1 cursor-ew-resize z-10"
                        />
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "right")}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          className="absolute w-2 top-4 bottom-4 -right-1 cursor-ew-resize z-10"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-[400px] h-[550px] border border-dashed border-border/80 rounded-2xl bg-surface-elevated/20 flex items-center justify-center text-ink-muted/40 italic text-xs">
                Rendering page guides...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal (portal to body) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showPreviewModal && (
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
                      <h3 className="text-sm font-semibold text-ink">Preview Cropped/Resized PDF</h3>
                      <p className="text-xs text-ink-muted">{croppedPreviewPages.length} page{croppedPreviewPages.length !== 1 ? "s" : ""}</p>
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
                    ) : croppedPreviewPages.length > 0 ? (
                      <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
                        {croppedPreviewPages.map((url, idx) => (
                          <div key={idx} className="relative group w-full flex flex-col items-center">
                            <img
                              src={url}
                              alt={`Page ${idx + 1}`}
                              className="max-w-full h-auto rounded-lg shadow-md border border-border bg-white dark:bg-zinc-900 transition-shadow duration-200 hover:shadow-lg"
                              style={{ maxHeight: "75vh" }}
                            />
                            <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[9px] font-bold text-ink-secondary bg-surface/90 border border-border rounded shadow-sm select-none opacity-80 group-hover:opacity-100 transition-opacity font-mono">
                              Page {idx + 1} of {croppedPreviewPages.length}
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
        isOpen={showProcessing}
        steps={CROP_STEPS}
        loadingText={loadingText}
        duration={1500}
        onFinished={() => setShowProcessing(false)}
      />
    </div>
  );
}
