import type { ContractFieldDefinition } from "@/lib/contract-config";

export const PLAZO_CAMBIO_SUMINISTROS_OPTIONS = [
  { value: "7", label: "7 días" },
  { value: "15", label: "15 días" },
  { value: "30", label: "30 días" },
  { value: "45", label: "45 días" },
  { value: "60", label: "60 días" },
  {
    value: "no_cambio",
    label:
      "No realizar cambio de titularidad (mantener servicios a nombre del arrendador)",
  },
] as const;

export const PERIODICIDAD_PAGO_OPTIONS = [
  { value: "mensual", label: "Mensual" },
  { value: "trimestral", label: "Trimestral" },
  { value: "semanal", label: "Semanal" },
] as const;

export const SUMINISTROS_HABITACION_OPTIONS = [
  { value: "incluidos", label: "Incluidos en la renta" },
  { value: "aparte", label: "A pagar aparte por el arrendatario" },
] as const;

export const PLAZO_PAGO_HELP_TEXT =
  "Recomendamos un plazo de 5 días para cubrir posibles retrasos bancarios (ej. Del 1 al 5).";

export type CamposCondicionesLegalesOptions = {
  includeCambioTitularidad?: boolean;
  cambioTitularidadRequired?: boolean;
};

export function getCamposCondicionesLegalesArrendamiento(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition,
  options: CamposCondicionesLegalesOptions = {}
): ContractFieldDefinition[] {
  const {
    includeCambioTitularidad = false,
    cambioTitularidadRequired = false,
  } = options;

  const fields: ContractFieldDefinition[] = [];

  if (includeCambioTitularidad) {
    fields.push(
      field({
        id: "plazo_cambio_suministros",
        label: "Cambio de titularidad de suministros",
        type: "select",
        required: cambioTitularidadRequired,
        options: [...PLAZO_CAMBIO_SUMINISTROS_OPTIONS],
        helpText:
          "Opcional. Si lo indicas, el arrendatario se obligará a cambiar agua, luz y gas a su nombre en el plazo señalado.",
      })
    );
  }

  fields.push(
    field({
      id: "preaviso_rescision",
      label: "Preaviso de desistimiento (días)",
      type: "number",
      required: true,
      placeholder: "30",
      helpText:
        "En vivienda habitual, el inquilino necesita al menos 6 meses de contrato y un mínimo legal de 30 días de preaviso (art. 11 LAU). El valor indicado se usará si es igual o superior a 30.",
    }),
    field({
      id: "iban_pago",
      label: "Cuenta bancaria (IBAN)",
      type: "text",
      required: true,
      placeholder: "ES12 3456 7890 1234 5678 9012",
      helpText: "IBAN donde se recibirán los pagos de la renta.",
    })
  );

  return fields;
}

export function getCampoPeriodicidadPago(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition
): ContractFieldDefinition {
  return field({
    id: "periodicidad_pago",
    label: "Periodicidad de pago",
    type: "select",
    required: true,
    options: [...PERIODICIDAD_PAGO_OPTIONS],
  });
}

export function getCamposFechasContrato(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition,
  options: { fechaInicioRequired?: boolean } = {}
): ContractFieldDefinition[] {
  return [
    field({
      id: "fecha_inicio",
      label: "Fecha de inicio del contrato",
      type: "date",
      required: options.fechaInicioRequired ?? true,
    }),
    field({
      id: "fecha_primer_pago",
      label: "Fecha de primer pago",
      type: "date",
      required: true,
    }),
  ];
}

export function getCampoSuministrosHabitacion(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition
): ContractFieldDefinition {
  return field({
    id: "suministros_habitacion",
    label: "Suministros (agua, luz, gas)",
    type: "select",
    required: true,
    options: [...SUMINISTROS_HABITACION_OPTIONS],
    helpText:
      "Indica si los suministros están incluidos en la renta o deben abonarse aparte.",
  });
}

export function getCamposPlazoPago(
  field: (
    definition: ContractFieldDefinition
  ) => ContractFieldDefinition
): ContractFieldDefinition[] {
  return [
    field({
      id: "dia_pago_inicio",
      label: "Día de inicio del plazo de pago",
      type: "number",
      required: true,
      placeholder: "1",
    }),
    field({
      id: "dia_pago_fin",
      label: "Día de fin del plazo de pago",
      type: "number",
      required: true,
      placeholder: "5",
      helpText: PLAZO_PAGO_HELP_TEXT,
    }),
  ];
}

export function buildTextoPlazoPago(inicio: string, fin: string): string {
  const diaInicio = Number(inicio);
  const diaFin = Number(fin);

  if (diaInicio === diaFin) {
    return `el día ${diaInicio} de cada mes`;
  }

  return `del día ${diaInicio} al ${diaFin} de cada mes`;
}

export function validateDiaPagoMes(
  fieldId: "dia_pago_inicio" | "dia_pago_fin",
  value: string,
  allValues: Record<string, string>
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const day = Number(trimmed);
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return "Introduce un día válido del 1 al 31";
  }

  if (fieldId === "dia_pago_inicio") {
    const fin = Number(allValues.dia_pago_fin?.trim());
    if (allValues.dia_pago_fin?.trim() && !Number.isNaN(fin) && day > fin) {
      return "El día de inicio no puede ser posterior al día de fin";
    }
  }

  if (fieldId === "dia_pago_fin") {
    const inicio = Number(allValues.dia_pago_inicio?.trim());
    if (!Number.isNaN(inicio) && day < inicio) {
      return "El día de fin no puede ser anterior al día de inicio";
    }
  }

  return null;
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
  if (plazoDias === "no_cambio") {
    return (
      "Los suministros de agua, luz y gas permanecerán a nombre del arrendador, " +
      "sin obligación de cambio de titularidad por parte del arrendatario."
    );
  }

  return (
    "EL ARRENDATARIO se obliga a realizar el cambio de titularidad de los " +
    "suministros de agua, luz y gas en el plazo de " +
    `${plazoDias} días desde la entrega de las llaves o la firma del presente contrato.`
  );
}

export function buildClausulaSuministrosHabitacion(tipo: string): string {
  if (tipo === "incluidos") {
    return (
      "Los suministros de agua, luz y gas quedan incluidos en la renta mensual " +
      "pactada, sin coste adicional para el arrendatario."
    );
  }

  return (
    "Los suministros de agua, luz y gas correrán por cuenta del arrendatario, " +
    "quien deberá abonarlos aparte de la renta mensual."
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

  const periodicidad = values.periodicidad_pago?.trim();
  if (periodicidad) {
    variables.periodicidad_pago =
      PERIODICIDAD_PAGO_OPTIONS.find((option) => option.value === periodicidad)
        ?.label ?? periodicidad;
  }

  const fechaPrimerPago = values.fecha_primer_pago?.trim();
  if (fechaPrimerPago) {
    const date = new Date(fechaPrimerPago);
    if (!Number.isNaN(date.getTime())) {
      variables.fecha_primer_pago = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "long",
      }).format(date);
    }
  }

  const suministrosHabitacion = values.suministros_habitacion?.trim();
  if (suministrosHabitacion) {
    variables.clausula_suministros =
      buildClausulaSuministrosHabitacion(suministrosHabitacion);
  }

  const iban = values.iban_pago?.trim();
  if (iban) {
    variables.iban_pago = formatIban(iban);
  }

  const diaPagoInicio = values.dia_pago_inicio?.trim();
  const diaPagoFin = values.dia_pago_fin?.trim();
  if (diaPagoInicio && diaPagoFin) {
    variables.dia_pago = buildTextoPlazoPago(diaPagoInicio, diaPagoFin);
  }
}
