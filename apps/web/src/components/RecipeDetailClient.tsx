import Link from "next/link";
import { ChainingRecipe } from "@/lib/recipes";
import { getToolById } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

interface RecipeDetailClientProps {
  recipe: ChainingRecipe;
  lang?: string;
}

export default function RecipeDetailClient({ recipe, lang }: RecipeDetailClientProps) {
  const langPrefix = lang && lang !== "en" ? `/${lang}` : "";

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-ink-muted select-none">
        <Link href={`${langPrefix}/`} className="hover:text-accent font-medium transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <Link href={`${langPrefix}/recipes`} className="hover:text-accent font-medium transition-colors">
          Recipes
        </Link>
        <span>&gt;</span>
        <span className="text-ink font-semibold truncate">{recipe.title.split(":")[0]}</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 pt-6 border-b border-border/40 pb-10 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
          Visual Workflow Recipe
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight text-balance">
          {recipe.title}
        </h1>
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-3xl text-balance">
          {recipe.description}
        </p>
      </div>

      {/* Chaining Chain Bar */}
      <div className="bg-surface-muted/30 border border-border/40 rounded-xl p-5 select-none">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ink-secondary mb-3">
          Workflow Pipeline
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {recipe.toolChain.map((toolId, idx) => {
            const tool = getToolById(toolId);
            return (
              <div key={toolId} className="flex items-center gap-3">
                {idx > 0 && (
                  <svg className="w-4 h-4 text-ink-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <Link
                  href={`${langPrefix}/tools/${toolId}`}
                  className="px-4 py-2 bg-surface border border-border/40 hover:border-accent/40 rounded-lg text-sm font-bold text-ink hover:text-accent hover:shadow-sm transition-all duration-200"
                >
                  {tool?.title || toolId}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Above Steps Leaderboard Ad */}
      <div className="py-2 flex justify-center">
        <AdLayoutSlot type="leaderboard" slotId="recipe-top-leaderboard" />
      </div>

      {/* Steps List */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Interactive Guide: Step-by-Step Chaining
        </h2>
        <div className="relative border-l border-border/40 ml-4 space-y-8 py-2">
          {recipe.steps.map((step, idx) => {
            const associatedTool = step.toolId ? getToolById(step.toolId) : null;
            return (
              <div key={idx} className="relative pl-8">
                {/* Step Circle */}
                <span className="absolute -left-[13px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-border/60 text-xs font-bold text-ink shadow-sm">
                  {idx + 1}
                </span>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                    {step.description}
                  </p>
                  
                  {associatedTool && (
                    <div className="pt-2">
                      <Link
                        href={`${langPrefix}/tools/${step.toolId}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-surface-muted hover:bg-surface border border-border/60 hover:border-accent/30 rounded-lg text-xs font-bold text-ink hover:text-accent transition-all duration-200 hover:shadow-sm"
                      >
                        <span>Open {associatedTool.title}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipe FAQs */}
      {recipe.faqs && recipe.faqs.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {recipe.faqs.map((faq, idx) => (
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
