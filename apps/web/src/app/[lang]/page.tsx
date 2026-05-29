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
        "name": "Is it completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ZeroWebTools is 100% free. No subscriptions, no hidden fees, and no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files uploaded to a server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All tools execute entirely client-side using WebAssembly in your browser. Your files never leave your device."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download anything?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you do not need to install any apps or software. Everything works securely inside your web browser."
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
