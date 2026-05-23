"use client";

import React, { useState, useCallback, useRef } from "react";
import { downloadBlob, formatBytes, getFilename, compressPDF } from "@/lib/pdf-utils";

export default function CompressPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState<number | null>(null);
  const [level, setLevel] = useState<"recommended" | "extreme" | "lossless">("recommended");
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setBefore(f.size); setAfter(null); setProgress(null); setError(null);
  }, []);

  const compress = useCallback(async () => {
    if (!file) return;
    setProcessing(true); setError(null); setProgress(null);
    try {
      const blob = await compressPDF(file, level, (current, total) => {
        setProgress({ current, total });
      });
      setAfter(blob.size);
      downloadBlob(blob, getFilename("pdf-compress", file.name));
    } catch (e: any) { setError(e.message || "Compression failed"); }
    setProcessing(false);
  }, [file, level]);

  return (
    <div className="space-y-6">
      <DropZone ref={ref} onFile={handleFile} label="Drop a PDF to compress" accept=".pdf" />
      {file && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm border-b border-border pb-3">
            <span className="font-semibold text-ink">{file.name}</span>
            <span className="text-ink-muted text-xs font-mono">{formatBytes(before)}</span>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono">Compression Level</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setLevel("recommended")}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between text-ink ${
                  level === "recommended"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm font-mono">RECOMMENDED</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-accent text-white font-medium tracking-wide font-mono">BEST VALUE</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Balanced quality & resolution (150 DPI). Reduces scanned files up to 90%. Best for standard uses.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLevel("extreme")}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between text-ink ${
                  level === "extreme"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm font-mono">EXTREME</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-border text-ink-muted font-medium tracking-wide font-mono">SMALLEST</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Maximum compression (100 DPI) at lower image quality. Perfect for strict portal size limits.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLevel("lossless")}
                className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between text-ink ${
                  level === "lossless"
                    ? "border-accent bg-accent-surface"
                    : "border-border hover:border-zinc-300 bg-surface-elevated"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm font-mono">LOSSLESS</span>
                    <span className="text-[9px] px-2 py-0.5 rounded border border-border text-ink-muted font-medium tracking-wide font-mono">HIGH QUALITY</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cleans PDF structures & removes metadata. Preserves original visual quality, vectors, & selectable text.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {after !== null && (
            <div className="rounded-xl border border-dashed border-border bg-surface-elevated p-5 space-y-3">
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
                    {formatBytes(before - after)} ({((1 - after / before) * 100).toFixed(0)}%)
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
          
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
        </div>
      )}
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