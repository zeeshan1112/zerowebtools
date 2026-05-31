"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import ProcessingOverlay from "./ProcessingOverlay";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  converting: boolean;
  error: string | null;
}

type HeicToFn = (opts: { blob: Blob; type: string; quality: number }) => Promise<Blob>;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

function getOutputType(mime: string): string {
  if (mime === "image/png") return "png";
  return "jpg";
}

let idCounter = 0;
let heicToPromise: Promise<HeicToFn> | null = null;

/**
 * Load heic-to (modern libheif v1.21+) via dynamic ESM import from CDN.
 * Uses import() with a URL — this bypasses webpack's bundler entirely,
 * so the ~2.7MB WASM bundle never touches our application chunk.
 * The module is cached after first load.
 */
async function getHeicToConverter(): Promise<HeicToFn> {
  if (!heicToPromise) {
    heicToPromise = (async () => {
      // @ts-ignore
      const mod: { heicTo?: HeicToFn; default?: HeicToFn } = await import("heic-to/csp");
      const fn = mod.heicTo || mod.default;
      if (!fn) throw new Error("heic-to module loaded but no converter function found");
      return fn;
    })();
  }
  return heicToPromise;
}

export default function HeicConverterWorkspace() {
  const t = useWorkspaceTranslation();

  const convertSteps = [
    t("step_1", "Initializing WebAssembly HEIF/HEIC decoder..."),
    t("step_2", "Loading source image binary streams..."),
    t("step_3", "Decoding image pixels & color profiles..."),
    t("step_4", "Encoding output format (JPG/PNG)..."),
  ];

  const [files, setFiles] = useState<ImageFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [quality, setQuality] = useState(85);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const animationFinishedRef = useRef(false);
  const isGeneratingRef = useRef(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<ImageFile[]>([]);
  filesRef.current = files;

  // Sync targetFormat and quality from localStorage post-hydration
  useEffect(() => {
    try {
      const savedFormat = localStorage.getItem("zeelancebox_heic_format");
      if (savedFormat === "image/jpeg" || savedFormat === "image/png") {
        setTargetFormat(savedFormat);
      }
      const savedQuality = localStorage.getItem("zeelancebox_heic_quality");
      if (savedQuality) {
        setQuality(Number(savedQuality));
      }
    } catch (_) {}
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("zeelancebox_heic_format", targetFormat);
      localStorage.setItem("zeelancebox_heic_quality", String(quality));
    } catch (_) {}
  }, [targetFormat, quality]);

  // Warm up CDN connection
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://cdn.jsdelivr.net";
    document.head.appendChild(link);
  }, []);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const accepted = Array.from(incoming).filter(
      (f) => f.type.startsWith("image/") || f.name.match(/\.(heic|heif|jpg|jpeg|png|webp)$/i)
    );
    if (accepted.length === 0) return;

    setFiles((prev) => [
      ...prev,
      ...accepted.map((f) => ({
        id: `img-${++idCounter}`,
        file: f,
        name: f.name,
        size: f.size,
        convertedBlob: null,
        convertedSize: null,
        converting: false,
        error: null,
      })),
    ]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAll = useCallback(() => setFiles([]), []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles]
  );

  const convertAll = useCallback(async () => {
    const currentFormat = targetFormat;
    const currentQuality = quality;

    setIsConverting(true);
    setShowProcessingOverlay(true);
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    setFiles((prev) =>
      prev.map((f) => ({ ...f, converting: true, error: null, convertedBlob: null, convertedSize: null }))
    );

    const snapshot = [...filesRef.current];

    // Pre-load heic-to if any HEIC files are present
    const hasHeic = snapshot.some(
      (f) => f.file.type === "image/heic" || f.file.type === "image/heif" || !!f.file.name.match(/\.(heic|heif)$/i)
    );

    let heicConvert: HeicToFn | null = null;
    if (hasHeic) {
      try {
        heicConvert = await getHeicToConverter();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load HEIC decoder";
        setFiles((prev) =>
          prev.map((f) =>
            f.file.name.match(/\.(heic|heif)$/i) ? { ...f, error: msg, converting: false } : f
          )
        );
        setIsConverting(false);
        setShowProcessingOverlay(false);
        isGeneratingRef.current = false;
        return;
      }
    }

    for (const entry of snapshot) {
      try {
        const file = entry.file;
        const isHeic = file.type === "image/heic" || file.type === "image/heif" || !!file.name.match(/\.(heic|heif)$/i);
        let resultBlob: Blob;

        if (isHeic && heicConvert) {
          resultBlob = await heicConvert({
            blob: file,
            type: currentFormat,
            quality: currentQuality / 100,
          });
        } else {
          const bitmap = await createImageBitmap(file);
          const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(bitmap, 0, 0);
          resultBlob = await canvas.convertToBlob({
            type: currentFormat,
            quality: currentFormat === "image/png" ? undefined : currentQuality / 100,
          });
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id
              ? { ...f, convertedBlob: resultBlob, convertedSize: resultBlob.size, converting: false }
              : f
          )
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : JSON.stringify(err);
        console.error("Conversion error:", err);
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, error: msg, converting: false } : f))
        );
      }
    }

    isGeneratingRef.current = false;

    if (animationFinishedRef.current) {
      setIsConverting(false);
      setShowProcessingOverlay(false);
    }
  }, [targetFormat, quality]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current) {
      setIsConverting(false);
      setShowProcessingOverlay(false);
    }
  }, []);

  const downloadSingle = useCallback(
    (entry: ImageFile) => {
      if (!entry.convertedBlob) return;
      const ext = getOutputType(targetFormat);
      const baseName = entry.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(entry.convertedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    },
    [targetFormat]
  );

  const downloadAll = useCallback(async () => {
    const done = filesRef.current.filter((f) => f.convertedBlob);
    if (done.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    const ext = getOutputType(targetFormat);

    for (const entry of done) {
      const baseName = entry.name.replace(/\.[^.]+$/, "");
      zip.file(`${baseName}.${ext}`, entry.convertedBlob!);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, [targetFormat]);

  const totalSavings = files.reduce((acc, f) => {
    if (f.convertedSize != null) return acc + (f.size - f.convertedSize);
    return acc;
  }, 0);

  const hasConversion = files.some((f) => f.convertedBlob);

  return (
    <div className="relative space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-ink-muted uppercase tracking-wider">{t("output_format", "Format")}</label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setTargetFormat("image/jpeg")}
              className={`px-3.5 py-1.5 text-xs font-medium transition-all ${
                targetFormat === "image/jpeg" ? "bg-ink text-white" : "bg-surface-elevated text-ink-muted hover:text-ink"
              }`}
            >
              JPG
            </button>
            <button
              onClick={() => setTargetFormat("image/png")}
              className={`px-3.5 py-1.5 text-xs font-medium transition-all ${
                targetFormat === "image/png" ? "bg-ink text-white" : "bg-surface-elevated text-ink-muted hover:text-ink"
              }`}
            >
              PNG
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-ink-muted uppercase tracking-wider">{t("image_quality", "Quality")}</label>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-24 accent-accent"
          />
          <span className="text-xs text-ink-secondary font-medium w-8">{quality}%</span>
        </div>

        {files.length > 0 && (
          <button
            onClick={convertAll}
            disabled={isConverting}
            className="rounded-lg bg-accent text-white dark:text-black px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConverting 
              ? t("converting", "Converting...") 
              : files.length > 1 
                ? t("convert_files_btn", "Convert {count} files").replace("{count}", String(files.length))
                : t("convert_file_btn", "Convert {count} file").replace("{count}", String(files.length))}
          </button>
        )}

        {files.length > 0 && (
          <button onClick={clearAll} className="rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-ink-muted hover:text-ink transition-colors">
            {t("clear_all_btn", "Clear all")}
          </button>
        )}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-accent bg-accent-surface"
            : files.length === 0
              ? "border-border hover:border-zinc-300 bg-surface-elevated"
              : "border-border-subtle bg-surface"
        }`}
      >
        <input ref={fileInputRef} type="file" multiple accept="image/*,.heic,.heif" className="hidden" onChange={handleFileInput} />

        {files.length === 0 ? (
          <div className="space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-sm text-ink font-medium">{t("drop_zone_prompt_empty", "Drop HEIC or image files here, or click to browse")}</p>
            <p className="text-xs text-ink-muted">{t("drop_zone_prompt_sub", "Supports HEIC, HEIF, PNG, JPEG, WebP — all processing is client-side")}</p>
          </div>
        ) : (
          <p className="text-sm text-ink-muted">
            {t("drop_zone_prompt_active", "Drop more files or browse").split("browse")[0]}
            <span className="text-accent font-medium">{t("browse", "browse")}</span>
            {t("drop_zone_prompt_active", "Drop more files or browse").split("browse")[1]}
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>
              {t("converted_status", "{converted} of {total} converted")
                .replace("{converted}", String(files.filter((f) => f.convertedBlob).length))
                .replace("{total}", String(files.length))}
              {totalSavings > 0 && ` (${t("saved_savings", "saved {size}").replace("{size}", formatSize(totalSavings))})`}
            </span>
            {hasConversion && (
              <button onClick={downloadAll} className="flex items-center gap-1.5 text-accent font-medium hover:text-accent-hover transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {t("download_all_zip_btn", "Download All as ZIP")}
              </button>
            )}
          </div>

          <div className="space-y-2">
            {files.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-border bg-surface-elevated p-4 flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{entry.name}</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {formatSize(entry.size)}
                    {entry.convertedSize != null && ` → ${formatSize(entry.convertedSize)}`}
                    {entry.error && <span className="text-red-500 ml-0 block mt-1 text-[11px] leading-tight">{entry.error}</span>}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {entry.converting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  ) : entry.error ? null : entry.convertedBlob ? (
                    <button onClick={() => downloadSingle(entry)} className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {t("download", "Download")}
                    </button>
                  ) : null}

                  <button onClick={() => removeFile(entry.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={convertSteps}
        loadingText={t("converting_overlay_title", "Converting your photos...")}
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}