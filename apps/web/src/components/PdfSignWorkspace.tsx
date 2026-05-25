"use client";

import React, { useState, useEffect, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, renderAllPDFPages, getFilename } from "@/lib/pdf-utils";
import { rgb } from "pdf-lib";
import ProcessingOverlay from "./ProcessingOverlay";

const SIGN_STEPS = [
  "Parsing PDF document catalog...",
  "Embedding signature image layers...",
  "Projecting page canvas dimensions...",
  "Compiling signed PDF stream...",
];

export default function PdfSignWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [showProcessing, setShowProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading PDF document...");

  // Signature states
  const [signatureType, setSignatureType] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("");
  const [signatureImage, setSignatureImage] = useState<string | null>(null); // base64 PNG

  // Placed signature overlays on the page
  const [isPlaced, setIsPlaced] = useState(false);
  const [sigX, setSigX] = useState(50); // percentage (0-100) from left
  const [sigY, setSigY] = useState(50); // percentage (0-100) from top
  const [sigWidth, setSigWidth] = useState(150); // px
  const [sigHeight, setSigHeight] = useState(60); // px

  // Drawing Pad Refs
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  // Dragging states
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartOffsetRef = useRef({ x: 0, y: 0 });

  // Load PDF and render previews
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsPlaced(false);
      setSignatureImage(null);
      setPagePreviews([]);
      setActivePageIndex(0);

      setLoadingText("Rendering PDF pages...");
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

  // Drawing Pad Canvas logic
  useEffect(() => {
    if (signatureType === "draw" && drawCanvasRef.current) {
      const canvas = drawCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [signatureType]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignatureImage(null);
  };

  // Save the drawn signature as a PNG image
  const saveDrawnSignature = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    
    // Check if canvas is empty before saving
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const base64 = canvas.toDataURL("image/png");
    setSignatureImage(base64);
    setIsPlaced(true);
  };

  // Generate typed signature on canvas
  const saveTypedSignature = () => {
    if (!typedName.trim()) return;
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.font = "italic bold 36px 'Dancing Script', 'Brush Script MT', cursive, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName, 200, 75);
      
      const base64 = canvas.toDataURL("image/png");
      setSignatureImage(base64);
      setIsPlaced(true);
    }
  };

  // Handle signature upload file
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setSignatureImage(event.target.result);
          setIsPlaced(true);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Overlays drag & drop movement logic
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!previewContainerRef.current) return;
    isDraggingRef.current = true;

    const containerRect = previewContainerRef.current.getBoundingClientRect();
    // Calculate signature offset from top-left of signature box
    const sigLeft = (sigX / 100) * containerRect.width;
    const sigTop = (sigY / 100) * containerRect.height;
    
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;

    dragStartOffsetRef.current = {
      x: clickX - sigLeft,
      y: clickY - sigTop,
    };

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragging = (e: MouseEvent) => {
    if (!isDraggingRef.current || !previewContainerRef.current) return;
    const containerRect = previewContainerRef.current.getBoundingClientRect();

    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Projected position minus start click offset inside overlay
    const targetLeft = mouseX - dragStartOffsetRef.current.x;
    const targetTop = mouseY - dragStartOffsetRef.current.y;

    // Convert back to percentages with constraints (0-100)
    const newX = Math.max(0, Math.min(100, (targetLeft / containerRect.width) * 100));
    const newY = Math.max(0, Math.min(100, (targetTop / containerRect.height) * 100));

    setSigX(newX);
    setSigY(newY);
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  // Compile and Save the Signed PDF document
  const handleSaveDocument = async () => {
    if (!file || !signatureImage) return;

    setLoadingText("Applying signature to PDF pages...");
    setShowProcessing(true);

    try {
      const doc = await loadPDFDoc(file);
      const pages = doc.getPages();
      const page = pages[activePageIndex];

      // Extract image bytes from Base64 Data URL
      const base64Data = signatureImage.split(",")[1];
      const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      
      const embeddedImg = await doc.embedPng(imageBytes);

      // Map percentages to actual PDF coordinates
      const { width: pageW, height: pageH } = page.getSize();
      
      // Calculate HTML overlay values
      const sigW_pdf = (sigWidth / 400) * pageW; // base scale factor of 400px page preview width
      const sigH_pdf = (sigHeight / 550) * pageH; // base scale factor of 550px page preview height

      const posX_pdf = (sigX / 100) * pageW;
      // Convert HTML Y coordinate (top-down) to PDF coordinate (bottom-up)
      const posY_pdf = pageH - ((sigY / 100) * pageH) - sigH_pdf;

      page.drawImage(embeddedImg, {
        x: posX_pdf,
        y: posY_pdf,
        width: sigW_pdf,
        height: sigH_pdf,
      });

      const outBlob = await savePDFDoc(doc);
      const outName = getFilename("pdf-watermark", file.name).replace("-watermarked.pdf", "-signed.pdf");
      downloadBlob(outBlob, outName);
    } catch (err) {
      console.error("Failed to sign PDF:", err);
    } finally {
      setShowProcessing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload zone */}
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
          <span className="text-sm font-bold text-ink mb-1">Click to Upload PDF</span>
          <span className="text-xs text-ink-muted">All signing and modifications run 100% locally</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
          {/* Left Column: Signatures creation Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Create Signature
              </h4>

              {/* Tabs */}
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                <button
                  onClick={() => setSignatureType("draw")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    signatureType === "draw" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Draw
                </button>
                <button
                  onClick={() => setSignatureType("type")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    signatureType === "type" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Type
                </button>
                <button
                  onClick={() => setSignatureType("upload")}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    signatureType === "upload" ? "bg-surface shadow text-accent" : "text-ink-secondary"
                  }`}
                >
                  Upload
                </button>
              </div>

              {/* Draw Signature */}
              {signatureType === "draw" && (
                <div className="space-y-3">
                  <div className="border border-border rounded-xl overflow-hidden bg-white">
                    <canvas
                      ref={drawCanvasRef}
                      width={300}
                      height={150}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-36 touch-none cursor-crosshair"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={clearDrawing}
                      className="flex-1 py-2 border border-border text-ink hover:text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/5 transition-colors cursor-pointer"
                    >
                      Clear Pad
                    </button>
                    <button
                      onClick={saveDrawnSignature}
                      className="flex-1 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                    >
                      Use Signature
                    </button>
                  </div>
                </div>
              )}

              {/* Type Signature */}
              {signatureType === "type" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Enter your name to sign..."
                    className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                  {typedName && (
                    <div className="border border-border/80 rounded-xl p-4 bg-white/50 text-center font-mono text-2xl select-text italic text-ink overflow-x-auto min-h-[64px] flex items-center justify-center font-cursive">
                      {typedName}
                    </div>
                  )}
                  <button
                    onClick={saveTypedSignature}
                    disabled={!typedName.trim()}
                    className="w-full py-2 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition-all cursor-pointer"
                  >
                    Generate Signature
                  </button>
                </div>
              )}

              {/* Upload Signature */}
              {signatureType === "upload" && (
                <div className="space-y-2">
                  <label htmlFor="signature-file" className="block text-[10px] font-bold text-ink-muted uppercase">Upload Signature PNG/JPG</label>
                  <input
                    id="signature-file"
                    type="file"
                    onChange={handleSignatureUpload}
                    accept="image/*"
                    className="w-full text-xs text-ink border border-border rounded-xl p-2 bg-surface-elevated/40"
                  />
                </div>
              )}
            </div>

            {/* Document stats / Info */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Document Info
              </h4>
              <div className="text-xs space-y-2 text-ink-secondary">
                <p><span className="font-bold text-ink-muted">Filename:</span> {file.name}</p>
                <p><span className="font-bold text-ink-muted">Pages:</span> {pagePreviews.length}</p>
                <p><span className="font-bold text-ink-muted">Active Page:</span> {activePageIndex + 1}</p>
              </div>

              {signatureImage && (
                <button
                  onClick={handleSaveDocument}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l6-6" />
                  </svg>
                  Save Signed PDF
                </button>
              )}
            </div>
          </div>

          {/* Right Column: PDF Preview Render & Place signature */}
          <div className="lg:col-span-8 space-y-4 flex flex-col items-center">
            {/* Page navigation */}
            {pagePreviews.length > 1 && (
              <div className="flex items-center gap-3 bg-surface-elevated border border-border/60 p-2 rounded-xl">
                <button
                  onClick={() => {
                    setActivePageIndex((prev) => Math.max(0, prev - 1));
                    setIsPlaced(false);
                  }}
                  disabled={activePageIndex === 0}
                  className="p-1 px-2.5 border border-border disabled:opacity-40 rounded-lg text-xs font-bold text-ink hover:text-accent cursor-pointer"
                >
                  ◀ Prev
                </button>
                <span className="text-xs font-mono font-bold text-ink">
                  Page {activePageIndex + 1} of {pagePreviews.length}
                </span>
                <button
                  onClick={() => {
                    setActivePageIndex((prev) => Math.min(pagePreviews.length - 1, prev + 1));
                    setIsPlaced(false);
                  }}
                  disabled={activePageIndex === pagePreviews.length - 1}
                  className="p-1 px-2.5 border border-border disabled:opacity-40 rounded-lg text-xs font-bold text-ink hover:text-accent cursor-pointer"
                >
                  Next ▶
                </button>
              </div>
            )}

            {/* Preview Sheet Container */}
            {pagePreviews.length > 0 ? (
              <div
                ref={previewContainerRef}
                className="relative border border-border bg-white shadow-lg overflow-hidden flex items-center justify-center max-w-full w-[400px] h-[550px] rounded-2xl"
              >
                {/* PDF Page Image Preview */}
                <img
                  src={pagePreviews[activePageIndex]}
                  alt={`PDF page ${activePageIndex + 1}`}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />

                {/* Placed signature overlay */}
                {isPlaced && signatureImage && (
                  <div
                    onMouseDown={handleDragStart}
                    className="absolute cursor-move border-2 border-dashed border-accent group bg-accent/5 overflow-hidden flex items-center justify-center select-none"
                    style={{
                      left: `${sigX}%`,
                      top: `${sigY}%`,
                      width: `${sigWidth}px`,
                      height: `${sigHeight}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <img
                      src={signatureImage}
                      alt="Placed Signature"
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />

                    {/* Simple drag resize handle */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const handleResize = (ev: MouseEvent) => {
                          const w = sigWidth + ev.movementX;
                          const h = sigHeight + ev.movementY;
                          setSigWidth(Math.max(50, w));
                          setSigHeight(Math.max(20, h));
                        };
                        const handleResizeEnd = () => {
                          document.removeEventListener("mousemove", handleResize);
                          document.removeEventListener("mouseup", handleResizeEnd);
                        };
                        document.addEventListener("mousemove", handleResize);
                        document.addEventListener("mouseup", handleResizeEnd);
                      }}
                      className="absolute right-0 bottom-0 w-3 h-3 bg-accent cursor-se-resize flex items-center justify-center"
                      title="Resize signature"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-[400px] h-[550px] border border-dashed border-border/80 rounded-2xl bg-surface-elevated/20 flex items-center justify-center text-ink-muted/40 italic text-xs">
                Rendering document pages...
              </div>
            )}
          </div>
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={SIGN_STEPS}
        loadingText={loadingText}
        duration={1500}
        onFinished={() => setShowProcessing(false)}
      />
    </div>
  );
}
