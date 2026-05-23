import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/tools";

export const dynamic = "force-static";

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
      }))
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
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
    ...toolPages,
  ];
}
