"use client";

import React, { useState, useRef } from "react";
import JSZip from "jszip";
import ProcessingOverlay from "./ProcessingOverlay";

const RESIZE_STEPS = [
  "Initializing asynchronous canvas context...",
  "Applying cubic downscaling grids...",
  "Encoding output buffer compression...",
  "Assembling output download payload...",
];

interface ImageItem {
  id: string;
  file: File;
  name: string;
  size: number;
  width: number;
  height: number;
  previewUrl: string;
  status: "idle" | "success" | "error";
  errorMsg?: string;
  resizedSize?: number;
}

export default function BulkImageResizerWorkspace() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showProcessing, setShowProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Resizing images...");

  // Control states
  const [resizeMode, setResizeMode] = useState<"percentage" | "dimensions">("percentage");
  const [scalePercent, setScalePercent] = useState(50);
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [format, setFormat] = useState<"original" | "image/jpeg" | "image/png" | "image/webp">("original");
  const [quality, setQuality] = useState(80);

  const pendingDownloadRef = useRef<{ url: string; name: string }[] | null>(null);
  const isProcessingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesList = Array.from(e.target.files);
      const newItems: ImageItem[] = [];

      for (const file of filesList) {
        if (!file.type.startsWith("image/")) continue;
        
        // Read image dimensions
        const dimensions = await new Promise<{ w: number; h: number }>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = () => resolve({ w: 0, h: 0 });
          img.src = URL.createObjectURL(file);
        });

        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          size: file.size,
          width: dimensions.w,
          height: dimensions.h,
          previewUrl: URL.createObjectURL(file),
          status: "idle",
        });
      }

      setImages((prev) => [...prev, ...newItems]);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const item = prev.find((img) => img.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const triggerDownload = () => {
    if (!pendingDownloadRef.current) return;
    pendingDownloadRef.current.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.url;
      a.download = item.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Delay revocation so the browser has time to start the download
      setTimeout(() => URL.revokeObjectURL(item.url), 100);
    });
    pendingDownloadRef.current = null;
    setShowProcessing(false);
  };

  const handleFinished = () => {
    animationFinishedRef.current = true;
    if (!isProcessingRef.current && pendingDownloadRef.current) {
      triggerDownload();
    }
  };

  const processImages = async () => {
    if (images.length === 0) return;
    setLoadingText(`Processing ${images.length} image(s)...`);
    setShowProcessing(true);
    animationFinishedRef.current = false;
    isProcessingRef.current = true;
    pendingDownloadRef.current = null;

    try {
      const zip = new JSZip();
      const processedBlobs: { name: string; blob: Blob }[] = [];

      for (const item of images) {
        const img = new Image();
        const loadPromise = new Promise((r) => {
          img.onload = r;
        });
        img.src = item.previewUrl;
        await loadPromise;

        let w = targetWidth;
        let h = targetHeight;

        if (resizeMode === "percentage") {
          w = Math.round(item.width * (scalePercent / 100));
          h = Math.round(item.height * (scalePercent / 100));
        } else if (maintainAspect) {
          const ratio = item.width / item.height;
          if (w / ratio <= h) {
            h = Math.round(w / ratio);
          } else {
            w = Math.round(h * ratio);
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        ctx.drawImage(img, 0, 0, w, h);

        const outFormat = format === "original" ? item.file.type as any : format;
        const outQuality = quality / 100;

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (b) => resolve(b!),
            outFormat.startsWith("image/") ? outFormat : "image/jpeg",
            outQuality
          );
        });

        // Resolve new file name extension
        let ext = "jpg";
        if (outFormat === "image/png") ext = "png";
        if (outFormat === "image/webp") ext = "webp";
        if (outFormat === "image/jpeg") ext = "jpg";

        const baseName = item.name.replace(/\.[^.]+$/, "");
        const finalName = `${baseName}-resized.${ext}`;

        processedBlobs.push({ name: finalName, blob });
      }

      if (processedBlobs.length === 1) {
        // Single image download
        const url = URL.createObjectURL(processedBlobs[0].blob);
        pendingDownloadRef.current = [{ url, name: processedBlobs[0].name }];
      } else {
        // Multiple images: pack into a zip
        processedBlobs.forEach((p) => zip.file(p.name, p.blob));
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        pendingDownloadRef.current = [{ url, name: "resized-images.zip" }];
      }
    } catch (err) {
      console.error(err);
      setShowProcessing(false);
    } finally {
      isProcessingRef.current = false;
      if (animationFinishedRef.current) {
        triggerDownload();
      }
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {!images.length ? (
        <div className="border-2 border-dashed border-border rounded-3xl p-12 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors flex flex-col items-center justify-center text-center select-none cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-12 h-12 text-ink-muted/60 mb-4" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="text-sm font-bold text-ink mb-1">Click or Drag images to Upload</span>
          <span className="text-xs text-ink-muted">Bulk resize and optimize entirely offline</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Resize Options</h3>

              {/* Mode switch */}
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                <button
                  onClick={() => setResizeMode("percentage")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    resizeMode === "percentage" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Scale %
                </button>
                <button
                  onClick={() => setResizeMode("dimensions")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    resizeMode === "dimensions" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Dimensions
                </button>
              </div>

              {/* Percentage Controls */}
              {resizeMode === "percentage" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                    <span>Resize Scale</span>
                    <span className="font-mono text-accent">{scalePercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={scalePercent}
                    onChange={(e) => setScalePercent(Number(e.target.value))}
                    className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>
              )}

              {/* Custom Dimensions */}
              {resizeMode === "dimensions" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="resize-width-input" className="text-[9px] font-bold text-ink-muted uppercase">Width (px)</label>
                      <input
                        id="resize-width-input"
                        type="number"
                        value={targetWidth}
                        onChange={(e) => setTargetWidth(Number(e.target.value))}
                        className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="resize-height-input" className="text-[9px] font-bold text-ink-muted uppercase">Height (px)</label>
                      <input
                        id="resize-height-input"
                        type="number"
                        value={targetHeight}
                        onChange={(e) => setTargetHeight(Number(e.target.value))}
                        className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-semibold text-ink-secondary cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                    />
                    <span>Maintain original aspect ratio</span>
                  </label>
                </div>
              )}

              {/* Target Format */}
              <div className="space-y-2">
                <label htmlFor="resize-format" className="text-[10px] font-bold text-ink-muted uppercase block">Output Format</label>
                <select
                  id="resize-format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
                >
                  <option value="original">Keep Original Format</option>
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/png">PNG (.png)</option>
                  <option value="image/webp">WebP (.webp)</option>
                </select>
              </div>

              {/* Quality Compression Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <span>Compression Quality</span>
                  <span className="font-mono text-accent">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="flex-1 py-2.5 border border-border text-ink hover:text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={processImages}
                  className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
                >
                  Resize & Save
                </button>
              </div>
            </div>
          </div>

          {/* Uploaded Images List Column */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">Queue ({images.length})</h3>
            <div className="grid grid-cols-1 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-surface-elevated border border-border/50 rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 bg-white/40 border border-border rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={item.previewUrl} alt={item.name} className="max-w-full max-h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate max-w-[180px] sm:max-w-[280px]" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-ink-secondary font-mono">
                        {item.width} x {item.height} • {formatSize(item.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeImage(item.id)}
                    className="text-ink-muted hover:text-red-500 p-1 text-xs font-bold transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={RESIZE_STEPS}
        loadingText={loadingText}
        duration={1500}
        onFinished={handleFinished}
      />
    </div>
  );
}
