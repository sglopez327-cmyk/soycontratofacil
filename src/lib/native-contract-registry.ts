/**
 * Contratos con formulario nativo en app-mobile.
 * Para migrar otro contrato: añade su slug aquí (debe existir en contract-config.ts).
 */
export const NATIVE_CONTRACT_SLUGS = [
  "arrendamiento-garaje",
] as const;

export type NativeContractSlug = (typeof NATIVE_CONTRACT_SLUGS)[number];

export function isNativeContract(slug: string): slug is NativeContractSlug {
  return (NATIVE_CONTRACT_SLUGS as readonly string[]).includes(slug);
}

export function getNativeContractSlugs(): string[] {
  return [...NATIVE_CONTRACT_SLUGS];
}
