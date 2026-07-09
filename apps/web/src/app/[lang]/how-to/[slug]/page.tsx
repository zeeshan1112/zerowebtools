import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocalizedTool, LOCALES, SupportedLocale, getAlternateLanguages } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { HOW_TO_ARTICLES } from "@/lib/articles";
import { getToolById } from "@/lib/tools";
import ArticleBlock from "@/components/ArticleBlock";
import { LOCALES_DATA } from "@/lib/locales";

interface HowToPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

const BASE_URL = "https://zerowebtools.com";

export async function generateStaticParams() {
  const params = [];
  for (const lang of LOCALES.filter(l => l !== "en")) {
    for (const article of HOW_TO_ARTICLES) {
      const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
      const translated = localeData?.articles?.[article.toolId];
      if (translated) {
        params.push({ lang, slug: article.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: HowToPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};
  
  const englishArticle = HOW_TO_ARTICLES.find((a) => a.slug === slug);
  if (!englishArticle) return { title: "Not Found" };

  const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
  const translated = localeData?.articles?.[englishArticle.toolId];
  if (!translated) return { title: "Not Found" };

  const article = {
    ...englishArticle,
    title: translated.title || englishArticle.title,
    metaDescription: translated.metaDescription || englishArticle.metaDescription,
  };

  const canonicalUrl = `${BASE_URL}/${lang}/how-to/${slug}`;

  // Find all languages where this specific article is translated
  const allowedLocales = LOCALES.filter(l => {
    if (l === "en") return true;
    const lData = LOCALES_DATA[l as Exclude<SupportedLocale, "en">];
    return !!lData?.articles?.[englishArticle.toolId];
  });

  return {
    title: `${article.title} — Free Online Guide | ZeroWebTools`,
    description: article.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/how-to/${slug}`, allowedLocales),
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function HowToPage({ params }: HowToPageProps) {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  
  const englishArticle = HOW_TO_ARTICLES.find((a) => a.slug === slug);

  if (!englishArticle) {
    notFound();
  }

  const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
  const translated = localeData?.articles?.[englishArticle.toolId];

  if (!translated) {
    notFound();
  }

  const article = {
    ...englishArticle,
    title: translated.title || englishArticle.title,
    metaDescription: translated.metaDescription || englishArticle.metaDescription,
    sections: (translated.sections || englishArticle.sections).map((sec: any, idx: number) => ({
      ...englishArticle.sections[idx],
      heading: sec.heading || englishArticle.sections[idx]?.heading,
      paragraphs: sec.paragraphs || englishArticle.sections[idx]?.paragraphs,
      listItems: sec.listItems || englishArticle.sections[idx]?.listItems,
    })),
    faqs: (translated.faqs || englishArticle.faqs || []).map((faq: any, idx: number) => ({
      ...englishArticle.faqs?.[idx],
      question: faq.question || englishArticle.faqs?.[idx]?.question,
      answer: faq.answer || englishArticle.faqs?.[idx]?.answer,
    })),
  };

  const targetTool = getToolById(article.toolId);
  const localizedTool = targetTool ? getLocalizedTool(targetTool, lang) : null;
  const toolTitle = localizedTool?.title || "Tool";

  // Generate Schemas
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
        "name": "Guides",
        "item": `${BASE_URL}/${lang}/how-to`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${BASE_URL}/${lang}/how-to/${slug}`,
      },
    ],
  };


  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "ZeroWebTools"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZeroWebTools",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon-192x192.png`
      }
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}


      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <Link href={`/${lang}`} className="hover:text-accent font-medium transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="font-medium truncate">Guides</span>
          <span>&gt;</span>
          <span className="text-ink font-semibold truncate">{article.title}</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 text-center pt-8 border-b border-border/40 pb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-2">
            Educational Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight text-balance">
            {article.title}
          </h1>
          <p className="text-lg sm:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed text-balance">
            {article.metaDescription}
          </p>
          
          {/* Main CTA */}
          <div className="pt-6">
            <Link
              href={`/${lang}/tools/${article.toolId}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-bold rounded-2xl shadow-lg hover:bg-accent/90 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              <span className="text-lg">Open {toolTitle} Tool</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <p className="text-xs text-ink-muted mt-4 font-medium uppercase tracking-widest">
              100% Free • Private • No Signup
            </p>
          </div>
        </div>

        {/* The Article Content */}
        <div>
          <ArticleBlock title={article.title} sections={article.sections} faqs={article.faqs} />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-border/40 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink mb-6">
            Ready to get started?
          </h2>
          <Link
            href={`/${lang}/tools/${article.toolId}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-surface font-semibold rounded-xl hover:bg-ink/90 transition-all shadow-md active:scale-95"
          >
            Launch Tool Now
          </Link>
        </div>
      </div>
    </div>
  );
}
