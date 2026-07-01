import type { ContractConfig } from "@/lib/contract-config";
import type { ContractFieldOption } from "@/lib/contract-config";

export const CERTIFICADO_ENERGETICO_OPTIONS: ContractFieldOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "en_tramite", label: "En trámite" },
];

export function normalizeReferenciaCatastral(value: string): string {
  return value.replace(/[\s.-]/g, "").toUpperCase();
}

export function validateReferenciaCatastral(value: string): boolean {
  const normalized = normalizeReferenciaCatastral(value);
  return /^[0-9A-Z]{20}$/.test(normalized) || /^[0-9A-Z]{14}$/.test(normalized);
}

export function getCertificadoEnergeticoLabel(value: string): string {
  if (value === "en_tramite") {
    return "En trámite";
  }
  return value.toUpperCase();
}

function formatUbicacionInmueble(values: Record<string, string>): string {
  const direccion = values.direccion_inmueble?.trim() ?? "";
  if (!direccion) {
    return "";
  }

  let ubicacion = direccion;

  if (values.ciudad?.trim()) {
    ubicacion += `, ${values.ciudad.trim()}`;
  }

  if (values.codigo_postal?.trim()) {
    ubicacion += ` (C.P. ${values.codigo_postal.trim()})`;
  }

  return ubicacion;
}

const INMUEBLE_SUBJECT: Record<string, string> = {
  vivienda: "la vivienda",
  temporada: "el inmueble",
  habitacion: "la habitación arrendada",
  local: "el local comercial",
  "finca-rustica": "la finca rústica",
  "arrendamiento-garaje": "la plaza de garaje o trastero",
  "compraventa-vivienda": "la vivienda",
  arras: "el inmueble",
  "garaje-trastero": "la plaza de garaje o trastero",
};

export function buildDescripcionInmueble(
  config: ContractConfig,
  values: Record<string, string>
): string {
  const subject = INMUEBLE_SUBJECT[config.slug] ?? "el inmueble";
  const ubicacion = formatUbicacionInmueble(values);
  const segments: string[] = [];

  if (ubicacion) {
    segments.push(`${subject} sita en ${ubicacion}`);
  } else {
    segments.push(subject);
  }

  const referencia = values.referencia_catastral?.trim();
  if (referencia) {
    segments.push(
      `con referencia catastral ${normalizeReferenciaCatastral(referencia)}`
    );
  }

  const superficie = values.superficie?.trim();
  if (superficie) {
    if (config.slug === "finca-rustica") {
      segments.push(`superficie aproximada de ${superficie}`);
    } else {
      segments.push(`superficie de ${superficie} m²`);
    }
  }

  const certificado = values.certificado_energetico?.trim();
  if (certificado) {
    segments.push(
      `certificado de eficiencia energética con calificación ${getCertificadoEnergeticoLabel(certificado)}`
    );
  }

  if (config.slug === "vivienda" && values.alquiler_amueblado === "si") {
    segments.push("amueblada");
  }

  if (config.slug === "local") {
    const escaparate = values.metros_escaparate?.trim();
    if (escaparate) {
      segments.push(`escaparate de ${escaparate} m de longitud`);
    }
  }

  if (config.slug === "garaje-trastero" || config.slug === "arrendamiento-garaje") {
    const plaza = values.numero_plaza?.trim();
    if (plaza) {
      segments.push(`identificada como ${plaza}`);
    }
    const superficiePlaza = values.superficie_plaza?.trim();
    if (superficiePlaza) {
      segments.push(`superficie aproximada de ${superficiePlaza} m²`);
    }
  }

  if (config.slug === "habitacion" && values.habitacion_descripcion?.trim()) {
    segments.push(`comprendiendo ${values.habitacion_descripcion.trim()}`);
  }

  if (config.slug === "finca-rustica" && values.uso_previsto?.trim()) {
    segments.push(`destinada a ${values.uso_previsto.trim()}`);
  }

  return segments.join(", ");
}

export function enrichPropertyTemplateVariables(
  config: ContractConfig,
  values: Record<string, string>,
  variables: Record<string, string>
): void {
  const referencia = values.referencia_catastral?.trim();
  if (referencia) {
    variables.referencia_catastral = normalizeReferenciaCatastral(referencia);
  }

  const certificado = values.certificado_energetico?.trim();
  if (certificado) {
    variables.certificado_energetico_label =
      getCertificadoEnergeticoLabel(certificado);
  }

  if (values.alquiler_amueblado === "si") {
    variables.alquiler_amueblado = "amueblada";
  }

  variables.descripcion_inmueble = buildDescripcionInmueble(config, values);
}
