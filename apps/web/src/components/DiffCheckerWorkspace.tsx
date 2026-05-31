"use client";

import React, { useState, useEffect, useRef } from "react";
import { computeLineDiff, diffWords, DiffRow, DiffToken } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const DIFF_STEPS = [
  "Tokenizing source inputs...",
  "Computing LCS DP alignment matrix...",
  "Generating row-level alignments...",
  "Performing character-token diff highlights...",
];

export default function DiffCheckerWorkspace() {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");
  const [activeTab, setActiveTab] = useState<"edit" | "diff">("edit");
  const [diffRows, setDiffRows] = useState<DiffRow[]>([]);
  const [stats, setStats] = useState({ additions: 0, deletions: 0, unchanged: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const originalFileInputRef = useRef<HTMLInputElement>(null);
  const modifiedFileInputRef = useRef<HTMLInputElement>(null);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const activeScrollRef = useRef<"left" | "right" | null>(null);

  // Sync scroll handlers
  const handleLeftScroll = () => {
    if (activeScrollRef.current === "left" && leftScrollRef.current && rightScrollRef.current) {
      rightScrollRef.current.scrollTop = leftScrollRef.current.scrollTop;
      rightScrollRef.current.scrollLeft = leftScrollRef.current.scrollLeft;
    }
  };

  const handleRightScroll = () => {
    if (activeScrollRef.current === "right" && leftScrollRef.current && rightScrollRef.current) {
      leftScrollRef.current.scrollTop = rightScrollRef.current.scrollTop;
      leftScrollRef.current.scrollLeft = rightScrollRef.current.scrollLeft;
    }
  };

  // Pre-load example inputs
  const loadExample = () => {
    const orig = `ZeroWebTools is a collection of high-traffic web tools.
All computations run locally on the client side.
No data is sent to the server, ensuring 100% privacy.
This is a paragraph that will be modified in the other pane.
We hope you enjoy using this tool.`;

    const mod = `ZeroWebTools is a premium suite of high-traffic tools.
All tools run locally on the client side.
No data is sent to any server, ensuring 100% privacy.
This is a paragraph that has been modified in the right pane.
Please share this utility with your friends!`;

    setOriginalText(orig);
    setModifiedText(mod);
    setErrorMsg(null);
    setActiveTab("edit");
  };

  // Clear inputs
  const handleClearAll = () => {
    setOriginalText("");
    setModifiedText("");
    setDiffRows([]);
    setStats({ additions: 0, deletions: 0, unchanged: 0 });
    setErrorMsg(null);
    setActiveTab("edit");
  };

  // Swap original and modified texts
  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
    setErrorMsg(null);
    if (activeTab === "diff") {
      runComparison(modifiedText, temp);
    }
  };

  // File loading helpers
  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>, target: "original" | "modified") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === "string") {
          if (target === "original") setOriginalText(text);
          else setModifiedText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const runComparison = (left = originalText, right = modifiedText) => {
    try {
      setErrorMsg(null);
      const rows = computeLineDiff(left, right);
      setDiffRows(rows);

      // Compute simple stats
      let additions = 0;
      let deletions = 0;
      let unchanged = 0;

      rows.forEach((row) => {
        if (row.left && row.right) {
          if (row.left.type === "removed" && row.right.type === "added") {
            additions++;
            deletions++;
          } else {
            unchanged++;
          }
        } else if (row.left) {
          deletions++;
        } else if (row.right) {
          additions++;
        }
      });

      setStats({ additions, deletions, unchanged });
      setActiveTab("diff");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during diff calculation.");
    }
  };

  const handleCompareClick = () => {
    setShowProcessing(true);
  };

  const handleProcessingFinished = () => {
    setShowProcessing(false);
    runComparison();
  };

  // Render character token-level highlights for paired differences
  const renderPairedLineContent = (leftContent: string, rightContent: string, side: "left" | "right") => {
    const diff = diffWords(leftContent, rightContent);
    const tokens = side === "left" ? diff.left : diff.right;

    return (
      <span className="break-all whitespace-pre-wrap">
        {tokens.map((token, idx) => {
          if (token.type === "removed") {
            return (
              <del
                key={idx}
                className="bg-red-200 dark:bg-red-950/70 text-red-900 dark:text-red-300 no-underline font-semibold rounded px-0.5"
              >
                {token.value}
              </del>
            );
          }
          if (token.type === "added") {
            return (
              <ins
                key={idx}
                className="bg-emerald-200 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 no-underline font-semibold rounded px-0.5"
              >
                {token.value}
              </ins>
            );
          }
          return <span key={idx}>{token.value}</span>;
        })}
      </span>
    );
  };

  // Drag and drop handlers for easy loading
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, target: "original" | "modified") => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === "string") {
          if (target === "original") setOriginalText(text);
          else setModifiedText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Toolbar Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 select-none">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadExample}
            className="px-4 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer"
          >
            Load Example
          </button>
          <button
            onClick={handleSwap}
            className="px-4 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer flex items-center gap-1.5"
            title="Swap original and modified texts"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Swap Panes
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/60 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("edit")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "edit"
                ? "bg-surface shadow text-accent"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            Edit Inputs
          </button>
          <button
            onClick={handleCompareClick}
            disabled={!originalText && !modifiedText}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "diff"
                ? "bg-surface shadow text-accent"
                : "text-ink-secondary hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            Diff Results
          </button>
        </div>
      </div>

      {/* Error Message banner */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-xs font-semibold text-red-600 dark:text-red-400 flex items-start gap-2.5">
          <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="3" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <div>
            <p className="font-bold">Execution Failed</p>
            <p className="mt-0.5 text-red-500/80">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* EDIT MODE PANELS */}
      {activeTab === "edit" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left / Original Pane */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "original")}
            className="flex flex-col space-y-2 group"
          >
            <div className="flex justify-between items-center select-none">
              <label htmlFor="original-text-input" className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
                Original Text
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={originalFileInputRef}
                  onChange={(e) => handleFileLoad(e, "original")}
                  accept=".txt,.md,.csv,.json,.xml,.html,.css,.js,.ts"
                  className="hidden"
                />
                <button
                  onClick={() => originalFileInputRef.current?.click()}
                  className="text-[10px] font-bold text-ink-muted hover:text-accent transition-colors flex items-center gap-1"
                  title="Import a file as original text"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Load File
                </button>
                <span className="text-border/50 text-[10px]">|</span>
                <span className="text-[10px] text-ink-muted font-mono font-bold">
                  {originalText.split(/\r?\n/).filter(Boolean).length} lines
                </span>
              </div>
            </div>
            <textarea
              id="original-text-input"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste or drag original code/text here..."
              className="w-full h-96 p-4 rounded-2xl border border-border bg-surface-elevated/50 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed"
            />
          </div>

          {/* Right / Modified Pane */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "modified")}
            className="flex flex-col space-y-2 group"
          >
            <div className="flex justify-between items-center select-none">
              <label htmlFor="modified-text-input" className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
                Modified Text
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={modifiedFileInputRef}
                  onChange={(e) => handleFileLoad(e, "modified")}
                  accept=".txt,.md,.csv,.json,.xml,.html,.css,.js,.ts"
                  className="hidden"
                />
                <button
                  onClick={() => modifiedFileInputRef.current?.click()}
                  className="text-[10px] font-bold text-ink-muted hover:text-accent transition-colors flex items-center gap-1"
                  title="Import a file as modified text"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Load File
                </button>
                <span className="text-border/50 text-[10px]">|</span>
                <span className="text-[10px] text-ink-muted font-mono font-bold">
                  {modifiedText.split(/\r?\n/).filter(Boolean).length} lines
                </span>
              </div>
            </div>
            <textarea
              id="modified-text-input"
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste or drag modified code/text here..."
              className="w-full h-96 p-4 rounded-2xl border border-border bg-surface-elevated/50 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* COMPARE ACTION BIG BUTTON */}
      {activeTab === "edit" && (
        <div className="flex justify-center select-none pt-2">
          <button
            onClick={handleCompareClick}
            disabled={!originalText && !modifiedText}
            className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-hover text-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-sm font-extrabold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Compare Differences
          </button>
        </div>
      )}

      {/* DIFF MODE RESULTS */}
      {activeTab === "diff" && (
        <div className="space-y-4">
          {/* Subheader: Toolbar, views selection, stats summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 bg-surface-elevated/30 border border-border/60 p-4 rounded-2xl select-none">
            {/* Stats summary */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                <span>+</span>
                <span>{stats.additions} additions</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg">
                <span>-</span>
                <span>{stats.deletions} deletions</span>
              </div>
              <div className="flex items-center gap-1.5 text-ink-muted bg-zinc-500/10 px-2.5 py-1 rounded-lg">
                <span>{stats.unchanged} unchanged lines</span>
              </div>
            </div>

            {/* Split / Unified switcher */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/50 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "split"
                      ? "bg-surface shadow text-accent"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setViewMode("unified")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "unified"
                      ? "bg-surface shadow text-accent"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Unified
                </button>
              </div>
              
              <button
                onClick={() => setActiveTab("edit")}
                className="px-3.5 py-1.5 border border-border text-ink hover:text-accent rounded-xl text-xs font-bold hover:bg-surface-elevated/40 transition-all cursor-pointer"
              >
                Back to Edit
              </button>
            </div>
          </div>

          {/* Render Diff results - SPLIT VIEW */}
          {viewMode === "split" && (
            <div className="grid grid-cols-2 border border-border rounded-2xl bg-surface-elevated/20 overflow-hidden">
              {/* Left Column (Original) */}
              <div className="border-r border-border flex flex-col min-w-0">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-xs font-bold text-ink-secondary select-none">
                  Original (Left)
                </div>
                <div
                  ref={leftScrollRef}
                  onScroll={handleLeftScroll}
                  onMouseEnter={() => (activeScrollRef.current = "left")}
                  onMouseLeave={() => {
                    if (activeScrollRef.current === "left") activeScrollRef.current = null;
                  }}
                  className="overflow-auto h-[32rem] font-mono text-xs leading-6"
                >
                  <table className="w-full border-collapse">
                    <tbody>
                      {diffRows.map((row, idx) => {
                        const line = row.left;
                        const hasRight = !!row.right;
                        const isRemoved = line?.type === "removed";
                        const isPairedModified = isRemoved && hasRight && row.right?.type === "added";

                        let bgClass = "bg-transparent hover:bg-zinc-500/5";
                        let numClass = "text-ink-muted/50 border-r border-border/30 bg-zinc-500/5";
                        let textClass = "text-ink";

                        if (isRemoved) {
                          bgClass = "bg-red-500/10 hover:bg-red-500/15";
                          numClass = "text-red-500/70 border-r border-red-500/20 bg-red-500/5";
                          textClass = "text-red-900 dark:text-red-400";
                        }

                        return (
                          <tr key={idx} className={`${bgClass} group`}>
                            <td className={`w-12 text-right pr-3 select-none font-bold font-mono text-[10px] ${numClass}`}>
                              {line?.lineNum ?? ""}
                            </td>
                            <td className={`px-4 whitespace-pre font-mono ${textClass}`}>
                              {isPairedModified && line
                                ? renderPairedLineContent(line.content, row.right!.content, "left")
                                : (line?.content ?? "")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (Modified) */}
              <div className="flex flex-col min-w-0">
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-xs font-bold text-ink-secondary select-none">
                  Modified (Right)
                </div>
                <div
                  ref={rightScrollRef}
                  onScroll={handleRightScroll}
                  onMouseEnter={() => (activeScrollRef.current = "right")}
                  onMouseLeave={() => {
                    if (activeScrollRef.current === "right") activeScrollRef.current = null;
                  }}
                  className="overflow-auto h-[32rem] font-mono text-xs leading-6"
                >
                  <table className="w-full border-collapse">
                    <tbody>
                      {diffRows.map((row, idx) => {
                        const line = row.right;
                        const hasLeft = !!row.left;
                        const isAdded = line?.type === "added";
                        const isPairedModified = isAdded && hasLeft && row.left?.type === "removed";

                        let bgClass = "bg-transparent hover:bg-zinc-500/5";
                        let numClass = "text-ink-muted/50 border-r border-border/30 bg-zinc-500/5";
                        let textClass = "text-ink";

                        if (isAdded) {
                          bgClass = "bg-emerald-500/10 hover:bg-emerald-500/15";
                          numClass = "text-emerald-500/70 border-r border-emerald-500/20 bg-emerald-500/5";
                          textClass = "text-emerald-900 dark:text-emerald-400";
                        }

                        return (
                          <tr key={idx} className={`${bgClass} group`}>
                            <td className={`w-12 text-right pr-3 select-none font-bold font-mono text-[10px] ${numClass}`}>
                              {line?.lineNum ?? ""}
                            </td>
                            <td className={`px-4 whitespace-pre font-mono ${textClass}`}>
                              {isPairedModified && line
                                ? renderPairedLineContent(row.left!.content, line.content, "right")
                                : (line?.content ?? "")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Render Diff results - UNIFIED VIEW */}
          {viewMode === "unified" && (
            <div className="border border-border rounded-2xl bg-surface-elevated/20 overflow-hidden flex flex-col min-w-0">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2 text-xs font-bold text-ink-secondary select-none">
                Unified Diff View
              </div>
              <div className="overflow-auto h-[32rem] font-mono text-xs leading-6">
                <table className="w-full border-collapse">
                  <tbody>
                    {diffRows.reduce((acc: React.ReactNode[], row, idx) => {
                      // In unified view, if it's a split modification (both deletion & addition),
                      // we want to list the deletion first, then the addition sequentially.
                      // If it's a simple deletion, show it.
                      // If it's a simple addition, show it.
                      // If it's unchanged, show it.
                      
                      const leftLine = row.left;
                      const rightLine = row.right;

                      if (leftLine && rightLine && leftLine.type === "unchanged" && rightLine.type === "unchanged") {
                        acc.push(
                          <tr key={`u-same-${idx}`} className="bg-transparent hover:bg-zinc-500/5 group">
                            <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-ink-muted/50 border-r border-border/30 bg-zinc-500/5">
                              {leftLine.lineNum}
                            </td>
                            <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-ink-muted/50 border-r border-border/30 bg-zinc-500/5">
                              {rightLine.lineNum}
                            </td>
                            <td className="w-8 text-center select-none font-bold font-mono text-ink-muted/30">
                              {" "}
                            </td>
                            <td className="px-4 whitespace-pre font-mono text-ink">
                              {leftLine.content}
                            </td>
                          </tr>
                        );
                      } else {
                        // Deletion first
                        if (leftLine && leftLine.type === "removed") {
                          const isPaired = rightLine && rightLine.type === "added";
                          acc.push(
                            <tr key={`u-del-${idx}`} className="bg-red-500/10 hover:bg-red-500/15 group">
                              <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-red-500/70 border-r border-red-500/20 bg-red-500/5">
                                {leftLine.lineNum}
                              </td>
                              <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-red-500/30 border-r border-red-500/20 bg-red-500/5">
                                -
                              </td>
                              <td className="w-8 text-center select-none font-bold font-mono text-red-600 dark:text-red-400">
                                -
                              </td>
                              <td className="px-4 whitespace-pre font-mono text-red-900 dark:text-red-400">
                                {isPaired
                                  ? renderPairedLineContent(leftLine.content, rightLine!.content, "left")
                                  : leftLine.content}
                              </td>
                            </tr>
                          );
                        }
                        // Addition second
                        if (rightLine && rightLine.type === "added") {
                          const isPaired = leftLine && leftLine.type === "removed";
                          acc.push(
                            <tr key={`u-add-${idx}`} className="bg-emerald-500/10 hover:bg-emerald-500/15 group">
                              <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-emerald-500/30 border-r border-emerald-500/20 bg-emerald-500/5">
                                -
                              </td>
                              <td className="w-12 text-right pr-3 select-none font-bold font-mono text-[10px] text-emerald-500/70 border-r border-emerald-500/20 bg-emerald-500/5">
                                {rightLine.lineNum}
                              </td>
                              <td className="w-8 text-center select-none font-bold font-mono text-emerald-600 dark:text-emerald-400">
                                +
                              </td>
                              <td className="px-4 whitespace-pre font-mono text-emerald-900 dark:text-emerald-400">
                                {isPaired
                                  ? renderPairedLineContent(leftLine!.content, rightLine.content, "right")
                                  : rightLine.content}
                              </td>
                            </tr>
                          );
                        }
                      }

                      return acc;
                    }, [])}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading Processing overlay */}
      <ProcessingOverlay
        isOpen={showProcessing}
        steps={DIFF_STEPS}
        loadingText="Comparing source files..."
        duration={1500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}
