import {
  Building2,
  CalendarRange,
  DoorOpen,
  FileSignature,
  FileText,
  Home,
  Landmark,
  PlugZap,
  Trees,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const GENERAR_ROUTE_PREFIX = "/generar";

export function getContractHref(slug: string): string {
  return `${GENERAR_ROUTE_PREFIX}/${slug}`;
}

export type ContractType = {
  id: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  categoryId: string;
  categoryTitle: string;
  icon: LucideIcon;
};

export type ContractCategory = {
  id: string;
  title: string;
  description: string;
  contracts: ContractType[];
};

function contract(
  data: Omit<ContractType, "href">
): ContractType {
  return { ...data, href: getContractHref(data.slug) };
}

export const contractCategories: ContractCategory[] = [
  {
    id: "arrendamientos",
    title: "Arrendamientos",
    description: "Contratos de alquiler para todo tipo de inmuebles",
    contracts: [
      contract({
        id: "arrendamiento-vivienda",
        slug: "vivienda",
        title: "Vivienda",
        description: "Alquiler de vivienda habitual con todas las garantías legales",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: Home,
      }),
      contract({
        id: "temporada",
        slug: "temporada",
        title: "Temporada",
        description: "Arrendamiento de temporada o uso distinto del de vivienda",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: CalendarRange,
      }),
      contract({
        id: "habitacion",
        slug: "habitacion",
        title: "Habitación",
        description: "Alquiler de habitación en vivienda compartida",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: DoorOpen,
      }),
      contract({
        id: "local",
        slug: "local",
        title: "Local",
        description: "Arrendamiento de local comercial o de negocio",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: Building2,
      }),
      contract({
        id: "finca-rustica",
        slug: "finca-rustica",
        title: "Finca Rústica",
        description: "Alquiler de finca rústica, terreno o explotación agrícola",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: Trees,
      }),
      contract({
        id: "arrendamiento-garaje",
        slug: "arrendamiento-garaje",
        title: "Garaje / Trastero",
        description: "Arrendamiento de plaza de garaje o trastero",
        categoryId: "arrendamientos",
        categoryTitle: "Arrendamientos",
        icon: Warehouse,
      }),
    ],
  },
  {
    id: "compraventa",
    title: "Compraventa",
    description: "Documentos para la transmisión de propiedad",
    contracts: [
      contract({
        id: "compraventa-vivienda",
        slug: "compraventa-vivienda",
        title: "Vivienda",
        description: "Contrato de compraventa de vivienda entre particulares",
        categoryId: "compraventa",
        categoryTitle: "Compraventa",
        icon: Landmark,
      }),
      contract({
        id: "arras",
        slug: "arras",
        title: "Arras",
        description: "Contrato de arras penitenciales o confirmatorias",
        categoryId: "compraventa",
        categoryTitle: "Compraventa",
        icon: FileSignature,
      }),
      contract({
        id: "garaje-trastero",
        slug: "garaje-trastero",
        title: "Garaje / Trastero",
        description: "Compraventa de plaza de garaje o trastero",
        categoryId: "compraventa",
        categoryTitle: "Compraventa",
        icon: Warehouse,
      }),
    ],
  },
  {
    id: "gestion",
    title: "Gestión",
    description: "Trámites y documentos complementarios",
    contracts: [
      contract({
        id: "rescision",
        slug: "rescision",
        title: "Rescisión de contrato",
        description: "Documento para la finalización anticipada del arrendamiento",
        categoryId: "gestion",
        categoryTitle: "Gestión",
        icon: FileText,
      }),
      contract({
        id: "cambio-suministros",
        slug: "cambio-suministros",
        title: "Cambio de suministros",
        description: "Comunicación de cambio de titularidad de suministros",
        categoryId: "gestion",
        categoryTitle: "Gestión",
        icon: PlugZap,
      }),
    ],
  },
];

/** Rutas legacy /contratos/... → /generar/[slug] */
export const legacyContractPaths: Record<string, string> = {
  "/contratos/arrendamiento/vivienda": getContractHref("vivienda"),
  "/contratos/arrendamiento/temporada": getContractHref("temporada"),
  "/contratos/arrendamiento/habitacion": getContractHref("habitacion"),
  "/contratos/arrendamiento/local": getContractHref("local"),
  "/contratos/arrendamiento/finca-rustica": getContractHref("finca-rustica"),
  "/contratos/arrendamiento/garaje": getContractHref("arrendamiento-garaje"),
  "/contratos/compraventa/vivienda": getContractHref("compraventa-vivienda"),
  "/contratos/compraventa/arras": getContractHref("arras"),
  "/contratos/compraventa/garaje-trastero": getContractHref("garaje-trastero"),
  "/contratos/gestion/rescision": getContractHref("rescision"),
  "/contratos/gestion/cambio-suministros": getContractHref("cambio-suministros"),
};

export const allContracts: ContractType[] = contractCategories.flatMap(
  (category) => category.contracts
);

export function getContractBySlug(slug: string): ContractType | undefined {
  return allContracts.find((contract) => contract.slug === slug);
}

export function getAllContractSlugs(): string[] {
  return allContracts.map((contract) => contract.slug);
}
