import RecipesIndexClient from "@/components/RecipesIndexClient";
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
    title: `${t.recipesTag || "Recipes"} - ZeroWebTools`,
    description: t.recipesDesc,
  };
}

export default async function RecipesIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <RecipesIndexClient lang={lang} />;
}
