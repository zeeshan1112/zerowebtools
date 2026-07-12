import CompareIndexClient from "@/components/CompareIndexClient";
import { getTranslations, SupportedLocale } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n");
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);
  return {
    title: `${t.compareTag || "Alternatives"} - ZeroWebTools`,
    description: t.compareDesc,
  };
}

export default async function CompareIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <CompareIndexClient lang={lang} />;
}
