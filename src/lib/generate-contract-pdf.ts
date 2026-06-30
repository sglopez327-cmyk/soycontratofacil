import type { ContractConfig } from "@/lib/contract-config";
import { renderContractDocument } from "@/lib/contract-template-engine";
import { loadPdfLogoMark } from "@/lib/pdf-brand";

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

/** Margen superior uniforme en todas las páginas de todos los documentos (2 cm exactos). */
const PAGE_MARGIN_TOP_MM = 20;

/** Márgenes A4 (mm). */
const PAGE_MARGINS = {
  top: PAGE_MARGIN_TOP_MM,
  bottom: 20,
  left: 20,
  right: 20,
} as const;

/** Si quedan menos de 18 mm útiles, conviene saltar de página. */
const PAGE_BREAK_ORPHAN_THRESHOLD_MM = 18;
/** Con ≥ 35 mm libres, evitar saltos prematuros de bloques grandes. */
const MIN_REMAINING_TO_STAY_MM = 35;

const BODY_FONT_SIZE = 11;
const HEADING_FONT_SIZE = 12;
const TITLE_FONT_SIZE = 20;
const SUBTITLE_FONT_SIZE = 10;

function pt(value: number): number {
  return value * 0.352778;
}

function getLineHeightMm(fontSizePt: number, multiplier = 1.45): number {
  return pt(fontSizePt) * multiplier;
}

const HEADER_SPACING = {
  iconWidthMm: 14,
  iconToBrandName: pt(12),
  brandToTitle: pt(28),
  titleMarginBottom: pt(12),
  subtitleMarginBottom: pt(10),
  beforeComparecen: pt(16),
} as const;

const BODY_SPACING = {
  headingBefore: pt(8),
  headingAfter: pt(5),
  paragraphAfter: pt(6),
  sectionAfter: pt(8),
} as const;

const BRAND_NAME_FONT_SIZE = 11;
const FOOTER_FONT_SIZE = 8;
const FOOTER_TOP_GAP_MM = 10;
const FOOTER_TEXT_COLOR = { r: 115, g: 115, b: 115 } as const;
const BODY_TEXT_COLOR = { r: 20, g: 20, b: 20 } as const;
const BRAND_NAVY = { r: 15, g: 23, b: 42 } as const;
const BRAND_BLUE = { r: 59, g: 130, b: 246 } as const;

function formatFilenameDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

type PdfWriterContext = {
  doc: import("jspdf").jsPDF;
  pageWidth: number;
  pageHeight: number;
  contentWidth: number;
  y: number;
};

function setTextColor(
  doc: import("jspdf").jsPDF,
  color: { r: number; g: number; b: number }
): void {
  doc.setTextColor(color.r, color.g, color.b);
}

function createWriter(doc: import("jspdf").jsPDF): PdfWriterContext {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  return {
    doc,
    pageWidth,
    pageHeight,
    contentWidth: pageWidth - PAGE_MARGINS.left - PAGE_MARGINS.right,
    y: PAGE_MARGINS.top,
  };
}

function getRemainingHeight(ctx: PdfWriterContext): number {
  return ctx.pageHeight - PAGE_MARGINS.bottom - ctx.y;
}

function startNewPage(ctx: PdfWriterContext): void {
  ctx.doc.addPage();
  ctx.y = PAGE_MARGINS.top;
  setTextColor(ctx.doc, BODY_TEXT_COLOR);
}

/**
 * Reserva espacio vertical antes de escribir.
 * Evita saltos prematuros cuando aún hay ≥ 35 mm útiles en la hoja.
 */
function ensureSpace(ctx: PdfWriterContext, needed: number): void {
  if (needed <= 0) {
    return;
  }

  const remaining = getRemainingHeight(ctx);

  if (needed <= remaining) {
    return;
  }

  if (remaining >= MIN_REMAINING_TO_STAY_MM && needed > remaining) {
    return;
  }

  if (
    remaining < PAGE_BREAK_ORPHAN_THRESHOLD_MM ||
    needed > remaining
  ) {
    startNewPage(ctx);
  }
}

/** Evita dejar un bloque de párrafo huérfano al final de la página. */
function ensureSpaceForLines(
  ctx: PdfWriterContext,
  lineCount: number,
  lineHeight: number,
  gapBefore = 0
): void {
  const needed = gapBefore + lineCount * lineHeight;
  const remaining = getRemainingHeight(ctx);

  if (needed <= remaining) {
    return;
  }

  if (remaining >= MIN_REMAINING_TO_STAY_MM) {
    return;
  }

  if (lineCount > 1 && remaining < needed && remaining < MIN_REMAINING_TO_STAY_MM) {
    startNewPage(ctx);
  }
}

function writeLines(
  ctx: PdfWriterContext,
  lines: string[],
  x: number,
  options: {
    fontSize: number;
    fontStyle: "normal" | "bold" | "italic";
    align?: "left" | "center" | "justify";
    lineHeight?: number;
    fontFamily?: "times" | "helvetica";
    color?: { r: number; g: number; b: number };
  }
): void {
  const lineHeight =
    options.lineHeight ?? getLineHeightMm(options.fontSize);
  const fontFamily = options.fontFamily ?? "times";

  if (options.color) {
    setTextColor(ctx.doc, options.color);
  } else {
    setTextColor(ctx.doc, BODY_TEXT_COLOR);
  }

  ctx.doc.setFont(fontFamily, options.fontStyle);
  ctx.doc.setFontSize(options.fontSize);

  for (const line of lines) {
    ensureSpace(ctx, lineHeight);

    if (options.align === "justify") {
      ctx.doc.text(line, x, ctx.y, {
        align: "justify",
        maxWidth: ctx.contentWidth,
      });
    } else if (options.align === "center") {
      ctx.doc.text(line, ctx.pageWidth / 2, ctx.y, { align: "center" });
    } else {
      ctx.doc.text(line, x, ctx.y);
    }

    ctx.y += lineHeight;
  }
}

function writeParagraph(
  ctx: PdfWriterContext,
  text: string,
  options?: {
    bold?: boolean;
    fontSize?: number;
    align?: "left" | "center" | "justify";
    gapBefore?: number;
    gapAfter?: number;
    fontFamily?: "times" | "helvetica";
    color?: { r: number; g: number; b: number };
    lineHeightMultiplier?: number;
  }
): void {
  const fontSize = options?.fontSize ?? BODY_FONT_SIZE;
  const align = options?.align ?? "justify";
  const gapBefore = options?.gapBefore ?? 0;
  const gapAfter = options?.gapAfter ?? BODY_SPACING.paragraphAfter;
  const fontFamily = options?.fontFamily ?? "times";
  const lineHeight = getLineHeightMm(
    fontSize,
    options?.lineHeightMultiplier ?? 1.45
  );

  ctx.doc.setFont(fontFamily, options?.bold ? "bold" : "normal");
  ctx.doc.setFontSize(fontSize);

  if (gapBefore > 0) {
    ensureSpace(ctx, gapBefore);
    advanceY(ctx, gapBefore);
  }

  const paragraphs = text.split(/\n\n+/);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) {
      continue;
    }

    const lines = ctx.doc.splitTextToSize(trimmed, ctx.contentWidth) as string[];

    ensureSpaceForLines(ctx, lines.length, lineHeight);

    writeLines(ctx, lines, PAGE_MARGINS.left, {
      fontSize,
      fontStyle: options?.bold ? "bold" : "normal",
      align,
      fontFamily,
      color: options?.color,
      lineHeight,
    });
  }

  if (gapAfter > 0) {
    advanceY(ctx, gapAfter);
  }

  setTextColor(ctx.doc, BODY_TEXT_COLOR);
}

function writeHeading(ctx: PdfWriterContext, text: string): void {
  ensureSpace(ctx, BODY_SPACING.headingBefore + getLineHeightMm(HEADING_FONT_SIZE));
  advanceY(ctx, BODY_SPACING.headingBefore);

  writeParagraph(ctx, text, {
    bold: true,
    fontSize: HEADING_FONT_SIZE,
    align: "left",
    gapBefore: 0,
    gapAfter: BODY_SPACING.headingAfter,
  });
}

function advanceY(ctx: PdfWriterContext, amountMm: number): void {
  ctx.y += amountMm;
}

function writeCenteredBrandName(ctx: PdfWriterContext): void {
  const centerX = ctx.pageWidth / 2;
  const baselineY = ctx.y;
  const lineHeight = getLineHeightMm(BRAND_NAME_FONT_SIZE);

  ensureSpace(ctx, lineHeight);

  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(BRAND_NAME_FONT_SIZE);

  const partOne = "SoyContrato";
  const partTwo = "Facil.es";
  const partOneWidth = ctx.doc.getTextWidth(partOne);
  const startX = centerX - (partOneWidth + ctx.doc.getTextWidth(partTwo)) / 2;

  setTextColor(ctx.doc, BRAND_NAVY);
  ctx.doc.text(partOne, startX, baselineY);

  setTextColor(ctx.doc, BRAND_BLUE);
  ctx.doc.text(partTwo, startX + partOneWidth, baselineY);

  setTextColor(ctx.doc, BODY_TEXT_COLOR);
  ctx.y = baselineY + lineHeight;
}

async function writeDocumentHeader(
  ctx: PdfWriterContext,
  document: {
    title: string;
    subtitle: string;
    isGenericFallback: boolean;
  }
): Promise<void> {
  ctx.y = PAGE_MARGINS.top;

  const logoMark = await loadPdfLogoMark();
  const iconWidth = HEADER_SPACING.iconWidthMm;
  const iconHeight = (logoMark.height / logoMark.width) * iconWidth;
  const iconX = (ctx.pageWidth - iconWidth) / 2;

  ensureSpace(ctx, iconHeight);
  ctx.doc.addImage(logoMark.dataUrl, "PNG", iconX, ctx.y, iconWidth, iconHeight);
  advanceY(ctx, iconHeight + HEADER_SPACING.iconToBrandName);

  writeCenteredBrandName(ctx);
  advanceY(ctx, HEADER_SPACING.brandToTitle);

  writeParagraph(ctx, document.title, {
    bold: true,
    fontSize: TITLE_FONT_SIZE,
    align: "center",
    gapBefore: 0,
    gapAfter: HEADER_SPACING.titleMarginBottom,
    lineHeightMultiplier: 1.35,
  });

  writeParagraph(ctx, document.subtitle, {
    fontSize: SUBTITLE_FONT_SIZE,
    align: "center",
    gapBefore: 0,
    gapAfter: document.isGenericFallback ? pt(6) : HEADER_SPACING.subtitleMarginBottom,
    fontFamily: "helvetica",
    color: { r: 70, g: 70, b: 70 },
  });

  if (document.isGenericFallback) {
    writeParagraph(
      ctx,
      "NOTA: Este documento se ha generado mediante plantilla generica formal por no disponer aun de plantilla legal especifica para este tipo de contrato.",
      {
        fontSize: 9,
        align: "justify",
        gapBefore: 0,
        gapAfter: HEADER_SPACING.subtitleMarginBottom,
        fontFamily: "helvetica",
        color: { r: 90, g: 90, b: 90 },
      }
    );
  }

  advanceY(ctx, HEADER_SPACING.beforeComparecen);
}

function writeSignatureBlock(
  ctx: PdfWriterContext,
  signatures: {
    left: { role: string; name: string };
    right: { role: string; name: string };
  },
  lugarFirma: string
): void {
  advanceY(ctx, pt(6));

  const signatureDate = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
  }).format(new Date());

  writeParagraph(ctx, `En ${lugarFirma}, a ${signatureDate}`, {
    align: "left",
    gapBefore: 0,
    gapAfter: pt(8),
  });

  const columnWidth = (ctx.contentWidth - 12) / 2;
  const leftX = PAGE_MARGINS.left;
  const rightX = PAGE_MARGINS.left + columnWidth + 12;
  const roleLineHeight = getLineHeightMm(10);
  const signatureAreaHeight = roleLineHeight + 8 + roleLineHeight + 14;

  ensureSpace(ctx, signatureAreaHeight);

  const blockTop = ctx.y;

  setTextColor(ctx.doc, BODY_TEXT_COLOR);
  ctx.doc.setFont("times", "bold");
  ctx.doc.setFontSize(10);
  ctx.doc.text(signatures.left.role, leftX, blockTop);
  ctx.doc.text(signatures.right.role, rightX, blockTop);

  ctx.doc.setFont("times", "normal");
  ctx.doc.text(signatures.left.name, leftX, blockTop + 8);

  const rightNameLines = ctx.doc.splitTextToSize(
    signatures.right.name,
    columnWidth
  ) as string[];
  ctx.doc.text(rightNameLines, rightX, blockTop + 8);

  const signatureLineY = blockTop + 22;
  ctx.doc.setDrawColor(160, 160, 160);
  ctx.doc.setLineWidth(0.2);
  ctx.doc.line(leftX, signatureLineY, leftX + columnWidth - 4, signatureLineY);
  ctx.doc.line(rightX, signatureLineY, rightX + columnWidth - 4, signatureLineY);

  ctx.doc.setFontSize(8);
  setTextColor(ctx.doc, { r: 100, g: 100, b: 100 });
  ctx.doc.text("Firma", leftX, signatureLineY + 4);
  ctx.doc.text("Firma", rightX, signatureLineY + 4);

  ctx.y = signatureLineY + 12;
  setTextColor(ctx.doc, BODY_TEXT_COLOR);
}

function writeDisclaimer(ctx: PdfWriterContext): void {
  const disclaimerText =
    "AVISO LEGAL: Documento generado automaticamente por SoyContratoFacil.es a partir de los datos facilitados por el usuario. No constituye asesoramiento juridico ni sustituye la revision de un profesional cualificado. Verifique su contenido antes de la firma.";

  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(FOOTER_FONT_SIZE);
  const disclaimerLines = ctx.doc.splitTextToSize(
    disclaimerText,
    ctx.contentWidth
  ) as string[];
  const lineHeight = getLineHeightMm(FOOTER_FONT_SIZE, 1.35);
  const blockHeight = FOOTER_TOP_GAP_MM + 6 + disclaimerLines.length * lineHeight;

  if (getRemainingHeight(ctx) < blockHeight && getRemainingHeight(ctx) < MIN_REMAINING_TO_STAY_MM) {
    startNewPage(ctx);
  }

  advanceY(ctx, FOOTER_TOP_GAP_MM);

  const separatorY = ctx.y;
  ensureSpace(ctx, 6);
  ctx.doc.setDrawColor(200, 200, 200);
  ctx.doc.setLineWidth(0.3);
  ctx.doc.line(
    PAGE_MARGINS.left,
    separatorY,
    ctx.pageWidth - PAGE_MARGINS.right,
    separatorY
  );
  ctx.y = separatorY + 6;

  writeLines(ctx, disclaimerLines, PAGE_MARGINS.left, {
    fontSize: FOOTER_FONT_SIZE,
    fontStyle: "normal",
    align: "justify",
    fontFamily: "helvetica",
    color: FOOTER_TEXT_COLOR,
    lineHeight,
  });
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
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const { config, contractTitle, values } = options;

  const document = renderContractDocument(config, contractTitle, values);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ctx = createWriter(doc);

  await writeDocumentHeader(ctx, document);

  writeHeading(ctx, "COMPARECEN");
  writeParagraph(ctx, document.comparecencia, {
    gapBefore: 0,
    gapAfter: BODY_SPACING.sectionAfter,
  });

  for (const section of document.sections) {
    writeHeading(ctx, section.title);
    writeParagraph(ctx, section.content, {
      gapBefore: 0,
      gapAfter: BODY_SPACING.sectionAfter,
    });
  }

  writeHeading(ctx, "DISPOSICION FINAL");
  writeParagraph(ctx, document.closing, {
    gapBefore: 0,
    gapAfter: BODY_SPACING.sectionAfter,
  });

  const lugarFirma =
    values.ciudad?.trim() ||
    values.direccion_inmueble?.split(",").pop()?.trim() ||
    "________________";

  writeSignatureBlock(ctx, document.signatures, lugarFirma);
  writeDisclaimer(ctx);

  const filename = `contrato-${config.slug}-${formatFilenameDate(new Date())}.pdf`;
  doc.save(filename);
}
