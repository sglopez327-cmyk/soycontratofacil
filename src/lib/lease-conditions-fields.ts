import type { ContractFieldDefinition } from "@/lib/contract-config";

export const PLAZO_CAMBIO_SUMINISTROS_OPTIONS = [
  { value: "7", label: "7 días" },
  { value: "15", label: "15 días" },
  { value: "30", label: "30 días" },
  { value: "45", label: "45 días" },
  { value: "60", label: "60 días" },
] as const;

export function getCamposCondicionesLegalesArrendamiento(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition
): ContractFieldDefinition[] {
  return [
    field({
      id: "plazo_cambio_suministros",
      label: "Cambio de titularidad de suministros",
      type: "select",
      required: true,
      options: [...PLAZO_CAMBIO_SUMINISTROS_OPTIONS],
      helpText:
        "El arrendatario se obliga a cambiar agua, luz y gas a su nombre en el plazo indicado.",
    }),
    field({
      id: "preaviso_rescision",
      label: "Preaviso de rescisión (días)",
      type: "number",
      required: true,
      placeholder: "30",
      helpText:
        "Días de antelación mínima para notificar la rescisión del contrato.",
    }),
    field({
      id: "iban_pago",
      label: "Cuenta bancaria (IBAN)",
      type: "text",
      required: true,
      placeholder: "ES12 3456 7890 1234 5678 9012",
      helpText: "IBAN donde se realizarán los pagos mensuales de la renta.",
    }),
  ];
}

export function normalizeIban(value: string): string {
  return value.replace(/\s/g, "").toUpperCase();
}

export function formatIban(value: string): string {
  const normalized = normalizeIban(value);
  return normalized.replace(/(.{4})/g, "$1 ").trim();
}

export function validateIban(value: string): boolean {
  const normalized = normalizeIban(value);
  if (!/^ES\d{22}$/.test(normalized)) {
    return false;
  }

  const rearranged = normalized.slice(4) + normalized.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (character) =>
    String(character.charCodeAt(0) - 55)
  );

  let remainder = numeric;
  while (remainder.length > 2) {
    remainder =
      String(Number(remainder.slice(0, 9)) % 97) + remainder.slice(9);
  }

  return Number(remainder) % 97 === 1;
}

export function buildClausulaSuministros(plazoDias: string): string {
  return (
    "EL ARRENDATARIO se obliga a realizar el cambio de titularidad de los " +
    "suministros de agua, luz y gas en el plazo de " +
    `${plazoDias} días desde la entrega de las llaves o la firma del presente contrato.`
  );
}

export function enrichLeaseTemplateVariables(
  values: Record<string, string>,
  variables: Record<string, string>
): void {
  const plazo = values.plazo_cambio_suministros?.trim();
  if (plazo) {
    variables.clausula_suministros = buildClausulaSuministros(plazo);
  }

  const iban = values.iban_pago?.trim();
  if (iban) {
    variables.iban_pago = formatIban(iban);
  }
}
