"use client";

import React, { useState, useEffect, useMemo } from "react";
import { generatePassword, calculatePasswordStrength } from "@hub/tools-core";

export default function PasswordGeneratorWorkspace() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate password on option change or manual trigger
  const handleGenerate = () => {
    const pwd = generatePassword({
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    });
    setPassword(pwd);
  };

  useEffect(() => {
    handleGenerate();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const stats = useMemo(() => {
    return calculatePasswordStrength(password);
  }, [password]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Color styles and width percentages for entropy meter
  const meterStyles = useMemo(() => {
    const strength = stats.strength;
    let width = "0%";
    let color = "bg-red-500";

    if (strength === "Very Weak") {
      width = "20%";
      color = "bg-red-500";
    } else if (strength === "Weak") {
      width = "40%";
      color = "bg-orange-500";
    } else if (strength === "Reasonable") {
      width = "60%";
      color = "bg-yellow-500";
    } else if (strength === "Strong") {
      width = "80%";
      color = "bg-emerald-500";
    } else if (strength === "Very Strong") {
      width = "100%";
      color = "bg-emerald-600";
    }

    return { width, color };
  }, [stats.strength]);

  return (
    <div className="space-y-6 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Parameters</h3>

            {/* Length slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="password-length">Password Length</label>
                <span className="font-mono text-accent">{length} chars</span>
              </div>
              <input
                id="password-length"
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3.5 pt-2 border-t border-border/40">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Include Uppercase Letters (A-Z)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Include Lowercase Letters (a-z)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Include Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
                />
                <span>Include Symbols (!@#$%)</span>
              </label>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-white dark:text-black text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
            >
              Generate New Password
            </button>
          </div>
        </div>

        {/* Display / Strength Meter Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Password result */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4 flex flex-col justify-between h-36">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Generated Password</h3>
            
            <div className="flex items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-950/20 border border-border/60 rounded-xl px-4 py-3 min-w-0">
              <span className="font-mono text-base md:text-lg font-bold text-ink select-all truncate">
                {password || "Select at least one constraint..."}
              </span>
              <button
                onClick={handleCopy}
                disabled={!password}
                className="text-accent hover:text-accent-hover text-xs font-bold cursor-pointer flex-shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Strength Analysis */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Strength analysis</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-secondary font-medium">Entropy Rating:</span>
                <span className="font-mono font-bold text-ink">{stats.entropy.toFixed(1)} bits</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-secondary font-medium">Strength Assessment:</span>
                <span className="font-bold text-ink">{stats.strength}</span>
              </div>

              {/* Progress strength bar */}
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${meterStyles.color}`}
                  style={{ width: meterStyles.width }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
