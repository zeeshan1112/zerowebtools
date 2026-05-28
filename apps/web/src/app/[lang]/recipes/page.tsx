import { LOCALES, SupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import RecipesIndexClient from "@/components/RecipesIndexClient";

interface LocalizedRecipesIndexPageProps {
  params: Promise<{ lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LOCALES.filter((l) => l !== "en").map((lang) => ({ lang }));
}

export default async function LocalizedRecipesIndexPage({ params }: LocalizedRecipesIndexPageProps) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  return <RecipesIndexClient lang={lang} />;
}
