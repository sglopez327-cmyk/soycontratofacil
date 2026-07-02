import { contractCatalog, getAllCatalogSlugs } from "@/lib/contract-catalog";
import { hasConfigForSlug } from "@/lib/contract-config";

/**
 * Slugs del catálogo con formulario nativo disponible.
 * Se deriva automáticamente del catálogo maestro + contract-config (sin lista duplicada).
 */
export function getNativeContractSlugs(): string[] {
  return getAllCatalogSlugs().filter((slug) => hasConfigForSlug(slug));
}

export const NATIVE_CONTRACT_SLUGS = getNativeContractSlugs();

export type NativeContractSlug = (typeof NATIVE_CONTRACT_SLUGS)[number];

export function isNativeContract(slug: string): boolean {
  return getNativeContractSlugs().includes(slug);
}

export function isCatalogContract(slug: string): boolean {
  return contractCatalog.some((category) =>
    category.contracts.some((contract) => contract.slug === slug)
  );
}
