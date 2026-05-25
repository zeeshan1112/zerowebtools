"use client";

import React, { useState, useRef, useEffect } from "react";
import ProcessingOverlay from "./ProcessingOverlay";

const CROP_STEPS = [
  "Opening local pixel buffer map...",
  "Applying bounding box coordinates...",
  "Rendering cropped canvas slice...",
  "Encoding compressed output image...",
];

export default function ImageCropperWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showProcessing, setShowProcessing] = useState(false);

  // Aspect ratio lock setting
  const [aspectRatio, setAspectRatio] = useState<"free" | "1:1" | "16:9" | "4:3" | "circle">("free");

  // Crop overlay box position & dimension (percentages of the preview container)
  const [boxX, setBoxX] = useState(10); // % from left
  const [boxY, setBoxY] = useState(10); // % from top
  const [boxW, setBoxW] = useState(80); // % width
  const [boxH, setBoxH] = useState(80); // % height

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const startDragPos = useRef({ x: 0, y: 0, boxX: 0, boxY: 0 });
  const startResizePos = useRef({ x: 0, y: 0, boxW: 0, boxH: 0 });

  // Update crop box to match preset aspect ratios
  useEffect(() => {
    if (!imageSrc) return;
    if (aspectRatio === "1:1" || aspectRatio === "circle") {
      const minSize = Math.min(boxW, boxH);
      setBoxW(minSize);
      setBoxH(minSize);
    } else if (aspectRatio === "16:9") {
      const targetH = boxW * (9 / 16);
      setBoxH(Math.min(90, targetH));
    } else if (aspectRatio === "4:3") {
      const targetH = boxW * (3 / 4);
      setBoxH(Math.min(90, targetH));
    }
  }, [aspectRatio, imageSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageSrc(URL.createObjectURL(selectedFile));
      // Reset crop box
      setBoxX(15);
      setBoxY(15);
      setBoxW(70);
      setBoxH(70);
      setAspectRatio("free");
    }
  };

  const handleClear = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setFile(null);
    setImageSrc(null);
  };

  // Dragging crop box logic
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    startDragPos.current = {
      x: e.clientX,
      y: e.clientY,
      boxX,
      boxY,
    };
    document.addEventListener("mousemove", performDrag);
    document.addEventListener("mouseup", endDrag);
  };

  const performDrag = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const deltaX = ((e.clientX - startDragPos.current.x) / rect.width) * 100;
    const deltaY = ((e.clientY - startDragPos.current.y) / rect.height) * 100;

    let targetX = startDragPos.current.boxX + deltaX;
    let targetY = startDragPos.current.boxY + deltaY;

    // Bounds check
    targetX = Math.max(0, Math.min(100 - boxW, targetX));
    targetY = Math.max(0, Math.min(100 - boxH, targetY));

    setBoxX(targetX);
    setBoxY(targetY);
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", performDrag);
    document.removeEventListener("mouseup", endDrag);
  };

  // Resizing crop box logic
  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!containerRef.current) return;
    isResizingRef.current = true;
    startResizePos.current = {
      x: e.clientX,
      y: e.clientY,
      boxW,
      boxH,
    };
    document.addEventListener("mousemove", performResize);
    document.addEventListener("mouseup", endResize);
  };

  const performResize = (e: MouseEvent) => {
    if (!isResizingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const deltaX = ((e.clientX - startResizePos.current.x) / rect.width) * 100;
    
    let newW = startResizePos.current.boxW + deltaX;
    newW = Math.max(10, Math.min(100 - boxX, newW));

    let newH = boxH;
    if (aspectRatio === "free") {
      const deltaY = ((e.clientY - startResizePos.current.y) / rect.height) * 100;
      newH = startResizePos.current.boxH + deltaY;
      newH = Math.max(10, Math.min(100 - boxY, newH));
    } else if (aspectRatio === "1:1" || aspectRatio === "circle") {
      newH = newW;
      if (boxY + newH > 100) {
        newH = 100 - boxY;
        newW = newH;
      }
    } else if (aspectRatio === "16:9") {
      newH = newW * (9 / 16);
      if (boxY + newH > 100) {
        newH = 100 - boxY;
        newW = newH * (16 / 9);
      }
    } else if (aspectRatio === "4:3") {
      newH = newW * (3 / 4);
      if (boxY + newH > 100) {
        newH = 100 - boxY;
        newW = newH * (4 / 3);
      }
    }

    setBoxW(newW);
    setBoxH(newH);
  };

  const endResize = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", performResize);
    document.removeEventListener("mouseup", endResize);
  };

  // Perform canvas crop slicing
  const handleCrop = async () => {
    if (!file || !imageSrc) return;
    setShowProcessing(true);
  };

  const executeCropTransform = () => {
    if (!file) return;
    try {
      const img = document.querySelector('img[alt="Upload Preview"]') as HTMLImageElement;
      if (!img) {
        setShowProcessing(false);
        return;
      }
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;

      // Convert percentage values to raw source pixels, ensuring at least 1px for dimensions
      const cropX_px = Math.round((boxX / 100) * naturalW);
      const cropY_px = Math.round((boxY / 100) * naturalH);
      const cropW_px = Math.max(1, Math.round((boxW / 100) * naturalW));
      const cropH_px = Math.max(1, Math.round((boxH / 100) * naturalH));

      const canvas = document.createElement("canvas");
      canvas.width = cropW_px;
      canvas.height = cropH_px;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setShowProcessing(false);
        return;
      }

      if (aspectRatio === "circle") {
        // Circular clipping path
        ctx.beginPath();
        ctx.arc(cropW_px / 2, cropH_px / 2, cropW_px / 2, 0, Math.PI * 2);
        ctx.clip();
      }

      ctx.drawImage(img, cropX_px, cropY_px, cropW_px, cropH_px, 0, 0, cropW_px, cropH_px);

      const outFormat = aspectRatio === "circle" ? "image/png" : file.type;
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          const ext = outFormat === "image/png" ? "png" : "jpg";
          a.download = `${file.name.replace(/\.[^.]+$/, "")}-cropped.${ext}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setShowProcessing(false);
      }, outFormat);
    } catch (err) {
      console.error(err);
      setShowProcessing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload Zone */}
      {!imageSrc ? (
        <div className="border-2 border-dashed border-border rounded-3xl p-12 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors flex flex-col items-center justify-center text-center select-none cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-12 h-12 text-ink-muted/60 mb-4" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="text-sm font-bold text-ink mb-1">Click to Upload Image for Cropping</span>
          <span className="text-xs text-ink-muted">Standard ratios and circle shapes supported</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Aspect Ratio</h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspectRatio("free")}
                  className={`py-2 px-3 border border-border/60 text-xs font-bold rounded-xl hover:text-accent hover:border-accent transition-all cursor-pointer ${
                    aspectRatio === "free" ? "bg-accent/5 border-accent text-accent" : "text-ink-secondary"
                  }`}
                >
                  Free Crop
                </button>
                <button
                  onClick={() => setAspectRatio("1:1")}
                  className={`py-2 px-3 border border-border/60 text-xs font-bold rounded-xl hover:text-accent hover:border-accent transition-all cursor-pointer ${
                    aspectRatio === "1:1" ? "bg-accent/5 border-accent text-accent" : "text-ink-secondary"
                  }`}
                >
                  Square (1:1)
                </button>
                <button
                  onClick={() => setAspectRatio("16:9")}
                  className={`py-2 px-3 border border-border/60 text-xs font-bold rounded-xl hover:text-accent hover:border-accent transition-all cursor-pointer ${
                    aspectRatio === "16:9" ? "bg-accent/5 border-accent text-accent" : "text-ink-secondary"
                  }`}
                >
                  Landscape (16:9)
                </button>
                <button
                  onClick={() => setAspectRatio("4:3")}
                  className={`py-2 px-3 border border-border/60 text-xs font-bold rounded-xl hover:text-accent hover:border-accent transition-all cursor-pointer ${
                    aspectRatio === "4:3" ? "bg-accent/5 border-accent text-accent" : "text-ink-secondary"
                  }`}
                >
                  Standard (4:3)
                </button>
                <button
                  onClick={() => setAspectRatio("circle")}
                  className={`py-2 px-3 border border-border/60 text-xs font-bold rounded-xl hover:text-accent hover:border-accent transition-all cursor-pointer col-span-2 ${
                    aspectRatio === "circle" ? "bg-accent/5 border-accent text-accent" : "text-ink-secondary"
                  }`}
                >
                  Circle Profile Picture
                </button>
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-border/50">
                <button
                  onClick={handleClear}
                  className="flex-1 py-2.5 border border-border text-ink hover:text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                  Clear Image
                </button>
                <button
                  onClick={handleCrop}
                  className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
                >
                  Crop & Save
                </button>
              </div>
            </div>
          </div>

          {/* Visual Workspace Image Renderer */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div
              ref={containerRef}
              className="relative border border-border bg-white/60 shadow-lg overflow-hidden flex items-center justify-center max-w-full w-[400px] h-[400px] rounded-2xl"
            >
              {/* Image Preview */}
              <img
                src={imageSrc}
                alt="Upload Preview"
                className="max-w-full max-h-full object-contain pointer-events-none"
              />

              {/* Crop box overlay */}
              <div
                onMouseDown={startDrag}
                className={`absolute cursor-move border-2 border-dashed border-accent bg-black/35 flex items-center justify-center select-none ${
                  aspectRatio === "circle" ? "rounded-full" : ""
                }`}
                style={{
                  left: `${boxX}%`,
                  top: `${boxY}%`,
                  width: `${boxW}%`,
                  height: `${boxH}%`,
                }}
              >
                {/* Resizing handle */}
                <div
                  onMouseDown={startResize}
                  className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-accent cursor-se-resize flex items-center justify-center"
                  title="Resize Crop Area"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={CROP_STEPS}
        loadingText="Cropping image..."
        duration={1500}
        onFinished={executeCropTransform}
      />
    </div>
  );
}
