import type { ContractFieldDefinition } from "@/lib/contract-config";
import { formatContractFieldValue } from "@/lib/format-contract-value";

function formatResponsabilidadGastos(value: string): string {
  switch (value) {
    case "arrendatario":
      return "a cargo del arrendatario";
    case "arrendador":
      return "a cargo del arrendador";
    case "compartidos":
      return "de forma compartida por ambas partes";
    default:
      return value;
  }
}

/**
 * Formatea valores del formulario para insertarlos en plantillas legales.
 * Usa frases completas cuando la plantilla delega en la variable todo el texto.
 */
export function formatFieldForTemplate(
  field: ContractFieldDefinition,
  rawValue: string
): string {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return "";
  }

  switch (field.id) {
    case "ibi":
    case "gastos_comunidad":
      return formatResponsabilidadGastos(trimmed);
    default:
      return formatContractFieldValue(field, trimmed);
  }
}
