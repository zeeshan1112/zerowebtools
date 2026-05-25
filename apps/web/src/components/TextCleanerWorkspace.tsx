"use client";

import React, { useState } from "react";
import {
  removeDuplicateLines,
  removeEmptyLines,
  removeExtraSpaces,
  stripHtmlTags,
  sortLines,
  findAndReplace,
} from "@hub/tools-core";

export default function TextCleanerWorkspace() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  // Cleaner operation settings
  const [dedup, setDedup] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [stripHtml, setStripHtml] = useState(false);

  // Sorting settings
  const [sortCriteria, setSortCriteria] = useState<"alpha" | "num" | "length">("alpha");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Find & Replace settings
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [isRegex, setIsRegex] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  const loadExample = () => {
    setInputText(`Apples
Bananas
Apples

Orange (12)
Kiwi (2)
<p>Banana (5)</p>
  Cherry    Fruit   `);
  };

  const handleClear = () => {
    setInputText("");
    setReplaceError(null);
  };

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Run selected sequence cleanups
  const handleCleanSequence = () => {
    let result = inputText;
    if (stripHtml) result = stripHtmlTags(result);
    if (trimLines) result = removeExtraSpaces(result); // Performs trims and internal space collapses
    if (removeEmpty) result = removeEmptyLines(result);
    if (dedup) result = removeDuplicateLines(result);
    setInputText(result);
  };

  // Run sorting
  const handleSort = () => {
    try {
      const result = sortLines(inputText, sortCriteria, sortDirection);
      setInputText(result);
    } catch (_) {}
  };

  // Run find and replace
  const handleFindReplace = () => {
    setReplaceError(null);
    try {
      const result = findAndReplace(inputText, findStr, replaceStr, isRegex, caseInsensitive);
      setInputText(result);
    } catch (err: any) {
      setReplaceError(err.message || "Failed to execute replacement.");
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="px-4 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer"
          >
            Load Example Text
          </button>
          <button
            onClick={handleCopy}
            disabled={!inputText}
            className="px-4 py-2 border border-border text-ink hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer"
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
        <span className="text-[10px] text-ink-muted font-bold font-mono">
          100% Client-Side
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Editor Area */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          <label htmlFor="text-cleaner-input" className="text-xs font-bold text-ink-secondary uppercase tracking-wider select-none">
            Document Content
          </label>
          <textarea
            id="text-cleaner-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type, paste, or load text to clean, sort, and search..."
            className="w-full h-[32rem] p-4 rounded-2xl border border-border bg-surface-elevated/50 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed"
          />
        </div>

        {/* Right Side: Command Sidepanel */}
        <div className="lg:col-span-5 space-y-4 select-none">
          {/* Section 1: Clean Sequence */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-4.5 space-y-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider">
              1. Cleaner Operations
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-ink-secondary">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trimLines}
                  onChange={(e) => setTrimLines(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Trim & Collapse Whitespaces</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeEmpty}
                  onChange={(e) => setRemoveEmpty(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Remove Empty Lines</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dedup}
                  onChange={(e) => setDedup(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Remove Duplicate Lines</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stripHtml}
                  onChange={(e) => setStripHtml(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Strip HTML Markup Tags</span>
              </label>
            </div>
            <button
              onClick={handleCleanSequence}
              disabled={!inputText}
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              Apply Clean Options
            </button>
          </div>

          {/* Section 2: Sorting Console */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-4.5 space-y-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider">
              2. Line sorting
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="sort-criteria" className="text-[9px] font-extrabold text-ink-muted uppercase">Sort By</label>
                <select
                  id="sort-criteria"
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
                >
                  <option value="alpha">Alphabetical</option>
                  <option value="num">Numeric</option>
                  <option value="length">Line Length</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="sort-direction" className="text-[9px] font-extrabold text-ink-muted uppercase">Direction</label>
                <select
                  id="sort-direction"
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSort}
              disabled={!inputText}
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              Sort Lines
            </button>
          </div>

          {/* Section 3: Find & Replace Panel */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-4.5 space-y-4 shadow-sm">
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider">
              3. Find & Replace
            </h4>

            {replaceError && (
              <p className="text-[10px] text-red-500 font-semibold bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                {replaceError}
              </p>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="find-input" className="text-[9px] font-extrabold text-ink-muted uppercase">Find Text</label>
                  <input
                    id="find-input"
                    type="text"
                    value={findStr}
                    onChange={(e) => setFindStr(e.target.value)}
                    placeholder="String or regex..."
                    className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="replace-input" className="text-[9px] font-extrabold text-ink-muted uppercase">Replace With</label>
                  <input
                    id="replace-input"
                    type="text"
                    value={replaceStr}
                    onChange={(e) => setReplaceStr(e.target.value)}
                    placeholder="Replacement..."
                    className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 text-xs font-medium text-ink-secondary">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRegex}
                    onChange={(e) => setIsRegex(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                  />
                  <span>Regex</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caseInsensitive}
                    onChange={(e) => setCaseInsensitive(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border bg-surface-elevated text-accent focus:ring-0 cursor-pointer accent-accent"
                  />
                  <span>Case Insensitive</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleFindReplace}
              disabled={!inputText || !findStr}
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer"
            >
              Replace All Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
