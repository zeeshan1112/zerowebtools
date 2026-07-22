import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS } from "@/lib/comparisons";
import { getLocalizedComparison } from "@/lib/comparisons-i18n";
import CompareMatchupClient from "@/components/CompareMatchupClient";
import { ADSENSE_REVIEW_MODE } from "@/lib/config";

interface MatchupPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n");
  const params: { slug: string; lang: string }[] = [];
  
  for (const m of COMPARISONS) {
    for (const lang of LOCALES) {
      params.push({ slug: m.slug, lang });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: MatchupPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const matchup = getLocalizedComparison(slug, lang || "en") || COMPARISONS.find((m) => m.slug === slug);
  if (!matchup) return { title: "Matchup Not Found" };

  const canonicalUrl = `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}compare/${slug}`;
  const pageTitle = `${matchup.competitorName} Alternative — 100% Free & Local | ZeroWebTools`;

  return {
    title: pageTitle,
    description: matchup.metaDescription,
    robots: ADSENSE_REVIEW_MODE ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": `https://zerowebtools.com/compare/${slug}`,
        "x-default": `https://zerowebtools.com/compare/${slug}`,
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

export default async function CompareMatchupPage({ params }: MatchupPageProps) {
  const { slug, lang } = await params;
  const matchup = getLocalizedComparison(slug, lang || "en") || COMPARISONS.find((m) => m.slug === slug);
  if (!matchup) notFound();

  // Generate Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://zerowebtools.com/${lang === "en" ? "" : lang}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Compare",
        "item": `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}compare`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": matchup.competitorName,
        "item": `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}compare/${slug}`,
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
      <CompareMatchupClient matchup={matchup} />
    </div>
  );
}
