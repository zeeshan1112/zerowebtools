import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/tools";
import { HOW_TO_ARTICLES } from "@/lib/articles";
import { LOCALES } from "@/lib/i18n";
import { PROGRAMMATIC_SEO_DATA } from "@/lib/programmatic-seo-data";
import { COMPARISONS } from "@/lib/comparisons";
import { RECIPES } from "@/lib/recipes";
import { CONVERSIONS } from "@/lib/conversions";

export const dynamic = "force-static";

function buildLanguages(path: string, baseUrl: string) {
  const languages: Record<string, string> = {};
  languages["en"] = `${baseUrl}${path}`;
  languages["x-default"] = `${baseUrl}${path}`;
  
  LOCALES.filter(l => l !== "en").forEach(lang => {
    languages[lang] = `${baseUrl}/${lang}${path}`;
  });
  
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zerowebtools.com";
  const now = new Date();

  const toolPages: MetadataRoute.Sitemap = CATEGORIES.flatMap((category) =>
    category.tools
      .filter((tool) => tool.status === "live")
      .map((tool) => ({
        url: `${baseUrl}/tools/${tool.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: {
          languages: buildLanguages(`/tools/${tool.id}`, baseUrl)
        }
      }))
  );

  const programmaticPages: MetadataRoute.Sitemap = [];
  if (typeof PROGRAMMATIC_SEO_DATA !== "undefined") {
    for (const [toolId, queries] of Object.entries(PROGRAMMATIC_SEO_DATA)) {
      for (const q of queries) {
        programmaticPages.push({
          url: `${baseUrl}/tools/${toolId}/${q.slug}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
          alternates: {
            languages: buildLanguages(`/tools/${toolId}/${q.slug}`, baseUrl)
          }
        });
      }
    }
  }

  const guidePages: MetadataRoute.Sitemap = HOW_TO_ARTICLES.map((article) => ({
    url: `${baseUrl}/how-to/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: buildLanguages(`/how-to/${article.slug}`, baseUrl)
    }
  }));

  const comparePages: MetadataRoute.Sitemap = COMPARISONS.map((matchup) => ({
    url: `${baseUrl}/compare/${matchup.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const recipePages: MetadataRoute.Sitemap = RECIPES.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const conversionPages: MetadataRoute.Sitemap = CONVERSIONS.map((pairing) => ({
    url: `${baseUrl}/conversions/${pairing.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
      alternates: {
        languages: buildLanguages("", baseUrl)
      }
    },
    {
      url: `${baseUrl}/how-to`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: buildLanguages("/how-to", baseUrl)
      }
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/extensions`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...toolPages,
    ...guidePages,
    ...comparePages,
    ...recipePages,
    ...conversionPages,
    ...programmaticPages,
  ];
}
