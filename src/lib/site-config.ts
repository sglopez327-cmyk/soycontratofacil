/** URL canónica del sitio (configurable vía entorno en despliegues). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://soycontratofacil.es";

export const SITE_NAME = "SoyContratoFacil.es";

export const SITE_TAGLINE =
  "Contratos inmobiliarios legales en minutos";

export const DEFAULT_DESCRIPTION =
  "Genera contratos de alquiler y compraventa verificados, seguros y listos para firmar. Documentos legales inmobiliarios automatizados, gratis y sin registro.";

export const CONTACT_EMAIL = "contacto@soycontratofacil.es";

/** Imagen Open Graph para compartir en redes (1200×630). */
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Código de verificación de Google Search Console (opcional). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/** Código de verificación de Bing Webmaster Tools (opcional). */
export const BING_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

/** Clave IndexNow para notificar URLs a buscadores (Bing, Yandex, etc.). */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "scflseo2026indexnow";
