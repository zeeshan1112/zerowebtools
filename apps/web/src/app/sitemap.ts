import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/tools";
import { HOW_TO_ARTICLES } from "@/lib/articles";
import { LOCALES } from "@/lib/i18n";

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

  const guidePages: MetadataRoute.Sitemap = HOW_TO_ARTICLES.map((article) => ({
    url: `${baseUrl}/how-to/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: buildLanguages(`/how-to/${article.slug}`, baseUrl)
    }
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
  ];
}
