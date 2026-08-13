export type CatalogContract = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
  description: string;
  contracts: CatalogContract[];
};

/** Catálogo maestro compartido entre web y app-mobile. */
export const contractCatalog: CatalogCategory[] = [
  {
    id: "arrendamientos",
    title: "Arrendamientos",
    description: "Contratos de alquiler urbano: vivienda, habitación, temporada y local",
    contracts: [
      {
        id: "arrendamiento-vivienda",
        slug: "vivienda",
        title: "Alquiler de vivienda",
        description: "Contrato de alquiler de vivienda habitual en PDF, listo para firmar",
      },
      {
        id: "habitacion",
        slug: "habitacion",
        title: "Alquiler de habitación",
        description: "Contrato de habitación en piso compartido, con zonas comunes",
      },
      {
        id: "temporada",
        slug: "temporada",
        title: "Alquiler de temporada",
        description: "Contrato de temporada o uso distinto del de vivienda habitual",
      },
      {
        id: "local",
        slug: "local",
        title: "Alquiler de local",
        description: "Contrato de alquiler de local comercial o de negocio",
      },
      {
        id: "finca-rustica",
        slug: "finca-rustica",
        title: "Finca rústica",
        description: "Alquiler de finca rústica, terreno o explotación agrícola",
      },
      {
        id: "arrendamiento-garaje",
        slug: "arrendamiento-garaje",
        title: "Alquiler de garaje",
        description: "Arrendamiento de plaza de garaje o trastero",
      },
    ],
  },
  {
    id: "compraventa",
    title: "Compraventa",
    description: "Compraventa y arras entre particulares",
    contracts: [
      {
        id: "compraventa-vivienda",
        slug: "compraventa-vivienda",
        title: "Compraventa de vivienda",
        description: "Contrato de compraventa de vivienda entre particulares en PDF",
      },
      {
        id: "arras",
        slug: "arras",
        title: "Contrato de arras",
        description: "Arras penitenciales o confirmatorias para reservar la compraventa",
      },
      {
        id: "garaje-trastero",
        slug: "garaje-trastero",
        title: "Compraventa de garaje",
        description: "Compraventa de plaza de garaje o trastero entre particulares",
      },
    ],
  },
  {
    id: "gestion",
    title: "Gestión del alquiler",
    description: "Documentos para finalizar el alquiler o cambiar suministros",
    contracts: [
      {
        id: "rescision",
        slug: "rescision",
        title: "Rescisión de alquiler",
        description: "Documento para finalizar el contrato de alquiler de mutuo acuerdo",
      },
      {
        id: "cambio-suministros",
        slug: "cambio-suministros",
        title: "Cambio de suministros",
        description: "Comunicación de cambio de titularidad de luz, agua o gas",
      },
    ],
  },
];

export function getAllCatalogSlugs(): string[] {
  return contractCatalog.flatMap((category) =>
    category.contracts.map((contract) => contract.slug)
  );
}

export function findCatalogContract(slug: string) {
  for (const category of contractCatalog) {
    const contract = category.contracts.find((item) => item.slug === slug);
    if (contract) {
      return { contract, category };
    }
  }
  return undefined;
}
