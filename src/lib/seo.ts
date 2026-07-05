import type { Metadata } from "next";

import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: absoluteUrl("/icon.png"),
          width: 48,
          height: 48,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [absoluteUrl("/icon.png")],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${DEFAULT_DESCRIPTION.split(".")[0]}`,
      template: `%s`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "48x48" },
      ],
      apple: [
        { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
      ],
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Contratos inmobiliarios legales en minutos`,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: absoluteUrl("/icon.png"),
          width: 48,
          height: 48,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${SITE_NAME} — Contratos inmobiliarios legales en minutos`,
      description: DEFAULT_DESCRIPTION,
      images: [absoluteUrl("/icon.png")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
