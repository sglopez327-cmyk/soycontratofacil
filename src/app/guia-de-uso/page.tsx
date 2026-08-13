import Link from "next/link";

import { UsageGuideSection } from "@/components/home/usage-guide-section";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: "Guía de uso — SoyContratoFacil.es",
  description:
    "Aprende a generar tu contrato legal en tres pasos: elige el tipo, rellena el formulario y descarga el PDF gratis, sin registro.",
  path: "/guia-de-uso",
});

export default function GuiaDeUsoPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Guía de uso", path: "/guia-de-uso" },
          ]),
        ]}
      />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex text-sm text-slate-400 transition-colors hover:text-brand-blue"
          >
            ← Volver al inicio
          </Link>
        </div>
        <UsageGuideSection />
      </main>
      <FooterDisclaimer />
    </div>
  );
}
