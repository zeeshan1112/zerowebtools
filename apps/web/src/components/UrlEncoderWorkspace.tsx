"use client";

import React, { useState, useEffect, useRef } from "react";
import { encodeUrlString, decodeUrlString, parseUrlParams, buildUrlString, UrlParam } from "@hub/tools-core";

export default function UrlEncoderWorkspace() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeMode, setActiveMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  // URL Query Parameters Grid states
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<UrlParam[]>([]);
  const isEditingGridRef = useRef(false);

  // Update output text based on inputs & mode
  useEffect(() => {
    if (activeMode === "encode") {
      setOutputText(encodeUrlString(inputText));
    } else {
      setOutputText(decodeUrlString(inputText));
    }

    // Auto-parse URL query parameter grid if input looks like a URL or query string,
    // but only if we are NOT currently editing the parameters grid directly to prevent loops.
    if (!isEditingGridRef.current) {
      const parsed = parseUrlParams(inputText);
      setBaseUrl(parsed.baseUrl);
      setParams(parsed.params);
    }
  }, [inputText, activeMode]);

  // Load example URL
  const loadExample = () => {
    isEditingGridRef.current = false;
    setInputText("https://zerowebtools.com/search?q=next.js frameworks&category=developer tools&active=true&page=1");
    setActiveMode("encode");
  };

  const handleClear = () => {
    isEditingGridRef.current = false;
    setInputText("");
    setOutputText("");
    setBaseUrl("");
    setParams([]);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // URL grid change handlers
  const handleBaseUrlChange = (newBase: string) => {
    isEditingGridRef.current = true;
    setBaseUrl(newBase);
    const newFullUrl = buildUrlString(newBase, params);
    setInputText(newFullUrl);
    // Reset editing lock shortly after state updates propagate
    setTimeout(() => {
      isEditingGridRef.current = false;
    }, 50);
  };

  const handleParamChange = (id: string, field: "key" | "value", newValue: string) => {
    isEditingGridRef.current = true;
    const updated = params.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: newValue };
      }
      return p;
    });
    setParams(updated);
    const newFullUrl = buildUrlString(baseUrl, updated);
    setInputText(newFullUrl);
    setTimeout(() => {
      isEditingGridRef.current = false;
    }, 50);
  };

  const handleAddParam = () => {
    isEditingGridRef.current = true;
    const newParam: UrlParam = {
      id: `param-new-${Math.random().toString(36).substring(2, 7)}`,
      key: "",
      value: "",
    };
    const updated = [...params, newParam];
    setParams(updated);
    const newFullUrl = buildUrlString(baseUrl, updated);
    setInputText(newFullUrl);
    setTimeout(() => {
      isEditingGridRef.current = false;
    }, 50);
  };

  const handleDeleteParam = (id: string) => {
    isEditingGridRef.current = true;
    const updated = params.filter((p) => p.id !== id);
    setParams(updated);
    const newFullUrl = buildUrlString(baseUrl, updated);
    setInputText(newFullUrl);
    setTimeout(() => {
      isEditingGridRef.current = false;
    }, 50);
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
            Load Example URL
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-border text-ink-muted hover:text-red-500 rounded-xl text-xs font-semibold hover:bg-surface-elevated/40 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>

        {/* Encode/Decode Toggles */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 border border-border/60 p-1 rounded-xl">
          <button
            onClick={() => setActiveMode("encode")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === "encode"
                ? "bg-surface shadow text-accent"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            URL Encode
          </button>
          <button
            onClick={() => setActiveMode("decode")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === "decode"
                ? "bg-surface shadow text-accent"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            URL Decode
          </button>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Input Pane */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="url-input" className="text-xs font-bold text-ink-secondary uppercase tracking-wider select-none">
            Input String / URL
          </label>
          <textarea
            id="url-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activeMode === "encode"
                ? "Enter text or URL query parameters to encode..."
                : "Enter encoded percent-string to decode..."
            }
            className="w-full h-44 p-4 rounded-2xl border border-border bg-surface-elevated/50 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none transition-all shadow-inner leading-relaxed"
          />
        </div>

        {/* Right Output Pane */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center select-none">
            <label htmlFor="url-output" className="text-xs font-bold text-ink-secondary uppercase tracking-wider">
              {activeMode === "encode" ? "Encoded Percent String" : "Decoded Plain Text"}
            </label>
            {outputText && (
              <button
                onClick={handleCopy}
                className="text-[10px] text-accent font-bold"
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>
          <textarea
            id="url-output"
            readOnly
            value={outputText}
            placeholder="Result will appear here..."
            className="w-full h-44 p-4 rounded-2xl border border-border bg-surface-elevated/20 font-mono text-sm text-ink-secondary focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* URL QUERY PARAMETER EDITOR GRID */}
      {inputText && (params.length > 0 || baseUrl) && (
        <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm select-none">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Query Parameters Grid Editor
            </h4>
            <span className="text-[10px] text-ink-muted font-bold font-mono">
              Auto-Synchronized
            </span>
          </div>

          <div className="space-y-3">
            {/* Base URL Input */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="url-base-input" className="text-[9px] font-bold text-ink-muted uppercase">Base Path / URL</label>
              <input
                id="url-base-input"
                type="text"
                value={baseUrl}
                onChange={(e) => handleBaseUrlChange(e.target.value)}
                placeholder="https://example.com/path"
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono transition-all"
              />
            </div>

            {/* Query parameters table */}
            {params.length > 0 ? (
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-ink-muted uppercase">Key-Value Queries</span>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {params.map((p, idx) => (
                    <div key={p.id} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={p.key}
                        onChange={(e) => handleParamChange(p.id, "key", e.target.value)}
                        placeholder={`Query Key ${idx + 1}`}
                        className="flex-1 rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono transition-all"
                      />
                      <span className="text-border/40 text-xs font-mono font-bold">=</span>
                      <input
                        type="text"
                        value={p.value}
                        onChange={(e) => handleParamChange(p.id, "value", e.target.value)}
                        placeholder={`Value ${idx + 1}`}
                        className="flex-1 rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono transition-all"
                      />
                      <button
                        onClick={() => handleDeleteParam(p.id)}
                        className="p-2 border border-border hover:border-red-500/20 text-ink-muted hover:text-red-500 rounded-lg hover:bg-red-500/5 transition-colors cursor-pointer"
                        title="Delete parameter"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-2 text-[10px] text-ink-muted italic">
                No query key-value segments found. Click Add to add a query parameter.
              </div>
            )}

            <button
              onClick={handleAddParam}
              className="px-3.5 py-2 border border-border text-ink hover:text-accent rounded-xl text-xs font-bold hover:bg-surface-elevated/40 transition-all cursor-pointer flex items-center gap-1.5"
            >
              + Add Parameter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
