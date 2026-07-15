import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RECIPES } from "@/lib/recipes";
import { getLocalizedRecipe } from "@/lib/recipes-i18n";
import RecipeDetailClient from "@/components/RecipeDetailClient";

interface RecipePageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n");
  const params: { slug: string; lang: string }[] = [];
  
  for (const r of RECIPES) {
    for (const lang of LOCALES) {
      params.push({ slug: r.slug, lang });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const recipe = getLocalizedRecipe(slug, lang || "en") || RECIPES.find((r) => r.slug === slug);
  if (!recipe) return { title: "Recipe Not Found" };

  const canonicalUrl = `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}recipes/${slug}`;
  const pageTitle = `${recipe.title} | ZeroWebTools Recipes`;

  return {
    title: pageTitle,
    description: recipe.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": `https://zerowebtools.com/recipes/${slug}`,
        "x-default": `https://zerowebtools.com/recipes/${slug}`,
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

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug, lang } = await params;
  const recipe = getLocalizedRecipe(slug, lang || "en") || RECIPES.find((r) => r.slug === slug);
  if (!recipe) notFound();

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
        "name": "Recipes",
        "item": `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}recipes`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": recipe.title,
        "item": `https://zerowebtools.com/${lang === "en" ? "" : lang + "/"}recipes/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecipeDetailClient recipe={recipe} />
    </div>
  );
}
