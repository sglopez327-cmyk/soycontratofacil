import type { MetadataRoute } from "next";

import { getAllContractSlugs } from "@/lib/contracts";
import { getAllArticleSlugs } from "@/lib/seo-articles";
import { getAllGuideSlugs } from "@/lib/seo-guides";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  "/",
  "/guias",
  "/articulos",
  "/sobre-nosotros",
  "/aviso-legal",
  "/privacidad",
  "/terminos-de-uso",
  "/cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/guias" || path === "/articulos"
          ? 0.9
          : 0.6,
  }));

  const contractEntries: MetadataRoute.Sitemap = getAllContractSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/generar/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const guideEntries: MetadataRoute.Sitemap = getAllGuideSlugs().map((slug) => ({
    url: absoluteUrl(`/guias/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticleSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/articulos/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    })
  );

  return [...staticEntries, ...contractEntries, ...guideEntries, ...articleEntries];
}
