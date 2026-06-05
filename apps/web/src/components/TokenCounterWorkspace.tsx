"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { getEncoding } from "js-tiktoken";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

interface ModelPreset {
  id: string;
  name: string;
  provider: string;
  tokenizer: "o200k_base" | "cl100k_base" | "approx_claude" | "approx_llama" | "approx_gemini";
  inputCostPer1M: number;
  outputCostPer1M: number;
  category: "modern" | "legacy";
}

const MODEL_PRESETS: ModelPreset[] = [
  // OpenAI SOTA
  { id: "gpt-5-5", name: "GPT-5.5 (Flagship)", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 5.00, outputCostPer1M: 30.00, category: "modern" },
  { id: "gpt-5-4", name: "GPT-5.4 (Balanced)", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 2.50, outputCostPer1M: 15.00, category: "modern" },
  { id: "gpt-5-4-mini", name: "GPT-5.4-mini (Budget)", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 0.15, outputCostPer1M: 0.60, category: "modern" },
  { id: "o1", name: "o1 (Reasoning)", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 15.00, outputCostPer1M: 60.00, category: "modern" },
  { id: "o3-mini", name: "o3-mini (Reasoning)", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 1.10, outputCostPer1M: 4.40, category: "modern" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 2.50, outputCostPer1M: 10.00, category: "modern" },
  { id: "gpt-4o-mini", name: "GPT-4o-mini", provider: "OpenAI", tokenizer: "o200k_base", inputCostPer1M: 0.15, outputCostPer1M: 0.60, category: "modern" },

  // Anthropic SOTA
  { id: "claude-4-7-opus", name: "Claude 4.7 Opus", provider: "Anthropic", tokenizer: "approx_claude", inputCostPer1M: 5.00, outputCostPer1M: 25.00, category: "modern" },
  { id: "claude-4-6-sonnet", name: "Claude 4.6 Sonnet", provider: "Anthropic", tokenizer: "approx_claude", inputCostPer1M: 3.00, outputCostPer1M: 15.00, category: "modern" },
  { id: "claude-4-5-haiku", name: "Claude 4.5 Haiku", provider: "Anthropic", tokenizer: "approx_claude", inputCostPer1M: 1.00, outputCostPer1M: 5.00, category: "modern" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", tokenizer: "approx_claude", inputCostPer1M: 3.00, outputCostPer1M: 15.00, category: "modern" },

  // Google SOTA
  { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", tokenizer: "approx_gemini", inputCostPer1M: 1.25, outputCostPer1M: 10.00, category: "modern" },
  { id: "gemini-2-5-flash", name: "Gemini 2.5 Flash", provider: "Google", tokenizer: "approx_gemini", inputCostPer1M: 0.10, outputCostPer1M: 0.40, category: "modern" },
  { id: "gemini-2-0-flash", name: "Gemini 2.0 Flash", provider: "Google", tokenizer: "approx_gemini", inputCostPer1M: 0.075, outputCostPer1M: 0.30, category: "modern" },

  // Meta SOTA
  { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", tokenizer: "approx_llama", inputCostPer1M: 1.00, outputCostPer1M: 1.00, category: "modern" },
  { id: "llama-4-scout", name: "Llama 4 Scout", provider: "Meta", tokenizer: "approx_llama", inputCostPer1M: 0.20, outputCostPer1M: 0.20, category: "modern" },
  { id: "llama-3-1-70b", name: "Llama 3.1 70B", provider: "Meta", tokenizer: "approx_llama", inputCostPer1M: 0.35, outputCostPer1M: 0.40, category: "modern" },

  // Legacy
  { id: "gpt-4", name: "GPT-4 (Legacy)", provider: "OpenAI", tokenizer: "cl100k_base", inputCostPer1M: 30.00, outputCostPer1M: 60.00, category: "legacy" },
  { id: "gpt-3-5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", tokenizer: "cl100k_base", inputCostPer1M: 0.50, outputCostPer1M: 1.50, category: "legacy" },
];

export default function TokenCounterWorkspace() {
  const t = useWorkspaceTranslation();

  const [text, setText] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("gpt-5-5");
  const [expectedOutputTokens, setExpectedOutputTokens] = useState(500);

  // Pricing override states
  const [customPricing, setCustomPricing] = useState(false);
  const [customInputCost, setCustomInputCost] = useState(0.0);
  const [customOutputCost, setCustomOutputCost] = useState(0.0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    trackToolEvent("token-counter", "start");
  }, []);

  const selectedModel = useMemo(() => {
    return MODEL_PRESETS.find((m) => m.id === selectedModelId) || MODEL_PRESETS[0];
  }, [selectedModelId]);

  // Set default pricing rates when selected model changes
  useEffect(() => {
    if (!customPricing) {
      setCustomInputCost(selectedModel.inputCostPer1M);
      setCustomOutputCost(selectedModel.outputCostPer1M);
    }
  }, [selectedModel, customPricing]);

  // Statistics calculations
  const textStats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== "").length;
    return { chars, words, paragraphs };
  }, [text]);

  // Client-side Tokenization Calculations
  const tokenData = useMemo(() => {
    if (text.trim() === "") {
      return { count: 0, tokens: [] as string[], isApproximation: false };
    }

    const { tokenizer } = selectedModel;

    // OpenAI Tokenization via js-tiktoken
    if (tokenizer === "o200k_base" || tokenizer === "cl100k_base") {
      try {
        const enc = getEncoding(tokenizer);
        const tokenIds = enc.encode(text);
        
        // Decode individual tokens for visualizer
        // Limit text decoding array to first 1000 tokens for UI performance
        const sampleIds = tokenIds.slice(0, 1000);
        const decodedTokens = sampleIds.map(id => enc.decode([id]));
        
        return {
          count: tokenIds.length,
          tokens: decodedTokens,
          isApproximation: false
        };
      } catch (err) {
        console.error("js-tiktoken failed", err);
      }
    }

    // Claude / Gemini / LLaMA Approximations
    let charRatio = 3.5; // Default for Claude/Gemini
    if (tokenizer === "approx_llama") {
      charRatio = 3.8;
    }

    const approxCount = Math.max(1, Math.round(text.length / charRatio));
    
    // Split text into words and spaces to mock visual tokens
    // Limit to first 1000 matched chunks for visual performance
    const matches = text.match(/\s+\S+|\S+|\s+/g) || [];
    const sampleMatches = matches.slice(0, 1000);

    return {
      count: approxCount,
      tokens: sampleMatches,
      isApproximation: true
    };
  }, [text, selectedModel]);

  // Cost estimates calculations
  const costEstimates = useMemo(() => {
    const inputRate = customPricing ? customInputCost : selectedModel.inputCostPer1M;
    const outputRate = customPricing ? customOutputCost : selectedModel.outputCostPer1M;

    const inputCost = (tokenData.count / 1000000) * inputRate;
    const outputCost = (expectedOutputTokens / 1000000) * outputRate;
    const totalCost = inputCost + outputCost;

    return {
      inputCost: inputCost.toFixed(6),
      outputCost: outputCost.toFixed(6),
      totalCost: totalCost.toFixed(6),
      inputRate,
      outputRate
    };
  }, [tokenData.count, expectedOutputTokens, selectedModel, customPricing, customInputCost, customOutputCost]);

  // Text loading helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setText(event.target.result as string);
        trackToolEvent("token-counter", "success");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setText(event.target.result as string);
          trackToolEvent("token-counter", "success");
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      trackToolEvent("token-counter", "success");
    } catch (_) {}
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Dynamic Selector Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Model Presets */}
        <div className="bg-surface border border-border/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
          <div>
            <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              {t("select_model", "Select Model / Tokenizer")}
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full bg-surface-elevated border border-border/60 rounded-xl px-3 py-2 text-sm font-semibold text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none cursor-pointer"
            >
              <optgroup label="Latest Models (SOTA)">
                {MODEL_PRESETS.filter(m => m.category === "modern").map(m => (
                  <option key={m.id} value={m.id}>{m.provider} — {m.name}</option>
                ))}
              </optgroup>
              <optgroup label="Legacy Models">
                {MODEL_PRESETS.filter(m => m.category === "legacy").map(m => (
                  <option key={m.id} value={m.id}>{m.provider} — {m.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            {selectedModel.tokenizer.startsWith("approx_") 
              ? "⚠️ Accurate prompt counts approximated. Custom byte-pair models are client-restricted."
              : "✔️ Direct tokenizer integration. Ranks loaded locally on CPU."}
          </p>
        </div>

        {/* Dynamic Pricing Rates */}
        <div className="bg-surface border border-border/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                {t("pricing_rates", "API Cost Rates")}
              </label>
              <button
                onClick={() => setCustomPricing(!customPricing)}
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  customPricing 
                    ? "border-accent text-accent bg-accent/15" 
                    : "border-border text-ink-secondary hover:text-ink"
                }`}
              >
                {customPricing ? t("custom", "Custom") : t("default_price", "Use Custom")}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-[9px] text-ink-muted font-bold block">{t("input_1m", "Input / 1M Prompt")}</span>
                {customPricing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customInputCost}
                    onChange={(e) => setCustomInputCost(parseFloat(e.target.value) || 0)}
                    className="w-full bg-surface-elevated border border-border/60 rounded-lg px-2 py-1 text-xs font-bold font-mono mt-1 text-ink focus:border-accent outline-none"
                  />
                ) : (
                  <div className="text-sm font-black font-mono text-ink mt-1">${selectedModel.inputCostPer1M.toFixed(2)}</div>
                )}
              </div>
              <div>
                <span className="text-[9px] text-ink-muted font-bold block">{t("output_1m", "Output / 1M Response")}</span>
                {customPricing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customOutputCost}
                    onChange={(e) => setCustomOutputCost(parseFloat(e.target.value) || 0)}
                    className="w-full bg-surface-elevated border border-border/60 rounded-lg px-2 py-1 text-xs font-bold font-mono mt-1 text-ink focus:border-accent outline-none"
                  />
                ) : (
                  <div className="text-sm font-black font-mono text-ink mt-1">${selectedModel.outputCostPer1M.toFixed(2)}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-[9px] text-ink-muted">Prices in USD. Override values for custom hosting (Groq, TogetherAI, vLLM).</div>
        </div>

        {/* Expected Output Estimator */}
        <div className="bg-surface border border-border/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-sm">
          <div>
            <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block mb-1">
              {t("estimated_output", "Expected Completion Length")}
            </label>
            <div className="flex items-center gap-3 mt-1.5">
              <input
                type="range"
                min="0"
                max="4096"
                step="50"
                value={expectedOutputTokens}
                onChange={(e) => setExpectedOutputTokens(parseInt(e.target.value))}
                className="w-full accent-accent"
              />
              <span className="text-xs font-bold font-mono text-ink bg-surface-elevated border border-border/60 rounded-lg px-2 py-1 min-w-[55px] text-center">
                {expectedOutputTokens}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-ink-muted">Simulates output token pricing to forecast total inference costs.</p>
        </div>
      </div>

      {/* Editor & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Area */}
        <div className="lg:col-span-8 space-y-4">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative bg-surface border border-border/40 rounded-2xl p-4 shadow-sm flex flex-col"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-border/30 mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-ink-secondary uppercase tracking-wider">
                  {t("prompt_workspace", "Prompt Sandbox")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePaste}
                  className="px-3 py-1.5 rounded-xl border border-border hover:bg-surface text-ink-secondary hover:text-ink text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                >
                  {t("paste", "Paste")}
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 rounded-xl border border-border hover:bg-surface text-ink-secondary hover:text-ink text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                >
                  {t("load_file", "Upload file")}
                </button>
                {text && (
                  <button
                    onClick={() => setText("")}
                    className="px-3 py-1.5 rounded-xl border border-rose-500/20 hover:bg-rose-500/10 text-rose-500 text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {t("clear", "Clear")}
                  </button>
                )}
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.md,.json,.js,.ts,.html,.css,.py,.go,.sh"
            />

            {/* Input Element */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("placeholder", "Paste your prompt, codebase snippets, or logs here to measure token bounds...")}
              className="w-full min-h-[320px] bg-transparent text-ink placeholder-ink-muted text-sm font-mono border-none focus:ring-0 resize-y outline-none leading-relaxed"
            />
          </div>

          {/* Localized Details & Highlighting Visualizer */}
          {text && (
            <div className="bg-surface border border-border/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  {t("token_visualization", "Token Boundary Visualizer")}
                </h3>
                <span className="text-[10px] text-ink-muted font-mono uppercase">
                  {tokenData.isApproximation 
                    ? t("mock_chunks", "Mock Word Chunks")
                    : t("exact_tokens", "GPT Byte-Pair Chunks")}
                </span>
              </div>
              
              <div className="bg-zinc-950/90 dark:bg-black/60 rounded-xl p-4 border border-zinc-800/80 font-mono text-sm leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-wrap select-text">
                {tokenData.tokens.map((tok, idx) => {
                  // Alternating neon highlighting classes
                  const isEven = idx % 2 === 0;
                  const highlightClass = isEven
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                    : "bg-sky-500/15 text-sky-300 border border-sky-500/20";
                  
                  return (
                    <span
                      key={idx}
                      className={`inline-block px-[2px] rounded ${highlightClass}`}
                      title={`Token #${idx + 1}`}
                    >
                      {tok === " " ? "␣" : tok === "\n" ? "↵\n" : tok}
                    </span>
                  );
                })}
                {text.length > 3000 && tokenData.tokens.length >= 1000 && (
                  <div className="text-[11px] text-amber-500 font-bold mt-4 pt-2 border-t border-zinc-800/80 uppercase tracking-wide">
                    ⚠️ Optimization Note: Visualization truncated to the first 1,000 tokens for interface performance. Count remains accurate.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Side Rail Metrics Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Counters */}
          <div className="bg-surface-elevated border border-border/60 rounded-2xl p-5 shadow-md space-y-5">
            <h3 className="text-xs font-bold text-ink uppercase tracking-widest pb-3 border-b border-border/20">
              {t("token_statistics", "Token Statistics")}
            </h3>
            
            {/* Tokens Count Hero */}
            <div className="text-center py-4 bg-surface border border-border/30 rounded-2xl shadow-inner relative overflow-hidden">
              {tokenData.isApproximation && (
                <div className="absolute top-2 right-2 text-[9px] font-bold text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded bg-amber-500/10">
                  {t("approx", "APPROX")}
                </div>
              )}
              <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{t("total_tokens", "Tokens")}</div>
              <div className="text-5xl font-black text-accent font-mono mt-1 tracking-tight">
                {tokenData.count.toLocaleString()}
              </div>
            </div>

            {/* Sub-counters Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surface border border-border/40 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">{t("chars", "Chars")}</span>
                <span className="text-sm font-extrabold text-ink font-mono mt-0.5 block">{textStats.chars.toLocaleString()}</span>
              </div>
              <div className="bg-surface border border-border/40 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">{t("words", "Words")}</span>
                <span className="text-sm font-extrabold text-ink font-mono mt-0.5 block">{textStats.words.toLocaleString()}</span>
              </div>
              <div className="bg-surface border border-border/40 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">{t("paragraphs", "Paragraphs")}</span>
                <span className="text-sm font-extrabold text-ink font-mono mt-0.5 block">{textStats.paragraphs.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-surface-elevated border border-border/60 rounded-2xl p-5 shadow-md space-y-4">
            <h3 className="text-xs font-bold text-ink uppercase tracking-widest pb-3 border-b border-border/20">
              {t("session_cost", "Estimated Session Cost")}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink-secondary">{t("prompt_cost", "Prompt (Input) Cost")}:</span>
                <span className="text-sm font-bold font-mono text-ink">${costEstimates.inputCost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink-secondary">{t("completion_cost", "Completion (Output) Cost")}:</span>
                <span className="text-sm font-bold font-mono text-ink">${costEstimates.outputCost}</span>
              </div>
              <div className="pt-3 border-t border-border/30 flex justify-between items-center">
                <span className="text-xs font-bold text-ink">{t("total_cost", "Total Session Cost")}:</span>
                <span className="text-base font-black font-mono text-accent">${costEstimates.totalCost}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
