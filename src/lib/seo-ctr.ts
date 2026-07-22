/** Helpers para titles/descriptions más atractivos en SERP (sin cambiar el diseño). */

const CTR_TITLE_SUFFIX = " | PDF gratis";
const CTR_DESC_SUFFIX =
  " Genera tu PDF gratis y listo para imprimir.";

export function withCtrTitle(title: string, maxLength = 60): string {
  if (/\b(pdf|gratis|descargar)\b/i.test(title)) {
    return title.length <= maxLength ? title : title.slice(0, maxLength - 1).trimEnd() + "…";
  }

  const withSuffix = `${title}${CTR_TITLE_SUFFIX}`;
  if (withSuffix.length <= maxLength) {
    return withSuffix;
  }

  if (title.length <= maxLength) {
    return title;
  }

  return `${title.slice(0, maxLength - 1).trimEnd()}…`;
}

export function withCtrDescription(
  description: string,
  maxLength = 155
): string {
  const base = description.trim();
  if (/\b(gratis|pdf|imprimir|descarga)\b/i.test(base)) {
    return base.length <= maxLength
      ? base
      : `${base.slice(0, maxLength - 1).trimEnd()}…`;
  }

  const combined = `${base.replace(/\.$/, "")}.${CTR_DESC_SUFFIX}`;
  if (combined.length <= maxLength) {
    return combined;
  }

  return `${base.slice(0, maxLength - 1).trimEnd()}…`;
}
