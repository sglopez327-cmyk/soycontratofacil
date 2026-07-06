import { getAllContractSlugs } from "@/lib/contracts";
import { getAllArticleSlugs } from "@/lib/seo-articles";
import { getAllGuideSlugs } from "@/lib/seo-guides";

const STATIC_PATHS = [
  "/",
  "/guias",
  "/articulos",
  "/sobre-nosotros",
  "/aviso-legal",
  "/privacidad",
  "/terminos-de-uso",
  "/cookies",
] as const;

/** Rutas públicas indexables (paths relativos). */
export function getAllPublicPaths(): string[] {
  return [
    ...STATIC_PATHS,
    ...getAllContractSlugs().map((slug) => `/generar/${slug}`),
    ...getAllGuideSlugs().map((slug) => `/guias/${slug}`),
    ...getAllArticleSlugs().map((slug) => `/articulos/${slug}`),
  ];
}
