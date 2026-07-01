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
    description: "Contratos de alquiler para todo tipo de inmuebles",
    contracts: [
      {
        id: "arrendamiento-vivienda",
        slug: "vivienda",
        title: "Vivienda",
        description: "Alquiler de vivienda habitual con todas las garantías legales",
      },
      {
        id: "temporada",
        slug: "temporada",
        title: "Temporada",
        description: "Arrendamiento de temporada o uso distinto del de vivienda",
      },
      {
        id: "habitacion",
        slug: "habitacion",
        title: "Habitación",
        description: "Alquiler de habitación en vivienda compartida",
      },
      {
        id: "local",
        slug: "local",
        title: "Local",
        description: "Arrendamiento de local comercial o de negocio",
      },
      {
        id: "finca-rustica",
        slug: "finca-rustica",
        title: "Finca Rústica",
        description: "Alquiler de finca rústica, terreno o explotación agrícola",
      },
      {
        id: "arrendamiento-garaje",
        slug: "arrendamiento-garaje",
        title: "Garaje / Trastero",
        description: "Arrendamiento de plaza de garaje o trastero",
      },
    ],
  },
  {
    id: "compraventa",
    title: "Compraventa",
    description: "Documentos para la transmisión de propiedad",
    contracts: [
      {
        id: "compraventa-vivienda",
        slug: "compraventa-vivienda",
        title: "Vivienda",
        description: "Contrato de compraventa de vivienda entre particulares",
      },
      {
        id: "arras",
        slug: "arras",
        title: "Arras",
        description: "Contrato de arras penitenciales o confirmatorias",
      },
      {
        id: "garaje-trastero",
        slug: "garaje-trastero",
        title: "Garaje / Trastero",
        description: "Compraventa de plaza de garaje o trastero",
      },
    ],
  },
  {
    id: "gestion",
    title: "Gestión",
    description: "Trámites y documentos complementarios",
    contracts: [
      {
        id: "rescision",
        slug: "rescision",
        title: "Rescisión de contrato",
        description: "Documento para la finalización anticipada del arrendamiento",
      },
      {
        id: "cambio-suministros",
        slug: "cambio-suministros",
        title: "Cambio de suministros",
        description: "Comunicación de cambio de titularidad de suministros",
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
