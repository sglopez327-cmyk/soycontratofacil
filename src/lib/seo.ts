import type { Metadata } from "next";

import {
  DEFAULT_DESCRIPTION,
  GOOGLE_SITE_VERIFICATION,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}

function openGraphImages(title: string) {
  return [
    {
      url: absoluteUrl(OG_IMAGE_PATH),
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: title,
    },
  ];
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
      images: openGraphImages(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(OG_IMAGE_PATH)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createRootMetadata(): Metadata {
  const defaultTitle = `${SITE_NAME} — Contratos inmobiliarios legales en minutos`;

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
    ...(GOOGLE_SITE_VERIFICATION
      ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
      : {}),
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
      title: defaultTitle,
      description: DEFAULT_DESCRIPTION,
      images: openGraphImages(defaultTitle),
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: DEFAULT_DESCRIPTION,
      images: [absoluteUrl(OG_IMAGE_PATH)],
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
