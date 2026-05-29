"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LOCALES, SupportedLocale } from "@/lib/i18n";

const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  pt: "Português",
  ja: "日本語",
  zh: "简体中文",
  hi: "हिन्दी",
  it: "Italiano",
  ar: "العربية",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current locale from pathname
  const segments = pathname.split("/");
  const firstSegment = segments[1] as SupportedLocale;
  const currentLocale: SupportedLocale = LOCALES.includes(firstSegment) && firstSegment !== "en"
    ? firstSegment
    : "en";

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    let newPathname = "";
    const englishOnlyPaths = ["/compare", "/recipes", "/conversions", "/privacy", "/terms", "/extensions"];
    const isEnglishOnly = englishOnlyPaths.some(p => pathname.startsWith(p));
    const hasLocalePrefix = LOCALES.includes(firstSegment) && firstSegment !== "en";

    if (isEnglishOnly) {
      if (newLocale === "en") {
        newPathname = pathname;
      } else {
        newPathname = `/${newLocale}`;
      }
    } else if (hasLocalePrefix) {
      if (newLocale === "en") {
        // Remove locale prefix
        newPathname = "/" + segments.slice(2).join("/");
      } else {
        // Replace locale prefix
        newPathname = "/" + [newLocale, ...segments.slice(2)].join("/");
      }
    } else {
      if (newLocale === "en") {
        newPathname = pathname;
      } else {
        // Prepend locale prefix
        newPathname = "/" + [newLocale, ...segments.slice(1)].join("/");
      }
    }

    // Standardize double slashes
    newPathname = newPathname.replace(/\/+/g, "/");
    if (newPathname.endsWith("/") && newPathname.length > 1) {
      newPathname = newPathname.slice(0, -1);
    }
    if (!newPathname.startsWith("/")) {
      newPathname = "/" + newPathname;
    }

    setIsOpen(false);
    router.push(newPathname);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-surface hover:bg-surface-elevated/60 hover:border-border/80 text-xs font-semibold text-ink-secondary hover:text-ink transition-all duration-200 cursor-pointer outline-none select-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="uppercase tracking-wider">{currentLocale}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 text-ink-muted group-hover:text-ink ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-border/40 bg-surface shadow-lg z-50 overflow-hidden py-1">
          <div className="max-h-60 overflow-y-auto">
            {LOCALES.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer select-none ${
                  currentLocale === locale
                    ? "bg-accent-light text-ink font-bold"
                    : "text-ink-secondary hover:bg-surface-elevated hover:text-ink"
                }`}
              >
                {LOCALE_NAMES[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
