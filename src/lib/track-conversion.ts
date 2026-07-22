import { track } from "@vercel/analytics";

const ATTRIBUTION_KEY = "scf_attribution_v1";

type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  msclkid?: string;
};

type PdfGeneratedProps = {
  contractSlug: string;
  contractTitle: string;
};

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function readStoredAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}

/** Captura UTM/gclid de la URL actual y los guarda en sessionStorage. */
export function captureAttributionFromUrl(): Attribution {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const next: Attribution = { ...readStoredAttribution() };
  let changed = false;

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "msclkid",
  ] as const;

  for (const key of keys) {
    const value = params.get(key)?.trim();
    if (value) {
      next[key] = value;
      changed = true;
    }
  }

  if (changed) {
    try {
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / private mode
    }
  }

  return next;
}

function attributionProps(): Record<string, string> {
  const a = readStoredAttribution();
  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(a)) {
    if (value) {
      props[key] = value;
    }
  }
  return props;
}

function clarityEvent(name: string, data?: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }
  window.clarity("event", name);
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      window.clarity("set", key, value);
    }
  }
}

function trackEvent(name: string, props: Record<string, string | number | boolean>) {
  track(name, { ...attributionProps(), ...props });
}

/** Inicio del asistente de generación. */
export function trackWizardStarted(contractSlug: string) {
  trackEvent("wizard_started", { contract_slug: contractSlug });
  clarityEvent("wizard_started", { contract_slug: contractSlug });
}

/** Avance de paso del formulario. */
export function trackWizardStep(contractSlug: string, stepId: string, stepIndex: number) {
  trackEvent("wizard_step", {
    contract_slug: contractSlug,
    step_id: stepId,
    step_index: stepIndex,
  });
  clarityEvent("wizard_step", {
    contract_slug: contractSlug,
    step_id: stepId,
  });
}

/** Usuario llega al resumen antes de generar. */
export function trackWizardReview(contractSlug: string) {
  trackEvent("wizard_review", { contract_slug: contractSlug });
  clarityEvent("wizard_review", { contract_slug: contractSlug });
}

/** Error al generar el PDF. */
export function trackPdfFailed(contractSlug: string, reason: string) {
  trackEvent("pdf_failed", {
    contract_slug: contractSlug,
    reason: reason.slice(0, 120),
  });
  clarityEvent("pdf_failed", { contract_slug: contractSlug });
}

/** Registra la conversión principal: PDF de contrato generado correctamente. */
export function trackPdfGenerated({
  contractSlug,
  contractTitle,
}: PdfGeneratedProps) {
  trackEvent("pdf_generated", {
    contract_slug: contractSlug,
    contract_title: contractTitle,
  });

  clarityEvent("pdf_generated", { contract_slug: contractSlug });

  const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO?.trim();
  if (typeof window !== "undefined" && typeof window.gtag === "function" && sendTo) {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      contract_slug: contractSlug,
    });
  }
}
