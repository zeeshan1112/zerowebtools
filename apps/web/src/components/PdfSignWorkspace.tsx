"use client";

import React, { useState, useEffect, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, renderAllPDFPages, getFilename } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";

const SIGN_STEPS = [
  "Parsing PDF document catalog...",
  "Embedding signature image layers...",
  "Projecting page canvas dimensions...",
  "Compiling signed PDF stream...",
];

interface PlacedSignature {
  id: string;
  pageIndex: number;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // px
  height: number; // px
  image: string; // base64 PNG
}

export default function PdfSignWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [showProcessing, setShowProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading PDF document...");

  // Signature states
  const [signatureType, setSignatureType] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("");
  const [signatureImage, setSignatureImage] = useState<string | null>(null); // base64 PNG

  // Placed signatures across pages
  const [placedSignatures, setPlacedSignatures] = useState<PlacedSignature[]>([]);

  // Drawing Pad Refs
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  // Drag & drop state
  const isDraggingRef = useRef(false);

  // Load PDF and render previews
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPlacedSignatures([]);
      setSignatureImage(null);
      setPagePreviews([]);

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

  // Add signature to a specific page
  const addSignatureToPage = (pageIndex: number, customImg?: string) => {
    const img = customImg || signatureImage;
    if (!img) return;
    const newSig: PlacedSignature = {
      id: Math.random().toString(36).substring(2, 9),
      pageIndex,
      x: 35, // default offset
      y: 40,
      width: 150,
      height: 60,
      image: img,
    };
    setPlacedSignatures((prev) => [...prev, newSig]);
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
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const base64 = canvas.toDataURL("image/png");
    setSignatureImage(base64);
    addSignatureToPage(0, base64); // Add to first page by default
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
      addSignatureToPage(0, base64); // Add to first page by default
    }
  };

  // Handle signature upload file
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setSignatureImage(event.target.result);
          addSignatureToPage(0, event.target.result); // Add to first page by default
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Drag & drop movement logic
  const handleDragStart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const sigElement = e.currentTarget as HTMLDivElement;
    const container = sigElement.parentElement;
    if (!container) return;

    isDraggingRef.current = true;

    const sig = placedSignatures.find((s) => s.id === id);
    if (!sig) return;

    const containerRect = container.getBoundingClientRect();
    const sigLeft = (sig.x / 100) * containerRect.width;
    const sigTop = (sig.y / 100) * containerRect.height;
    
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;

    const offset = {
      x: clickX - sigLeft,
      y: clickY - sigTop,
    };

    const handleDragging = (ev: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const rect = container.getBoundingClientRect();
      const mouseX = ev.clientX - rect.left;
      const mouseY = ev.clientY - rect.top;

      const targetLeft = mouseX - offset.x;
      const targetTop = mouseY - offset.y;

      const newX = Math.max(0, Math.min(100, (targetLeft / rect.width) * 100));
      const newY = Math.max(0, Math.min(100, (targetTop / rect.height) * 100));

      setPlacedSignatures((prev) =>
        prev.map((s) => (s.id === id ? { ...s, x: newX, y: newY } : s))
      );
    };

    const handleDragEnd = () => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
  };

  // Drag resizing logic
  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const sig = placedSignatures.find((s) => s.id === id);
    if (!sig) return;

    const startWidth = sig.width;
    const startHeight = sig.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleResize = (ev: MouseEvent) => {
      const deltaX = ev.clientX - startX;
      const deltaY = ev.clientY - startY;
      const w = startWidth + deltaX;
      const h = startHeight + deltaY;
      setPlacedSignatures((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, width: Math.max(50, w), height: Math.max(20, h) } : s
        )
      );
    };

    const handleResizeEnd = () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  // Compile and Save the Signed PDF document with all signatures embedded
  const handleSaveDocument = async () => {
    if (!file || placedSignatures.length === 0) return;

    setLoadingText("Applying signature to PDF pages...");
    setShowProcessing(true);

    try {
      const doc = await loadPDFDoc(file);
      const pages = doc.getPages();

      // Embed each placed signature
      for (const sig of placedSignatures) {
        const page = pages[sig.pageIndex];
        if (!page) continue;

        // Extract image bytes from Base64 Data URL
        const base64Data = sig.image.split(",")[1];
        const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        
        const embeddedImg = await doc.embedPng(imageBytes);

        // Map percentages to actual PDF coordinates
        const { width: pageW, height: pageH } = page.getSize();
        
        // Calculate HTML overlay values
        const sigW_pdf = (sig.width / 400) * pageW; // base scale factor of 400px page preview width
        const sigH_pdf = (sig.height / 550) * pageH; // base scale factor of 550px page preview height

        const posX_pdf = (sig.x / 100) * pageW;
        // Convert HTML Y coordinate (top-down) to PDF coordinate (bottom-up)
        const posY_pdf = pageH - ((sig.y / 100) * pageH) - sigH_pdf;

        page.drawImage(embeddedImg, {
          x: posX_pdf,
          y: posY_pdf,
          width: sigW_pdf,
          height: sigH_pdf,
        });
      }

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
                <p><span className="font-bold text-ink-muted">Total Pages:</span> {pagePreviews.length}</p>
                <p><span className="font-bold text-ink-muted">Placed Signatures:</span> {placedSignatures.length}</p>
              </div>

              {placedSignatures.length > 0 && (
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
            {pagePreviews.length > 0 ? (
              <div className="w-full max-h-[750px] overflow-y-auto space-y-6 pr-2">
                {pagePreviews.map((preview, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 bg-zinc-50 dark:bg-zinc-900/30 border border-border/40 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between w-full max-w-[400px]">
                      <span className="text-xs font-mono font-bold text-ink">
                        Page {idx + 1} of {pagePreviews.length}
                      </span>
                      {signatureImage && (
                        <button
                          onClick={() => addSignatureToPage(idx)}
                          className="text-[10px] bg-accent/10 hover:bg-accent/20 text-accent font-extrabold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          + Place Signature
                        </button>
                      )}
                    </div>
                    
                    <div
                      className="relative border border-border bg-white shadow-md overflow-hidden flex items-center justify-center w-[400px] h-[550px] rounded-2xl"
                    >
                      {/* PDF Page Image Preview */}
                      <img
                        src={preview}
                        alt={`PDF page ${idx + 1}`}
                        className="max-w-full max-h-full object-contain pointer-events-none"
                      />

                      {/* Placed signature overlays on this page */}
                      {placedSignatures
                        .filter((sig) => sig.pageIndex === idx)
                        .map((sig) => (
                          <div
                            key={sig.id}
                            onMouseDown={(e) => handleDragStart(e, sig.id)}
                            className="absolute cursor-move border-2 border-dashed border-accent group bg-accent/5 overflow-hidden flex items-center justify-center select-none"
                            style={{
                              left: `${sig.x}%`,
                              top: `${sig.y}%`,
                              width: `${sig.width}px`,
                              height: `${sig.height}px`,
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <img
                              src={sig.image}
                              alt="Placed Signature"
                              className="max-w-full max-h-full object-contain pointer-events-none"
                            />

                            {/* Delete button (shows on hover) */}
                            <button
                              onMouseDown={(e) => e.stopPropagation()} // prevent drag trigger
                              onClick={() => {
                                setPlacedSignatures((prev) => prev.filter((s) => s.id !== sig.id));
                              }}
                              className="absolute top-1 right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[9px] font-extrabold shadow cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove signature"
                            >
                              ✕
                            </button>

                            {/* Resize handle */}
                            <div
                              onMouseDown={(e) => handleResizeStart(e, sig.id)}
                              className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-accent cursor-se-resize flex items-center justify-center shadow"
                              title="Resize signature"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
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
