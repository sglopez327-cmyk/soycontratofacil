/** Helpers para titles/descriptions más atractivos en SERP. */

const CTR_TITLE_SUFFIX = " | PDF gratis";
const CTR_DESC_SUFFIX =
  " Genera tu PDF gratis, sin registro, listo para imprimir.";

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

/**
 * Title de SERP: prioriza intención (PDF / gratis / descargar) sin pasarse de ~60 chars.
 */
export function withCtrTitle(title: string, maxLength = 60): string {
  const trimmed = title.trim();
  if (/\b(pdf|gratis|descargar)\b/i.test(trimmed)) {
    return truncate(trimmed, maxLength);
  }

  const withSuffix = `${trimmed}${CTR_TITLE_SUFFIX}`;
  if (withSuffix.length <= maxLength) {
    return withSuffix;
  }

  return truncate(trimmed, maxLength);
}

/**
 * Description de SERP: cierra con CTA de descarga si aún no está.
 */
export function withCtrDescription(
  description: string,
  maxLength = 155
): string {
  const base = description.trim();
  if (/\b(gratis|pdf|imprimir|descarga|genera)\b/i.test(base)) {
    return truncate(base, maxLength);
  }

  const combined = `${base.replace(/\.$/, "")}.${CTR_DESC_SUFFIX}`;
  if (combined.length <= maxLength) {
    return combined;
  }

  return truncate(base, maxLength);
}
