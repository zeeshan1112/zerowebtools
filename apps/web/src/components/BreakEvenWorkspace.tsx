"use client";

import React, { useState, useMemo } from "react";
import { calculateBreakEven } from "@hub/tools-core";

export default function BreakEvenWorkspace() {
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [variableCost, setVariableCost] = useState(30);
  const [price, setPrice] = useState(50);

  const metrics = useMemo(() => {
    return calculateBreakEven(fixedCosts, variableCost, price);
  }, [fixedCosts, variableCost, price]);

  // SVG Chart Dimensions & Computations
  const chartWidth = 500;
  const chartHeight = 220;
  const chartPadding = { top: 20, right: 20, bottom: 30, left: 60 };

  const chartSVG = useMemo(() => {
    const { gridData, breakEvenUnits } = metrics;
    if (gridData.length === 0) return null;

    const maxUnits = gridData[gridData.length - 1].units;
    const maxVal = Math.max(...gridData.map((d) => Math.max(d.revenue, d.totalCosts)));

    const getX = (units: number) => {
      const w = chartWidth - chartPadding.left - chartPadding.right;
      return chartPadding.left + (units / maxUnits) * w;
    };

    const getY = (val: number) => {
      const h = chartHeight - chartPadding.top - chartPadding.bottom;
      return chartHeight - chartPadding.bottom - (val / (maxVal || 1)) * h;
    };

    // Revenue line points
    const revPoints = gridData
      .map((d) => `${getX(d.units)},${getY(d.revenue)}`)
      .join(" ");

    // Total Cost line points
    const costPoints = gridData
      .map((d) => `${getX(d.units)},${getY(d.totalCosts)}`)
      .join(" ");

    // Fixed Cost line points
    const fixedPoints = gridData
      .map((d) => `${getX(d.units)},${getY(d.fixedCosts)}`)
      .join(" ");

    // Break even intersection coordinates
    const intersectX = getX(breakEvenUnits);
    const intersectY = getY(breakEvenUnits * price);

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none font-mono text-[9px]">
        {/* Y Axis Gridlines & Labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const val = maxVal * ratio;
          const y = getY(val);
          return (
            <g key={ratio} className="opacity-40">
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
                ${Math.round(val).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Fixed Cost Line (Gray Dash) */}
        <polyline
          fill="none"
          stroke="#9ca3af"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          points={fixedPoints}
        />

        {/* Total Cost Line (Red) */}
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          points={costPoints}
        />

        {/* Revenue Line (Green) */}
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          points={revPoints}
        />

        {/* Intersection Break-Even Point Circle */}
        {breakEvenUnits > 0 && breakEvenUnits <= maxUnits && (
          <g>
            <circle
              cx={intersectX}
              cy={intersectY}
              r="5"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
            {/* Dotted guideline down to X axis */}
            <line
              x1={intersectX}
              y1={intersectY}
              x2={intersectX}
              y2={chartHeight - chartPadding.bottom}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            {/* Dotted guideline left to Y axis */}
            <line
              x1={intersectX}
              y1={intersectY}
              x2={chartPadding.left}
              y2={intersectY}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </g>
        )}

        {/* X axis labels (divisions) */}
        {gridData.filter((_, i) => i % 2 === 0).map((d) => {
          const x = getX(d.units);
          return (
            <text key={d.units} x={x} y={chartHeight - 10} textAnchor="middle" className="fill-ink-muted">
              {d.units}
            </text>
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
  }, [metrics, price]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Break-Even Settings</h3>

            {/* Fixed Costs */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="be-fixed-input">Fixed Costs (Annual)</label>
                <span className="font-mono text-accent">${fixedCosts.toLocaleString()}</span>
              </div>
              <input
                id="be-fixed-input"
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
            </div>

            {/* Selling Price */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="be-price-input">Selling Price per Unit</label>
                <span className="font-mono text-accent">${price.toLocaleString()}</span>
              </div>
              <input
                id="be-price-input"
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
            </div>

            {/* Variable Cost */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="be-var-input">Variable Cost per Unit</label>
                <span className="font-mono text-accent">${variableCost.toLocaleString()}</span>
              </div>
              <input
                id="be-var-input"
                type="number"
                value={variableCost}
                onChange={(e) => setVariableCost(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Visual curve and metrics list */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center select-none">
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">BE Units</span>
              <span className="text-sm font-bold text-ink font-mono">
                {metrics.breakEvenUnits > 0 && isFinite(metrics.breakEvenUnits) ? Math.round(metrics.breakEvenUnits).toLocaleString() : "—"}
              </span>
            </div>
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">BE Sales</span>
              <span className="text-sm font-bold text-ink font-mono">
                {metrics.breakEvenSalesValue > 0 && isFinite(metrics.breakEvenSalesValue) ? `$${Math.round(metrics.breakEvenSalesValue).toLocaleString()}` : "—"}
              </span>
            </div>
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">Contribution Margin</span>
              <span className="text-sm font-bold text-ink font-mono">${metrics.contributionMargin.toLocaleString()}</span>
            </div>
            <div className="bg-surface-elevated border border-border p-4 rounded-2xl shadow-sm">
              <span className="text-[9px] font-bold text-ink-muted uppercase block">Margin Ratio</span>
              <span className="text-sm font-bold text-ink font-mono">{(metrics.contributionMarginRatio * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Break even curve chart */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Break-Even Chart</h3>
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-0.5 bg-emerald-500" />
                  <span>Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-0.5 bg-red-500" />
                  <span>Total Costs</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  <span>Break-Even</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/5 rounded-xl border border-border/30">
              {chartSVG}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
