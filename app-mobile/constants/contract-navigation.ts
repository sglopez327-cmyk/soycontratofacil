import { router } from "expo-router";

/** Abre el formulario nativo del contrato. */
export function openContract(slug: string): void {
  router.push(`/generar/${slug}`);
}
