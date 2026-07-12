"use client";

import { useState } from "react";
import Link from "next/link";
import { HOW_TO_ARTICLES } from "@/lib/articles";
import { RECIPES } from "@/lib/recipes";
import { COMPARISONS } from "@/lib/comparisons";
import { LOCALES_DATA } from "@/lib/locales";
import { getTranslations, SupportedLocale } from "@/lib/i18n";
interface GuidesIndexClientProps {
  lang?: string;
}

type TabType = "guides" | "recipes" | "compare";

export default function GuidesIndexClient({ lang }: GuidesIndexClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("guides");
  const langPrefix = lang && lang !== "en" ? `/${lang}` : "";
  const translations = getTranslations(lang);

  const localizedArticles = HOW_TO_ARTICLES.map((article) => {
    if (!lang || lang === "en") return article;
    const translated = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">]?.articles?.[article.toolId];
    if (translated) {
      return {
        ...article,
        title: translated.title || article.title,
        metaDescription: translated.metaDescription || article.metaDescription,
      };
    }
    return article;
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-border/40 pb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest font-bold text-accent px-2.5 py-1 bg-accent-light/10 rounded-full border border-accent/20">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-4 mb-3">
          {translations.guidesResources}
        </h1>
        <p className="text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
          {translations.howToDesc}
        </p>
      </div>

      {/* Modern Tabs Bar */}
      <div className="flex border-b border-border/40 gap-4 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("guides")}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold tracking-tight border-b-2 transition-all duration-200 outline-none ${
            activeTab === "guides"
              ? "border-accent text-accent"
              : "border-transparent text-ink-secondary hover:text-ink"
          }`}
        >
          <span>{lang === "es" ? "Guías de herramientas" : lang === "de" ? "Tool-Anleitungen" : lang === "fr" ? "Guides d'outils" : lang === "pt" ? "Guias de Ferramentas" : "Tool Guides"}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            activeTab === "guides" ? "bg-accent/10 text-accent" : "bg-surface-muted border border-border/40 text-ink-muted"
          }`}>
            {HOW_TO_ARTICLES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("recipes")}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold tracking-tight border-b-2 transition-all duration-200 outline-none ${
            activeTab === "recipes"
              ? "border-accent text-accent"
              : "border-transparent text-ink-secondary hover:text-ink"
          }`}
        >
          <span>{lang === "es" ? "Recetas de flujo" : lang === "de" ? "Workflow-Rezepte" : lang === "fr" ? "Recettes de flux" : lang === "pt" ? "Receitas de Fluxo" : "Workflow Recipes"}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            activeTab === "recipes" ? "bg-accent/10 text-accent" : "bg-surface-muted border border-border/40 text-ink-muted"
          }`}>
            {RECIPES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 pb-4 text-sm font-semibold tracking-tight border-b-2 transition-all duration-200 outline-none ${
            activeTab === "compare"
              ? "border-accent text-accent"
              : "border-transparent text-ink-secondary hover:text-ink"
          }`}
        >
          <span>{lang === "es" ? "Comparaciones" : lang === "de" ? "Alternativen & Vergleiche" : lang === "fr" ? "Alternatives" : lang === "pt" ? "Alternativas" : "Alternatives & Matchups"}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
            activeTab === "compare" ? "bg-accent/10 text-accent" : "bg-surface-muted border border-border/40 text-ink-muted"
          }`}>
            {COMPARISONS.length}
          </span>
        </button>
      </div>



      {/* Tabs Content */}
      <div className="pt-2">
        {/* Tab 1: Tool Guides */}
        <div className={activeTab === "guides" ? "block" : "hidden"}>
          <div className="grid gap-4">
            {localizedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`${langPrefix}/how-to/${article.slug}`}
                className="group block p-6 rounded-2xl border border-border/40 bg-surface hover:bg-surface-elevated/40 transition-all duration-200 hover:shadow-sm"
              >
                <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                  {article.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tab 2: Workflow Recipes */}
        <div className={activeTab === "recipes" ? "block" : "hidden"}>
          <div className="grid gap-4">
            {RECIPES.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group block p-6 rounded-2xl border border-border/40 bg-surface hover:bg-surface-elevated/40 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {recipe.toolChain.map((toolId, tIdx) => (
                    <span
                      key={toolId}
                      className="text-[9px] font-mono font-bold text-ink-secondary bg-surface-muted border border-border/20 px-1.5 py-0.5 rounded"
                    >
                      {tIdx > 0 && "→ "} {toolId}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">
                  {recipe.title}
                </h2>
                <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                  {recipe.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tab 3: Competitor Comparisons */}
        <div className={activeTab === "compare" ? "block" : "hidden"}>
          <div className="grid gap-4">
            {COMPARISONS.map((matchup) => (
              <Link
                key={matchup.slug}
                href={`/compare/${matchup.slug}`}
                className="group block p-6 rounded-2xl border border-border/40 bg-surface hover:bg-surface-elevated/40 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold text-ink-secondary bg-surface-muted border border-border/20 px-2 py-0.5 rounded">
                    vs {matchup.competitorName}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">
                  {matchup.title.split(":")[0]}
                </h2>
                <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                  {matchup.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
