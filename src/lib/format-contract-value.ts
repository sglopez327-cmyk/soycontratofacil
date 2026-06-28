import type { ContractFieldDefinition } from "@/lib/contract-config";

export function formatContractFieldValue(
  field: Pick<ContractFieldDefinition, "type" | "options">,
  value: string
): string {
  if (!value.trim()) {
    return "—";
  }

  if (field.type === "select" && field.options) {
    return field.options.find((option) => option.value === value)?.label ?? value;
  }

  if (field.type === "checkbox") {
    return value === "si" ? "Sí" : "No";
  }

  if (field.type === "currency") {
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const amount = Number(normalized);
    if (!Number.isNaN(amount)) {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    }
  }

  if (field.type === "date") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(date);
    }
  }

  return value;
}
