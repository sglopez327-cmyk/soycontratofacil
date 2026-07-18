import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { getArticleBySlug } from "@/lib/seo-articles";
import { getGuideBySlug } from "@/lib/seo-guides";
import { getAllPublicPaths } from "@/lib/seo-urls";

function lastModifiedForPath(path: string): Date {
  if (path.startsWith("/articulos/")) {
    const article = getArticleBySlug(path.replace("/articulos/", ""));
    if (article?.updatedAt) {
      return new Date(article.updatedAt);
    }
  }

  if (path.startsWith("/guias/")) {
    const guide = getGuideBySlug(path.replace("/guias/", ""));
    if (guide) {
      return new Date("2026-07-18");
    }
  }

  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPublicPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: lastModifiedForPath(path),
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
