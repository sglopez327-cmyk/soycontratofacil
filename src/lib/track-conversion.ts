import { track } from "@vercel/analytics";

type PdfGeneratedProps = {
  contractSlug: string;
  contractTitle: string;
};

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Registra la conversión principal: PDF de contrato generado correctamente. */
export function trackPdfGenerated({
  contractSlug,
  contractTitle,
}: PdfGeneratedProps) {
  track("pdf_generated", {
    contract_slug: contractSlug,
    contract_title: contractTitle,
  });

  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("event", "pdf_generated");
    window.clarity("set", "contract_slug", contractSlug);
  }
}
