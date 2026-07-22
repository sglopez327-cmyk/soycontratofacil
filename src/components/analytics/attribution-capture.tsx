"use client";

import { useEffect } from "react";

import { captureAttributionFromUrl } from "@/lib/track-conversion";

/** Guarda UTM/gclid sin UI (para atribución de Ads/redes). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return null;
}
