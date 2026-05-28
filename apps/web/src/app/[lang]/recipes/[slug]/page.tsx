import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECIPES } from "@/lib/recipes";
import { LOCALES, SupportedLocale } from "@/lib/i18n";
import RecipeDetailClient from "@/components/RecipeDetailClient";

interface LocalizedRecipePageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params = [];
  for (const lang of LOCALES.filter((l) => l !== "en")) {
    for (const recipe of RECIPES) {
      params.push({ lang, slug: recipe.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: LocalizedRecipePageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const recipe = RECIPES.find((r) => r.slug === slug);
  if (!recipe) return { title: "Recipe Not Found" };

  const canonicalUrl = `https://zerowebtools.com/${lang}/recipes/${slug}`;
  const pageTitle = `${recipe.title} — Step-by-Step Chaining Guide | ZeroWebTools`;

  return {
    title: pageTitle,
    description: recipe.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: recipe.metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: recipe.metaDescription,
    },
  };
}

export default async function LocalizedRecipeDetailPage({ params }: LocalizedRecipePageProps) {
  const { slug, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  const recipe = RECIPES.find((r) => r.slug === slug);
  if (!recipe) notFound();

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
        "name": "Recipes",
        "item": `https://zerowebtools.com/${lang}/recipes`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": recipe.title,
        "item": `https://zerowebtools.com/${lang}/recipes/${slug}`,
      },
    ],
  };

  const faqSchema = recipe.faqs && recipe.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": recipe.faqs.map(faq => ({
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
      <RecipeDetailClient recipe={recipe} lang={lang} />
    </div>
  );
}
