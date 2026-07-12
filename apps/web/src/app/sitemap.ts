import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/tools";
import { HOW_TO_ARTICLES } from "@/lib/articles";
import { LOCALES, SupportedLocale } from "@/lib/i18n";
import { PROGRAMMATIC_SEO_DATA } from "@/lib/programmatic-seo-data";
import { COMPARISONS } from "@/lib/comparisons";
import { RECIPES } from "@/lib/recipes";
import { CONVERSIONS } from "@/lib/conversions";
import { LOCALES_DATA } from "@/lib/locales";

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

function buildLanguagesForArticle(path: string, baseUrl: string, toolId: string) {
  const languages: Record<string, string> = {};
  languages["en"] = `${baseUrl}${path}`;
  languages["x-default"] = `${baseUrl}${path}`;
  
  LOCALES.filter(l => l !== "en").forEach(lang => {
    const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
    const translated = localeData?.articles?.[toolId];
    if (translated) {
      languages[lang] = `${baseUrl}/${lang}${path}`;
    }
  });
  
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zerowebtools.com";
  const now = new Date();

  // Create first-class entries for all localized versions of live tools
  const toolPages: MetadataRoute.Sitemap = CATEGORIES.flatMap((category) =>
    category.tools
      .filter((tool) => tool.status === "live")
      .flatMap((tool) => {
        const alternates = buildLanguages(`/tools/${tool.id}`, baseUrl);
        return LOCALES.map((lang) => {
          const path = `/tools/${tool.id}`;
          const url = lang === "en" ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`;
          return {
            url,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
            alternates: {
              languages: alternates
            }
          };
        });
      })
  );

  // Create first-class entries for all localized versions of programmatic pages
  const programmaticPages: MetadataRoute.Sitemap = [];
  if (typeof PROGRAMMATIC_SEO_DATA !== "undefined") {
    for (const [toolId, queries] of Object.entries(PROGRAMMATIC_SEO_DATA)) {
      for (const q of queries) {
        const alternates = buildLanguages(`/tools/${toolId}/${q.slug}`, baseUrl);
        LOCALES.forEach((lang) => {
          const path = `/tools/${toolId}/${q.slug}`;
          const url = lang === "en" ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`;
          programmaticPages.push({
            url,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
            alternates: {
              languages: alternates
            }
          });
        });
      }
    }
  }

  // Create first-class entries for only active/translated guide pages
  const guidePages: MetadataRoute.Sitemap = HOW_TO_ARTICLES.flatMap((article) => {
    const alternates = buildLanguagesForArticle(`/how-to/${article.slug}`, baseUrl, article.toolId);
    const activeLocales = Object.keys(alternates).filter(l => l !== "x-default");
    
    return activeLocales.map((lang) => {
      const path = `/how-to/${article.slug}`;
      const url = lang === "en" ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`;
      return {
        url,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: alternates
        }
      };
    });
  });

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

  // Standard root / index pages
  const indexPages: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => {
    const alternatesRoot = buildLanguages("", baseUrl);
    const alternatesHowTo = buildLanguages("/how-to", baseUrl);
    
    return [
      {
        url: lang === "en" ? baseUrl : `${baseUrl}/${lang}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 1.0,
        alternates: {
          languages: alternatesRoot
        }
      },
      {
        url: lang === "en" ? `${baseUrl}/how-to` : `${baseUrl}/${lang}/how-to`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
        alternates: {
          languages: alternatesHowTo
        }
      }
    ];
  });

  return [
    ...indexPages,
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
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
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
