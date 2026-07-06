import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getAllPublicPaths } from "@/lib/seo-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllPublicPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency:
      path === "/"
        ? "weekly"
        : path === "/guias" || path === "/articulos"
          ? "weekly"
          : "monthly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/generar/")
          ? 0.8
          : path.startsWith("/articulos/")
            ? 0.75
            : path.startsWith("/guias/")
              ? 0.7
              : path === "/guias" || path === "/articulos"
                ? 0.9
                : 0.6,
  }));
}
