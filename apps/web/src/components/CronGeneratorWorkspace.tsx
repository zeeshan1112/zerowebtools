"use client";

import React, { useState, useEffect } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CronGeneratorWorkspace() {
  const [cronExpression, setCronExpression] = useState("*/15 9-17 * * 1-5");
  const [parsedText, setParsedText] = useState("");
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  // Visual builder state
  const [mode, setMode] = useState<"builder" | "parser">("builder");
  const [minType, setMinType] = useState<"every" | "step" | "specific">("every");
  const [minVal, setMinVal] = useState("15");
  const [hourType, setHourType] = useState<"every" | "step" | "specific">("every");
  const [hourVal, setHourVal] = useState("9-17");
  const [dayType, setDayType] = useState<"every" | "specific">("every");
  const [dayVal, setDayVal] = useState("*");
  const [monthType, setMonthType] = useState<"every" | "specific">("every");
  const [monthVal, setMonthVal] = useState("*");
  const [weekType, setWeekType] = useState<"every" | "specific">("every");
  const [weekVal, setWeekVal] = useState("1-5");

  // Sync visual inputs to expression
  useEffect(() => {
    if (mode !== "builder") return;
    const parts = [
      minType === "every" ? "*" : minType === "step" ? `*/${minVal}` : minVal,
      hourType === "every" ? "*" : hourType === "step" ? `*/${hourVal}` : hourVal,
      dayType === "every" ? "*" : dayVal,
      monthType === "every" ? "*" : monthVal,
      weekType === "every" ? "*" : weekVal,
    ];
    setCronExpression(parts.join(" "));
  }, [minType, minVal, hourType, hourVal, dayType, dayVal, monthType, monthVal, weekType, weekVal, mode]);

  // Sync expression to visual inputs if edited in parser mode
  useEffect(() => {
    parseExpression();
  }, [cronExpression]);

  const parseExpression = () => {
    const parts = cronExpression.trim().split(/\s+/);
    if (parts.length !== 5) {
      setParsedText("Invalid cron expression: must have exactly 5 fields.");
      setNextRuns([]);
      return;
    }

    const [min, hour, day, month, weekday] = parts;

    try {
      const minDesc = parseField(min, "minute", (v) => `${v.padStart(2, "0")}`);
      const hourDesc = parseField(hour, "hour", (v) => `${v}:00`);
      const dayDesc = parseField(day, "day of month", (v) => `the ${v}${getOrdinal(Number(v))}`);
      const monthDesc = parseField(month, "month", (v) => MONTHS[Number(v) - 1] || v);
      const weekDesc = parseField(weekday, "day of week", (v) => WEEKDAYS[Number(v)] || v);

      const description = `Runs ${minDesc}, ${hourDesc}, on ${dayDesc}, in ${monthDesc}, on ${weekDesc}.`;
      setParsedText(description);

      calculateNextRuns(parts);
    } catch (err) {
      setParsedText("Failed to parse expression: check syntax.");
      setNextRuns([]);
    }
  };

  const parseField = (
    field: string,
    unit: string,
    formatVal: (val: string) => string
  ): string => {
    if (field === "*") return `every ${unit}`;
    if (field.startsWith("*/")) {
      const step = field.slice(2);
      return `every ${step} ${unit}s`;
    }
    if (field.includes(",")) {
      const list = field.split(",").map(formatVal);
      return `at ${unit}s: ${list.join(", ")}`;
    }
    if (field.includes("-")) {
      const [start, end] = field.split("-").map(formatVal);
      return `from ${unit} ${start} to ${end}`;
    }
    return `at ${unit} ${formatVal(field)}`;
  };

  const getOrdinal = (n: number) => {
    if (isNaN(n)) return "";
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // Cron Run Calculator (Client-side simulation)
  const calculateNextRuns = (parts: string[]) => {
    const [minPart, hourPart, dayPart, monthPart, weekdayPart] = parts;
    const runs: string[] = [];
    const now = new Date();
    
    // Convert cron expressions into check lists or ranges
    const parseFieldValues = (part: string, min: number, max: number): number[] => {
      if (part === "*") {
        return Array.from({ length: max - min + 1 }, (_, i) => min + i);
      }
      if (part.startsWith("*/")) {
        const step = Number(part.slice(2));
        const list = [];
        for (let i = min; i <= max; i += step) list.push(i);
        return list;
      }
      if (part.includes(",")) {
        return part.split(",").map(Number);
      }
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        const list = [];
        for (let i = start; i <= end; i++) list.push(i);
        return list;
      }
      return [Number(part)];
    };

    try {
      const allowedMins = parseFieldValues(minPart, 0, 59);
      const allowedHours = parseFieldValues(hourPart, 0, 23);
      const allowedDays = parseFieldValues(dayPart, 1, 31);
      const allowedMonths = parseFieldValues(monthPart, 1, 12);
      const allowedWeekdays = parseFieldValues(weekdayPart, 0, 6);

      let testDate = new Date(now.getTime());
      testDate.setSeconds(0);
      testDate.setMilliseconds(0);

      let iterations = 0;
      // Search forward up to 50,000 minutes to find next 5 run times
      while (runs.length < 5 && iterations < 50000) {
        testDate.setMinutes(testDate.getMinutes() + 1);
        iterations++;

        const m = testDate.getMinutes();
        const h = testDate.getHours();
        const d = testDate.getDate();
        const mo = testDate.getMonth() + 1; // JS Month is 0-indexed
        const w = testDate.getDay();

        if (
          allowedMins.includes(m) &&
          allowedHours.includes(h) &&
          allowedDays.includes(d) &&
          allowedMonths.includes(mo) &&
          allowedWeekdays.includes(w)
        ) {
          runs.push(testDate.toString());
        }
      }

      setNextRuns(runs);
    } catch (_) {
      setNextRuns([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4 select-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode("builder")}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl transition-all cursor-pointer ${
              mode === "builder"
                ? "bg-ink border-ink text-surface shadow-sm"
                : "bg-surface border-border hover:border-ink text-ink-secondary"
            }`}
          >
            Visual Builder
          </button>
          <button
            onClick={() => setMode("parser")}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border rounded-xl transition-all cursor-pointer ${
              mode === "parser"
                ? "bg-ink border-ink text-surface shadow-sm"
                : "bg-surface border-border hover:border-ink text-ink-secondary"
            }`}
          >
            Raw Expression Parser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
        
        {/* Editor Area */}
        <div className="lg:col-span-7 space-y-4">
          
          {mode === "builder" ? (
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-5 shadow-sm">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Visual Schedule Builder</h3>

              {/* Minute Configuration */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Minutes</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMinType("every")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      minType === "every" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every Minute (*)
                  </button>
                  <button
                    onClick={() => setMinType("step")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      minType === "step" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every N Minutes (*/)
                  </button>
                  <button
                    onClick={() => setMinType("specific")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      minType === "specific" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Specific Minute
                  </button>
                </div>
                {minType !== "every" && (
                  <input
                    type="text"
                    value={minVal}
                    onChange={(e) => setMinVal(e.target.value)}
                    placeholder={minType === "step" ? "e.g. 15" : "e.g. 0,15,30,45"}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                )}
              </div>

              {/* Hour Configuration */}
              <div className="space-y-2 border-t border-border/50 pt-4">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Hours</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setHourType("every")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      hourType === "every" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every Hour (*)
                  </button>
                  <button
                    onClick={() => setHourType("step")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      hourType === "step" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every N Hours (*/)
                  </button>
                  <button
                    onClick={() => setHourType("specific")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      hourType === "specific" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Specific Hour
                  </button>
                </div>
                {hourType !== "every" && (
                  <input
                    type="text"
                    value={hourVal}
                    onChange={(e) => setHourVal(e.target.value)}
                    placeholder={hourType === "step" ? "e.g. 2" : "e.g. 9-17 or 0,12"}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                )}
              </div>

              {/* Day of Month Configuration */}
              <div className="space-y-2 border-t border-border/50 pt-4">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Day of Month</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDayType("every")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      dayType === "every" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every Day (*)
                  </button>
                  <button
                    onClick={() => setDayType("specific")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      dayType === "specific" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Specific Day
                  </button>
                </div>
                {dayType === "specific" && (
                  <input
                    type="text"
                    value={dayVal === "*" ? "1" : dayVal}
                    onChange={(e) => setDayVal(e.target.value)}
                    placeholder="e.g. 1,15 or 1-10"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                )}
              </div>

              {/* Day of Week (Weekday) Configuration */}
              <div className="space-y-2 border-t border-border/50 pt-4">
                <label className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">Day of Week (Weekday)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWeekType("every")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      weekType === "every" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Every Day (*)
                  </button>
                  <button
                    onClick={() => setWeekType("specific")}
                    className={`py-2 px-3 border text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                      weekType === "specific" ? "bg-accent/5 border-accent text-accent" : "bg-surface border-border/60 text-ink-secondary"
                    }`}
                  >
                    Specific Weekdays
                  </button>
                </div>
                {weekType === "specific" && (
                  <input
                    type="text"
                    value={weekVal === "*" ? "1-5" : weekVal}
                    onChange={(e) => setWeekVal(e.target.value)}
                    placeholder="0=Sun, 1=Mon, ..., 6=Sat (e.g., 1-5 or 0,6)"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-ink focus:outline-none"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Parser Expression Editor</h3>
              
              <div className="space-y-1.5">
                <label htmlFor="cron-input" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Enter Standard Cron Expression (5 fields)
                </label>
                <input
                  id="cron-input"
                  type="text"
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  placeholder="e.g. */5 9-17 * * 1-5"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-xs text-ink focus:border-accent focus:outline-none font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Translation and Calculations Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Output Expression Bar */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-3 shadow-sm select-text">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block select-none">
              Generated Expression
            </span>
            <div className="flex items-center justify-between p-3.5 bg-surface rounded-xl border border-border">
              <span className="font-mono text-sm font-bold text-accent tracking-wide">{cronExpression}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(cronExpression);
                }}
                className="text-[10px] font-bold text-ink-secondary hover:text-accent cursor-pointer uppercase tracking-wider select-none"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Parsed English text */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-3 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">
              English Translation Description
            </span>
            <p className="text-xs text-ink-secondary leading-relaxed bg-surface p-4 rounded-xl border border-border select-text">
              {parsedText}
            </p>
          </div>

          {/* Upcoming run schedules */}
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-3 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">
              Next 5 Scheduled Run Times
            </span>
            <div className="space-y-2">
              {nextRuns.length > 0 ? (
                nextRuns.map((run, idx) => (
                  <div key={idx} className="p-3 bg-surface rounded-xl border border-border text-[11px] font-medium text-ink font-sans flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {run}
                  </div>
                ))
              ) : (
                <div className="p-4 bg-surface rounded-xl border border-border border-dashed text-center text-xs text-ink-muted font-medium">
                  No upcoming run dates found (ensure expression is valid).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
