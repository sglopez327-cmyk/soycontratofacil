import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "SoyContratoFacil",
    description: SITE_TAGLINE,
    start_url: SITE_URL,
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#3B82F6",
    lang: "es",
    icons: [
      {
        src: "/icon.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
