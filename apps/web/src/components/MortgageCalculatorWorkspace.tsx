"use client";

import React, { useState, useMemo } from "react";
import { calculateAmortization } from "@hub/tools-core";

export default function MortgageCalculatorWorkspace() {
  const [principal, setPrincipal] = useState(300000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [termYears, setTermYears] = useState(30);

  const schedule = useMemo(() => {
    return calculateAmortization(principal, interestRate, termYears);
  }, [principal, interestRate, termYears]);

  // Aggregate monthly periods into yearly buckets for visual charts & tables
  const yearlyStats = useMemo(() => {
    const years: {
      year: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];

    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
    let currentYearPayment = 0;

    schedule.periods.forEach((p, index) => {
      currentYearPrincipal += p.principal;
      currentYearInterest += p.interest;
      currentYearPayment += p.payment;

      if ((index + 1) % 12 === 0 || index === schedule.periods.length - 1) {
        years.push({
          year: Math.ceil((index + 1) / 12),
          payment: currentYearPayment,
          principal: currentYearPrincipal,
          interest: currentYearInterest,
          balance: p.remainingBalance,
        });
        currentYearPrincipal = 0;
        currentYearInterest = 0;
        currentYearPayment = 0;
      }
    });

    return years;
  }, [schedule]);

  // SVG Chart Dimensions & Computations
  const chartWidth = 500;
  const chartHeight = 220;
  const chartPadding = { top: 20, right: 20, bottom: 30, left: 50 };

  const chartSVG = useMemo(() => {
    if (yearlyStats.length === 0) return null;

    const maxYearlyCost = Math.max(...yearlyStats.map((y) => y.principal + y.interest));
    
    // Scale helper
    const getX = (index: number) => {
      const w = chartWidth - chartPadding.left - chartPadding.right;
      return chartPadding.left + (index / yearlyStats.length) * w;
    };

    const getY = (val: number) => {
      const h = chartHeight - chartPadding.top - chartPadding.bottom;
      return chartHeight - chartPadding.bottom - (val / maxYearlyCost) * h;
    };

    const w = (chartWidth - chartPadding.left - chartPadding.right) / yearlyStats.length - 4;

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none font-mono text-[9px]">
        {/* Y Axis Gridlines & Labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const val = maxYearlyCost * ratio;
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

        {/* Stacked Bars */}
        {yearlyStats.map((yStats, idx) => {
          const x = getX(idx) + 2;
          const yInt = getY(yStats.interest);
          const yPri = getY(yStats.principal + yStats.interest);
          const hInt = chartHeight - chartPadding.bottom - yInt;
          const hPri = yInt - yPri;

          return (
            <g key={yStats.year} className="group">
              {/* Interest bar segment (Red/Pink/Amber tone) */}
              <rect
                x={x}
                y={yInt}
                width={Math.max(2, w)}
                height={Math.max(0, hInt)}
                fill="#f59e0b"
                className="opacity-75 group-hover:opacity-100 transition-opacity"
              />
              {/* Principal bar segment (Emerald/Cyan tone) */}
              <rect
                x={x}
                y={yPri}
                width={Math.max(2, w)}
                height={Math.max(0, hPri)}
                fill="#10b981"
                className="opacity-75 group-hover:opacity-100 transition-opacity"
              />
              {/* Year label below */}
              {idx % Math.ceil(yearlyStats.length / 6) === 0 && (
                <text x={x + w / 2} y={chartHeight - 10} textAnchor="middle" className="fill-ink-muted">
                  Yr {yStats.year}
                </text>
              )}
              <title>{`Year ${yStats.year}: Principal Paid: $${Math.round(yStats.principal).toLocaleString()} Interest Paid: $${Math.round(yStats.interest).toLocaleString()} Remaining Balance: $${Math.round(yStats.balance).toLocaleString()}`}</title>
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
  }, [yearlyStats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Loan Settings</h3>

            {/* Principal input */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="mortgage-principal-input">Loan Principal</label>
                <span className="font-mono text-accent">${principal.toLocaleString()}</span>
              </div>
              <input
                id="mortgage-principal-input"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Math.max(1000, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
              <input
                type="range"
                min="10000"
                max="2000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-ink-muted uppercase">
                <label htmlFor="mortgage-rate-input">Annual Interest Rate</label>
                <span className="font-mono text-accent">{interestRate}%</span>
              </div>
              <input
                id="mortgage-rate-input"
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3.5 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-mono"
              />
              <input
                type="range"
                min="0.1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-accent bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
            </div>

            {/* Term length */}
            <div className="space-y-2">
              <label htmlFor="mortgage-term-input" className="text-[10px] font-bold text-ink-muted uppercase block">Loan Term</label>
              <select
                id="mortgage-term-input"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface-elevated/70 px-3 py-2.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent cursor-pointer"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>

          {/* Core Metrics Box */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm select-none">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Metrics Summary</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-secondary font-medium">Monthly Payment:</span>
                <span className="font-bold text-lg text-emerald-500 font-mono">
                  ${schedule.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-secondary font-medium">Total Interest Paid:</span>
                <span className="font-bold text-ink font-mono">
                  ${schedule.totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-border/40 pt-2">
                <span className="text-ink-secondary font-medium">Total Cost of Loan:</span>
                <span className="font-bold text-ink font-mono">
                  ${schedule.totalCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Charts & Table Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Custom SVG Stacked Bar Chart */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Principal vs Interest paid</h3>
              <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded" />
                  <span>Principal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded" />
                  <span>Interest</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/5 rounded-xl border border-border/30">
              {chartSVG}
            </div>
          </div>

          {/* Yearly Amortization Data Grid */}
          <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-sm">
            <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-3 select-none">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Annual Breakdown Schedule</h3>
            </div>
            <div className="overflow-x-auto max-h-60">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-100/40 dark:bg-zinc-800/20 text-[9px] font-bold text-ink-muted uppercase border-b border-border/60">
                    <th className="p-3">Year</th>
                    <th className="p-3 text-right">Payments</th>
                    <th className="p-3 text-right">Principal</th>
                    <th className="p-3 text-right">Interest</th>
                    <th className="p-3 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono text-ink-secondary">
                  {yearlyStats.map((y) => (
                    <tr key={y.year} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                      <td className="p-3 font-sans font-bold">Year {y.year}</td>
                      <td className="p-3 text-right">${Math.round(y.payment).toLocaleString()}</td>
                      <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">${Math.round(y.principal).toLocaleString()}</td>
                      <td className="p-3 text-right text-amber-600 dark:text-amber-400">${Math.round(y.interest).toLocaleString()}</td>
                      <td className="p-3 text-right">${Math.round(y.balance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
