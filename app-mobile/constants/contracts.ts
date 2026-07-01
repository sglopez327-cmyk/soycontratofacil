export type ContractCategory = {
  id: string;
  title: string;
  description: string;
  contracts: {
    slug: string;
    title: string;
    description: string;
  }[];
};

export const contractCategories: ContractCategory[] = [
  {
    id: "arrendamientos",
    title: "Arrendamientos",
    description: "Contratos de alquiler para todo tipo de inmuebles",
    contracts: [
      {
        slug: "vivienda",
        title: "Vivienda",
        description: "Alquiler de vivienda habitual con todas las garantías legales",
      },
      {
        slug: "temporada",
        title: "Temporada",
        description: "Arrendamiento de temporada o uso distinto del de vivienda",
      },
      {
        slug: "habitacion",
        title: "Habitación",
        description: "Alquiler de habitación en vivienda compartida",
      },
      {
        slug: "local",
        title: "Local",
        description: "Arrendamiento de local comercial o de negocio",
      },
      {
        slug: "finca-rustica",
        title: "Finca Rústica",
        description: "Alquiler de finca rústica, terreno o explotación agrícola",
      },
    ],
  },
  {
    id: "compraventa",
    title: "Compraventa",
    description: "Documentos para la transmisión de propiedad",
    contracts: [
      {
        slug: "compraventa-vivienda",
        title: "Vivienda",
        description: "Contrato de compraventa de vivienda entre particulares",
      },
      {
        slug: "arras",
        title: "Arras",
        description: "Contrato de arras penitenciales o confirmatorias",
      },
      {
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
        slug: "rescision",
        title: "Rescisión de contrato",
        description: "Documento para la finalización anticipada del arrendamiento",
      },
      {
        slug: "cambio-suministros",
        title: "Cambio de suministros",
        description: "Comunicación de cambio de titularidad de suministros",
      },
    ],
  },
];
