"use client";

import React, { useState, useMemo } from "react";
import { modelDilutionRound, type Shareholder } from "@hub/tools-core";

export default function CapTableWorkspace() {
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { name: "Founder 1", shares: 4000000, ownershipPercent: 50, value: 4000000 },
    { name: "Founder 2", shares: 4000000, ownershipPercent: 50, value: 4000000 },
  ]);

  // Stakeholder form input
  const [newStakeholderName, setNewStakeholderName] = useState("");
  const [newStakeholderShares, setNewStakeholderShares] = useState(1000000);

  // Dilution round settings
  const [investment, setInvestment] = useState(2000000);
  const [preMoneyVal, setPreMoneyVal] = useState(8000000);
  const [optionPool, setOptionPool] = useState(10); // % post-money option pool

  const totalShares = useMemo(() => {
    return shareholders.reduce((sum, s) => sum + s.shares, 0);
  }, [shareholders]);

  // Recalculate original percentages
  const origShareholders = useMemo(() => {
    return shareholders.map((s) => ({
      ...s,
      ownershipPercent: totalShares > 0 ? (s.shares / totalShares) * 100 : 0,
    }));
  }, [shareholders, totalShares]);

  // Model next round dilution results
  const postRoundShareholders = useMemo(() => {
    if (totalShares === 0) return [];
    return modelDilutionRound(origShareholders, investment, preMoneyVal, optionPool);
  }, [origShareholders, investment, preMoneyVal, optionPool, totalShares]);

  const addStakeholder = () => {
    if (!newStakeholderName.trim() || newStakeholderShares <= 0) return;
    setShareholders((prev) => [
      ...prev,
      {
        name: newStakeholderName,
        shares: newStakeholderShares,
        ownershipPercent: 0,
        value: newStakeholderShares,
      },
    ]);
    setNewStakeholderName("");
  };

  const removeStakeholder = (idx: number) => {
    setShareholders((prev) => prev.filter((_, i) => i !== idx));
  };

  // SVG Donut Chart for Post-Round Ownership
  const chartSize = 200;
  const radius = 65;
  const strokeWidth = 28;
  const center = chartSize / 2;
  const circumference = 2 * Math.PI * radius;

  const donutSlices = useMemo(() => {
    let accumulatedPercent = 0;
    const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#6b7280"];

    return postRoundShareholders.map((s, idx) => {
      const percent = s.ownershipPercent;
      const strokeDashoffset = circumference - (percent / 100) * circumference;
      const rotation = (accumulatedPercent / 100) * 360;
      accumulatedPercent += percent;

      return {
        name: s.name,
        percent,
        strokeDashoffset,
        rotation,
        color: colors[idx % colors.length],
      };
    });
  }, [postRoundShareholders, circumference]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Forms */}
        <div className="lg:col-span-5 space-y-4">
          {/* Add Stakeholder */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Initial Shareholders</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="stakeholder-name" className="text-[9px] font-bold text-ink-muted uppercase">Name</label>
                <input
                  id="stakeholder-name"
                  type="text"
                  placeholder="Founder or Employee"
                  value={newStakeholderName}
                  onChange={(e) => setNewStakeholderName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="stakeholder-shares" className="text-[9px] font-bold text-ink-muted uppercase">Shares</label>
                <input
                  id="stakeholder-shares"
                  type="number"
                  value={newStakeholderShares}
                  onChange={(e) => setNewStakeholderShares(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                />
              </div>
            </div>
            <button
              onClick={addStakeholder}
              disabled={!newStakeholderName.trim()}
              className="w-full py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Add Shareholder
            </button>

            {/* List of current shareholders */}
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 border-t border-border/40 pt-3">
              {origShareholders.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-zinc-50 dark:bg-zinc-900/40 p-2 rounded-lg border border-border/20">
                  <span className="font-bold text-ink truncate max-w-[120px]">{s.name}</span>
                  <span className="font-mono text-ink-secondary">{s.shares.toLocaleString()} shares ({s.ownershipPercent.toFixed(1)}%)</span>
                  <button
                    onClick={() => removeStakeholder(idx)}
                    disabled={shareholders.length <= 1}
                    className="text-red-500 hover:text-red-600 disabled:opacity-30 cursor-pointer font-bold ml-1.5"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Model Round */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Model Dilution Round</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <label htmlFor="round-investment">Investment Amount</label>
                  <span className="font-mono text-accent">${investment.toLocaleString()}</span>
                </div>
                <input
                  id="round-investment"
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Math.max(1000, Number(e.target.value)))}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <label htmlFor="round-pre-money">Pre-Money Valuation</label>
                  <span className="font-mono text-accent">${preMoneyVal.toLocaleString()}</span>
                </div>
                <input
                  id="round-pre-money"
                  type="number"
                  value={preMoneyVal}
                  onChange={(e) => setPreMoneyVal(Math.max(1000, Number(e.target.value)))}
                  className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                  <label htmlFor="round-option-pool">Employee Option Pool (%)</label>
                  <span className="font-mono text-accent">{optionPool}%</span>
                </div>
                <input
                  id="round-option-pool"
                  type="range"
                  min="0"
                  max="30"
                  value={optionPool}
                  onChange={(e) => setOptionPool(Number(e.target.value))}
                  className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative diluted grid & Visual Donut chart */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visual ownership chart */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4 flex flex-col items-center">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider self-start select-none">Diluted Ownership Chart</h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg width={chartSize} height={chartSize} className="transform -rotate-90 select-none">
                  {donutSlices.map((slice, idx) => (
                    <circle
                      key={idx}
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={slice.strokeDashoffset}
                      style={{
                        transformOrigin: "center",
                        transform: `rotate(${slice.rotation}deg)`,
                      }}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>
                {/* Center Hole Text */}
                <div className="absolute text-center select-none">
                  <span className="text-[10px] font-bold text-ink-muted uppercase block">Post-Round</span>
                  <span className="text-sm font-bold text-ink font-mono">${(preMoneyVal + investment).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-[10px] font-semibold border-t border-border/40 pt-3">
                {donutSlices.map((slice, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 truncate">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: slice.color }} />
                    <span className="text-ink-secondary truncate max-w-[70px]">{slice.name}</span>
                    <span className="font-mono text-ink-muted font-bold ml-auto">{slice.percent.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizing & pricing details */}
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4 select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Equity Value Breakdown</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Pre-Round Shares:</span>
                  <span className="font-mono font-bold text-ink">{totalShares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Implied Share Price:</span>
                  <span className="font-mono font-bold text-ink">
                    ${totalShares > 0 ? (preMoneyVal / totalShares).toFixed(4) : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Post-Money Valuation:</span>
                  <span className="font-mono font-bold text-ink">${(preMoneyVal + investment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-border/45 pt-3">
                  <span className="text-ink-secondary font-bold">New Shares Issued:</span>
                  <span className="font-mono font-bold text-emerald-500">
                    {totalShares > 0 ? Math.round((investment / (preMoneyVal / totalShares))).toLocaleString() : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Table */}
          <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-3 select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Shareholder Dilution Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-100/40 dark:bg-zinc-800/20 text-[9px] font-bold text-ink-muted uppercase border-b border-border/60">
                    <th className="p-3">Shareholder</th>
                    <th className="p-3 text-right">Pre-Ownership</th>
                    <th className="p-3 text-right">Post-Shares</th>
                    <th className="p-3 text-right">Post-Ownership</th>
                    <th className="p-3 text-right">Value ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono text-ink-secondary">
                  {postRoundShareholders.map((s, index) => {
                    // Match with original shareholder for pre-ownership comparison
                    const orig = origShareholders.find((o) => o.name === s.name);
                    const prePercent = orig ? `${orig.ownershipPercent.toFixed(1)}%` : "0.0%";

                    return (
                      <tr key={index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                        <td className="p-3 font-sans font-bold text-ink">{s.name}</td>
                        <td className="p-3 text-right text-ink-muted">{prePercent}</td>
                        <td className="p-3 text-right">{Math.round(s.shares).toLocaleString()}</td>
                        <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">{s.ownershipPercent.toFixed(1)}%</td>
                        <td className="p-3 text-right text-ink">${Math.round(s.value).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
