"use client";

import React, { useState } from "react";
import { minifySvg } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const MINIFY_STEPS = [
  "Parsing SVG markup tree...",
  "Stripping namespace nodes...",
  "Applying precision truncation...",
  "Rebuilding optimized vector code...",
];

export default function SvgMinifierWorkspace() {
  const [svgInput, setSvgInput] = useState("");
  const [svgOutput, setSvgOutput] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Minifier settings
  const [removeComments, setRemoveComments] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [removeEditorData, setRemoveEditorData] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [precision, setPrecision] = useState(2);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setSvgInput(event.target.result);
          setSvgOutput("");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleMinify = () => {
    if (!svgInput.trim()) return;
    setShowProcessing(true);
  };

  const handleFinishedMinifying = () => {
    try {
      const output = minifySvg(svgInput, {
        removeComments,
        removeMetadata,
        removeEditorData,
        collapseSpaces,
        precisionDigits: precision,
      });
      setSvgOutput(output);
    } catch (err) {
      console.error(err);
      setSvgOutput("Error: Failed to parse or minify the SVG code. Make sure it is valid XML.");
    } finally {
      setShowProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!svgOutput) return;
    navigator.clipboard.writeText(svgOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!svgOutput) return;
    const blob = new Blob([svgOutput], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadExample = () => {
    const exampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" viewBox="0 0 100 100" sodipodi:docname="example.svg">
  <!-- Author: ZeroWebTools Designer -->
  <metadata id="rdf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
      </rdf:Work>
    </rdf:RDF>
  </metadata>
  <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" />
  <g id="layer1">
    <circle cx="50.12345" cy="50.98765" r="40.54321" fill="#4f46e5" stroke="#312e81" stroke-width="2.34567" />
  </g>
</svg>`;
    setSvgInput(exampleSvg);
    setSvgOutput("");
  };

  const origSize = new Blob([svgInput]).size;
  const optSize = new Blob([svgOutput]).size;
  const savings = origSize > 0 && optSize > 0 ? ((origSize - optSize) / origSize) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-5 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Options</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={removeComments}
                  onChange={(e) => setRemoveComments(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Strip Comments</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={removeMetadata}
                  onChange={(e) => setRemoveMetadata(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Remove Metadata</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={removeEditorData}
                  onChange={(e) => setRemoveEditorData(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Remove Editor Namespaces</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={collapseSpaces}
                  onChange={(e) => setCollapseSpaces(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Collapse Whitespaces</span>
              </label>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/55">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <span>Decimal Precision</span>
                <span className="font-mono text-accent">{precision} digits</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={handleLoadExample}
                className="flex-1 py-2.5 border border-border hover:border-accent text-ink hover:text-accent text-xs font-bold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
              >
                Load Example
              </button>
              <button
                onClick={handleMinify}
                disabled={!svgInput.trim()}
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
              >
                Optimize SVG
              </button>
            </div>
          </div>

          {svgOutput && (
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Savings</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-border/30">
                  <span className="text-[9px] font-bold text-ink-muted uppercase block">Before</span>
                  <span className="text-sm font-bold text-ink font-mono">{origSize} B</span>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-2.5 rounded-xl border border-border/30">
                  <span className="text-[9px] font-bold text-ink-muted uppercase block">After</span>
                  <span className="text-sm font-bold text-emerald-500 font-mono">{optSize} B</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl border border-emerald-500/20 text-center font-bold text-xs">
                Saved {savings.toFixed(1)}% of original size!
              </div>
            </div>
          )}
        </div>

        {/* Input / Output Workspace Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input SVG Code */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>Input SVG Markup</span>
                <label className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer">
                  Upload File
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={svgInput}
                onChange={(e) => {
                  setSvgInput(e.target.value);
                  setSvgOutput("");
                }}
                placeholder="Paste your raw <svg> markup here or upload an SVG file..."
                className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Output SVG Code */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>Optimized SVG Markup</span>
                {svgOutput && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
              <textarea
                readOnly
                value={svgOutput}
                placeholder="Your optimized SVG code will appear here..."
                className="w-full flex-1 p-4 bg-zinc-950/30 border-none outline-none font-mono text-xs text-ink-secondary resize-none focus:ring-0 focus:outline-none select-text"
              />
            </div>
          </div>
        </div>
      </div>

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={MINIFY_STEPS}
        loadingText="Optimizing SVG Vector markup..."
        duration={1500}
        onFinished={handleFinishedMinifying}
      />
    </div>
  );
}
