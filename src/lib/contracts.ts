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

import {
  contractCatalog,
  type CatalogCategory,
  type CatalogContract,
} from "@/lib/contract-catalog";

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

const CONTRACT_ICONS: Record<string, LucideIcon> = {
  vivienda: Home,
  temporada: CalendarRange,
  habitacion: DoorOpen,
  local: Building2,
  "finca-rustica": Trees,
  "arrendamiento-garaje": Warehouse,
  "compraventa-vivienda": Landmark,
  arras: FileSignature,
  "garaje-trastero": Warehouse,
  rescision: FileText,
  "cambio-suministros": PlugZap,
};

function contract(
  data: CatalogContract & { categoryId: string; categoryTitle: string }
): ContractType {
  return {
    ...data,
    href: getContractHref(data.slug),
    icon: CONTRACT_ICONS[data.slug] ?? FileText,
  };
}

export const contractCategories: ContractCategory[] = contractCatalog.map(
  (category: CatalogCategory) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    contracts: category.contracts.map((item) =>
      contract({
        ...item,
        categoryId: category.id,
        categoryTitle: category.title,
      })
    ),
  })
);

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
  return allContracts.find((item) => item.slug === slug);
}

export function getAllContractSlugs(): string[] {
  return allContracts.map((item) => item.slug);
}

export { contractCatalog } from "@/lib/contract-catalog";
