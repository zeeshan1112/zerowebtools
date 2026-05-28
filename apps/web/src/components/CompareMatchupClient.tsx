import Link from "next/link";
import { ComparisonMatchup } from "@/lib/comparisons";
import { getToolById } from "@/lib/tools";

interface CompareMatchupClientProps {
  matchup: ComparisonMatchup;
  lang?: string;
}

export default function CompareMatchupClient({ matchup, lang }: CompareMatchupClientProps) {
  const langPrefix = lang && lang !== "en" ? `/${lang}` : "";

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-ink-muted select-none">
        <Link href={`${langPrefix}/`} className="hover:text-accent font-medium transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <Link href={`${langPrefix}/compare`} className="hover:text-accent font-medium transition-colors">
          Compare
        </Link>
        <span>&gt;</span>
        <span className="text-ink font-semibold truncate">{matchup.competitorName} Alternative</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 pt-6 border-b border-border/40 pb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
          Privacy Comparison
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight text-balance">
          {matchup.title}
        </h1>
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed text-balance">
          {matchup.introText}
        </p>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-ink">
          Comparison Matrix: ZeroWebTools vs {matchup.competitorName}
        </h2>
        <div className="overflow-x-auto border border-border/40 rounded-xl bg-surface shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-surface-muted/50">
                <th className="p-4 text-xs font-bold text-ink uppercase tracking-wider">Metric / Feature</th>
                <th className="p-4 text-xs font-bold text-ink uppercase tracking-wider">{matchup.competitorName}</th>
                <th className="p-4 text-xs font-bold text-accent uppercase tracking-wider">ZeroWebTools (You)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {matchup.tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-muted/10 transition-colors">
                  <td className="p-4 text-sm font-semibold text-ink">{row.feature}</td>
                  <td className="p-4 text-sm text-ink-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      {row.isWinner === "zerowebtools" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      )}
                      {row.competitorValue}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-semibold ${row.isWinner === "zerowebtools" ? "text-accent bg-accent-light/5" : "text-ink"}`}>
                    <span className="inline-flex items-center gap-1.5">
                      {row.isWinner === "zerowebtools" && (
                        <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {row.zeroValue}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Content Sections */}
      <div className="space-y-10 py-4">
        {matchup.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-ink">{section.heading}</h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Target Tools Links */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <h2 className="text-xl font-bold tracking-tight text-ink text-center">
          Launch Secure Alternatives Offline
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {matchup.targetTools.map((toolId) => {
            const tool = getToolById(toolId);
            if (!tool) return null;
            return (
              <Link
                key={tool.id}
                href={`${langPrefix}/tools/${tool.id}`}
                className="flex flex-col bg-surface border border-border/40 hover:border-accent/40 rounded-xl p-5 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="text-sm font-bold text-ink mb-1 group-hover:text-accent">
                  {tool.title}
                </span>
                <span className="text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                  {tool.description}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Matchup FAQs */}
      {matchup.faqs && matchup.faqs.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-border/40">
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {matchup.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-border/40 rounded-xl bg-surface p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-1.5 focus:outline-none">
                  <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-accent transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <span className="transition duration-300 group-open:-rotate-180">
                    <svg className="w-5 h-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-ink-secondary leading-relaxed pr-6 select-text">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
