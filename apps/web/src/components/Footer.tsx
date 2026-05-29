"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, SupportedLocale, getTranslations } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();

  const segments = pathname ? pathname.split("/") : [];
  const firstSegment = segments[1] as SupportedLocale;
  const currentLocale = LOCALES.includes(firstSegment) && firstSegment !== "en"
    ? firstSegment
    : "";

  const getLocalizedHref = (path: string) => {
    if (!currentLocale) return path;
    return `/${currentLocale}${path === "/" ? "" : path}`;
  };

  const translations = getTranslations(currentLocale || "en");

  return (
    <footer className="mt-auto border-t border-border/40 py-8 px-6 text-center select-none bg-surface">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ink-secondary">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 uppercase tracking-wider font-bold">
          <Link href={getLocalizedHref("/how-to")} className="hover:text-accent transition-colors duration-200">
            {translations.guidesResources}
          </Link>
          <Link href="/privacy" className="hover:text-accent transition-colors duration-200">
            {translations.privacy}
          </Link>
          <Link href="/terms" className="hover:text-accent transition-colors duration-200">
            {translations.terms}
          </Link>
        </div>
        <div className="flex items-center gap-2 group">
          <svg className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a href="mailto:support@zerowebtools.com" className="font-mono hover:text-ink transition-colors duration-200">
            support@zerowebtools.com
          </a>
        </div>
      </div>
    </footer>
  );
}
