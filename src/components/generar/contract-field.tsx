"use client";

import { cn } from "@/lib/utils";
import type { ContractFieldDefinition } from "@/lib/contract-config";

export const contractInputClassName =
  "w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2.5 text-sm font-normal leading-relaxed tracking-[0.008em] text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25 aria-invalid:border-red-400/80 aria-invalid:ring-red-400/20";

type ContractFieldProps = {
  field: ContractFieldDefinition;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function ContractField({
  field,
  value,
  error,
  onChange,
}: ContractFieldProps) {
  const fieldId = `field-${field.id}`;
  const hasError = Boolean(error);

  return (
    <div className="space-y-2">
      {field.type !== "checkbox" ? (
        <label htmlFor={fieldId} className="block text-sm font-semibold tracking-[0.008em] text-slate-200">
          {field.label}
          {field.required ? (
            <span className="ml-1 text-brand-blue" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}

      {field.type === "checkbox" ? (
        <label
          htmlFor={fieldId}
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700/80 bg-slate-900/40 px-4 py-3"
        >
          <input
            id={fieldId}
            name={field.id}
            type="checkbox"
            checked={value === "si"}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${fieldId}-error` : field.helpText ? `${fieldId}-help` : undefined
            }
            className="mt-0.5 size-4 shrink-0 rounded border-slate-500 bg-slate-900 text-brand-blue focus:ring-brand-blue/25"
            onChange={(event) => onChange(event.target.checked ? "si" : "")}
          />
          <span className="text-sm font-semibold text-slate-200">{field.label}</span>
        </label>
      ) : field.type === "textarea" ? (
        <textarea
          id={fieldId}
          name={field.id}
          value={value}
          rows={4}
          placeholder={field.placeholder}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${fieldId}-error` : field.helpText ? `${fieldId}-help` : undefined
          }
          className={cn(contractInputClassName, "min-h-24 resize-y")}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : field.type === "select" ? (
        <select
          id={fieldId}
          name={field.id}
          value={value}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${fieldId}-error` : field.helpText ? `${fieldId}-help` : undefined
          }
          className={cn(contractInputClassName, "cursor-pointer")}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={field.id}
          type={
            field.type === "currency"
              ? "text"
              : field.type === "number"
                ? "number"
                : field.type
          }
          value={value}
          placeholder={field.placeholder}
          inputMode={field.type === "currency" ? "decimal" : undefined}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${fieldId}-error` : field.helpText ? `${fieldId}-help` : undefined
          }
          className={contractInputClassName}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {field.helpText ? (
        <p id={`${fieldId}-help`} className="text-card-body text-xs text-slate-500">
          {field.helpText}
        </p>
      ) : null}

      {error ? (
        <p id={`${fieldId}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
