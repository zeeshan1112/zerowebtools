"use client";

import React, { useState, useRef, useEffect } from "react";
import ProcessingOverlay from "./ProcessingOverlay";

const QR_STEPS = [
  "Initializing vector matrix...",
  "Applying Reed-Solomon error correction...",
  "Layering custom center branding overlay...",
  "Rendering final high-res output buffer...",
];

export default function QrCodeWorkspace() {
  const [text, setText] = useState("https://zerowebtools.com");
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("M");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(20); // percentage of QR size
  const [showProcessing, setShowProcessing] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate QR code preview reactively
  useEffect(() => {
    generatePreview();
  }, [text, size, margin, fgColor, bgColor, ecc, logoSrc, logoSize]);

  const generatePreview = async () => {
    if (!canvasRef.current) return;
    try {
      const canvas = canvasRef.current;
      // Set canvas drawing size
      canvas.width = size;
      canvas.height = size;

      // Dynamically load qrcode library to prevent server-side compilation crashes
      const QRCode = (await import("qrcode")).default;

      // Draw QR Code
      await QRCode.toCanvas(canvas, text || " ", {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: logoSrc ? "H" : ecc, // Force High ECC if overlaying logo
      });

      // Overlay center logo if available
      if (logoSrc) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = logoSrc;
          await new Promise<void>((resolve) => {
            img.onload = () => {
              const lSize = (size * logoSize) / 100;
              const x = (size - lSize) / 2;
              const y = (size - lSize) / 2;

              // Draw white border behind logo
              ctx.fillStyle = bgColor;
              ctx.fillRect(x - 4, y - 4, lSize + 8, lSize + 8);

              // Draw logo
              ctx.drawImage(img, x, y, lSize, lSize);
              resolve();
            };
            img.onerror = () => resolve(); // continue even if logo fails
          });
        }
      }

      setQrUrl(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("QR Code rendering failed:", err);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoSrc(URL.createObjectURL(file));
      setEcc("H"); // Force high error correction for logos
    }
  };

  const handleClearLogo = () => {
    if (logoSrc) URL.revokeObjectURL(logoSrc);
    setLogoFile(null);
    setLogoSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadPng = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSvg = async () => {
    try {
      setShowProcessing(true);
    } catch (_) {}
  };

  const executeSvgDownload = async () => {
    try {
      // Dynamically load qrcode library to prevent server-side compilation crashes
      const QRCode = (await import("qrcode")).default;

      // Create raw SVG from library
      const svgString = await QRCode.toString(text || " ", {
        type: "svg",
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: logoSrc ? "H" : ecc,
      });

      let finalSvg = svgString;

      // Inject logo overlay inside SVG if present
      if (logoSrc && logoFile) {
        const logoBase64 = qrUrl; // fallback or we convert logo directly
        const toBase64 = (file: File): Promise<string> =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
          });
        const base64Data = await toBase64(logoFile);

        const lSize = (size * logoSize) / 100;
        const offset = (size - lSize) / 2;

        const logoElement = `
          <g>
            <rect x="${offset - 4}" y="${offset - 4}" width="${lSize + 8}" height="${lSize + 8}" fill="${bgColor}" />
            <image x="${offset}" y="${offset}" width="${lSize}" height="${lSize}" href="${base64Data}" />
          </g>
        </svg>`;

        finalSvg = svgString.replace("</svg>", logoElement);
      }

      const blob = new Blob([finalSvg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowProcessing(false);
    } catch (err) {
      console.error(err);
      setShowProcessing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
        
        {/* Configuration Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Configure QR Parameters</h3>
            
            {/* Input Data */}
            <div className="space-y-1.5">
              <label htmlFor="qr-text" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                QR Code Text or URL
              </label>
              <textarea
                id="qr-text"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text content to encode..."
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-xs text-ink focus:border-accent focus:outline-none"
              />
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 p-0 border border-border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 p-0 border border-border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dimensions and Padding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="qr-size" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    QR Size ({size}px)
                  </label>
                </div>
                <input
                  id="qr-size"
                  type="range"
                  min={128}
                  max={1024}
                  step={32}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="qr-margin" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Margin ({margin} blocks)
                  </label>
                </div>
                <input
                  id="qr-margin"
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Branding Overlay (Logo) */}
            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Center Logo Customization</h4>
                {logoSrc && (
                  <button
                    onClick={handleClearLogo}
                    className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    Remove Logo
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="border border-dashed border-border rounded-xl p-3 bg-surface hover:bg-surface-elevated/50 text-center transition-colors">
                    <span className="text-xs text-ink-secondary font-medium">
                      {logoFile ? logoFile.name : "Upload Center Logo (PNG/JPG)"}
                    </span>
                  </div>
                </div>

                {logoSrc && (
                  <div className="w-full sm:w-1/3 space-y-1.5">
                    <label htmlFor="logo-size" className="text-[9px] font-bold text-ink-muted uppercase tracking-wider">
                      Logo Size ({logoSize}%)
                    </label>
                    <input
                      id="logo-size"
                      type="range"
                      min={10}
                      max={30}
                      step={2}
                      value={logoSize}
                      onChange={(e) => setLogoSize(Number(e.target.value))}
                      className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Reed-Solomon Correction */}
            {!logoSrc && (
              <div className="border-t border-border/50 pt-4 space-y-1.5">
                <label htmlFor="qr-ecc" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Error Correction Level
                </label>
                <select
                  id="qr-ecc"
                  value={ecc}
                  onChange={(e) => setEcc(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                >
                  <option value="L">Low (7% recovery cap)</option>
                  <option value="M">Medium (15% recovery cap)</option>
                  <option value="Q">Quartile (25% recovery cap)</option>
                  <option value="H">High (30% recovery cap)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Output Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="rounded-2xl border border-border bg-white/60 dark:bg-zinc-900/60 p-6 flex flex-col items-center justify-center shadow-lg w-full max-w-[340px] aspect-square relative select-none">
            {/* hidden working canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Display rendered Image */}
            {qrUrl ? (
              <img
                src={qrUrl}
                alt="QR Code Preview"
                className="w-full h-full object-contain rounded-lg border border-border bg-white"
              />
            ) : (
              <div className="w-full h-full bg-surface-elevated/40 border border-dashed border-border rounded-xl flex items-center justify-center text-xs text-ink-muted font-bold">
                Rendering Preview...
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full max-w-[340px] mt-4">
            <button
              onClick={downloadPng}
              disabled={!qrUrl}
              className="flex-1 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50 uppercase tracking-wider text-center"
            >
              Download PNG
            </button>
            <button
              onClick={downloadSvg}
              disabled={!qrUrl}
              className="flex-1 py-3 border border-border text-ink hover:border-accent hover:text-accent text-xs font-extrabold rounded-xl transition-all cursor-pointer uppercase tracking-wider text-center bg-surface-elevated"
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={QR_STEPS}
        loadingText="Encoding vector SVG format..."
        duration={1200}
        onFinished={executeSvgDownload}
      />
    </div>
  );
}
