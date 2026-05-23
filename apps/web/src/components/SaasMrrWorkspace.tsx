"use client";

import React, { useState, useEffect } from "react";

interface MonthlyData {
  month: number;
  monthName: string;
  mrr: number;
  churnedMrr: number;
  newMrr: number;
  cumulativeRevenue: number;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function SaasMrrWorkspace() {
  const [initialMrr, setInitialMrr] = useState<number>(10000);
  const [growthRate, setGrowthRate] = useState<number>(8);
  const [churnRate, setChurnRate] = useState<number>(3);
  const [arpu, setArpu] = useState<number>(100);
  const [projection, setProjection] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const data: MonthlyData[] = [];
    let currentMrr = initialMrr;
    let cumulative = 0;
    
    // Start with current date month name index
    const startMonthIdx = new Date().getMonth();

    for (let i = 1; i <= 12; i++) {
      const monthIdx = (startMonthIdx + i - 1) % 12;
      const monthName = MONTH_NAMES[monthIdx];
      
      const churnedMrr = currentMrr * (churnRate / 100);
      const newMrr = currentMrr * (growthRate / 100);
      const nextMrr = currentMrr + newMrr - churnedMrr;
      cumulative += currentMrr;

      data.push({
        month: i,
        monthName,
        mrr: Math.round(currentMrr),
        churnedMrr: Math.round(churnedMrr),
        newMrr: Math.round(newMrr),
        cumulativeRevenue: Math.round(cumulative),
      });

      currentMrr = nextMrr;
    }
    setProjection(data);
  }, [initialMrr, growthRate, churnRate]);

  // Find max value for SVG scaling
  const maxMrr = projection.length > 0 ? Math.max(...projection.map(d => d.mrr)) : 10000;
  const minMrr = projection.length > 0 ? Math.min(...projection.map(d => d.mrr)) : 0;
  
  // SVG Chart Config
  const width = 600;
  const height = 220;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getSvgCoordinates = (index: number, val: number) => {
    const x = paddingLeft + (index / 11) * chartWidth;
    // Map val between minMrr (or 0) and maxMrr * 1.1
    const maxScale = maxMrr * 1.05;
    const minScale = Math.max(0, minMrr * 0.95);
    const range = maxScale - minScale || 1;
    const y = paddingTop + chartHeight - ((val - minScale) / range) * chartHeight;
    return { x, y };
  };

  // Generate SVG Path
  const points = projection.map((d, i) => getSvgCoordinates(i, d.mrr));
  const linePath = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
    : "";

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : "";

  return (
    <div className="space-y-8 font-mono select-none">
      
      {/* Dynamic Dashboard Headers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Month 12 MRR</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            ${projection[11]?.mrr.toLocaleString() || "0"}
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">ARR Run Rate</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            ${Math.round((projection[11]?.mrr || 0) * 12).toLocaleString()}
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">12M Net Gain</span>
          <output className="text-xl font-extrabold text-emerald-500 dark:text-emerald-400 block mt-1">
            +${Math.round((projection[11]?.mrr || 0) - initialMrr).toLocaleString()}
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Total Bookings</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            ${projection[11]?.cumulativeRevenue.toLocaleString() || "0"}
          </output>
        </div>
      </div>

      {/* Main Interactive Controls & Chart Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Numeric Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-border/40 pb-2">
              Model parameters
            </h3>
            
            {/* Input 1: Starting MRR */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="initial-mrr" className="font-bold text-ink-secondary">STARTING MRR</label>
                <span className="font-bold text-ink">${initialMrr.toLocaleString()}</span>
              </div>
              <input
                id="initial-mrr"
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={initialMrr}
                onChange={(e) => setInitialMrr(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>

            {/* Input 2: Growth Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="growth-rate" className="font-bold text-ink-secondary">GROWTH RATE / MO</label>
                <span className="font-bold text-ink">{growthRate}%</span>
              </div>
              <input
                id="growth-rate"
                type="range"
                min="0"
                max="40"
                step="1"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>

            {/* Input 3: Churn Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="churn-rate" className="font-bold text-ink-secondary">CHURN RATE / MO</label>
                <span className="font-bold text-red-500 dark:text-red-400">{churnRate}%</span>
              </div>
              <input
                id="churn-rate"
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={churnRate}
                onChange={(e) => setChurnRate(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>
            
            <div className="pt-2">
              <div className="bg-surface-elevated/40 border border-border/50 p-3 rounded-xl text-[10px] text-ink-muted leading-relaxed">
                MRR calculations execute entirely in-browser. All formula vectors are private and telemetry-free.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Monochromatic Chart */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border border-border/80 bg-surface rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/20 pb-3 mb-4">
              <span className="text-[10px] font-bold text-ink uppercase tracking-wider">
                12-Month MRR Growth Vector
              </span>
              <span className="text-[9px] text-ink-muted font-bold">LOCAL PLOT</span>
            </div>

            {/* Live Chart Canvas */}
            <div className="w-full overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox={`0 0 ${width} ${height}`}>
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                  const val = minMrr + r * (maxMrr - minMrr);
                  const y = paddingTop + chartHeight - r * chartHeight;
                  
                  return (
                    <g key={i} className="opacity-40">
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={width - paddingRight}
                        y2={y}
                        stroke="var(--border)"
                        strokeWidth="1.2"
                        strokeDasharray="2 3"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 3}
                        textAnchor="end"
                        fill="var(--ink-secondary)"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        ${Math.round(val).toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {/* Draw X Axis months */}
                {projection.map((d, i) => {
                  const coords = getSvgCoordinates(i, d.mrr);
                  return (
                    <text
                      key={i}
                      x={coords.x}
                      y={height - 8}
                      textAnchor="middle"
                      fill="var(--ink-secondary)"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {d.monthName}
                    </text>
                  );
                })}

                {/* Render shaded Area */}
                {areaPath && (
                  <path
                    d={areaPath}
                    fill="url(#chart-gradient)"
                    className="opacity-15 dark:opacity-20"
                  />
                )}

                {/* Render Line Path */}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Render data node dots */}
                {points.map((p, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="var(--surface-elevated)"
                      stroke="var(--ink)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="9"
                      fill="transparent"
                      className="hover:fill-ink/5"
                    />
                  </g>
                ))}

                {/* Definitions for gradient shade */}
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--ink)" />
                    <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Projections Data Grid */}
      <div className="border border-border/80 bg-surface rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border/20 bg-surface-elevated/40">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
            Tabular Forecast Matrix
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-ink-muted uppercase font-bold bg-surface-elevated/20">
                <th className="px-5 py-3">Month</th>
                <th className="px-5 py-3">MRR</th>
                <th className="px-5 py-3">Additions (+{growthRate}%)</th>
                <th className="px-5 py-3">Churn (-{churnRate}%)</th>
                <th className="px-5 py-3">Cumulative Revenue</th>
              </tr>
            </thead>
            <tbody>
              {projection.map((row) => (
                <tr key={row.month} className="border-b border-border/40 hover:bg-surface-elevated/20 transition-colors">
                  <td className="px-5 py-3 font-bold text-ink">{row.monthName} ({row.month})</td>
                  <td className="px-5 py-3 font-bold text-ink">${row.mrr.toLocaleString()}</td>
                  <td className="px-5 py-3 text-emerald-500 dark:text-emerald-400 font-bold">+${row.newMrr.toLocaleString()}</td>
                  <td className="px-5 py-3 text-red-500 dark:text-red-400 font-bold">-${row.churnedMrr.toLocaleString()}</td>
                  <td className="px-5 py-3 font-bold text-ink-secondary">${row.cumulativeRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
