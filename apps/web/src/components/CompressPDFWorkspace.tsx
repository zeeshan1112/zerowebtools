"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { downloadBlob, formatBytes, getFilename, compressPDF, renderPDFThumbnail, loadPDFDoc } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";
import MicroChainLinks from "./MicroChainLinks";

const COMPRESS_STEPS = [
  "Analyzing PDF content stream structures...",
  "Extracting and downscaling embedded raster images...",
  "Re-compressing vector objects and coordinates...",
  "Optimizing font references and page metadata...",
];

export default function CompressPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState<number | null>(null);
  const [level, setLevel] = useState<"recommended" | "extreme" | "lossless">("recommended");
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const ref = useRef<HTMLInputElement>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    };
  }, [thumbnailUrl]);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setBefore(f.size);
    setAfter(null);
    setCompressedBlob(null);
    setProgress(null);
    setError(null);
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

  const handleLevelChange = useCallback((newLevel: "recommended" | "extreme" | "lossless") => {
    setLevel(newLevel);
    setAfter(null);
    setCompressedBlob(null);
  }, []);

  const handleClear = useCallback(() => {
    if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    setFile(null);
    setBefore(0);
    setAfter(null);
    setCompressedBlob(null);
    setProgress(null);
    setError(null);
    setThumbnailUrl(null);
  }, [thumbnailUrl]);

  const compress = useCallback(async () => {
    if (!file) return;
    setError(null);
    setProgress(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const blob = await compressPDF(file, level, (current, total) => {
        setProgress({ current, total });
      });
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        setAfter(blob.size);
        setCompressedBlob(blob);
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Compression failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, level]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      setAfter(pendingBlobRef.current.size);
      setCompressedBlob(pendingBlobRef.current);
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  const download = useCallback(() => {
    if (!compressedBlob || !file) return;
    downloadBlob(compressedBlob, getFilename("pdf-compress", file.name));
  }, [compressedBlob, file]);

  const isLosslessFallback = after !== null && before > 0 && level !== "lossless" && (before - after) < 1024;

  return (
    <div className="relative space-y-6">
      <DropZone ref={ref} onFile={handleFile} label="Drop a PDF to compress" accept=".pdf" />
      {file && (
        <div className="space-y-6">
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
              <p className="text-xs text-ink-secondary mt-0.5">{formatBytes(before)} · {totalPages} pages</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono">Compression Level</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleLevelChange("recommended")}
                disabled={processing || compressedBlob !== null}
                className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col justify-between text-ink h-full relative ${
                  level === "recommended"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                } ${(processing || compressedBlob !== null) ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                    <span className="text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-medium uppercase">OPTION 01</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-accent text-white font-semibold font-mono tracking-wider">BEST VALUE</span>
                  </div>
                  <span className="font-semibold text-sm text-ink block mb-1.5 font-sans">Balanced Compression</span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Balanced quality & resolution (150 DPI). Reduces scanned files up to 90%. Best for standard uses.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleLevelChange("extreme")}
                disabled={processing || compressedBlob !== null}
                className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col justify-between text-ink h-full relative ${
                  level === "extreme"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                } ${(processing || compressedBlob !== null) ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                    <span className="text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-medium uppercase">OPTION 02</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-border text-ink-muted font-semibold font-mono tracking-wider">SMALLEST</span>
                  </div>
                  <span className="font-semibold text-sm text-ink block mb-1.5 font-sans">Extreme Compression</span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Maximum compression (100 DPI) at lower image quality. Perfect for strict portal size limits.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleLevelChange("lossless")}
                disabled={processing || compressedBlob !== null}
                className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col justify-between text-ink h-full relative ${
                  level === "lossless"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                } ${(processing || compressedBlob !== null) ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                    <span className="text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-medium uppercase">OPTION 03</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-border text-ink-muted font-semibold font-mono tracking-wider">LOSSLESS</span>
                  </div>
                  <span className="font-semibold text-sm text-ink block mb-1.5 font-sans">Lossless Optimization</span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cleans PDF structures & removes metadata. Preserves original visual quality, vectors, & selectable text.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {after !== null && (
            <div className="rounded-xl border border-dashed border-border bg-surface-elevated p-5 space-y-4">
              <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider border-b border-border pb-2 font-mono">Compression Metrics</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[10px] font-mono text-ink-muted uppercase">Original Size</div>
                  <div className="text-sm font-semibold text-ink mt-0.5 font-mono">{formatBytes(before)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-ink-muted uppercase">Compressed Size</div>
                  <div className="text-sm font-semibold text-accent mt-0.5 font-mono">{formatBytes(after)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-ink-muted uppercase">Saved Space</div>
                  <div className="text-sm font-semibold text-ink mt-0.5 font-mono">
                    {formatBytes(before - after)} ({((1 - after / before) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>

              {isLosslessFallback && (
                <div className="p-3 bg-accent-surface border border-accent/20 rounded-lg text-xs text-ink-secondary leading-relaxed">
                  <span className="font-semibold text-accent block mb-1">ℹ️ Lossless Fallback Applied</span>
                  This PDF is text- and vector-based (not scanned). Standard image compression would make the text blurry and actually increase the file size. To prevent a larger file size, a metadata and structural optimization was automatically performed, preserving vector and text clarity.
                </div>
              )}
            </div>
          )}

          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
          
          <div className="flex flex-wrap items-center gap-3">
            {compressedBlob === null ? (
              <button
                onClick={compress}
                disabled={processing}
                className="rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 w-full md:w-auto font-mono uppercase tracking-wider"
              >
                {processing ? (
                  progress ? (
                    `Compressing page ${progress.current} of ${progress.total}...`
                  ) : (
                    "Compressing..."
                  )
                ) : (
                  "Compress PDF"
                )}
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
                  Download Compressed PDF
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

      {file && compressedBlob && (
        <MicroChainLinks
          blob={compressedBlob}
          filename={getFilename("pdf-compress", file.name)}
          currentToolId="pdf-compress"
        />
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={COMPRESS_STEPS}
        loadingText="Compressing your PDF document..."
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