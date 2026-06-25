"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename, StandardFonts, rgb, PDFDocument, renderPDFThumbnail, renderAllPDFPages } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";
import MicroChainLinks from "./MicroChainLinks";

const PROTECT_STEPS = [
  "Analyzing PDF catalog stream elements...",
  "Applying security flags & permission locks...",
  "Generating cryptographically secure key block...",
  "Outputting password-encrypted PDF payload...",
];

const UNLOCK_STEPS = [
  "Validating document security permissions...",
  "Removing standard encryption filters...",
  "Rebuilding plain catalog stream trees...",
  "Packaging unlocked output PDF...",
];

const WATERMARK_STEPS = [
  "Analyzing target page layouts...",
  "Calculating overlay coordinate matrices...",
  "Drawing vector watermark elements...",
  "Compiling watermarked document...",
];

const PAGINATE_STEPS = [
  "Reading page layout bounds...",
  "Generating page number layout stamps...",
  "Positioning labels on canvas grids...",
  "Compiling paginated output PDF...",
];

const ORGANIZE_STEPS = [
  "Analyzing page catalog structure...",
  "Re-ordering selected page nodes...",
  "Rebuilding internal document offsets...",
  "Compiling organized output PDF...",
];

function SZ({ onFile, label, accept }: { onFile: (f: File) => void; label: string; accept: string }) {
  const [drag, setDrag] = useState(false);
  return (
    <div onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}>
      <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} id="dp" />
      <label htmlFor="dp" className="cursor-pointer block"><div className="space-y-2"><div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg></div><p className="text-sm font-medium text-ink">{label}</p></div></label>
    </div>
  );
}

export function ProtectPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [protectedBlob, setProtectedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      setFile(shared);
    }
  }, []);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const protect = useCallback(async () => {
    if (!file || !password) { setError("Enter a password"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const { encryptPDF } = await import("@pdfsmaller/pdf-encrypt-lite");
      const arrayBuffer = await file.arrayBuffer();
      const encryptedBytes = await encryptPDF(new Uint8Array(arrayBuffer), password);
      const blob = new Blob([encryptedBytes as any], { type: "application/pdf" });
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setProtectedBlob(blob);
        downloadBlob(blob, getFilename("pdf-protect", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Encryption failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, password]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setProtectedBlob(pendingBlobRef.current);
      downloadBlob(pendingBlobRef.current, getFilename("pdf-protect", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); setProtectedBlob(null); }} label="Drop a PDF to protect" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a strong password" className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={protect} disabled={processing} className="rounded-lg bg-accent text-white dark:text-black px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Encrypting..." : "Protect PDF"}</button>
      </div>}
      {file && protectedBlob && (
        <MicroChainLinks
          blob={protectedBlob}
          filename={getFilename("pdf-protect", file.name)}
          currentToolId="pdf-protect"
        />
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={PROTECT_STEPS}
        loadingText="Encrypting your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function UnlockPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlockedBlob, setUnlockedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      setFile(shared);
    }
  }, []);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const unlock = useCallback(async () => {
    if (!file || !password) { setError("Enter the password"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const { decryptPDF } = await import("@hub/tools-core");
      const arrayBuffer = await file.arrayBuffer();
      const decryptedBytes = await decryptPDF(new Uint8Array(arrayBuffer), password);
      const doc = await PDFDocument.load(decryptedBytes);
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setUnlockedBlob(blob);
        downloadBlob(blob, getFilename("pdf-unlock", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Could not unlock. Check password.");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, password]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setUnlockedBlob(pendingBlobRef.current);
      downloadBlob(pendingBlobRef.current, getFilename("pdf-unlock", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); setUnlockedBlob(null); }} label="Drop a protected PDF" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the PDF password" className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={unlock} disabled={processing} className="rounded-lg bg-accent text-white dark:text-black px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Unlocking..." : "Unlock PDF"}</button>
      </div>}
      {file && unlockedBlob && (
        <MicroChainLinks
          blob={unlockedBlob}
          filename={getFilename("pdf-unlock", file.name)}
          currentToolId="pdf-unlock"
        />
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={UNLOCK_STEPS}
        loadingText="Unlocking your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

const WATERMARK_COLORS = {
  red: rgb(0.937, 0.267, 0.267),   // #ef4444
  black: rgb(0, 0, 0),             // #000000
  blue: rgb(0.231, 0.51, 0.965),   // #3b82f6
  gray: rgb(0.42, 0.447, 0.502),   // #6b7280
};

const WATERMARK_HEX_COLORS = {
  red: "#ef4444",
  black: "#000000",
  blue: "#3b82f6",
  gray: "#6b7280",
};

function hexToPdfRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const r = (parseInt(cleanHex.substring(0, 2), 16) || 0) / 255;
  const g = (parseInt(cleanHex.substring(2, 4), 16) || 0) / 255;
  const b = (parseInt(cleanHex.substring(4, 6), 16) || 0) / 255;
  return rgb(r, g, b);
}

const getWatermarkColor = (col: string) => {
  if (col === "red") return WATERMARK_COLORS.red;
  if (col === "black") return WATERMARK_COLORS.black;
  if (col === "blue") return WATERMARK_COLORS.blue;
  if (col === "gray") return WATERMARK_COLORS.gray;
  return hexToPdfRgb(col);
};

const getWatermarkHexColor = (col: string) => {
  if (col === "red") return "#ef4444";
  if (col === "black") return "#000000";
  if (col === "blue") return "#3b82f6";
  if (col === "gray") return "#6b7280";
  return col;
};

export function WatermarkPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"text" | "image">("text");
  const [text, setText] = useState("CONFIDENTIAL");
  const [size, setSize] = useState(36);
  const [opacity, setOpacity] = useState(0.25);
  const [angle, setAngle] = useState(0);
  const [position, setPosition] = useState<{ xPct: number; yPct: number }>({ xPct: 50, yPct: 50 });
  const [grid, setGrid] = useState<"single" | "mosaic">("single");
  const [color, setColor] = useState<string>("red");
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null);
  const [layer, setLayer] = useState<"above" | "below">("above");
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // Result and Preview states
  const [watermarkedBlob, setWatermarkedBlob] = useState<Blob | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  const positionPreviewRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      for (const url of previewPages) URL.revokeObjectURL(url);
    };
  }, [thumbnailUrl, imagePreview, previewPages]);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setError(null);
    setWatermarkedBlob(null);
    setThumbnailUrl(null);
    try {
      const doc = await loadPDFDoc(f);
      const count = doc.getPageCount();
      setTotalPages(count);
      setFromPage(1);
      setToPage(count);
      const firstPage = doc.getPages()[0];
      if (firstPage) {
        const { width, height } = firstPage.getSize();
        setPageSize({ width, height });
      }
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

  const handleImageFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      setImagePreview(URL.createObjectURL(f));
      setWatermarkedBlob(null);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    for (const url of previewPages) URL.revokeObjectURL(url);
    setFile(null);
    setType("text");
    setText("CONFIDENTIAL");
    setSize(36);
    setOpacity(0.25);
    setAngle(0);
    setPosition({ xPct: 50, yPct: 50 });
    setGrid("single");
    setColor("red");
    setPageSize(null);
    setLayer("above");
    setImageFile(null);
    setImagePreview(null);
    setWatermarkedBlob(null);
    setPreviewPages([]);
    setShowPreview(false);
    setError(null);
  }, [thumbnailUrl, imagePreview, previewPages]);

  const updateWatermarkPosition = useCallback((clientX: number, clientY: number) => {
    const rect = positionPreviewRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100));
    setPosition({ xPct, yPct });
    setWatermarkedBlob(null);
  }, []);

  const handlePositionMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    updateWatermarkPosition(e.clientX, e.clientY);
  }, [updateWatermarkPosition]);

  const handlePositionMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateWatermarkPosition(e.clientX, e.clientY);
  }, [updateWatermarkPosition]);

  const handlePositionMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchUpdate = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      updateWatermarkPosition(touch.clientX, touch.clientY);
    }
  }, [updateWatermarkPosition]);

  const water = useCallback(async () => {
    if (!file) return;
    if (type === "text" && !text) { setError("Enter watermark text"); return; }
    if (type === "image" && !imageFile) { setError("Select a watermark image"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const pages = doc.getPages();
      const font = await doc.embedFont(StandardFonts.Helvetica);

      let watermarkImage: any = null;
      if (type === "image" && imageFile) {
        const imageBytes = await imageFile.arrayBuffer();
        if (imageFile.type === "image/png") {
          watermarkImage = await doc.embedPng(imageBytes);
        } else {
          watermarkImage = await doc.embedJpg(imageBytes);
        }
      }

      const startIdx = Math.max(1, fromPage) - 1;
      const endIdx = Math.min(toPage, pages.length) - 1;

      for (let i = startIdx; i <= endIdx; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        // PDF rotation angle: CSS uses clockwise positive, pdf-lib uses counter-clockwise positive
        const drawAnglePDF = -angle;
        const rad = (drawAnglePDF * Math.PI) / 180;
        const cosA = Math.cos(rad);
        const sinA = Math.sin(rad);

        const positions: { x: number; y: number }[] = [];
        if (grid === "single") {
          // Map visual editor percentage to PDF coordinates.
          // Visual editor: (0%, 0%) = top-left, (100%, 100%) = bottom-right
          // PDF coords: (0, 0) = bottom-left, (width, height) = top-right
          const px = position.xPct / 100;
          const py = position.yPct / 100;
          positions.push({ x: width * px, y: height * (1 - py) });
        } else {
          // 3x3 grid coordinates
          const cols = [width * 0.25, width * 0.5, width * 0.75];
          const rows = [height * 0.25, height * 0.5, height * 0.75];
          for (const c of cols) {
            for (const r of rows) {
              positions.push({ x: c, y: r });
            }
          }
        }

        // Draw watermarks
        for (const pos of positions) {
          if (type === "text") {
            let textWidth = text.length * size * 0.55;
            try {
              textWidth = font.widthOfTextAtSize(text, size);
            } catch (err) {
              console.warn("font.widthOfTextAtSize failed, using fallback approximation:", err);
            }
            const textHeight = size * 0.7; // approximate ascender height

            // Center the watermark at pos (the target center point).
            // pdf-lib drawText places (x,y) at baseline-left and rotates around (x,y).
            // After rotation by θ around (x,y), the center of the text moves to:
            //   center = (x + tw/2·cosθ − th/2·sinθ,  x + tw/2·sinθ + th/2·cosθ)
            // Solving for x,y so that center = pos:
            const finalX = pos.x - ( (textWidth / 2) * cosA - (textHeight / 2) * sinA );
            const finalY = pos.y - ( (textWidth / 2) * sinA + (textHeight / 2) * cosA );

            page.drawText(text, {
              x: finalX,
              y: finalY,
              size,
              font,
              color: getWatermarkColor(color),
              opacity,
              rotate: { type: "degrees" as any, angle: drawAnglePDF },
            });
          } else if (watermarkImage) {
            const scaleFactor = (size * 4) / watermarkImage.width;
            const imgWidth = watermarkImage.width * scaleFactor;
            const imgHeight = watermarkImage.height * scaleFactor;

            // Rotate around center calculation
            const finalX = pos.x - ( (imgWidth / 2) * cosA - (imgHeight / 2) * sinA );
            const finalY = pos.y - ( (imgWidth / 2) * sinA + (imgHeight / 2) * cosA );

            page.drawImage(watermarkImage, {
              x: finalX,
              y: finalY,
              width: imgWidth,
              height: imgHeight,
              opacity,
              rotate: { type: "degrees" as any, angle: drawAnglePDF },
            });
          }
        }
      }

      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setWatermarkedBlob(blob);
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      console.error("WATERMARK ERROR STACK:", e.stack || e);
      setError(e.message || "Watermark failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, type, text, size, opacity, angle, grid, layer, fromPage, toPage, imageFile, position, color]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setWatermarkedBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  const download = useCallback(() => {
    if (!watermarkedBlob || !file) return;
    downloadBlob(watermarkedBlob, getFilename("pdf-watermark", file.name));
  }, [watermarkedBlob, file]);

  const openPreview = useCallback(async () => {
    if (!watermarkedBlob) return;
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const pages = await renderAllPDFPages(watermarkedBlob, 1.5);
      setPreviewPages(pages);
    } catch {
      setPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [watermarkedBlob]);

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
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        loadingText="Applying watermark..."
        steps={["Loading PDF document", "Embedding watermark", "Saving output"]}
        duration={3500}
        onFinished={handleProcessingFinished}
      />
      {!file && <SZ onFile={handleFile} label="Drop a PDF to watermark" accept=".pdf" />}

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Config Panel */}
            <div className={`space-y-4 rounded-2xl border border-border bg-surface-elevated/40 p-5 ${grid === "single" ? "lg:col-span-8" : "lg:col-span-12"}`}>
              {/* Watermark Type Selector */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono">Watermark Type</label>
                <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                  {(["text", "image"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setType(t); setWatermarkedBlob(null); }}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        type === t ? "bg-surface shadow text-accent" : "text-ink-secondary"
                      }`}
                    >
                      {t === "text" ? "Text" : "Image"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Config controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {type === "text" ? (
                  <div>
                    <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Text String</label>
                    <input
                      value={text}
                      onChange={(e) => { setText(e.target.value); setWatermarkedBlob(null); }}
                      className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Image File</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageFile}
                        className="hidden"
                        id="watermark-img-file"
                      />
                      <label
                        htmlFor="watermark-img-file"
                        className="rounded-xl border border-border bg-surface-elevated hover:bg-surface px-4 py-2 text-xs font-medium text-ink-secondary hover:text-ink cursor-pointer transition-colors shrink-0"
                      >
                        Select Image
                      </label>
                      <div className="min-w-0 flex-1">
                        {imageFile ? (
                          <p className="text-xs text-ink font-medium truncate" title={imageFile.name}>{imageFile.name}</p>
                        ) : (
                          <p className="text-xs text-ink-muted italic">No image selected</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Grid Layout</label>
                  <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                    {(["single", "mosaic"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => { setGrid(g); setWatermarkedBlob(null); }}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer text-center ${
                          grid === g ? "bg-surface shadow text-accent" : "text-ink-secondary"
                        }`}
                      >
                        {g === "single" ? "Single Center" : "Mosaic (3x3)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Page Range (From Page {fromPage} to Page {toPage})</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-ink-muted block mb-1">Start Page</span>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={fromPage}
                        onChange={(e) => { setFromPage(Math.max(1, Math.min(totalPages, +e.target.value || 1))); setWatermarkedBlob(null); }}
                        className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-muted block mb-1">End Page</span>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={toPage}
                        onChange={(e) => { setToPage(Math.max(1, Math.min(totalPages, +e.target.value || 1))); setWatermarkedBlob(null); }}
                        className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Layer Option</label>
                  <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                    {(["above", "below"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLayer(l); setWatermarkedBlob(null); }}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer text-center ${
                          layer === l ? "bg-surface shadow text-accent" : "text-ink-secondary"
                        }`}
                      >
                        {l === "above" ? "Over Content" : "Below Content"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Scale Size: {size}</label>
                  <input
                    type="range"
                    min={12}
                    max={120}
                    value={size}
                    onChange={(e) => { setSize(+e.target.value); setWatermarkedBlob(null); }}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Opacity</label>
                  <select
                    value={Math.round(opacity * 100)}
                    onChange={(e) => { setOpacity(+e.target.value / 100); setWatermarkedBlob(null); }}
                    className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer font-mono"
                  >
                    <option value={100}>No Transparency (100%)</option>
                    <option value={75}>75%</option>
                    <option value={50}>50%</option>
                    <option value={25}>25%</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1.5 font-mono">Rotation Angle</label>
                  <select
                    value={angle}
                    onChange={(e) => { setAngle(+e.target.value); setWatermarkedBlob(null); }}
                    className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer font-mono"
                  >
                    <option value={0}>Do Not Rotate (0°)</option>
                    <option value={45}>45°</option>
                    <option value={90}>90°</option>
                    <option value={180}>180°</option>
                    <option value={270}>270°</option>
                    <option value={315}>315°</option>
                  </select>
                </div>

                {type === "text" && (
                  <div>
                    <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2 font-mono">Watermark Color</label>
                    <div className="flex items-center gap-3">
                      {(["red", "black", "blue", "gray"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { setColor(c); setWatermarkedBlob(null); }}
                          className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer shadow-sm relative flex items-center justify-center`}
                          style={{
                            backgroundColor: getWatermarkHexColor(c),
                            borderColor: color === c ? "var(--color-accent, #3b82f6)" : "transparent",
                          }}
                          title={c.charAt(0).toUpperCase() + c.slice(1)}
                        >
                          {color === c && (
                            <span className={`w-2 h-2 rounded-full ${c === "black" ? "bg-white" : "bg-black"}`} />
                          )}
                        </button>
                      ))}

                      {/* Custom Color Selector Swatch */}
                      <div className="relative w-8 h-8">
                        <input
                          type="color"
                          value={!["red", "black", "blue", "gray"].includes(color) ? color : "#ef4444"}
                          onChange={(e) => { setColor(e.target.value); setWatermarkedBlob(null); }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                          id="custom-color-picker"
                        />
                        <label
                          htmlFor="custom-color-picker"
                          className="absolute inset-0 rounded-full border-2 transition-all cursor-pointer shadow-sm flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
                          style={{
                            borderColor: !["red", "black", "blue", "gray"].includes(color) ? "var(--color-accent, #3b82f6)" : "transparent",
                          }}
                          title="Custom Color Picker"
                        >
                          {!["red", "black", "blue", "gray"].includes(color) && (
                            <span className="w-2 h-2 rounded-full bg-white" style={{ mixBlendMode: 'difference' }} />
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Visual Position Editor */}
            {grid === "single" && (
              <div className="lg:col-span-4 rounded-2xl border border-border bg-surface-elevated/40 p-5 flex flex-col items-center">
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-3 font-mono self-start">
                  Drag to Position Watermark
                </label>
                
                <div
                  ref={positionPreviewRef}
                  onMouseDown={handlePositionMouseDown}
                  onMouseMove={handlePositionMouseMove}
                  onMouseUp={handlePositionMouseUp}
                  onMouseLeave={handlePositionMouseUp}
                  onTouchStart={(e) => {
                    isDraggingRef.current = true;
                    handleTouchUpdate(e);
                  }}
                  onTouchMove={(e) => {
                    if (isDraggingRef.current) handleTouchUpdate(e);
                  }}
                  onTouchEnd={() => {
                    isDraggingRef.current = false;
                  }}
                  className="relative w-full max-w-[240px] bg-white dark:bg-zinc-900 border border-border rounded-lg shadow-inner overflow-hidden select-none cursor-crosshair flex items-center justify-center"
                  style={{
                    aspectRatio: pageSize ? pageSize.width / pageSize.height : 1 / 1.414,
                    backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : 'none',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Draggable Watermark indicator */}
                  <div
                    className="absolute pointer-events-none select-none flex items-center justify-center whitespace-nowrap"
                    style={{
                      left: `${position.xPct}%`,
                      top: `${position.yPct}%`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      opacity: opacity,
                      fontSize: `${Math.max(8, size * (240 / (pageSize?.width || 612)))}px`,
                      color: getWatermarkHexColor(color),
                      fontWeight: 'bold',
                    }}
                  >
                    {type === "text" ? (
                      text || "CONFIDENTIAL"
                    ) : imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="watermark preview"
                        style={{
                          maxHeight: `${size}px`,
                          maxWidth: `${size * 2}px`,
                          pointerEvents: 'none'
                        }}
                      />
                    ) : (
                      "IMAGE"
                    )}
                  </div>
                  
                  {/* Target reticle / overlay handle */}
                  <div
                    className="absolute pointer-events-none select-none w-4 h-4 border-2 border-dashed border-accent rounded-full bg-accent/10"
                    style={{
                      left: `${position.xPct}%`,
                      top: `${position.yPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
                
                <div className="text-[10px] text-ink-muted font-mono mt-3 text-center">
                  Position: X: {Math.round(position.xPct)}%, Y: {Math.round(position.yPct)}%
                </div>
              </div>
            )}
          </div>

          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!watermarkedBlob ? (
              <button
                onClick={water}
                disabled={processing}
                className="rounded-lg bg-accent text-white dark:text-black px-5 py-2.5 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 font-mono uppercase tracking-wider"
              >
                {processing ? "Applying..." : "Add Watermark"}
              </button>
            ) : (
              <>
                <button
                  onClick={download}
                  className="rounded-lg bg-accent hover:bg-accent-hover text-white dark:text-black px-5 py-2.5 text-sm font-medium active:scale-[0.98] transition-all shadow-sm flex items-center gap-2 font-mono uppercase tracking-wider"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                  </svg>
                  Download Watermarked PDF
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

      {file && watermarkedBlob && (
        <MicroChainLinks
          blob={watermarkedBlob}
          filename={getFilename("pdf-watermark", file.name)}
          currentToolId="pdf-watermark"
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
                      <h3 className="text-sm font-semibold text-ink">Preview Watermarked PDF</h3>
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
                    <button onClick={download} className="rounded-lg bg-accent hover:bg-accent-hover text-white dark:text-black px-4 py-2 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer font-mono uppercase tracking-wider">
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
    </div>
  );
}

export function PageNumbersPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pos, setPos] = useState<"bottom-center" | "bottom-right" | "top-center">("bottom-center");
  const [start, setStart] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numberedBlob, setNumberedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      setFile(shared);
    }
  }, []);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const add = useCallback(async () => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width } = page.getSize();
        const y = pos.startsWith("bottom") ? 30 : page.getSize().height - 20;
        const x = pos.endsWith("center") ? width / 2 - 15 : width - 50;
        page.drawText(String(start + i), { x, y, size: 10, font, color: rgb(0.4, 0.4, 0.4) });
      }
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setNumberedBlob(blob);
        downloadBlob(blob, getFilename("pdf-page-numbers", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Page numbering failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, start, pos]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setNumberedBlob(pendingBlobRef.current);
      downloadBlob(pendingBlobRef.current, getFilename("pdf-page-numbers", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); setNumberedBlob(null); }} label="Drop a PDF" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div className="space-y-3">
          <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Starting number</label><input type="number" min={1} value={start} onChange={(e) => setStart(+e.target.value || 1)} className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
          <div className="flex items-center gap-2">
            {(["bottom-center", "bottom-right", "top-center"] as const).map((p) => (
              <button key={p} onClick={() => setPos(p)} className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium ${pos === p ? "bg-ink text-white" : "bg-surface-elevated text-ink-muted border-border hover:border-zinc-300"}`}>{p.replace("-", " ")}</button>
            ))}
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={add} disabled={processing} className="rounded-lg bg-accent text-white dark:text-black px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Adding..." : "Add Page Numbers"}</button>
      </div>}
      {file && numberedBlob && (
        <MicroChainLinks
          blob={numberedBlob}
          filename={getFilename("pdf-page-numbers", file.name)}
          currentToolId="pdf-page-numbers"
        />
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={PAGINATE_STEPS}
        loadingText="Adding page numbers..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function OrganizePDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizedBlob, setOrganizedBlob] = useState<Blob | null>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [pages, setPages] = useState<{ originalIndex: number; angle: number; id: string }[]>([]);
  const [deletedPages, setDeletedPages] = useState<number[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewPages, setPreviewPages] = useState<string[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const dragIdxRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    };
  }, [thumbnailUrl]);

  useEffect(() => {
    return () => {
      for (const url of pagePreviews) {
        URL.revokeObjectURL(url);
      }
    };
  }, [pagePreviews]);

  useEffect(() => {
    return () => {
      for (const url of previewPages) {
        URL.revokeObjectURL(url);
      }
    };
  }, [previewPages]);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setError(null);
    setOrganizedBlob(null);
    setThumbnailUrl(null);
    setPagePreviews([]);
    setPages([]);
    setDeletedPages([]);

    try {
      const doc = await loadPDFDoc(f);
      const count = doc.getPageCount();
      setTotal(count);

      const thumb = await renderPDFThumbnail(f);
      setThumbnailUrl(thumb);

      const previews = await renderAllPDFPages(f);
      setPagePreviews(previews);

      const initialPages = Array.from({ length: count }, (_, i) => ({
        originalIndex: i,
        angle: 0,
        id: Math.random().toString(36).substring(2, 9),
      }));
      setPages(initialPages);
      setOrder(Array.from({ length: count }, (_, i) => i + 1).join(","));
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
    for (const url of pagePreviews) URL.revokeObjectURL(url);
    for (const url of previewPages) URL.revokeObjectURL(url);
    setFile(null);
    setTotal(0);
    setOrder("");
    setPages([]);
    setDeletedPages([]);
    setThumbnailUrl(null);
    setPagePreviews([]);
    setOrganizedBlob(null);
    setPreviewPages([]);
    setShowPreviewModal(false);
    setError(null);
  }, [thumbnailUrl, pagePreviews, previewPages]);

  const handleOrderChange = (newOrderStr: string) => {
    setOrder(newOrderStr);
    setOrganizedBlob(null);

    const parts = newOrderStr.split(",")
      .map(s => s.trim())
      .filter(s => s !== "")
      .map(Number);

    const validIndices = parts.filter(n => !isNaN(n) && n >= 1 && n <= total).map(n => n - 1);

    if (validIndices.length > 0) {
      const newPages = validIndices.map(idx => {
        const existing = pages.find(p => p.originalIndex === idx);
        return {
          originalIndex: idx,
          angle: existing ? existing.angle : 0,
          id: Math.random().toString(36).substring(2, 9),
        };
      });
      setPages(newPages);

      const activeIndices = new Set(validIndices);
      const deleted = Array.from({ length: total }, (_, i) => i).filter(i => !activeIndices.has(i));
      setDeletedPages(deleted);
    }
  };

  const rotatePage = (index: number) => {
    setOrganizedBlob(null);
    setPages(prev => prev.map((p, idx) => idx === index ? { ...p, angle: (p.angle + 90) % 360 } : p));
  };

  const deletePage = (index: number) => {
    setOrganizedBlob(null);
    const pageToDelete = pages[index];
    const newPages = pages.filter((_, idx) => idx !== index);
    setPages(newPages);
    setOrder(newPages.map(p => p.originalIndex + 1).join(","));

    const hasMoreInstances = newPages.some(p => p.originalIndex === pageToDelete.originalIndex);
    if (!hasMoreInstances && !deletedPages.includes(pageToDelete.originalIndex)) {
      setDeletedPages(prev => [...prev, pageToDelete.originalIndex].sort((a, b) => a - b));
    }
  };

  const movePage = (index: number, direction: "left" | "right") => {
    setOrganizedBlob(null);
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;

    const newPages = [...pages];
    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;
    setPages(newPages);
    setOrder(newPages.map(p => p.originalIndex + 1).join(","));
  };

  const addPage = (originalIdx: number) => {
    setOrganizedBlob(null);
    const newPage = {
      originalIndex: originalIdx,
      angle: 0,
      id: Math.random().toString(36).substring(2, 9),
    };
    const newPages = [...pages, newPage];
    setPages(newPages);
    setDeletedPages(prev => prev.filter(idx => idx !== originalIdx));
    setOrder(newPages.map(p => p.originalIndex + 1).join(","));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIdxRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIdxRef.current === null || dragIdxRef.current === index) return;

    const newPages = [...pages];
    const draggedItem = newPages[dragIdxRef.current];
    newPages.splice(dragIdxRef.current, 1);
    newPages.splice(index, 0, draggedItem);

    dragIdxRef.current = index;
    setDraggingIndex(index);
    setPages(newPages);
    setOrder(newPages.map(p => p.originalIndex + 1).join(","));
    setOrganizedBlob(null);
  };

  const handleDragEnd = () => {
    dragIdxRef.current = null;
    setDraggingIndex(null);
  };

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const organize = useCallback(async () => {
    if (!file || !pages.length) { setError("No active pages to organize"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const out = await PDFDocument.create();
      for (const p of pages) {
        const [copiedPage] = await out.copyPages(doc, [p.originalIndex]);
        const currentRot = copiedPage.getRotation().angle;
        copiedPage.setRotation({ angle: (currentRot + p.angle) % 360, type: "degrees" as any });
        out.addPage(copiedPage);
      }
      const blob = await savePDFDoc(out);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setOrganizedBlob(blob);
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Organization failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, pages]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setOrganizedBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  const download = useCallback(() => {
    if (!organizedBlob || !file) return;
    downloadBlob(organizedBlob, getFilename("pdf-organize", file.name));
  }, [organizedBlob, file]);

  const openPreview = useCallback(async () => {
    if (!organizedBlob) return;
    setShowPreviewModal(true);
    setPreviewLoading(true);
    try {
      const pPages = await renderAllPDFPages(organizedBlob, 1.5);
      setPreviewPages(pPages);
    } catch {
      setPreviewPages([]);
    }
    setPreviewLoading(false);
  }, [organizedBlob]);

  const closePreview = useCallback(() => {
    setShowPreviewModal(false);
    setPreviewPages([]);
  }, []);

  useEffect(() => {
    if (!showPreviewModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPreviewModal, closePreview]);

  return (
    <div className="relative space-y-5">
      {!file && <SZ onFile={handleFile} label="Drop a PDF to organize" accept=".pdf" />}
      
      {file && total > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none text-left">
          {/* Left panel: controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Cover Info Card */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-3 select-none flex items-center gap-4 shadow-sm">
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
                <p className="text-xs text-ink-muted mt-0.5">{formatBytes(file.size)} · {total} page{total !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* Sequence controls card */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <div>
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1">Page Order Sequence</label>
                <input
                  value={order}
                  onChange={(e) => handleOrderChange(e.target.value)}
                  placeholder={`e.g. 1,2,3...`}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                />
              </div>
              <p className="text-[10px] text-ink-secondary leading-relaxed">
                Comma-separated page numbers. You can reorder pages by typing above or by using the visual controls in the grid.
              </p>

              {error && <p className="text-xs text-red-500 font-mono">{error}</p>}

              <div className="space-y-2 pt-2">
                {!organizedBlob ? (
                  <button
                    onClick={organize}
                    disabled={processing}
                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white dark:text-black rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer font-mono uppercase tracking-wider disabled:opacity-50"
                  >
                    {processing ? "Organizing..." : "Organize PDF"}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={download}
                      className="w-full py-3 bg-accent hover:bg-accent-hover text-white dark:text-black rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download Organized PDF
                    </button>
                    <button
                      onClick={openPreview}
                      className="w-full py-3 border border-border bg-surface-elevated hover:bg-surface text-ink-secondary hover:text-ink rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Preview Result
                    </button>
                    <button
                      onClick={handleClear}
                      className="w-full py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/5 transition-colors cursor-pointer font-mono uppercase tracking-wider"
                    >
                      Clear Document
                    </button>
                  </div>
                )}
              </div>
            </div>

            {file && organizedBlob && (
              <MicroChainLinks
                blob={organizedBlob}
                filename={getFilename("pdf-organize", file.name)}
                currentToolId="pdf-organize"
              />
            )}
          </div>

          {/* Right panel: visual page grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm flex flex-col h-full max-h-[70vh]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Visual Page Layout</h4>
                <span className="text-[10px] font-mono font-bold text-ink-muted bg-surface px-2 py-0.5 rounded border border-border/40 select-none">
                  {pages.length} Pages active
                </span>
              </div>

              <div className="flex-1 min-h-[300px] overflow-y-auto bg-zinc-50 dark:bg-zinc-900/30 border border-border/60 rounded-xl p-4">
                {pagePreviews.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-3 py-16">
                    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin"/>
                    <p className="text-xs text-ink-muted">Rendering page thumbnails...</p>
                  </div>
                ) : pages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/60 rounded-xl py-16">
                    <p className="text-xs text-ink-muted italic">All pages have been removed. Add pages back below or enter page order sequence.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {pages.map((p, idx) => (
                      <motion.div
                        layout
                        key={p.id}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, idx)}
                        onDragOver={(e: any) => handleDragOver(e, idx)}
                        onDragEnd={() => handleDragEnd()}
                        className={`relative group border rounded-xl bg-surface-elevated/70 p-3 shadow-sm flex flex-col items-center justify-between transition-all select-none cursor-grab active:cursor-grabbing ${
                          draggingIndex === idx
                            ? "border-accent/40 border-dashed opacity-40 scale-[0.98]"
                            : "border-border hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        {/* Thumbnail Image Container */}
                        <div className="w-24 h-32 rounded bg-white dark:bg-zinc-950 overflow-hidden border border-border/30 flex items-center justify-center relative">
                          <img
                            src={pagePreviews[p.originalIndex]}
                            alt={`Page ${p.originalIndex + 1}`}
                            className="max-w-full max-h-full object-contain pointer-events-none transition-transform duration-200"
                            style={{ transform: `rotate(${p.angle}deg)` }}
                          />
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-bold text-white bg-black/60 rounded border border-white/20 select-none">
                            #{idx + 1}
                          </span>
                          
                          {/* Drag handle dots indicator */}
                          <div className="absolute top-2 right-2 p-1 rounded bg-black/60 text-white/80 border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" strokeWidth="3" stroke="currentColor">
                              <circle cx="9" cy="5" r="1.5" />
                              <circle cx="15" cy="5" r="1.5" />
                              <circle cx="9" cy="12" r="1.5" />
                              <circle cx="15" cy="12" r="1.5" />
                              <circle cx="9" cy="19" r="1.5" />
                              <circle cx="15" cy="19" r="1.5" />
                            </svg>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="text-[10px] font-mono text-ink-secondary mt-2 font-semibold">
                          Original: Page {p.originalIndex + 1}
                        </div>

                        {/* Quick Actions toolbar */}
                        <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-border/50 w-full justify-center">
                          {/* Rotate */}
                          <button
                            onClick={() => rotatePage(idx)}
                            onDragStart={(e) => e.stopPropagation()}
                            draggable={false}
                            title="Rotate 90° Clockwise"
                            className="p-1 rounded bg-surface hover:bg-zinc-200 dark:hover:bg-zinc-800 text-ink-secondary border border-border/50 hover:text-ink cursor-pointer transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                          </button>

                          {/* Move Left */}
                          <button
                            onClick={() => movePage(idx, "left")}
                            onDragStart={(e) => e.stopPropagation()}
                            draggable={false}
                            disabled={idx === 0}
                            title="Move Left"
                            className="p-1 rounded bg-surface hover:bg-zinc-200 dark:hover:bg-zinc-800 text-ink-secondary border border-border/50 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                          </button>

                          {/* Move Right */}
                          <button
                            onClick={() => movePage(idx, "right")}
                            onDragStart={(e) => e.stopPropagation()}
                            draggable={false}
                            disabled={idx === pages.length - 1}
                            title="Move Right"
                            className="p-1 rounded bg-surface hover:bg-zinc-200 dark:hover:bg-zinc-800 text-ink-secondary border border-border/50 hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deletePage(idx)}
                            onDragStart={(e) => e.stopPropagation()}
                            draggable={false}
                            title="Delete Page"
                            className="p-1 rounded bg-surface hover:bg-red-500/10 text-red-500 border border-border/50 hover:border-red-500/20 cursor-pointer transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deleted/Removed pages recovery box */}
              {deletedPages.length > 0 && (
                <div className="pt-3 border-t border-border/60 space-y-2 shrink-0">
                  <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Removed Pages (Click to add back)</div>
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                    {deletedPages.map((originalIdx) => (
                      <button
                        key={originalIdx}
                        onClick={() => addPage(originalIdx)}
                        className="px-2 py-1 bg-surface-elevated hover:bg-accent-surface border border-border hover:border-accent rounded-lg text-xs font-semibold font-mono text-ink-secondary hover:text-accent cursor-pointer transition-all active:scale-[0.96]"
                      >
                        + Page {originalIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
                      <h3 className="text-sm font-semibold text-ink">Preview Organized PDF</h3>
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
                    <button onClick={download} className="rounded-lg bg-accent hover:bg-accent-hover text-white dark:text-black px-4 py-2 text-sm font-medium active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer">
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
        steps={ORGANIZE_STEPS}
        loadingText="Reorganizing your PDF pages..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}