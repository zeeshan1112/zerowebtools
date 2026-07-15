import Link from "next/link";
import { getLocalizedComparisons } from "@/lib/comparisons-i18n";
import { getTranslations } from "@/lib/i18n";

interface CompareIndexClientProps {
  lang?: string;
}

export default function CompareIndexClient({ lang }: CompareIndexClientProps) {
  const langPrefix = lang && lang !== "en" ? `/${lang}` : "";
  const t = getTranslations(lang || "en");
  const comparisons = getLocalizedComparisons(lang || "en");

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest font-bold text-accent px-2.5 py-1 bg-accent-light/10 rounded-full border border-accent/20">
          {t.compareTag || "Alternatives & Matchups"}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink mt-4 sm:text-4xl">
          {t.compareTitle || "ZeroWebTools vs Competitors"}
        </h1>
        <p className="text-base text-ink-secondary mt-3">
          {t.compareDesc || "Discover why ZeroWebTools is the leading privacy-first alternative. 100% local, browser-based execution with zero file uploads and no subscription walls."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {comparisons.map((matchup) => (
          <Link
            key={matchup.slug}
            href={`${langPrefix}/compare/${matchup.slug}`}
            className="group relative flex flex-col bg-surface border border-border/40 hover:border-accent/40 rounded-xl p-6 transition-all duration-300 hover:shadow-md active:scale-[0.99] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono font-bold text-ink-secondary bg-surface-muted border border-border/20 px-2 py-0.5 rounded">
                {t.compareVs || "vs"} {matchup.competitorName}
              </span>
              <span className="text-xs font-bold text-accent group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5">
                {t.compareBtn || "Compare"} {` `}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors duration-200 line-clamp-1 mb-2">
              {matchup.title.split(":")[0]}
            </h2>
            <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
              {matchup.metaDescription}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
