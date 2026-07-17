/** Meta titles y descriptions orientados a CTR para /generar/[slug]. */

export type ContractSeoMetadata = {
  title: string;
  description: string;
};

const CONTRACT_SEO: Record<string, ContractSeoMetadata> = {
  vivienda: {
    title: "Contrato Alquiler Vivienda Gratis PDF 2026",
    description:
      "Crea tu contrato de alquiler legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
  },
  temporada: {
    title: "Contrato Alquiler Temporada Gratis PDF 2026",
    description:
      "Contrato de temporada legal y actualizado. PDF listo para imprimir. Genera y descarga gratis en minutos. Empieza ya.",
  },
  habitacion: {
    title: "Contrato Alquiler Habitación Gratis PDF 2026",
    description:
      "Contrato de habitación legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
  },
  local: {
    title: "Contrato Alquiler Local Gratis PDF 2026",
    description:
      "Contrato de local comercial legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ya.",
  },
  "finca-rustica": {
    title: "Contrato Alquiler Finca Rústica Gratis PDF",
    description:
      "Contrato de finca rústica legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ahora.",
  },
  "arrendamiento-garaje": {
    title: "Contrato Alquiler Garaje/Trastero Gratis PDF",
    description:
      "Contrato de garaje o trastero legal y actualizado. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
  },
  "compraventa-vivienda": {
    title: "Contrato Compraventa Vivienda Gratis PDF 2026",
    description:
      "Contrato de compraventa legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
  },
  arras: {
    title: "Contrato de Arras Gratis PDF 2026 | Descargar",
    description:
      "Contrato de arras legal y actualizado. PDF listo para imprimir. Genera y descarga gratis en minutos. Empieza ya.",
  },
  "garaje-trastero": {
    title: "Compraventa Garaje/Trastero Gratis PDF 2026",
    description:
      "Contrato de compraventa de garaje/trastero legal y actualizado. PDF listo para imprimir. Gratis. Descárgalo ya.",
  },
  rescision: {
    title: "Rescisión Contrato Alquiler Gratis PDF 2026",
    description:
      "Documento de rescisión legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ahora.",
  },
  "cambio-suministros": {
    title: "Cambio Suministros Alquiler Gratis PDF 2026",
    description:
      "Comunicación de cambio de titular legal y actualizada. PDF listo para imprimir. Gratis. Descárgalo ya.",
  },
};

export function getContractSeoMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): ContractSeoMetadata {
  return (
    CONTRACT_SEO[slug] ?? {
      title: fallbackTitle,
      description: fallbackDescription,
    }
  );
}
