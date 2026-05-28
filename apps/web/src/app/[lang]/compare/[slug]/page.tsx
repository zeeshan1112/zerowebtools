import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS } from "@/lib/comparisons";
import { LOCALES, SupportedLocale } from "@/lib/i18n";
import CompareMatchupClient from "@/components/CompareMatchupClient";

interface LocalizedMatchupPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params = [];
  for (const lang of LOCALES.filter((l) => l !== "en")) {
    for (const matchup of COMPARISONS) {
      params.push({ lang, slug: matchup.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: LocalizedMatchupPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const matchup = COMPARISONS.find((m) => m.slug === slug);
  if (!matchup) return { title: "Matchup Not Found" };

  const canonicalUrl = `https://zerowebtools.com/${lang}/compare/${slug}`;
  const pageTitle = `${matchup.competitorName} Alternative — 100% Free & Local | ZeroWebTools`;

  return {
    title: pageTitle,
    description: matchup.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: matchup.metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: matchup.metaDescription,
    },
  };
}

export default async function LocalizedCompareMatchupPage({ params }: LocalizedMatchupPageProps) {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  const matchup = COMPARISONS.find((m) => m.slug === slug);
  if (!matchup) notFound();

  // Generate Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://zerowebtools.com/${lang}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Compare",
        "item": `https://zerowebtools.com/${lang}/compare`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": matchup.competitorName,
        "item": `https://zerowebtools.com/${lang}/compare/${slug}`,
      },
    ],
  };

  const faqSchema = matchup.faqs && matchup.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": matchup.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <CompareMatchupClient matchup={matchup} lang={lang} />
    </div>
  );
}
