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
          <Link href={getLocalizedHref("/about")} className="hover:text-accent transition-colors duration-200">
            {translations.headerAbout || "About"}
          </Link>
          <Link href={getLocalizedHref("/contact")} className="hover:text-accent transition-colors duration-200">
            {translations.headerContact || "Contact"}
          </Link>
          <Link href={getLocalizedHref("/privacy")} className="hover:text-accent transition-colors duration-200">
            {translations.privacy}
          </Link>
          <Link href={getLocalizedHref("/terms")} className="hover:text-accent transition-colors duration-200">
            {translations.terms}
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 group">
            <svg className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:support@zerowebtools.com" className="font-mono hover:text-ink transition-colors duration-200">
              support@zerowebtools.com
            </a>
          </div>
          <div className="hidden sm:block w-px h-3 bg-border/40" />
          <a
            href="https://github.com/zeeshan1112/zerowebtools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ink-secondary hover:text-ink transition-colors duration-200"
          >
            <svg className="w-4 h-4 text-ink-muted" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
