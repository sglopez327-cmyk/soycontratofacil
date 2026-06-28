import type { ContractFieldDefinition } from "@/lib/contract-config";

export type PartyFormVariant = "arrendamiento" | "compraventa";

export type PartyPrefix =
  | "arrendador"
  | "arrendatario"
  | "vendedor"
  | "comprador";

export type TipoPersona = "fisica" | "empresa";

export type TipoDocumento = "dni" | "nie" | "pasaporte" | "cif";

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

export const PARTY_VARIANTS = {
  arrendamiento: {
    parties: ["arrendador", "arrendatario"] as const,
    labels: {
      arrendador: { title: "Arrendador", role: "EL ARRENDADOR" },
      arrendatario: { title: "Arrendatario", role: "EL ARRENDATARIO" },
    },
  },
  compraventa: {
    parties: ["vendedor", "comprador"] as const,
    labels: {
      vendedor: { title: "Vendedor", role: "EL VENDEDOR" },
      comprador: { title: "Comprador", role: "EL COMPRADOR" },
    },
  },
} satisfies Record<
  PartyFormVariant,
  {
    parties: readonly [PartyPrefix, PartyPrefix];
    labels: Record<string, { title: string; role: string }>;
  }
>;

export const TIPO_PERSONA_OPTIONS = [
  { value: "fisica", label: "Persona física" },
  { value: "empresa", label: "Empresa" },
] as const;

export const TIPO_DOCUMENTO_FISICA_OPTIONS = [
  { value: "dni", label: "DNI" },
  { value: "nie", label: "NIE" },
  { value: "pasaporte", label: "Pasaporte" },
] as const;

export const TIPO_DOCUMENTO_EMPRESA_OPTIONS = [
  { value: "cif", label: "CIF" },
] as const;

const DOCUMENT_LABELS: Record<TipoDocumento, string> = {
  dni: "DNI",
  nie: "NIE",
  pasaporte: "Pasaporte",
  cif: "CIF",
};

export function getPartyFieldIds(prefix: PartyPrefix): string[] {
  return [
    `${prefix}_tipo_persona`,
    `${prefix}_nombre`,
    `${prefix}_tipo_documento`,
    `${prefix}_numero_documento`,
    `${prefix}_direccion`,
    `${prefix}_codigo_postal`,
    `${prefix}_ciudad`,
    `${prefix}_provincia`,
    `${prefix}_email`,
    `${prefix}_telefono`,
  ];
}

export function getPartyPrefixes(variant: PartyFormVariant): PartyPrefix[] {
  return [...PARTY_VARIANTS[variant].parties];
}

export function getPartyTitle(variant: PartyFormVariant, prefix: PartyPrefix): string {
  const labels = PARTY_VARIANTS[variant].labels as Record<
    string,
    { title: string; role: string }
  >;
  return labels[prefix]?.title ?? prefix;
}

export function createEmptyPartyValues(
  variant: PartyFormVariant
): Record<string, string> {
  const values: Record<string, string> = {};

  for (const prefix of getPartyPrefixes(variant)) {
    values[`${prefix}_tipo_persona`] = "fisica";
    values[`${prefix}_tipo_documento`] = "dni";
    for (const fieldId of getPartyFieldIds(prefix)) {
      if (!(fieldId in values)) {
        values[fieldId] = "";
      }
    }
  }

  return values;
}

function partyField(
  prefix: PartyPrefix,
  suffix: string,
  definition: Omit<ContractFieldDefinition, "id">
): ContractFieldDefinition {
  return { id: `${prefix}_${suffix}`, ...definition };
}

export function getPartyFieldDefinitions(
  variant: PartyFormVariant
): ContractFieldDefinition[] {
  const fields: ContractFieldDefinition[] = [];

  for (const prefix of getPartyPrefixes(variant)) {
    const partyTitle = getPartyTitle(variant, prefix);

    fields.push(
      partyField(prefix, "tipo_persona", {
        label: `${partyTitle} — Tipo de persona`,
        type: "select",
        required: true,
        options: [...TIPO_PERSONA_OPTIONS],
      }),
      partyField(prefix, "nombre", {
        label: `${partyTitle} — Nombre completo`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "tipo_documento", {
        label: `${partyTitle} — Tipo de documento`,
        type: "select",
        required: true,
        options: [
          ...TIPO_DOCUMENTO_FISICA_OPTIONS,
          ...TIPO_DOCUMENTO_EMPRESA_OPTIONS,
        ],
      }),
      partyField(prefix, "numero_documento", {
        label: `${partyTitle} — Número de identificación`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "direccion", {
        label: `${partyTitle} — Calle y número`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "codigo_postal", {
        label: `${partyTitle} — Código postal`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "ciudad", {
        label: `${partyTitle} — Ciudad`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "provincia", {
        label: `${partyTitle} — Provincia`,
        type: "text",
        required: true,
      }),
      partyField(prefix, "email", {
        label: `${partyTitle} — Email`,
        type: "email",
        required: true,
      }),
      partyField(prefix, "telefono", {
        label: `${partyTitle} — Teléfono`,
        type: "text",
        required: true,
      })
    );
  }

  return fields;
}

function validateDni(value: string): boolean {
  const normalized = value.toUpperCase().replace(/\s/g, "");
  const match = normalized.match(/^(\d{8})([A-Z])$/);
  if (!match) {
    return false;
  }
  const number = Number.parseInt(match[1], 10);
  return DNI_LETTERS[number % 23] === match[2];
}

function validateNie(value: string): boolean {
  const normalized = value.toUpperCase().replace(/\s/g, "");
  const match = normalized.match(/^([XYZ])(\d{7})([A-Z])$/);
  if (!match) {
    return false;
  }
  const prefix = { X: "0", Y: "1", Z: "2" }[match[1] as "X" | "Y" | "Z"];
  return validateDni(`${prefix}${match[2]}${match[3]}`);
}

function validateCif(value: string): boolean {
  const normalized = value.toUpperCase().replace(/[\s-]/g, "");
  return /^[ABCDEFGHJNPQRSUVW]\d{7}[\dA-J]$/.test(normalized);
}

function validatePasaporte(value: string): boolean {
  return /^[A-Z0-9]{5,15}$/i.test(value.replace(/\s/g, ""));
}

function validateDocumentNumber(
  tipo: TipoDocumento,
  value: string
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "El número de identificación es obligatorio";
  }

  switch (tipo) {
    case "dni":
      return validateDni(trimmed)
        ? null
        : "Introduce un DNI válido (8 números y letra)";
    case "nie":
      return validateNie(trimmed)
        ? null
        : "Introduce un NIE válido (X/Y/Z, 7 números y letra)";
    case "cif":
      return validateCif(trimmed)
        ? null
        : "Introduce un CIF válido";
    case "pasaporte":
      return validatePasaporte(trimmed)
        ? null
        : "Introduce un número de pasaporte válido";
    default:
      return null;
  }
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "El email es obligatorio";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return "Introduce un correo electrónico válido";
  }
  return null;
}

function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "El teléfono es obligatorio";
  }
  const digits = trimmed.replace(/[\s().-]/g, "").replace(/^(\+34|0034)/, "");
  if (!/^[6789]\d{8}$/.test(digits)) {
    return "Introduce un teléfono válido (9 dígitos, móvil o fijo español)";
  }
  return null;
}

function validatePostalCode(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "El código postal es obligatorio";
  }
  if (!/^\d{5}$/.test(trimmed)) {
    return "Introduce un código postal válido (5 dígitos)";
  }
  return null;
}

function validateRequiredText(value: string, label: string): string | null {
  if (!value.trim()) {
    return `${label} es obligatorio`;
  }
  return null;
}

export function validateParty(
  prefix: PartyPrefix,
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};
  const tipoPersona = values[`${prefix}_tipo_persona`] as TipoPersona | undefined;
  const tipoDocumento = values[`${prefix}_tipo_documento`] as
    | TipoDocumento
    | undefined;
  const nombreLabel =
    tipoPersona === "empresa" ? "La razón social" : "El nombre completo";

  const nombreError = validateRequiredText(
    values[`${prefix}_nombre`] ?? "",
    nombreLabel
  );
  if (nombreError) {
    errors[`${prefix}_nombre`] = nombreError;
  }

  if (!tipoPersona) {
    errors[`${prefix}_tipo_persona`] = "Selecciona el tipo de persona";
  }

  if (tipoPersona === "empresa" && tipoDocumento !== "cif") {
    errors[`${prefix}_tipo_documento`] =
      "Las empresas deben identificarse con CIF";
  }

  if (tipoPersona === "fisica" && tipoDocumento === "cif") {
    errors[`${prefix}_tipo_documento`] =
      "Selecciona DNI, NIE o Pasaporte para persona física";
  }

  const docError = validateDocumentNumber(
    (tipoDocumento ?? "dni") as TipoDocumento,
    values[`${prefix}_numero_documento`] ?? ""
  );
  if (docError) {
    errors[`${prefix}_numero_documento`] = docError;
  }

  const addressFields: [string, string, (value: string) => string | null][] = [
    [`${prefix}_direccion`, "La calle y número", (v) => validateRequiredText(v, "La calle y número")],
    [`${prefix}_codigo_postal`, "El código postal", validatePostalCode],
    [`${prefix}_ciudad`, "La ciudad", (v) => validateRequiredText(v, "La ciudad")],
    [`${prefix}_provincia`, "La provincia", (v) => validateRequiredText(v, "La provincia")],
  ];

  for (const [fieldId, , validator] of addressFields) {
    const error = validator(values[fieldId] ?? "");
    if (error) {
      errors[fieldId] = error;
    }
  }

  const emailError = validateEmail(values[`${prefix}_email`] ?? "");
  if (emailError) {
    errors[`${prefix}_email`] = emailError;
  }

  const phoneError = validatePhone(values[`${prefix}_telefono`] ?? "");
  if (phoneError) {
    errors[`${prefix}_telefono`] = phoneError;
  }

  return errors;
}

export function validatePartyStep(
  variant: PartyFormVariant,
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const prefix of getPartyPrefixes(variant)) {
    Object.assign(errors, validateParty(prefix, values));
  }

  return errors;
}

export function formatPartyAddress(
  prefix: PartyPrefix,
  values: Record<string, string>
): string {
  const calle = values[`${prefix}_direccion`]?.trim() ?? "";
  const cp = values[`${prefix}_codigo_postal`]?.trim() ?? "";
  const ciudad = values[`${prefix}_ciudad`]?.trim() ?? "";
  const provincia = values[`${prefix}_provincia`]?.trim() ?? "";

  const locality = [cp, ciudad].filter(Boolean).join(" ");
  let result = calle;

  if (locality) {
    result = result ? `${result}, ${locality}` : locality;
  }

  if (provincia) {
    result = result ? `${result} (${provincia})` : provincia;
  }

  return result;
}

export function formatPartyComparecencia(
  prefix: PartyPrefix,
  values: Record<string, string>
): string {
  const nombre = values[`${prefix}_nombre`]?.trim() ?? "";
  const tipoPersona = values[`${prefix}_tipo_persona`] as TipoPersona;
  const tipoDoc = values[`${prefix}_tipo_documento`] as TipoDocumento;
  const numDoc = values[`${prefix}_numero_documento`]?.trim() ?? "";
  const direccion = formatPartyAddress(prefix, values);
  const email = values[`${prefix}_email`]?.trim() ?? "";
  const telefono = values[`${prefix}_telefono`]?.trim() ?? "";

  const identificacion =
    tipoPersona === "empresa"
      ? `la mercantil ${nombre}`
      : `D./Dña. ${nombre}, mayor de edad y con capacidad legal para contratar`;

  const docLabel = DOCUMENT_LABELS[tipoDoc] ?? tipoDoc.toUpperCase();

  return (
    `${identificacion}, con ${docLabel} nº ${numDoc}, domicilio en ${direccion}, ` +
    `correo electrónico ${email} y teléfono ${telefono}`
  );
}

export function enrichPartyTemplateVariables(
  variant: PartyFormVariant,
  values: Record<string, string>,
  variables: Record<string, string>
): void {
  for (const prefix of getPartyPrefixes(variant)) {
    variables[`${prefix}_comparecencia`] = formatPartyComparecencia(
      prefix,
      values
    );
    variables[`${prefix}_direccion_completa`] = formatPartyAddress(
      prefix,
      values
    );
    variables[`${prefix}_nombre`] =
      values[`${prefix}_nombre`]?.trim() || variables[`${prefix}_nombre`];
  }
}

export function getPartyVariantsFromConfig(
  config: { steps: { partyForm?: PartyFormVariant }[] }
): PartyFormVariant[] {
  return config.steps
    .map((step) => step.partyForm)
    .filter((variant): variant is PartyFormVariant => Boolean(variant));
}
