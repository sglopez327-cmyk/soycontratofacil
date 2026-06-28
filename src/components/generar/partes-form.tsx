"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  PARTY_VARIANTS,
  TIPO_DOCUMENTO_EMPRESA_OPTIONS,
  TIPO_DOCUMENTO_FISICA_OPTIONS,
  TIPO_PERSONA_OPTIONS,
  getPartyTitle,
  type PartyFormVariant,
  type PartyPrefix,
  type TipoPersona,
} from "@/lib/party-fields";
import { contractInputClassName } from "@/components/generar/contract-field";

type PartesFormProps = {
  variant: PartyFormVariant;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

type PartySectionProps = {
  prefix: PartyPrefix;
  title: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

function PartySection({
  prefix,
  title,
  values,
  errors,
  onChange,
}: PartySectionProps) {
  const tipoPersona = (values[`${prefix}_tipo_persona`] || "fisica") as TipoPersona;
  const isEmpresa = tipoPersona === "empresa";
  const documentOptions = isEmpresa
    ? TIPO_DOCUMENTO_EMPRESA_OPTIONS
    : TIPO_DOCUMENTO_FISICA_OPTIONS;

  function handleTipoPersonaChange(value: string) {
    onChange(`${prefix}_tipo_persona`, value);
    onChange(
      `${prefix}_tipo_documento`,
      value === "empresa" ? "cif" : "dni"
    );
  }

  return (
    <section className="space-y-5 rounded-xl border border-slate-700/80 bg-slate-950/40 p-4 sm:p-5">
      <header>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-card-body mt-1 text-xs text-slate-500">
          Datos identificativos y de contacto a efectos contractuales.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <PartyField
          id={`${prefix}_tipo_persona`}
          label="Tipo de persona"
          required
          error={errors[`${prefix}_tipo_persona`]}
          className="sm:col-span-2"
        >
          <select
            id={`${prefix}_tipo_persona`}
            value={values[`${prefix}_tipo_persona`] ?? "fisica"}
            aria-invalid={Boolean(errors[`${prefix}_tipo_persona`])}
            className={cn(contractInputClassName, "cursor-pointer")}
            onChange={(event) => handleTipoPersonaChange(event.target.value)}
          >
            {TIPO_PERSONA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </PartyField>

        <PartyField
          id={`${prefix}_nombre`}
          label={isEmpresa ? "Razón social" : "Nombre completo"}
          required
          error={errors[`${prefix}_nombre`]}
          className="sm:col-span-2"
        >
          <input
            id={`${prefix}_nombre`}
            type="text"
            value={values[`${prefix}_nombre`] ?? ""}
            placeholder={
              isEmpresa ? "Empresa Ejemplo, S.L." : "Nombre y apellidos"
            }
            aria-invalid={Boolean(errors[`${prefix}_nombre`])}
            className={contractInputClassName}
            onChange={(event) => onChange(`${prefix}_nombre`, event.target.value)}
          />
        </PartyField>

        <PartyField
          id={`${prefix}_tipo_documento`}
          label="Tipo de documento"
          required
          error={errors[`${prefix}_tipo_documento`]}
        >
          <select
            id={`${prefix}_tipo_documento`}
            value={values[`${prefix}_tipo_documento`] ?? (isEmpresa ? "cif" : "dni")}
            disabled={isEmpresa}
            aria-invalid={Boolean(errors[`${prefix}_tipo_documento`])}
            className={cn(
              contractInputClassName,
              "cursor-pointer",
              isEmpresa && "opacity-80"
            )}
            onChange={(event) =>
              onChange(`${prefix}_tipo_documento`, event.target.value)
            }
          >
            {documentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </PartyField>

        <PartyField
          id={`${prefix}_numero_documento`}
          label="Número de identificación"
          required
          error={errors[`${prefix}_numero_documento`]}
        >
          <input
            id={`${prefix}_numero_documento`}
            type="text"
            value={values[`${prefix}_numero_documento`] ?? ""}
            placeholder={isEmpresa ? "B12345678" : "12345678A"}
            aria-invalid={Boolean(errors[`${prefix}_numero_documento`])}
            className={contractInputClassName}
            onChange={(event) =>
              onChange(`${prefix}_numero_documento`, event.target.value)
            }
          />
        </PartyField>

        <PartyField
          id={`${prefix}_direccion`}
          label="Calle y número"
          required
          error={errors[`${prefix}_direccion`]}
          className="sm:col-span-2"
        >
          <input
            id={`${prefix}_direccion`}
            type="text"
            value={values[`${prefix}_direccion`] ?? ""}
            placeholder="Calle Mayor, 12, 3º B"
            aria-invalid={Boolean(errors[`${prefix}_direccion`])}
            className={contractInputClassName}
            onChange={(event) =>
              onChange(`${prefix}_direccion`, event.target.value)
            }
          />
        </PartyField>

        <PartyField
          id={`${prefix}_codigo_postal`}
          label="Código postal"
          required
          error={errors[`${prefix}_codigo_postal`]}
        >
          <input
            id={`${prefix}_codigo_postal`}
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={values[`${prefix}_codigo_postal`] ?? ""}
            placeholder="28001"
            aria-invalid={Boolean(errors[`${prefix}_codigo_postal`])}
            className={contractInputClassName}
            onChange={(event) =>
              onChange(`${prefix}_codigo_postal`, event.target.value)
            }
          />
        </PartyField>

        <PartyField
          id={`${prefix}_ciudad`}
          label="Ciudad"
          required
          error={errors[`${prefix}_ciudad`]}
        >
          <input
            id={`${prefix}_ciudad`}
            type="text"
            value={values[`${prefix}_ciudad`] ?? ""}
            placeholder="Madrid"
            aria-invalid={Boolean(errors[`${prefix}_ciudad`])}
            className={contractInputClassName}
            onChange={(event) => onChange(`${prefix}_ciudad`, event.target.value)}
          />
        </PartyField>

        <PartyField
          id={`${prefix}_provincia`}
          label="Provincia"
          required
          error={errors[`${prefix}_provincia`]}
          className="sm:col-span-2"
        >
          <input
            id={`${prefix}_provincia`}
            type="text"
            value={values[`${prefix}_provincia`] ?? ""}
            placeholder="Madrid"
            aria-invalid={Boolean(errors[`${prefix}_provincia`])}
            className={contractInputClassName}
            onChange={(event) =>
              onChange(`${prefix}_provincia`, event.target.value)
            }
          />
        </PartyField>

        <PartyField
          id={`${prefix}_email`}
          label="Email"
          required
          error={errors[`${prefix}_email`]}
        >
          <input
            id={`${prefix}_email`}
            type="email"
            value={values[`${prefix}_email`] ?? ""}
            placeholder="nombre@ejemplo.com"
            aria-invalid={Boolean(errors[`${prefix}_email`])}
            className={contractInputClassName}
            onChange={(event) => onChange(`${prefix}_email`, event.target.value)}
          />
        </PartyField>

        <PartyField
          id={`${prefix}_telefono`}
          label="Teléfono"
          required
          error={errors[`${prefix}_telefono`]}
        >
          <input
            id={`${prefix}_telefono`}
            type="tel"
            value={values[`${prefix}_telefono`] ?? ""}
            placeholder="600 000 000"
            aria-invalid={Boolean(errors[`${prefix}_telefono`])}
            className={contractInputClassName}
            onChange={(event) =>
              onChange(`${prefix}_telefono`, event.target.value)
            }
          />
        </PartyField>
      </div>
    </section>
  );
}

type PartyFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function PartyField({
  id,
  label,
  required,
  error,
  className,
  children,
}: PartyFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-200">
        {label}
        {required ? (
          <span className="ml-1 text-brand-blue" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PartesForm({
  variant,
  values,
  errors,
  onChange,
}: PartesFormProps) {
  const [leftPrefix, rightPrefix] = PARTY_VARIANTS[variant].parties;

  return (
    <div className="space-y-6">
      <PartySection
        prefix={leftPrefix}
        title={getPartyTitle(variant, leftPrefix)}
        values={values}
        errors={errors}
        onChange={onChange}
      />
      <PartySection
        prefix={rightPrefix}
        title={getPartyTitle(variant, rightPrefix)}
        values={values}
        errors={errors}
        onChange={onChange}
      />
    </div>
  );
}
