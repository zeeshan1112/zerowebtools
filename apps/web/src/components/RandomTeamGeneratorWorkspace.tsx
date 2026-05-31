"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

const UsersIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const ShuffleIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
);

const UserPlusIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
);

const DivideIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="6" r="2"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="18" r="2"/></svg>
);

export default function RandomTeamGeneratorWorkspace() {
  const t = useWorkspaceTranslation();

  const [input, setInput] = useState("");
  const [splitMethod, setSplitMethod] = useState<"teams" | "persons">("teams");
  const [splitValue, setSplitValue] = useState<number>(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const participants = useMemo(() => {
    return input
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  }, [input]);

  const generateTeams = () => {
    setIsGenerating(true);
    setTeams([]); // Clear existing

    setTimeout(() => {
      // Fisher-Yates shuffle
      const shuffled = [...participants];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const newTeams: string[][] = [];
      
      if (splitMethod === "teams") {
        const numTeams = Math.max(1, splitValue);
        for (let i = 0; i < numTeams; i++) {
          newTeams.push([]);
        }
        shuffled.forEach((person, index) => {
          newTeams[index % numTeams].push(person);
        });
      } else {
        const personsPerTeam = Math.max(1, splitValue);
        for (let i = 0; i < shuffled.length; i += personsPerTeam) {
          newTeams.push(shuffled.slice(i, i + personsPerTeam));
        }
      }

      setTeams(newTeams);
      setIsGenerating(false);
    }, 600); // Add a small delay for animation effect
  };

  const getTeamColor = (index: number) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-fuchsia-600",
      "from-pink-500 to-rose-600",
      "from-amber-500 to-orange-600",
      "from-cyan-500 to-blue-600",
      "from-lime-500 to-green-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-surface-elevated border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-ink mb-3">
                <UsersIcon className="w-4 h-4 text-accent" />
                Participants ({participants.length})
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter names separated by commas or new lines...&#10;Alice&#10;Bob&#10;Charlie"
                className="w-full h-48 bg-surface border border-border/50 rounded-xl p-4 text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-ink">Split Configuration</label>
              <div className="flex bg-surface border border-border/50 rounded-xl p-1 relative overflow-hidden">
                <button
                  onClick={() => setSplitMethod("teams")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                    splitMethod === "teams" ? "text-white" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  <DivideIcon className="w-4 h-4" />
                  Number of Teams
                </button>
                <button
                  onClick={() => setSplitMethod("persons")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all relative z-10 ${
                    splitMethod === "persons" ? "text-white" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  <UserPlusIcon className="w-4 h-4" />
                  Persons per Team
                </button>
                {/* Animated Background Pill */}
                <div 
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-lg shadow-md transition-all duration-300 ease-out z-0`}
                  style={{ left: splitMethod === "teams" ? "4px" : "calc(50%)" }}
                />
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={splitValue}
                  onChange={(e) => setSplitValue(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 bg-surface border border-border/50 rounded-xl p-3 text-center font-bold text-ink focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
                <span className="text-sm font-medium text-ink-secondary">
                  {splitMethod === "teams" ? "Total teams to create" : "Maximum people in each team"}
                </span>
              </div>
            </div>

            <button
              onClick={generateTeams}
              disabled={participants.length < 2 || isGenerating}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent text-white font-extrabold uppercase tracking-wide hover:bg-accent/90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <ShuffleIcon className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ShuffleIcon className="w-5 h-5" />
                  Generate Teams
                </>
              )}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="bg-surface rounded-2xl border border-border/30 p-6 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-extrabold text-ink mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                <UsersIcon className="w-4 h-4" />
              </span>
              Generated Teams
            </h3>

            {!teams.length && !isGenerating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-ink-muted">
                <ShuffleIcon className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium">Add participants and generate teams</p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
              <AnimatePresence>
                {teams.map((team, idx) => (
                  <motion.div
                    key={`team-${idx}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4, type: "spring" }}
                    className="bg-surface-elevated border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${getTeamColor(idx)} p-3 text-white font-bold flex justify-between items-center`}>
                      <span>Team {idx + 1}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-md">{team.length}</span>
                    </div>
                    <ul className="p-4 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                      {team.map((member, mIdx) => (
                        <motion.li
                          key={mIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx * 0.1) + (mIdx * 0.05) }}
                          className="text-sm font-medium text-ink flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-border" />
                          {member}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
