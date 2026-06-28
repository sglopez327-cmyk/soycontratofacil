import type { ContractConfig } from "@/lib/contract-config";
import type { ContractFieldOption } from "@/lib/contract-config";

export const MOTIVO_RESCISION_OPTIONS: ContractFieldOption[] = [
  { value: "mutuo_acuerdo", label: "Mutuo acuerdo" },
  { value: "finalizacion_plazo", label: "Finalización de plazo" },
  { value: "desistimiento_arrendatario", label: "Desistimiento del arrendatario" },
  { value: "otro", label: "Otro" },
];

const MOTIVO_RESCISION_CLAUSULAS: Record<string, string> = {
  mutuo_acuerdo:
    "La rescisión se produce de común acuerdo entre arrendador y arrendatario, conforme a lo pactado.",
  finalizacion_plazo:
    "La rescisión se produce por la finalización del plazo contractual del arrendamiento.",
  desistimiento_arrendatario:
    "La rescisión se produce por desistimiento del arrendatario, en los términos acordados.",
};

const MOTIVO_RESCISION_GENERICO =
  "La rescisión se produce por causas que las partes consideran suficientes y conforme a lo pactado entre ellas.";

export function buildClausulaMotivoRescision(
  motivoRescision: string | undefined
): string {
  const motivo = motivoRescision?.trim();

  if (!motivo || motivo === "otro") {
    return MOTIVO_RESCISION_GENERICO;
  }

  return MOTIVO_RESCISION_CLAUSULAS[motivo] ?? MOTIVO_RESCISION_GENERICO;
}

export function enrichRescisionTemplateVariables(
  config: ContractConfig,
  values: Record<string, string>,
  variables: Record<string, string>
): void {
  if (config.slug !== "rescision") {
    return;
  }

  variables.clausula_motivo_rescision = buildClausulaMotivoRescision(
    values.motivo_rescision
  );
}
