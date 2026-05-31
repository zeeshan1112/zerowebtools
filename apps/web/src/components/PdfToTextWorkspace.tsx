"use client";

import React, { useState, useEffect } from "react";
import ProcessingOverlay from "./ProcessingOverlay";
import { getSharedFile } from "@/lib/fileBuffer";

const EXTRACT_STEPS = [
  "Opening local PDF document stream...",
  "Loading page coordinate maps...",
  "Running layout reconstruction parser...",
  "Generating raw text compilation...",
];

export default function PdfToTextWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [showPageBreaks, setShowPageBreaks] = useState(true);
  const [showProcessing, setShowProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Extracting PDF text...");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ pages: 0, characters: 0, words: 0 });

  useEffect(() => {
    const shared = getSharedFile();
    if (shared) {
      setFile(shared);
      setExtractedText("");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedText("");
    }
  };

  const handleClear = () => {
    setFile(null);
    setExtractedText("");
    setStats({ pages: 0, characters: 0, words: 0 });
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!extractedText || !file) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^.]+$/, "")}-extracted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Run PDF layout reconstruction text extraction client-side
  const handleExtract = async () => {
    if (!file) return;

    setLoadingText("Extracting PDF text layers...");
    setShowProcessing(true);

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      (pdfjs.GlobalWorkerOptions as any).wasmUrl = "/wasm/";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({
        data: arrayBuffer,
        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/standard_fonts/",
      }).promise;

      const numPages = pdf.numPages;
      const pagesText: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const items = textContent.items as any[];

        // Group items on close Y coordinates to reconstruct lines correctly
        const rows: Record<number, any[]> = {};
        const yThreshold = 5; // tolerance distance

        items.forEach((item) => {
          if (!item.str.trim()) return;
          const x = item.transform[4];
          const y = item.transform[5];

          const matchedY = Object.keys(rows)
            .map(Number)
            .find((rowY) => Math.abs(rowY - y) < yThreshold);

          const finalY = matchedY !== undefined ? matchedY : y;
          if (!rows[finalY]) {
            rows[finalY] = [];
          }
          rows[finalY].push({ x, text: item.str });
        });

        // Sort rows descending (top of the page first)
        const sortedY = Object.keys(rows)
          .map(Number)
          .sort((a, b) => b - a);

        const pageLines = sortedY.map((y) => {
          // Sort items in row ascending (left to right)
          const rowItems = rows[y].sort((a, b) => a.x - b.x);
          return rowItems.map((item) => item.text).join(" ");
        });

        let pageStr = pageLines.join("\n");
        if (showPageBreaks) {
          pageStr = `--- Page ${i} of ${numPages} ---\n${pageStr}\n`;
        }
        pagesText.push(pageStr);
      }

      const fullText = pagesText.join("\n");
      setExtractedText(fullText);

      // Compute statistics
      const charCount = fullText.length;
      const wordCount = fullText.split(/\s+/).filter(Boolean).length;
      setStats({ pages: numPages, characters: charCount, words: wordCount });
    } catch (err) {
      console.error("Failed to extract PDF text:", err);
      setExtractedText("Error: Failed to extract text layers from this PDF document. The file may be scanned / image-only without text layers.");
    } finally {
      setShowProcessing(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Upload Zone */}
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-3xl p-12 bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors flex flex-col items-center justify-center text-center select-none cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <svg className="w-12 h-12 text-ink-muted/60 mb-4" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-sm font-bold text-ink mb-1">Click to Upload PDF for Text Extraction</span>
          <span className="text-xs text-ink-muted">Extract raw character streams locally</span>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Settings Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-elevated border border-border/60 p-4 rounded-2xl select-none">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPageBreaks}
                  onChange={(e) => setShowPageBreaks(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Include Page Break Markers</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExtract}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white dark:text-black rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
              >
                Extract Text
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/5 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results Area */}
          {extractedText ? (
            <div className="space-y-4">
              {/* Stats Card */}
              <div className="grid grid-cols-3 gap-4 bg-surface-elevated/40 border border-border p-4 rounded-2xl text-center select-none">
                <div>
                  <span className="text-[10px] font-bold text-ink-muted uppercase block">Pages</span>
                  <span className="text-lg font-bold text-ink font-mono">{stats.pages}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-ink-muted uppercase block">Words</span>
                  <span className="text-lg font-bold text-ink font-mono">{stats.words}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-ink-muted uppercase block">Characters</span>
                  <span className="text-lg font-bold text-ink font-mono">{stats.characters}</span>
                </div>
              </div>

              {/* Text display */}
              <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                  <span>Extracted Text</span>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold"
                    >
                      {copied ? "Copied!" : "Copy All"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold"
                    >
                      Download .txt
                    </button>
                  </div>
                </div>
                <pre className="p-5 h-96 overflow-auto font-mono text-xs text-ink leading-relaxed select-text bg-zinc-950/20 whitespace-pre-wrap">
                  {extractedText}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-dashed border-border rounded-2xl bg-surface-elevated/20 text-ink-muted text-xs italic select-none">
              Click &apos;Extract Text&apos; above to parse the text layers...
            </div>
          )}
        </div>
      )}

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={EXTRACT_STEPS}
        loadingText={loadingText}
        duration={1500}
        onFinished={() => setShowProcessing(false)}
      />
    </div>
  );
}
