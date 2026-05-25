"use client";

import React, { useState, useMemo } from "react";

export default function RegexTesterWorkspace() {
  const [pattern, setPattern] = useState("([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})");
  const [testString, setTestString] = useState("Contact us at support@zerowebtools.com or sales@example.org today!");
  const [globalFlag, setGlobalFlag] = useState(true);
  const [caseFlag, setCaseFlag] = useState(true);
  const [multiFlag, setMultiFlag] = useState(true);

  // Compile regex and compute matches
  const regexResults = useMemo(() => {
    if (!pattern) return { matches: [], error: null, highlightedHtml: testString };

    try {
      const flags = (globalFlag ? "g" : "") + (caseFlag ? "i" : "") + (multiFlag ? "m" : "");
      const regex = new RegExp(pattern, flags);
      
      const matches: { index: number; text: string; groups: string[] }[] = [];
      let match;
      
      // Reset lastIndex for safety
      regex.lastIndex = 0;

      if (globalFlag) {
        while ((match = regex.exec(testString)) !== null) {
          // Avoid infinite loops on empty matches
          if (match.index === regex.lastIndex && match[0].length === 0) {
            regex.lastIndex++;
          }
          matches.push({
            index: match.index,
            text: match[0],
            groups: Array.from(match).slice(1) as string[],
          });
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: Array.from(match).slice(1) as string[],
          });
        }
      }

      // Generate highlighted HTML preview
      // We loop through matches from end to beginning to avoid index shift
      let html = testString;
      const sortedMatches = [...matches].sort((a, b) => b.index - a.index);
      
      sortedMatches.forEach((m) => {
        const start = m.index;
        const end = m.index + m.text.length;
        if (end > start) {
          const before = html.substring(0, start);
          const matchSlice = html.substring(start, end);
          const after = html.substring(end);
          html = `${escapeHtml(before)}<mark class="bg-emerald-500/35 text-emerald-800 dark:text-emerald-100 rounded px-0.5 border border-emerald-500/20">${escapeHtml(matchSlice)}</mark>${escapeHtml(after)}`;
        }
      });

      // If we didn't highlight anything because sortedMatches is empty, escape HTML anyway
      if (sortedMatches.length === 0) {
        html = escapeHtml(testString);
      }

      return { matches, error: null, highlightedHtml: html };
    } catch (err: any) {
      return { matches: [], error: err.message, highlightedHtml: escapeHtml(testString) };
    }
  }, [pattern, testString, globalFlag, caseFlag, multiFlag]);

  function escapeHtml(str: string): string {
    // If it already has our mark tags injected from the reverse list, don't double escape it!
    // Since we build HTML sequentially from raw string, we escape parts before joining them.
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      // restore mark tags back to HTML
      .replace(/&lt;mark class=&quot;bg-emerald-500\/35 text-emerald-800 dark:text-emerald-100 rounded px-0.5 border border-emerald-500\/20&quot;&gt;/g, '<mark class="bg-emerald-500/35 text-emerald-800 dark:text-emerald-100 rounded px-0.5 border border-emerald-500/20">')
      .replace(/&lt;\/mark&gt;/g, '</mark>');
  }

  const handleLoadExample = () => {
    setPattern("(\\d{3})-(\\d{3})-(\\d{4})");
    setTestString("Call Zeeshan at 123-456-7890 or office line at 987-654-3210.");
    setGlobalFlag(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider select-none">Regex Parameters</h3>

            {/* Pattern input */}
            <div className="space-y-1.5">
              <label htmlFor="regex-pattern-input" className="text-[10px] font-bold text-ink-muted uppercase block">Regular Expression</label>
              <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-950/20 border border-border/70 rounded-xl px-3 py-2">
                <span className="font-mono text-ink-muted select-none">/</span>
                <input
                  id="regex-pattern-input"
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="[a-z]+"
                  className="w-full bg-transparent border-none outline-none font-mono text-xs text-ink focus:ring-0 focus:outline-none"
                />
                <span className="font-mono text-ink-muted select-none">/gim</span>
              </div>
            </div>

            {/* Flags */}
            <div className="space-y-3.5 pt-2 border-t border-border/40 select-none">
              <span className="text-[10px] font-bold text-ink-muted uppercase block">Regex Flags</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalFlag}
                    onChange={(e) => setGlobalFlag(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                  />
                  <span>Global (g)</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caseFlag}
                    onChange={(e) => setCaseFlag(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                  />
                  <span>Ignore Case (i)</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={multiFlag}
                    onChange={(e) => setMultiFlag(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                  />
                  <span>Multiline (m)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleLoadExample}
              className="w-full py-2 border border-border text-ink hover:text-accent hover:border-accent text-xs font-bold rounded-xl hover:bg-accent/5 transition-all cursor-pointer select-none"
            >
              Load Examples
            </button>
          </div>

          {/* Regex Cheat Sheet */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-3 shadow-sm select-none">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Cheat Sheet</h3>
            <div className="text-[10px] space-y-2 text-ink-secondary font-mono leading-relaxed">
              <p><span className="font-bold text-accent">.</span> - Any character except newline</p>
              <p><span className="font-bold text-accent">\d</span> - Any digit [0-9]</p>
              <p><span className="font-bold text-accent">\w</span> - Any word char [a-zA-Z0-9_]</p>
              <p><span className="font-bold text-accent">\s</span> - Whitespace character</p>
              <p><span className="font-bold text-accent">[abc]</span> - Any character in brackets</p>
              <p><span className="font-bold text-accent">a*</span> - 0 or more occurrences</p>
              <p><span className="font-bold text-accent">a+</span> - 1 or more occurrences</p>
              <p><span className="font-bold text-accent">^ / $</span> - Start / End of string</p>
            </div>
          </div>
        </div>

        {/* Test Strings & Match Results Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Test String Input */}
          <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[180px]">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
              <span>Test String</span>
            </div>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test text to run regex matches against..."
              className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Matches Output Area */}
          <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col min-h-[180px]">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
              <span>Highlighted Matches</span>
              {regexResults.error && (
                <span className="text-red-500 font-bold text-[10px]">Invalid regex pattern</span>
              )}
            </div>

            {/* Render HTML highlights */}
            <div
              className="p-5 flex-1 font-mono text-xs text-ink leading-relaxed select-text bg-zinc-950/30 overflow-auto whitespace-pre-wrap min-h-[100px]"
              dangerouslySetInnerHTML={{ __html: regexResults.highlightedHtml }}
            />
          </div>

          {/* Capturing Groups Card */}
          {regexResults.matches.length > 0 && (
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-3 max-h-48 overflow-y-auto">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider select-none">
                Capturing Groups ({regexResults.matches.length} matches)
              </h3>
              <div className="space-y-2 font-mono text-[10px] text-ink-secondary">
                {regexResults.matches.map((m, idx) => (
                  <div key={idx} className="bg-zinc-50 dark:bg-zinc-950/20 p-2.5 rounded-xl border border-border/30">
                    <p className="font-bold text-accent">Match {idx + 1}: &quot;{m.text}&quot;</p>
                    {m.groups.map((g, gIdx) => (
                      <p key={gIdx} className="pl-3 mt-0.5 text-ink-muted">
                        Group {gIdx + 1}: &quot;{g}&quot;
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
