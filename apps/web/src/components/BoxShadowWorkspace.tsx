"use client";

import React, { useState } from "react";

export default function BoxShadowWorkspace() {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(15);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.15);
  const [inset, setInset] = useState(false);

  // Preview Box Style Customization
  const [previewBg, setPreviewBg] = useState<"light" | "dark" | "blue-gradient" | "purple-gradient">("light");
  const [elementBg, setElementBg] = useState("#ffffff");
  const [elementBorderRadius, setElementBorderRadius] = useState(24);
  const [copied, setCopied] = useState(false);

  // Convert HEX to RGBA
  const hexToRgba = (hex: string, op: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${op})`;
  };

  const shadowColorRgba = hexToRgba(color, opacity);
  const shadowValue = `${inset ? "inset " : ""}${xOffset}px ${yOffset}px ${blur}px ${spread}px ${shadowColorRgba}`;

  const generatedCss = `box-shadow: ${shadowValue};
-webkit-box-shadow: ${shadowValue};
-moz-box-shadow: ${shadowValue};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preview container background class mapper
  const getPreviewBgClass = () => {
    switch (previewBg) {
      case "dark":
        return "bg-zinc-950";
      case "blue-gradient":
        return "bg-gradient-to-br from-blue-500/10 via-indigo-500/15 to-purple-500/10";
      case "purple-gradient":
        return "bg-gradient-to-br from-pink-500/10 via-purple-500/15 to-indigo-500/10";
      case "light":
      default:
        return "bg-zinc-50 border border-border/40 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Configure Shadow Properties</h3>
            
            {/* Horizontal & Vertical Offsets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="x-offset" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Horizontal Offset ({xOffset}px)
                  </label>
                </div>
                <input
                  id="x-offset"
                  type="range"
                  min={-100}
                  max={100}
                  value={xOffset}
                  onChange={(e) => setXOffset(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="y-offset" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Vertical Offset ({yOffset}px)
                  </label>
                </div>
                <input
                  id="y-offset"
                  type="range"
                  min={-100}
                  max={100}
                  value={yOffset}
                  onChange={(e) => setYOffset(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Blur & Spread Radii */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="blur-radius" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Blur Radius ({blur}px)
                  </label>
                </div>
                <input
                  id="blur-radius"
                  type="range"
                  min={0}
                  max={100}
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="spread-radius" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Spread Radius ({spread}px)
                  </label>
                </div>
                <input
                  id="spread-radius"
                  type="range"
                  min={-50}
                  max={50}
                  value={spread}
                  onChange={(e) => setSpread(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Color & Opacity Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/50 pt-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Shadow Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-9 h-9 p-0 border border-border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="opacity" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Opacity ({Math.round(opacity * 100)}%)
                  </label>
                </div>
                <input
                  id="opacity"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>
            </div>

            {/* Inset mode toggle */}
            <div className="border-t border-border/50 pt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-ink-secondary">Inset Mode (Internal Shadow)</span>
              <button
                onClick={() => setInset(!inset)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-200 cursor-pointer ${
                  inset ? "bg-accent justify-end" : "bg-border dark:bg-zinc-800 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* Element properties customization */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Customize Preview Element</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Element Fill
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={elementBg}
                    onChange={(e) => setElementBg(e.target.value)}
                    className="w-9 h-9 p-0 border border-border rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={elementBg}
                    onChange={(e) => setElementBg(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="radius" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    Border Radius ({elementBorderRadius}px)
                  </label>
                </div>
                <input
                  id="radius"
                  type="range"
                  min={0}
                  max={75}
                  value={elementBorderRadius}
                  onChange={(e) => setElementBorderRadius(Number(e.target.value))}
                  className="w-full accent-accent bg-border h-1 rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sandbox Preview Column */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          
          {/* Sandbox Header with background switchers */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-4 flex items-center justify-between shadow-sm">
            <span className="text-xs font-bold text-ink uppercase tracking-wider">Sandbox Background</span>
            <div className="flex items-center gap-1.5">
              {(["light", "dark", "blue-gradient", "purple-gradient"] as const).map((bg) => (
                <button
                  key={bg}
                  onClick={() => setPreviewBg(bg)}
                  className={`px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase border rounded-lg transition-all cursor-pointer ${
                    previewBg === bg
                      ? "bg-ink border-ink text-surface shadow-sm"
                      : "bg-surface border-border hover:border-ink text-ink-secondary"
                  }`}
                >
                  {bg.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Sandbox Container */}
          <div className={`flex-1 rounded-2xl min-h-[300px] flex items-center justify-center transition-all p-8 relative overflow-hidden ${getPreviewBgClass()}`}>
            <div
              className="w-48 h-48 transition-all duration-75 flex items-center justify-center"
              style={{
                backgroundColor: elementBg,
                borderRadius: `${elementBorderRadius}px`,
                boxShadow: shadowValue,
              }}
            >
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Preview Box</span>
            </div>
          </div>

          {/* Code output container */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-3 shadow-sm relative">
            <div className="flex items-center justify-between select-none">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Generated Box Shadow CSS</span>
              <button
                onClick={copyToClipboard}
                className="text-[10px] font-extrabold text-accent hover:underline uppercase tracking-wider cursor-pointer"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 bg-surface rounded-xl border border-border text-[11px] font-mono text-ink overflow-x-auto leading-relaxed select-text">
              {generatedCss}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
