"use client";

import React, { useState, useEffect } from "react";

export default function UnixTimestampWorkspace() {
  const [nowSec, setNowSec] = useState(0);
  const [nowMs, setNowMs] = useState(0);
  const [copySecSec, setCopySecSec] = useState(false);
  const [copyMsSec, setCopyMsSec] = useState(false);

  // Epoch to Human Converter states
  const [epochInput, setEpochInput] = useState("");
  const [epochResult, setEpochResult] = useState<{
    local: string;
    utc: string;
    relative: string;
    type: "seconds" | "milliseconds" | "invalid";
  } | null>(null);

  // Human to Epoch Converter states
  const [humanDate, setHumanDate] = useState("");
  const [humanHour, setHumanHour] = useState("12");
  const [humanMinute, setHumanMinute] = useState("00");
  const [humanSecond, setHumanSecond] = useState("00");
  const [humanEpochResult, setHumanEpochResult] = useState<{
    sec: number;
    ms: number;
  } | null>(null);

  // Initialize clock and default values
  useEffect(() => {
    // Current Ticking Epoch
    const updateTime = () => {
      const ms = Date.now();
      setNowMs(ms);
      setNowSec(Math.floor(ms / 1000));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Default inputs on mount
    const today = new Date();
    setHumanDate(today.toISOString().split("T")[0]);
    setEpochInput(Math.floor(today.getTime() / 1000).toString());

    return () => clearInterval(interval);
  }, []);

  // Update Epoch to Human Conversion
  useEffect(() => {
    if (!epochInput.trim()) {
      setEpochResult(null);
      return;
    }

    const val = Number(epochInput.trim());
    if (isNaN(val) || val < 0) {
      setEpochResult({
        local: "Invalid Date",
        utc: "Invalid Date",
        relative: "Invalid Date",
        type: "invalid",
      });
      return;
    }

    let date: Date;
    let type: "seconds" | "milliseconds";

    // Auto-detect seconds (10 digits or less) vs milliseconds (11+ digits)
    if (epochInput.trim().length <= 10) {
      date = new Date(val * 1000);
      type = "seconds";
    } else {
      date = new Date(val);
      type = "milliseconds";
    }

    if (isNaN(date.getTime())) {
      setEpochResult({
        local: "Invalid Date",
        utc: "Invalid Date",
        relative: "Invalid Date",
        type: "invalid",
      });
      return;
    }

    // Relative Time calculation
    const diff = date.getTime() - Date.now();
    const absDiff = Math.abs(diff);
    let relative = "";
    if (absDiff < 60000) {
      relative = "Just now";
    } else {
      const mins = Math.floor(absDiff / 60000);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) relative = `${days} day${days > 1 ? "s" : ""} ${diff > 0 ? "from now" : "ago"}`;
      else if (hours > 0) relative = `${hours} hour${hours > 1 ? "s" : ""} ${diff > 0 ? "from now" : "ago"}`;
      else relative = `${mins} minute${mins > 1 ? "s" : ""} ${diff > 0 ? "from now" : "ago"}`;
    }

    setEpochResult({
      local: date.toString(),
      utc: date.toUTCString(),
      relative: relative,
      type: type,
    });
  }, [epochInput]);

  // Update Human to Epoch Conversion
  useEffect(() => {
    if (!humanDate) {
      setHumanEpochResult(null);
      return;
    }

    const timeStr = `${humanHour.padStart(2, "0")}:${humanMinute.padStart(2, "0")}:${humanSecond.padStart(2, "0")}`;
    const dateStr = `${humanDate}T${timeStr}`;
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      setHumanEpochResult(null);
      return;
    }

    setHumanEpochResult({
      sec: Math.floor(date.getTime() / 1000),
      ms: date.getTime(),
    });
  }, [humanDate, humanHour, humanMinute, humanSecond]);

  const copyText = (text: string, setCopyState: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopyState(true);
    setTimeout(() => setCopyState(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Ticking Clock Row */}
      <div className="rounded-2xl border border-border bg-surface-elevated p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="space-y-1 text-center md:text-left select-none">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Current Unix Epoch Time</h3>
          <p className="text-[10px] text-ink-muted uppercase tracking-wider">Ticking live in browser local time</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Seconds Ticker */}
          <div className="flex-1 sm:flex-initial bg-surface border border-border rounded-xl p-4 text-center min-w-[180px] shadow-sm">
            <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider mb-1">Seconds</span>
            <span className="block font-mono text-lg font-bold text-accent tracking-wide">{nowSec}</span>
            <button
              onClick={() => copyText(nowSec.toString(), setCopySecSec)}
              className="mt-2 text-[10px] font-bold text-ink-secondary hover:text-accent cursor-pointer uppercase tracking-wider"
            >
              {copySecSec ? "Copied!" : "Copy Seconds"}
            </button>
          </div>

          {/* Milliseconds Ticker */}
          <div className="flex-1 sm:flex-initial bg-surface border border-border rounded-xl p-4 text-center min-w-[180px] shadow-sm">
            <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider mb-1">Milliseconds</span>
            <span className="block font-mono text-lg font-bold text-ink tracking-wide">{nowMs}</span>
            <button
              onClick={() => copyText(nowMs.toString(), setCopyMsSec)}
              className="mt-2 text-[10px] font-bold text-ink-secondary hover:text-accent cursor-pointer uppercase tracking-wider"
            >
              {copyMsSec ? "Copied!" : "Copy Milliseconds"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
        {/* Panel 1: Epoch to Human */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Convert Unix Timestamp to Date</h3>
          
          <div className="space-y-1.5">
            <label htmlFor="epoch-input" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
              Enter Unix Epoch Timestamp
            </label>
            <input
              id="epoch-input"
              type="text"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
              placeholder="e.g. 1779538666"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-xs text-ink focus:border-accent focus:outline-none"
            />
          </div>

          {epochResult && (
            <div className="space-y-4 pt-2 border-t border-border/50">
              {epochResult.type !== "invalid" && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-accent/25 bg-accent/5 text-[9px] font-bold text-accent uppercase tracking-wider">
                  Auto-Detected: {epochResult.type} format
                </div>
              )}

              <div className="space-y-3">
                <div className="p-3.5 bg-surface rounded-xl border border-border space-y-1">
                  <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider">Local Timezone Date</span>
                  <span className="block text-xs font-bold text-ink font-sans leading-relaxed">{epochResult.local}</span>
                </div>

                <div className="p-3.5 bg-surface rounded-xl border border-border space-y-1">
                  <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider">UTC Timezone Date</span>
                  <span className="block text-xs font-bold text-ink font-sans leading-relaxed">{epochResult.utc}</span>
                </div>

                <div className="p-3.5 bg-surface rounded-xl border border-border space-y-1">
                  <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider">Relative Age</span>
                  <span className="block text-xs font-bold text-ink font-sans leading-relaxed">{epochResult.relative}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel 2: Human to Epoch */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Convert Calendar Date to Epoch</h3>
          
          <div className="space-y-1.5">
            <label htmlFor="human-date" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
              Select Calendar Date
            </label>
            <input
              id="human-date"
              type="date"
              value={humanDate}
              onChange={(e) => setHumanDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs text-ink focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="hour" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                Hour (0-23)
              </label>
              <input
                id="hour"
                type="number"
                min={0}
                max={23}
                value={humanHour}
                onChange={(e) => setHumanHour(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-ink focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="minute" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                Minute (0-59)
              </label>
              <input
                id="minute"
                type="number"
                min={0}
                max={59}
                value={humanMinute}
                onChange={(e) => setHumanMinute(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-ink focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="second" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                Second (0-59)
              </label>
              <input
                id="second"
                type="number"
                min={0}
                max={59}
                value={humanSecond}
                onChange={(e) => setHumanSecond(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-ink focus:outline-none"
              />
            </div>
          </div>

          {humanEpochResult && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="p-3.5 bg-surface rounded-xl border border-border flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider">Output Seconds</span>
                  <span className="block font-mono text-xs font-bold text-accent leading-relaxed">{humanEpochResult.sec}</span>
                </div>
                <button
                  onClick={() => copyText(humanEpochResult.sec.toString(), setCopySecSec)}
                  className="text-[10px] font-bold text-ink-secondary hover:text-accent cursor-pointer uppercase tracking-wider"
                >
                  Copy
                </button>
              </div>

              <div className="p-3.5 bg-surface rounded-xl border border-border flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-bold text-ink-muted uppercase tracking-wider">Output Milliseconds</span>
                  <span className="block font-mono text-xs font-bold text-ink leading-relaxed">{humanEpochResult.ms}</span>
                </div>
                <button
                  onClick={() => copyText(humanEpochResult.ms.toString(), setCopyMsSec)}
                  className="text-[10px] font-bold text-ink-secondary hover:text-accent cursor-pointer uppercase tracking-wider"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
