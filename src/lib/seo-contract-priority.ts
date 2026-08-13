/**
 * Prioridad SEO por intención de búsqueda real.
 * Core = alquiler urbano, local, compraventa particulares y trámites asociados.
 * Secondary = disponibles pero no empujados en home/sitemap.
 * Peripheral = noindex (diluyen el tema urbano).
 */

export type ContractSeoTier = "core" | "secondary" | "peripheral";

/** Orden de aparición en home (solo core). */
export const CORE_CONTRACT_SLUGS = [
  "vivienda",
  "habitacion",
  "temporada",
  "local",
  "compraventa-vivienda",
  "arras",
  "rescision",
  "cambio-suministros",
] as const;

export const SECONDARY_CONTRACT_SLUGS = [
  "arrendamiento-garaje",
  "garaje-trastero",
] as const;

export const PERIPHERAL_CONTRACT_SLUGS = ["finca-rustica"] as const;

const CORE_SET = new Set<string>(CORE_CONTRACT_SLUGS);
const SECONDARY_SET = new Set<string>(SECONDARY_CONTRACT_SLUGS);
const PERIPHERAL_SET = new Set<string>(PERIPHERAL_CONTRACT_SLUGS);

export function getContractSeoTier(slug: string): ContractSeoTier {
  if (CORE_SET.has(slug)) return "core";
  if (SECONDARY_SET.has(slug)) return "secondary";
  if (PERIPHERAL_SET.has(slug)) return "peripheral";
  return "secondary";
}

export function isCoreContractSlug(slug: string): boolean {
  return CORE_SET.has(slug);
}

export function isFeaturedOnHome(slug: string): boolean {
  return CORE_SET.has(slug);
}

/** No indexar: diluyen autoridad hacia temas no urbanos. */
export function shouldNoIndexContract(slug: string): boolean {
  return PERIPHERAL_SET.has(slug);
}

export function shouldNoIndexGuide(slug: string): boolean {
  return PERIPHERAL_SET.has(slug);
}

/** Artículos de cola larga no alineados con el foco urbano. */
export function shouldNoIndexArticle(slug: string): boolean {
  return slug === "contrato-arrendamiento-olivar";
}

export function getSitemapPriorityForPath(path: string): number {
  if (path === "/") return 1;

  if (path.startsWith("/generar/")) {
    const slug = path.replace("/generar/", "");
    const tier = getContractSeoTier(slug);
    if (tier === "core") return 0.95;
    if (tier === "secondary") return 0.45;
    return 0.2;
  }

  if (path.startsWith("/guias/")) {
    const slug = path.replace("/guias/", "");
    if (shouldNoIndexGuide(slug)) return 0.2;
    if (isCoreContractSlug(slug)) return 0.8;
    return 0.45;
  }

  if (path === "/guias" || path === "/articulos") return 0.75;
  if (path === "/guia-de-uso") return 0.55;

  if (path.startsWith("/articulos/")) {
    const slug = path.replace("/articulos/", "");
    if (shouldNoIndexArticle(slug)) return 0.2;
    return 0.65;
  }

  return 0.5;
}

/** Paths públicos que deben salir del sitemap (noindex). */
export function shouldExcludeFromSitemap(path: string): boolean {
  if (path.startsWith("/generar/")) {
    return shouldNoIndexContract(path.replace("/generar/", ""));
  }
  if (path.startsWith("/guias/")) {
    return shouldNoIndexGuide(path.replace("/guias/", ""));
  }
  if (path.startsWith("/articulos/")) {
    return shouldNoIndexArticle(path.replace("/articulos/", ""));
  }
  return false;
}
