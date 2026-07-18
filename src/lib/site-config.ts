/** URL canónica del sitio (debe coincidir con el host final: www). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.soycontratofacil.es";

export const SITE_NAME = "SoyContratoFacil.es";

export const SITE_TAGLINE =
  "Contratos inmobiliarios legales en minutos";

export const DEFAULT_DESCRIPTION =
  "Genera contratos de alquiler, compraventa y locales entre particulares. PDF listo para firmar, con plantillas adaptadas a la normativa española. Gratis y sin registro.";

export const CONTACT_EMAIL = "contacto@soycontratofacil.es";

/** Isotipo oficial (cuadrado azul con documento). */
export const BRAND_ICON_SVG_PATH = "/brand/logo-mark-clean.svg";
export const FAVICON_ICO_PATH = "/favicon.ico";
export const ICON_48_PATH = "/icon.png";
export const ICON_192_PATH = "/icon-192.png";
export const ICON_512_PATH = "/icon-512.png";
export const APPLE_ICON_PATH = "/apple-icon.png";

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
