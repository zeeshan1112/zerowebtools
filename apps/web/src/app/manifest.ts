import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZeroWebTools",
    short_name: "ZeroWebTools",
    description:
      "Free, private, browser-based tools — PDF, image, developer, and financial utilities that never upload your data.",
    start_url: "/",
    display: "standalone",
    theme_color: "#09090b",
    background_color: "#ffffff",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
