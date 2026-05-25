"use client";

import React, { useState, useMemo } from "react";
import { calculateSaasLtv } from "@hub/tools-core";

export default function SaasLtvWorkspace() {
  const [cac, setCac] = useState(150);
  const [arpa, setArpa] = useState(50);
  const [grossMargin, setGrossMargin] = useState(80);
  const [churn, setChurn] = useState(3.5);

  const metrics = useMemo(() => {
    return calculateSaasLtv(cac, arpa, grossMargin, churn);
  }, [cac, arpa, grossMargin, churn]);

  // SVG Line Chart Dimensions & Computations
  const chartWidth = 500;
  const chartHeight = 200;
  const chartPadding = { top: 20, right: 20, bottom: 30, left: 45 };

  const chartSVG = useMemo(() => {
    const { cohortRetention } = metrics;
    const maxVal = 100; // customer count starts at 100

    const getX = (index: number) => {
      const w = chartWidth - chartPadding.left - chartPadding.right;
      return chartPadding.left + (index / 11) * w;
    };

    const getY = (val: number) => {
      const h = chartHeight - chartPadding.top - chartPadding.bottom;
      return chartHeight - chartPadding.bottom - (val / maxVal) * h;
    };

    // Draw line coordinates
    const points = cohortRetention
      .map((val, idx) => `${getX(idx)},${getY(val)}`)
      .join(" ");

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none font-mono text-[9px]">
        {/* Y Axis Gridlines & Labels */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = getY(val);
          return (
            <g key={val} className="opacity-40">
              <line
                x1={chartPadding.left}
                y1={y}
                x2={chartWidth - chartPadding.right}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <text x={chartPadding.left - 5} y={y + 3} textAnchor="end" className="fill-ink-secondary">
                {val}%
              </text>
            </g>
          );
        })}

        {/* Churn Curve Line Path */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          points={points}
        />

        {/* Data points */}
        {cohortRetention.map((val, idx) => {
          const cx = getX(idx);
          const cy = getY(val);

          return (
            <g key={idx} className="group">
              <circle
                cx={cx}
                cy={cy}
                r="3.5"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="1.5"
                className="hover:scale-125 transition-transform cursor-pointer"
              />
              {/* Year label below */}
              {idx % 2 === 0 && (
                <text x={cx} y={chartHeight - 10} textAnchor="middle" className="fill-ink-muted">
                  Mo {idx}
                </text>
              )}
              <title>{`Month ${idx}: ${val.toFixed(1)}% customers retained`}</title>
            </g>
          );
        })}

        {/* Axis line */}
        <line
          x1={chartPadding.left}
          y1={chartHeight - chartPadding.bottom}
          x2={chartWidth - chartPadding.right}
          y2={chartHeight - chartPadding.bottom}
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }, [metrics]);

  // Color logic for LTV:CAC health check
  const ltvCacColorClass = useMemo(() => {
    const ratio = metrics.cacRatio;
    if (ratio >= 3) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (ratio >= 1.5) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  }, [metrics.cacRatio]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">LTV Inputs</h3>

            {/* CAC */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="ltv-cac-input">Customer Acquisition Cost (CAC)</label>
                <span className="font-mono text-accent">${cac.toLocaleString()}</span>
              </div>
              <input
                id="ltv-cac-input"
                type="number"
                value={cac}
                onChange={(e) => setCac(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
            </div>

            {/* ARPA */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="ltv-arpa-input">Monthly ARPU (Revenue/User)</label>
                <span className="font-mono text-accent">${arpa.toLocaleString()}</span>
              </div>
              <input
                id="ltv-arpa-input"
                type="number"
                value={arpa}
                onChange={(e) => setArpa(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
            </div>

            {/* Churn Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="ltv-churn-slider">Monthly Revenue Churn Rate</label>
                <span className="font-mono text-accent">{churn}%</span>
              </div>
              <input
                id="ltv-churn-slider"
                type="range"
                min="0.5"
                max="25"
                step="0.1"
                value={churn}
                onChange={(e) => setChurn(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Gross Margin */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="ltv-margin-slider">Gross Margin</label>
                <span className="font-mono text-accent">{grossMargin}%</span>
              </div>
              <input
                id="ltv-margin-slider"
                type="range"
                min="10"
                max="100"
                value={grossMargin}
                onChange={(e) => setGrossMargin(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>
          </div>

          {/* Health check alert box */}
          <div className={`rounded-2xl border p-5 space-y-2 shadow-sm text-center select-none ${ltvCacColorClass}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider block">LTV : CAC Health Check</span>
            <span className="text-2xl font-bold font-mono">{(metrics.cacRatio).toFixed(1)}x</span>
            <p className="text-[10px] leading-relaxed opacity-95">
              {metrics.cacRatio >= 3
                ? "Excellent growth engine. LTV exceeds CAC by 3x or more."
                : metrics.cacRatio >= 1.5
                ? "Moderate efficiency. Payback limits unit economics."
                : "Inefficient acquisition model. CAC payback period exceeds LTV parameters."}
            </p>
          </div>
        </div>

        {/* Right Column: Visual curve and metrics list */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-3 gap-4 text-center select-none">
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">Lifetime Value</span>
              <span className="text-base font-bold text-ink font-mono">${Math.round(metrics.ltv).toLocaleString()}</span>
            </div>
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">LTV:CAC Ratio</span>
              <span className="text-base font-bold text-ink font-mono">{metrics.cacRatio.toFixed(1)}x</span>
            </div>
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">Payback Time</span>
              <span className="text-base font-bold text-ink font-mono">{metrics.paybackMonths.toFixed(1)} Mo</span>
            </div>
          </div>

          {/* Retention Curve Chart */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider select-none">12-Month Cohort Retention Curve</h3>
            <div className="p-3 bg-zinc-950/5 rounded-xl border border-border/30">
              {chartSVG}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
