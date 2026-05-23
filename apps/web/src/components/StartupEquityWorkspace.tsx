"use client";

import React, { useState, useEffect } from "react";

interface VestingYear {
  year: number;
  percentage: number;
  shares: number;
  value: number;
  status: string;
}

export default function StartupEquityWorkspace() {
  const [totalShares, setTotalShares] = useState<number>(10000000);
  const [valuation, setValuation] = useState<number>(15000000);
  const [grantShares, setGrantShares] = useState<number>(200000);
  const [vestingYears, setVestingYears] = useState<number>(4);
  const [hasCliff, setHasCliff] = useState<boolean>(true);
  const [schedule, setSchedule] = useState<VestingYear[]>([]);

  // Compute stats
  const ownershipPercent = totalShares > 0 ? (grantShares / totalShares) * 100 : 0;
  const equityValue = totalShares > 0 ? (grantShares / totalShares) * valuation : 0;
  const sharePrice = totalShares > 0 ? valuation / totalShares : 0;

  useEffect(() => {
    const list: VestingYear[] = [];
    const sharesPerYear = grantShares / vestingYears;
    const percentPerYear = 100 / vestingYears;

    for (let i = 1; i <= vestingYears; i++) {
      let status = "Standard Vest";
      if (i === 1 && hasCliff) {
        status = "1-Year Cliff Vest";
      }

      list.push({
        year: i,
        percentage: Math.round(percentPerYear * i),
        shares: Math.round(sharesPerYear * i),
        value: Math.round((sharesPerYear * i) * sharePrice),
        status,
      });
    }
    setSchedule(list);
  }, [totalShares, valuation, grantShares, vestingYears, hasCliff, sharePrice]);

  return (
    <div className="space-y-8 font-mono select-none">
      
      {/* High CPC Financial Header Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Ownership Size</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            {ownershipPercent.toFixed(4)}%
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Estimated Value</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            ${Math.round(equityValue).toLocaleString()}
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Implied Share Price</span>
          <output className="text-xl font-extrabold text-ink block mt-1">
            ${sharePrice.toFixed(2)}
          </output>
        </div>
        <div className="border border-border/80 bg-surface p-4 rounded-xl shadow-sm">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">Vest Completion</span>
          <output className="text-xl font-extrabold text-emerald-500 dark:text-emerald-400 block mt-1">
            {vestingYears} Years
          </output>
        </div>
      </div>

      {/* Inputs & Visual Timeline split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Parameters sliders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-border/40 pb-2">
              Equity parameters
            </h3>
            
            {/* Input 1: Company Valuation */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="company-valuation" className="font-bold text-ink-secondary">COMPANY VALUATION</label>
                <span className="font-bold text-ink">${valuation.toLocaleString()}</span>
              </div>
              <input
                id="company-valuation"
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={valuation}
                onChange={(e) => setValuation(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>

            {/* Input 2: Total Outstanding Shares */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="outstanding-shares" className="font-bold text-ink-secondary">OUTSTANDING SHARES</label>
                <span className="font-bold text-ink">{totalShares.toLocaleString()}</span>
              </div>
              <input
                id="outstanding-shares"
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={totalShares}
                onChange={(e) => setTotalShares(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>

            {/* Input 3: Employee Grant Shares */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <label htmlFor="grant-shares" className="font-bold text-ink-secondary">YOUR OPTION SHARES</label>
                <span className="font-bold text-ink">{grantShares.toLocaleString()}</span>
              </div>
              <input
                id="grant-shares"
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={grantShares}
                onChange={(e) => setGrantShares(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-ink"
              />
            </div>

            {/* Input 4: Vesting Horizon & Cliff */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="vest-duration" className="text-[10px] font-bold text-ink-secondary block">DURATION</label>
                <select
                  id="vest-duration"
                  value={vestingYears}
                  onChange={(e) => setVestingYears(Number(e.target.value))}
                  className="w-full bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-accent font-bold"
                >
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Years</option>
                  <option value={3}>3 Years</option>
                  <option value={4}>4 Years</option>
                  <option value={5}>5 Years</option>
                </select>
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="flex items-center gap-2 h-9">
                  <input
                    id="has-cliff"
                    type="checkbox"
                    checked={hasCliff}
                    onChange={(e) => setHasCliff(e.target.checked)}
                    className="w-4 h-4 text-ink bg-surface border-border rounded focus:ring-accent accent-ink cursor-pointer"
                  />
                  <label htmlFor="has-cliff" className="text-[10px] font-bold text-ink-secondary cursor-pointer select-none">
                    1-YEAR CLIFF
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Visualizing Vesting Schedule vector flow */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-border/80 bg-surface rounded-2xl p-5 shadow-sm">
            <h4 className="text-[10px] font-bold text-ink uppercase tracking-wider border-b border-border/20 pb-3 mb-5">
              Option ownership proportion & timeline
            </h4>
            
            {/* SVG Proportional Ownership & Vesting Progress flow */}
            <div className="space-y-6">
              
              {/* Proportional Ownership Ring Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[9px] font-bold text-ink-muted">
                  <span>OUTSTANDING CAPITALIZATION ({totalShares.toLocaleString()} SHARES)</span>
                  <span>YOUR GRANT ({grantShares.toLocaleString()})</span>
                </div>
                <div className="h-6 w-full bg-surface-elevated/80 border border-border rounded-lg overflow-hidden flex relative">
                  <div className="bg-ink h-full shrink-0 flex items-center justify-center text-[8px] font-bold text-surface min-w-[2px]" style={{ width: `${Math.max(1, ownershipPercent * 4)}%` }} />
                  <div className="flex-1 flex items-center justify-end px-3 text-[9px] font-bold text-ink-muted">
                    {ownershipPercent.toFixed(4)}% pool size
                  </div>
                </div>
              </div>

              {/* Graphic Vesting Timeline */}
              <div className="space-y-4 pt-2">
                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">
                  Interactive Vesting Milestone Vector
                </span>

                <div className="relative pl-6 border-l border-border space-y-5 py-2">
                  {/* Start Point */}
                  <div className="absolute top-0 left-[-4.5px] w-2.5 h-2.5 rounded-full bg-border" />
                  
                  {schedule.map((year) => {
                    const isCliff = year.year === 1 && hasCliff;
                    return (
                      <div key={year.year} className="relative group">
                        {/* Dot indicator */}
                        <div className={`absolute top-1 left-[-30px] w-4 h-4 rounded-full border-2 flex items-center justify-center font-bold text-[8px] transition-all bg-surface ${
                          isCliff ? "border-red-500 text-red-500" : "border-ink text-ink"
                        }`}>
                          {year.year}
                        </div>
                        
                        <div className="bg-surface-elevated/40 border border-border/60 p-3.5 rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-extrabold text-ink uppercase tracking-wider">Year {year.year} Vest</span>
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                              isCliff ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300" : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                            }`}>
                              {year.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-1.5 text-[9px] font-bold text-ink-muted uppercase">
                            <div>
                              Cumulative Shares: <span className="text-ink">{year.shares.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              Vested Value: <span className="text-ink text-[10px]">${year.value.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
