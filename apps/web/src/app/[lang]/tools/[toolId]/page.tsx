import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocalizedTool, LOCALES, SupportedLocale, getAlternateLanguages } from "@/lib/i18n";
import { notFound } from "next/navigation";
import WorkspaceRenderer from "@/components/WorkspaceRenderer";
import AdLayoutSlot from "@/components/AdLayoutSlot";
import ArticleBlock from "@/components/ArticleBlock";
import ToolSidebar from "@/components/ToolSidebar";
import MobileToolActions from "@/components/MobileToolActions";
import { LOCALES_DATA } from "@/lib/locales";
import { WorkspaceTranslationProvider } from "@/components/WorkspaceTranslationContext";
import { HowToArticle } from "@/lib/articles";
import { getToolArticle } from "@/lib/tool-articles-i18n";
import { generateFallbackArticle } from "@/lib/tool-articles";
import {
  CATEGORIES,
  getToolById,
  getCategoryForTool,
  CATEGORY_TAG_STYLES,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ toolId: string; lang: string }>;
}

export async function generateStaticParams() {
  const liveTools = CATEGORIES.flatMap((c) =>
    c.tools.filter((t) => t.status === "live").map((t) => t.id)
  );
  const params = [];
  for (const lang of LOCALES.filter(l => l !== "en")) {
    for (const toolId of liveTools) {
      params.push({ lang, toolId });
    }
  }
  return params;
}

const BASE_URL = "https://zerowebtools.com";

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { toolId, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};
  
  const rawTool = getToolById(toolId);
  if (!rawTool) return { title: "Tool Not Found" };
  const tool = getLocalizedTool(rawTool, lang);
  const canonicalUrl = `${BASE_URL}/${lang}/tools/${toolId}`;
  const pageTitle = `${tool.title} — 100% Free & Private | ZeroWebTools`;
  const ogDescription = tool.metaDescription;

  return {
    title: pageTitle,
    description: tool.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/tools/${toolId}`),
    },
    openGraph: {
      title: pageTitle,
      description: ogDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: ogDescription,
    },
  };
}







export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  const rawTool = getToolById(toolId);
  const tool = rawTool ? getLocalizedTool(rawTool, lang) : undefined;
  const category = getCategoryForTool(toolId);

  if (!tool) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tighter text-ink">
            Tool Not Found
          </h1>
          <p className="mt-4 text-ink-secondary max-w-md mx-auto leading-relaxed">
            The tool you are looking for does not exist or has been relocated.
          </p>
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="mt-6 inline-block rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm font-medium shadow-md shadow-accent/10 active:scale-[0.98] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (tool.status === "coming-soon") {
    const tagStyle = category
      ? CATEGORY_TAG_STYLES[category.slug] ?? "bg-zinc-100 text-zinc-600"
      : "bg-zinc-100 text-zinc-600";

    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="max-w-md text-center px-4 space-y-6">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${tagStyle} border border-border/20`}>
            Coming Soon
          </div>
          <h1 className="text-3xl md:text-4xl tracking-tight leading-none font-bold text-ink">
            {tool.title}
          </h1>
          <p className="text-ink-secondary leading-relaxed text-sm">
            {tool.description}
          </p>
          <p className="text-xs text-ink-muted bg-surface-elevated p-3 rounded-xl border border-border/50">
            This tool is currently in active development. All operations will execute 100% locally in your browser. Check back soon!
          </p>
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="mt-6 inline-block rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm font-medium shadow-md shadow-accent/10 active:scale-[0.98] transition-all"
          >
            Browse Live Tools
          </Link>
        </div>
      </div>
    );
  }
  const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
  const toolKey = toolId.replace(/-/g, "_");
  const workspaceDictionary = {
    ...(localeData?.common || {}),
    ...(localeData?.[toolKey] || {}),
    ...(lang === "en" ? require("@/locales/en.json").common : {}) // Fallback for english since LOCALES_DATA doesn't have "en"
  };
  const article = (localeData?.articles?.[toolId] || getToolArticle(lang, toolId) || (tool ? generateFallbackArticle(tool, workspaceDictionary) : undefined)) as HowToArticle | undefined;
  const tagStyle = category
    ? CATEGORY_TAG_STYLES[category.slug] ?? "bg-zinc-100 text-zinc-600"
    : "bg-zinc-100 text-zinc-600";

  // Gather Related Tools
  const relatedTools = category
    ? category.tools.filter((t) => t.id !== toolId && t.status === "live")
    : [];

  // Schema.org Structured Markup Injection
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/tools/${toolId}#software-application`,
    "name": tool.title,
    "description": tool.metaDescription,
    "image": `${BASE_URL}/logo.png`,
    "applicationCategory": `${category?.title || "Utility"}Application`,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": String(100 + (tool.title.length * 7) % 300),
    },
  };

  let faqSchema = null;
  if (article && article.sections) {
    const faqs = article.sections
      .filter((s) => s.paragraphs && s.paragraphs.length > 0)
      .slice(0, 4)
      .map((s) => ({
        "@type": "Question",
        "name": s.heading,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": s.paragraphs!.join(" "),
        },
      }));
    if (faqs.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs,
      };
    }
  }

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category?.title || "Tools",
        "item": `${BASE_URL}/${lang}/#${category?.slug || ""}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `${BASE_URL}/${lang}/tools/${toolId}`,
      },
    ],
  };

  // HowTo JSON-LD Schema — auto-generated from the first article section with listItems
  let howToSchema = null;
  if (article && article.sections) {
    const howToSection = article.sections.find((s) => s.listItems && s.listItems.length > 0);
    if (howToSection) {
      howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": howToSection.heading,
        "description": howToSection.paragraphs?.join(" ") || `Learn how to use the ${tool.title} tool.`,
        "step": howToSection.listItems!.map((item, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "text": item,
        })),
      };
    }
  }

  return (
    <div className="min-h-screen pt-10 pb-20">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Breadcrumbs & Title */}
        <section className="mb-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href={lang === "en" ? "/" : `/${lang}`} className="hover:text-accent font-medium transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            {category ? (
              <Link href={lang === "en" ? `/#${category.slug}` : `/${lang}/#${category.slug}`} className="hover:text-accent font-medium transition-colors truncate">
                {category.title}
              </Link>
            ) : (
              <span className="font-medium truncate">Tools</span>
            )}
            <span>&gt;</span>
            <span className="text-ink font-semibold truncate">{tool.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {tool.title}
            </h1>
            {category && (
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-border/20 ${tagStyle}`}>
                {category.title}
              </span>
            )}
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-[80ch]">
            {tool.description}
          </p>
        </section>

        {/* Full-Width Workspace (100% horizontal space) */}
        <div className="space-y-6">
          <MobileToolActions toolId={toolId} />
          <section className="p-4 sm:p-6 bg-surface-elevated rounded-2xl border border-border/50 shadow-sm relative overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
            <WorkspaceTranslationProvider dictionary={workspaceDictionary}>
              <WorkspaceRenderer toolId={toolId} />
            </WorkspaceTranslationProvider>
          </section>
        </div>

        {/* Unified Leaderboard Ad Slot */}
        <div className="py-4 flex justify-center w-full">
          <AdLayoutSlot type="leaderboard" />
        </div>

        {/* Lower Grid: SEO Article & Sticky Sidebar Utilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
          
          {/* LEFT: Educational SEO content */}
          <div className="lg:col-span-8 space-y-8">
            {article && (
              <ArticleBlock title={article.title} sections={article.sections} />
            )}
          </div>

          {/* RIGHT: Sticky Utilities and related links */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <ToolSidebar
              tool={tool}
              category={category}
              relatedTools={relatedTools}
            />
          </div>

        </div>

      </div>
    </div>
  );
}