import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getAllPublicPaths } from "@/lib/seo-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getAllPublicPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency:
      path === "/" || path.startsWith("/generar/")
        ? "weekly"
        : path === "/guias" || path === "/articulos"
          ? "weekly"
          : path.startsWith("/guias/") || path.startsWith("/articulos/")
            ? "weekly"
            : "monthly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/generar/")
          ? 0.9
          : path === "/guias" || path === "/articulos"
            ? 0.85
            : path.startsWith("/guias/") || path.startsWith("/articulos/")
              ? 0.8
              : 0.6,
  }));
}
