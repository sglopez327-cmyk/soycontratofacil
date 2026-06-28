import type { ContractConfig } from "@/lib/contract-config";
import { getConfigFields } from "@/lib/contract-config";
import {
  enrichPartyTemplateVariables,
  getPartyVariantsFromConfig,
} from "@/lib/party-fields";
import { enrichPropertyTemplateVariables } from "@/lib/property-fields";
import { enrichLeaseTemplateVariables } from "@/lib/lease-conditions-fields";
import type { ContractLegalTemplate } from "@/lib/contract-templates";
import { getContractTemplate } from "@/lib/contract-templates";
import { formatFieldForTemplate } from "@/lib/format-template-value";

export const EMPTY_PLACEHOLDER = "________________";

export type RenderedContractDocument = {
  slug: string;
  title: string;
  subtitle: string;
  comparecencia: string;
  sections: { title: string; content: string }[];
  signatures: {
    left: { role: string; name: string };
    right: { role: string; name: string };
  };
  closing: string;
  isGenericFallback: boolean;
};

function formatDocumentDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(date);
}

function resolveLugarFirma(values: Record<string, string>): string {
  if (values.ciudad?.trim()) {
    return values.ciudad.trim();
  }

  const address = values.direccion_inmueble?.trim();
  if (address) {
    const parts = address.split(",").map((part) => part.trim());
    return parts[parts.length - 1] || address;
  }

  return EMPTY_PLACEHOLDER;
}

export function buildTemplateVariables(
  config: ContractConfig,
  values: Record<string, string>
): Record<string, string> {
  const variables: Record<string, string> = {
    fecha_documento: formatDocumentDate(new Date()),
    lugar_firma: resolveLugarFirma(values),
  };

  for (const field of getConfigFields(config)) {
    const raw = values[field.id]?.trim() ?? "";
    variables[field.id] = raw
      ? formatFieldForTemplate(field, raw)
      : EMPTY_PLACEHOLDER;
  }

  for (const variant of getPartyVariantsFromConfig(config)) {
    enrichPartyTemplateVariables(variant, values, variables);
  }

  enrichPropertyTemplateVariables(config, values, variables);

  enrichLeaseTemplateVariables(values, variables);

  return variables;
}

function replaceOptionalBlocks(
  text: string,
  variables: Record<string, string>
): string {
  return text.replace(
    /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g,
    (_, key: string, inner: string) => {
      const value = variables[key]?.trim();
      if (!value || value === EMPTY_PLACEHOLDER) {
        return "";
      }
      return inner.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    }
  );
}

function replacePlaceholders(
  text: string,
  variables: Record<string, string>
): string {
  const withOptionalBlocks = replaceOptionalBlocks(text, variables);

  return withOptionalBlocks.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    return variables[key] ?? EMPTY_PLACEHOLDER;
  });
}

function buildGenericTemplate(
  slug: string,
  contractTitle: string,
  config: ContractConfig
): ContractLegalTemplate {
  const fields = getConfigFields(config).filter(
    (field) => field.id !== "fecha_documento"
  );

  const dataLines = fields
    .map((field) => `- ${field.label}: {{${field.id}}}`)
    .join("\n");

  const hasArrendamiento = fields.some((field) =>
    field.id.includes("arrendador")
  );
  const hasCompraventa = fields.some((field) => field.id.includes("vendedor"));
  const hasTitulares = fields.some((field) => field.id.includes("titular"));

  let signatures: ContractLegalTemplate["signatures"];
  let comparecencia: string;

  if (hasArrendamiento) {
    comparecencia =
      "En {{lugar_firma}}, a {{fecha_documento}}, comparecen las partes identificadas en el presente documento con arreglo a los datos que figuran a continuación.";
    signatures = [
      { role: "PARTE A", nameField: "arrendador_nombre" },
      { role: "PARTE B", nameField: "arrendatario_nombre" },
    ];
  } else if (hasCompraventa) {
    comparecencia =
      "En {{lugar_firma}}, a {{fecha_documento}}, comparecen las partes vendedora y compradora en los términos siguientes.";
    signatures = [
      { role: "EL VENDEDOR", nameField: "vendedor_nombre" },
      { role: "EL COMPRADOR", nameField: "comprador_nombre" },
    ];
  } else if (hasTitulares) {
    comparecencia =
      "En {{lugar_firma}}, a {{fecha_documento}}, comparecen las partes interesadas en el presente documento.";
    signatures = [
      { role: "TITULAR SALIENTE", nameField: "titular_saliente" },
      { role: "TITULAR ENTRANTE", nameField: "titular_entrante" },
    ];
  } else {
    comparecencia =
      "En {{lugar_firma}}, a {{fecha_documento}}, las partes interesadas formalizan el presente documento.";
    signatures = [
      { role: "PARTE A", nameField: fields[0]?.id ?? "parte_a" },
      { role: "PARTE B", nameField: fields[1]?.id ?? "parte_b" },
    ];
  }

  return {
    slug,
    title: contractTitle.toUpperCase(),
    subtitle: "Documento contractual",
    comparecencia,
    sections: [
      {
        title: "EXPONEN",
        content:
          "Que desean formalizar por escrito el documento correspondiente a «" +
          contractTitle +
          "», con los datos facilitados por las partes.",
      },
      {
        title: "DATOS INCORPORADOS",
        content: dataLines,
      },
      {
        title: "LEGISLACIÓN APLICABLE",
        content:
          "El presente documento se interpretará conforme a la normativa española aplicable al tipo de contrato o trámite de que se trate. Se recomienda su revisión por un profesional cualificado antes de su firma.",
      },
    ],
    signatures,
    closing:
      "Y en prueba de conformidad, firman el presente documento por duplicado en el lugar y fecha indicados.",
  };
}

export function resolveContractTemplate(
  config: ContractConfig,
  contractTitle: string
): { template: ContractLegalTemplate; isGenericFallback: boolean } {
  const existing = getContractTemplate(config.templateSlug);
  if (existing) {
    return { template: existing, isGenericFallback: false };
  }

  return {
    template: buildGenericTemplate(config.slug, contractTitle, config),
    isGenericFallback: true,
  };
}

export function renderContractDocument(
  config: ContractConfig,
  contractTitle: string,
  values: Record<string, string>
): RenderedContractDocument {
  const { template, isGenericFallback } = resolveContractTemplate(
    config,
    contractTitle
  );
  const variables = buildTemplateVariables(config, values);

  const [leftParty, rightParty] = template.signatures;

  return {
    slug: config.slug,
    title: replacePlaceholders(template.title, variables),
    subtitle: replacePlaceholders(template.subtitle, variables),
    comparecencia: replacePlaceholders(template.comparecencia, variables),
    sections: template.sections.map((section) => ({
      title: replacePlaceholders(section.title, variables),
      content: replacePlaceholders(section.content, variables),
    })),
    signatures: {
      left: {
        role: leftParty.role,
        name: variables[leftParty.nameField] ?? EMPTY_PLACEHOLDER,
      },
      right: {
        role: rightParty.role,
        name: variables[rightParty.nameField] ?? EMPTY_PLACEHOLDER,
      },
    },
    closing: replacePlaceholders(template.closing, variables),
    isGenericFallback,
  };
}
