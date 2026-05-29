import type { Metadata } from "next";
import { LOCALES, SupportedLocale, getTranslations, getAlternateLanguages } from "@/lib/i18n";
import { notFound } from "next/navigation";
import GuidesIndexClient from "@/components/GuidesIndexClient";

const BASE_URL = "https://zerowebtools.com";

export async function generateStaticParams() {
  return LOCALES.filter(lang => lang !== "en").map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const t = getTranslations(lang);
  const canonicalUrl = `${BASE_URL}/${lang}/how-to`;

  return {
    title: `${t.guidesResources} | ZeroWebTools`,
    description: t.howToDesc,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("/how-to"),
    },
    openGraph: {
      title: `${t.guidesResources} | ZeroWebTools`,
      description: t.howToDesc,
      type: "website",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.guidesResources} | ZeroWebTools`,
      description: t.howToDesc,
    },
  };
}

export const dynamic = "force-static";

export default async function HowToIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  return (
    <div className="min-h-screen">
      <GuidesIndexClient lang={lang} />
    </div>
  );
}
