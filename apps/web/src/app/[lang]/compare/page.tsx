import { LOCALES, SupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import CompareIndexClient from "@/components/CompareIndexClient";

interface LocalizedCompareIndexPageProps {
  params: Promise<{ lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LOCALES.filter((l) => l !== "en").map((lang) => ({ lang }));
}

export default async function LocalizedCompareIndexPage({ params }: LocalizedCompareIndexPageProps) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  return <CompareIndexClient lang={lang} />;
}
