import HomePageClient from "@/components/HomePageClient";
import { ALL_TOOLS } from "@/lib/tools";
import { Metadata } from "next";
import { getTranslations, LOCALES, SupportedLocale, getAlternateLanguages } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LOCALES.filter(lang => lang !== "en").map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};
  
  const t = getTranslations(lang);
  const canonicalUrl = `https://zerowebtools.com/${lang}`;
  
  return {
    title: t.homeTitle,
    description: t.homeDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(""),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  const t = getTranslations(lang);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t.faqQ1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA1
        }
      },
      {
        "@type": "Question",
        "name": t.faqQ2,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA2
        }
      },
      {
        "@type": "Question",
        "name": t.faqQ3,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t.faqA3
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient lang={lang} />
    </>
  );
}
