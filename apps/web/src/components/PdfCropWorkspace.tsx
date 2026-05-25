"use client";

import React, { useState, useEffect, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, renderAllPDFPages, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPagePreviews([]);
      setActivePageIndex(0);

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
    }
  };

  const handleClear = () => {
    setFile(null);
    setPagePreviews([]);
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
      const suffix = cropMode === "crop" ? "-cropped.pdf" : "-resized.pdf";
      const outName = getFilename("pdf-watermark", file.name).replace("-watermarked.pdf", suffix);
      downloadBlob(outBlob, outName);
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
                    <span className="text-[10px] font-bold text-ink-muted uppercase">Crop Margins (%)</span>
                    
                    <div className="space-y-3 text-xs">
                      {/* Left */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px] text-ink-secondary">
                          <span>Crop Left</span>
                          <span>{cropLeft}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={cropLeft}
                          onChange={(e) => setCropLeft(Number(e.target.value))}
                          className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
                      </div>

                      {/* Right */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px] text-ink-secondary">
                          <span>Crop Right</span>
                          <span>{cropRight}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={cropRight}
                          onChange={(e) => setCropRight(Number(e.target.value))}
                          className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
                      </div>

                      {/* Top */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px] text-ink-secondary">
                          <span>Crop Top</span>
                          <span>{cropTop}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={cropTop}
                          onChange={(e) => setCropTop(Number(e.target.value))}
                          className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
                      </div>

                      {/* Bottom */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px] text-ink-secondary">
                          <span>Crop Bottom</span>
                          <span>{cropBottom}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={cropBottom}
                          onChange={(e) => setCropBottom(Number(e.target.value))}
                          className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                        />
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

              <button
                onClick={handleCropAndResize}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
              >
                Apply Crop & Download
              </button>
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
              <div className="relative border border-border bg-white shadow-lg overflow-hidden flex items-center justify-center max-w-full w-[400px] h-[550px] rounded-2xl">
                {/* PDF Page Image Preview */}
                <img
                  src={pagePreviews[activePageIndex]}
                  alt={`PDF layout preview`}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />

                {/* Visible Crop Box Bounding Guide */}
                {cropMode === "crop" && (
                  <div
                    className="absolute border-2 border-dashed border-red-500 bg-red-500/5 pointer-events-none transition-all duration-200"
                    style={{
                      left: `${cropLeft}%`,
                      top: `${cropTop}%`,
                      width: `${100 - cropLeft - cropRight}%`,
                      height: `${100 - cropTop - cropBottom}%`,
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-[400px] h-[550px] border border-dashed border-border/80 rounded-2xl bg-surface-elevated/20 flex items-center justify-center text-ink-muted/40 italic text-xs">
                Rendering page guides...
              </div>
            )}
          </div>
        </div>
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
