/** Enlaces internos entre guías (sin modificar páginas principales). */
export const guideRelations: Record<string, string[]> = {
  vivienda: ["habitacion", "rescision", "cambio-suministros"],
  temporada: ["vivienda", "habitacion"],
  habitacion: ["vivienda", "temporada"],
  local: ["vivienda", "arrendamiento-garaje"],
  "finca-rustica": ["vivienda", "local"],
  "arrendamiento-garaje": ["garaje-trastero", "vivienda"],
  "compraventa-vivienda": ["arras", "garaje-trastero"],
  arras: ["compraventa-vivienda", "garaje-trastero"],
  "garaje-trastero": ["compraventa-vivienda", "arrendamiento-garaje"],
  rescision: ["vivienda", "cambio-suministros"],
  "cambio-suministros": ["vivienda", "rescision"],
};

export function getRelatedGuideSlugs(slug: string): string[] {
  return guideRelations[slug] ?? [];
}

/** Mapeo contrato → guía para schema y enlaces semánticos. */
export const contractToGuideSlug: Record<string, string> = {
  vivienda: "vivienda",
  temporada: "temporada",
  habitacion: "habitacion",
  local: "local",
  "finca-rustica": "finca-rustica",
  "arrendamiento-garaje": "arrendamiento-garaje",
  "compraventa-vivienda": "compraventa-vivienda",
  arras: "arras",
  "garaje-trastero": "garaje-trastero",
  rescision: "rescision",
  "cambio-suministros": "cambio-suministros",
};

export function getGuideSlugForContract(contractSlug: string): string | undefined {
  return contractToGuideSlug[contractSlug];
}
