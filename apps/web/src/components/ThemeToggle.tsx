"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initial sync
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-surface-elevated text-ink hover:text-accent shadow-sm active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center w-9 h-9"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "light" ? 0 : -32,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : 45,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : 32,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -45,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </motion.div>
    </button>
  );
}
