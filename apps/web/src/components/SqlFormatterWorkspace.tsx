"use client";

import React, { useState } from "react";
import { formatSql } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const SQL_STEPS = [
  "Parsing SQL dialect lexer...",
  "Standardizing token cases...",
  "Formatting nested query indentations...",
  "Rebuilding clean SQL script...",
];

export default function SqlFormatterWorkspace() {
  const [sqlInput, setSqlInput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!sqlInput.trim()) return;
    setShowProcessing(true);
  };

  const handleFinishedFormatting = () => {
    const formatted = formatSql(sqlInput);
    setSqlOutput(formatted);
    setShowProcessing(false);
  };

  const handleCopy = () => {
    if (!sqlOutput) return;
    navigator.clipboard.writeText(sqlOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!sqlOutput) return;
    const blob = new Blob([sqlOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.sql";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadExample = () => {
    const example = "select id, name, email from users where id > 100 group by name order by id desc limit 10";
    setSqlInput(example);
    setSqlOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-4 select-none">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">SQL dialect</h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Reformats keywords to uppercase (e.g. SELECT, FROM, WHERE) and indents sub-clauses for readability.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={handleLoadExample}
                className="flex-1 py-2.5 border border-border hover:border-accent text-ink hover:text-accent text-xs font-bold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
              >
                Load Example
              </button>
              <button
                onClick={handleFormat}
                disabled={!sqlInput.trim()}
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
              >
                Format SQL
              </button>
            </div>
          </div>
        </div>

        {/* Input / Output Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input SQL Code */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[350px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>Raw SQL Script</span>
              </div>
              <textarea
                value={sqlInput}
                onChange={(e) => {
                  setSqlInput(e.target.value);
                  setSqlOutput("");
                }}
                placeholder="Paste your unformatted SQL code here..."
                className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Output SQL Code */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[350px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>Formatted SQL</span>
                {sqlOutput && (
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
                value={sqlOutput}
                placeholder="Your beautified SQL will appear here..."
                className="w-full flex-1 p-4 bg-zinc-950/30 border-none outline-none font-mono text-xs text-ink-secondary resize-none focus:ring-0 focus:outline-none select-text"
              />
            </div>
          </div>
        </div>
      </div>

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={SQL_STEPS}
        loadingText="Formatting SQL query..."
        duration={1500}
        onFinished={handleFinishedFormatting}
      />
    </div>
  );
}
