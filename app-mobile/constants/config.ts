/** URL pública de la web (producción). */
export const WEB_BASE_URL = "https://soycontratofacil.es";

export function getContractWebUrl(slug: string): string {
  return `${WEB_BASE_URL}/generar/${slug}`;
}
