import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

import type { ContractConfig } from "@/lib/contract-config";
import {
  renderContractDocument,
  type RenderedContractDocument,
} from "@/lib/contract-template-engine";

export type ContractDocumentData = {
  slug: string;
  title: string;
  values: Record<string, string>;
  generatedAt: string;
  usedGenericTemplate: boolean;
};

export type GenerateContractPdfOptions = {
  config: ContractConfig;
  contractTitle: string;
  values: Record<string, string>;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphHtml(text: string): string {
  return `<p>${escapeHtml(text).replace(/\n/g, "<br/>")}</p>`;
}

const BRAND_LOGO_DATA_URI =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">' +
      '<rect width="48" height="48" rx="12" fill="#3B82F6"/>' +
      '<rect x="14" y="12" width="20" height="26" rx="2.5" fill="#FFFFFF"/>' +
      '<rect x="18" y="18" width="12" height="2" rx="1" fill="#3B82F6"/>' +
      '<rect x="18" y="23" width="12" height="2" rx="1" fill="#3B82F6"/>' +
      '<rect x="18" y="28" width="8" height="2" rx="1" fill="#3B82F6"/>' +
      "</svg>"
  );

function buildContractHtml(
  document: RenderedContractDocument,
  lugarFirma: string
): string {
  const sectionsHtml = document.sections
    .map(
      (section) =>
        `<h2>${escapeHtml(section.title)}</h2>${paragraphHtml(section.content)}`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <style>
    @page { margin: 20mm; }
    body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
      color: #141414;
    }
    .brand-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-top: 48px;
      padding-top: 8px;
    }
    .footer-logo {
      width: 28px;
      height: 28px;
    }
    .footer-brand-text {
      font-weight: 700;
      font-size: 12.65pt;
      color: #0f172a;
    }
    .footer-brand-text .domain {
      color: #3b82f6;
    }
    h1 { font-size: 18pt; margin: 0 0 6px; color: #0f172a; }
    .subtitle { font-size: 10pt; color: #64748b; margin-bottom: 20px; }
    h2 { font-size: 12pt; margin: 16px 0 8px; color: #0f172a; }
    p { margin: 0 0 10px; text-align: justify; }
    .signatures {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      margin-top: 32px;
    }
    .signature-box {
      flex: 1;
      border-top: 1px solid #ccc;
      padding-top: 8px;
      min-height: 70px;
    }
    .signature-role { font-size: 9pt; color: #737373; text-transform: uppercase; }
    .signature-name { font-size: 11pt; font-weight: 600; margin-top: 4px; }
    .disclaimer {
      margin-top: 32px;
      margin-bottom: 8px;
      padding-top: 14px;
      padding-bottom: 8px;
      border-top: 1px solid #e5e5e5;
      font-size: 8pt;
      color: #737373;
      text-align: justify;
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(document.title)}</h1>
  <div class="subtitle">${escapeHtml(document.subtitle)}</div>
  <h2>COMPARECEN</h2>
  ${paragraphHtml(document.comparecencia)}
  ${sectionsHtml}
  <h2>DISPOSICIÓN FINAL</h2>
  ${paragraphHtml(document.closing)}
  <p>En ${escapeHtml(lugarFirma)}, a la fecha de firma.</p>
  <div class="signatures">
    <div class="signature-box">
      <div class="signature-role">${escapeHtml(document.signatures.left.role)}</div>
      <div class="signature-name">${escapeHtml(document.signatures.left.name)}</div>
    </div>
    <div class="signature-box">
      <div class="signature-role">${escapeHtml(document.signatures.right.role)}</div>
      <div class="signature-name">${escapeHtml(document.signatures.right.name)}</div>
    </div>
  </div>
  <div class="disclaimer">
    Documento generado con SoyContratoFacil.es. No sustituye el asesoramiento legal
    profesional. Revise el contenido antes de firmar.
  </div>
  <div class="brand-footer">
    <img src="${BRAND_LOGO_DATA_URI}" alt="" class="footer-logo" />
    <div class="footer-brand-text">SoyContrato<span class="domain">Facil.es</span></div>
  </div>
</body>
</html>`;
}

function formatFilenameDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function resolveLugarFirma(values: Record<string, string>): string {
  return (
    values.ciudad?.trim() ||
    values.direccion_inmueble?.split(",").pop()?.trim() ||
    "________________"
  );
}

export function buildContractDocumentData(
  options: GenerateContractPdfOptions
): ContractDocumentData {
  const rendered = renderContractDocument(
    options.config,
    options.contractTitle,
    options.values
  );

  return {
    slug: options.config.slug,
    title: options.contractTitle,
    values: options.values,
    generatedAt: new Date().toISOString(),
    usedGenericTemplate: rendered.isGenericFallback,
  };
}

export async function generateContractPdf(
  options: GenerateContractPdfOptions
): Promise<string> {
  const { config, contractTitle, values } = options;
  const document = renderContractDocument(config, contractTitle, values);
  const html = buildContractHtml(document, resolveLugarFirma(values));

  const { uri } = await Print.printToFileAsync({ html });

  const filename = `contrato-${config.slug}-${formatFilenameDate(new Date())}.pdf`;

  if (!(await Sharing.isAvailableAsync())) {
    throw new Error("Compartir no está disponible en este dispositivo");
  }

  await new Promise<void>((resolve) => {
    Alert.alert("Éxito", "El contrato se ha generado correctamente", [
      { text: "OK", onPress: () => resolve() },
    ]);
  });

  await Sharing.shareAsync(uri, {
    mimeType: "application/pdf",
    UTI: "com.adobe.pdf",
    dialogTitle: filename,
  });

  return uri;
}
