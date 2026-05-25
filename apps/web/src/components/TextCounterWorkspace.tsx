"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { countTextStats, TextStats } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const COUNTER_STEPS = [
  "Reading local file stream...",
  "Running UTF-8 string analysis...",
  "Mapping keyword density index...",
  "Formatting layout metrics...",
];

export default function TextCounterWorkspace() {
  const [text, setText] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    charactersWithSpaces: 0,
    charactersWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTimeMin: 0,
    readingTimeSec: 0,
    speakingTimeMin: 0,
    speakingTimeSec: 0,
    keywords: [],
  });

  const [copied, setCopied] = useState(false);
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing your file...");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Perform statistics calculation in real-time
  useEffect(() => {
    const computed = countTextStats(text, excludeStopWords);
    setStats(computed);
  }, [text, excludeStopWords]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setText("");
  };

  // Case conversions helpers
  const convertToUppercase = () => {
    setText((prev) => prev.toUpperCase());
  };

  const convertToLowercase = () => {
    setText((prev) => prev.toLowerCase());
  };

  const convertToTitleCase = () => {
    const minorWords = new Set([
      "a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", 
      "from", "in", "of", "with", "about", "into", "over", "after", "before", "under"
    ]);
    setText((prev) => {
      return prev
        .split(/(\s+)/)
        .map((word, index, arr) => {
          if (word.trim().length === 0) return word;
          const lowerWord = word.toLowerCase();
          // Always capitalize first and last words, or words not in minorWords list
          if (index === 0 || index === arr.length - 1 || !minorWords.has(lowerWord)) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
          return lowerWord;
        })
        .join("");
    });
  };

  const convertToSentenceCase = () => {
    setText((prev) => {
      return prev
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+)([a-z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u0400-\u04FF\u0370-\u03FF])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    });
  };

  // File loading
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoadingText(`Reading ${file.name}...`);
      setShowProcessingOverlay(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === "string") {
          setText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleProcessingFinished = useCallback(() => {
    setShowProcessingOverlay(false);
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* File Action Row & Case Transforms */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4 select-none">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".txt,.md,.csv,.json,.xml,.html,.css,.js,.ts"
            className="hidden"
            id="word-counter-file-input"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer flex items-center gap-1.5"
            title="Import text from a local file"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            Load File
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!text}
            className="px-4 py-2 border border-border text-ink hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-all cursor-pointer flex items-center gap-1.5"
            title="Copy text to clipboard"
          >
            {copied ? (
              <span className="text-emerald-500 font-bold">Copied!</span>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>
                Copy Text
              </>
            )}
          </button>

          {text && (
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-border text-ink hover:text-red-500 rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Case Transformations */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mr-1.5">Transform:</span>
          <button
            onClick={convertToUppercase}
            disabled={!text}
            className="px-3 py-1.5 border border-border hover:border-accent/40 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-elevated/20 transition-all cursor-pointer"
          >
            UPPERCASE
          </button>
          <button
            onClick={convertToLowercase}
            disabled={!text}
            className="px-3 py-1.5 border border-border hover:border-accent/40 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-elevated/20 transition-all cursor-pointer"
          >
            lowercase
          </button>
          <button
            onClick={convertToTitleCase}
            disabled={!text}
            className="px-3 py-1.5 border border-border hover:border-accent/40 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-elevated/20 transition-all cursor-pointer"
            title="Title Case (Capitalize important words)"
          >
            Title Case
          </button>
          <button
            onClick={convertToSentenceCase}
            disabled={!text}
            className="px-3 py-1.5 border border-border hover:border-accent/40 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-elevated/20 transition-all cursor-pointer"
            title="Sentence case (Capitalize start of sentences)"
          >
            Sentence case
          </button>
        </div>
      </div>

      {/* Main Text Editor Workspace */}
      <div className="space-y-2">
        <div className="flex justify-between items-center select-none">
          <label htmlFor="word-counter-input" className="text-xs font-bold text-ink uppercase tracking-wider">
            Document Content
          </label>
          {text && (
            <span className="text-[10px] text-ink-muted font-mono font-bold">
              {stats.charactersWithSpaces} characters
            </span>
          )}
        </div>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to analyze statistics..."
          className="w-full h-80 p-5 rounded-2xl border border-border bg-surface-elevated text-base text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 select-none">
        <div className="rounded-2xl border border-border/80 bg-surface-elevated/30 p-4.5 shadow-sm backdrop-blur-md hover:border-accent/30 transition-all duration-300">
          <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-widest block">Words</span>
          <output id="stat-words" className="block mt-1 text-2xl font-bold tracking-tight text-ink">{stats.words}</output>
        </div>
        
        <div className="rounded-2xl border border-border/80 bg-surface-elevated/30 p-4.5 shadow-sm backdrop-blur-md hover:border-accent/30 transition-all duration-300">
          <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-widest block">Characters</span>
          <output id="stat-chars" className="block mt-1 text-2xl font-bold tracking-tight text-ink">{stats.charactersWithSpaces}</output>
          <span className="text-[9px] text-ink-muted mt-0.5 block font-medium">
            {stats.charactersWithoutSpaces} no spaces
          </span>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface-elevated/30 p-4.5 shadow-sm backdrop-blur-md hover:border-accent/30 transition-all duration-300">
          <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-widest block">Sentences</span>
          <output id="stat-sentences" className="block mt-1 text-2xl font-bold tracking-tight text-ink">{stats.sentences}</output>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface-elevated/30 p-4.5 shadow-sm backdrop-blur-md hover:border-accent/30 transition-all duration-300">
          <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-widest block">Paragraphs</span>
          <output id="stat-paragraphs" className="block mt-1 text-2xl font-bold tracking-tight text-ink">{stats.paragraphs}</output>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface-elevated/30 p-4.5 shadow-sm backdrop-blur-md hover:border-accent/30 transition-all duration-300 col-span-2 sm:col-span-1">
          <span className="text-[9px] font-extrabold text-ink-muted uppercase tracking-widest block">Lines</span>
          <output id="stat-lines" className="block mt-1 text-2xl font-bold tracking-tight text-ink">{stats.lines}</output>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
        {/* Read/Speak Time Estimate */}
        <div className="rounded-2xl border border-border/70 bg-surface-elevated/20 p-5 space-y-4">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Estimated Time Specs</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Reading Time
              </span>
              <output id="stat-reading-time" className="text-xl font-bold text-ink">
                {stats.readingTimeMin}m {stats.readingTimeSec}s
              </output>
              <span className="text-[9px] text-ink-muted block font-medium">Based on 200 WPM rate</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                Speaking Time
              </span>
              <output id="stat-speaking-time" className="text-xl font-bold text-ink">
                {stats.speakingTimeMin}m {stats.speakingTimeSec}s
              </output>
              <span className="text-[9px] text-ink-muted block font-medium">Based on 130 WPM rate</span>
            </div>
          </div>
        </div>

        {/* Keyword Density Matrix */}
        <div className="rounded-2xl border border-border/70 bg-surface-elevated/20 p-5 space-y-4">
          <div className="flex items-center justify-between select-none">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">SEO Keyword Density</h4>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeStopWords}
                onChange={(e) => setExcludeStopWords(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border bg-surface-elevated text-accent focus:ring-0 focus:ring-offset-0 cursor-pointer accent-accent"
              />
              <span className="text-[10px] font-bold text-ink-secondary uppercase tracking-wider">Skip Stop Words</span>
            </label>
          </div>

          <div className="overflow-x-auto">
            {stats.keywords.length > 0 ? (
              <table className="w-full text-left text-xs font-medium border-collapse">
                <thead>
                  <tr className="border-b border-border/30 text-ink-muted select-none">
                    <th className="pb-2 font-bold uppercase tracking-wider text-[9px]">Keyword</th>
                    <th className="pb-2 text-right font-bold uppercase tracking-wider text-[9px] w-20">Frequency</th>
                    <th className="pb-2 text-right font-bold uppercase tracking-wider text-[9px] w-24">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10 font-mono text-[11px] text-ink">
                  {stats.keywords.map(({ word, count, percentage }, i) => (
                    <tr key={word} className="hover:bg-surface-elevated/10">
                      <td className="py-2.5 font-bold truncate max-w-[120px]">{word}</td>
                      <td className="py-2.5 text-right font-bold text-ink-secondary">{count}</td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <span className="font-extrabold text-ink">{percentage}%</span>
                          <div className="w-12 h-1.5 rounded-full bg-border/20 overflow-hidden hidden sm:block select-none">
                            <div 
                              className="h-full bg-accent rounded-full" 
                              style={{ width: `${Math.min(percentage * 5, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-32 flex items-center justify-center text-ink-muted/40 italic text-xs select-none">
                Density matrix updates as you write...
              </div>
            )}
          </div>
        </div>
      </div>

      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={COUNTER_STEPS}
        loadingText={loadingText}
        duration={1500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}
