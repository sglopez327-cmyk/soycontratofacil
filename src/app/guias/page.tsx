import Link from "next/link";

import {
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { getContractHref } from "@/lib/contracts";
import { createPageMetadata } from "@/lib/seo";
import { seoGuides } from "@/lib/seo-guides";
import { breadcrumbSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: "Guías de contratos inmobiliarios — SoyContratoFacil.es",
  description:
    "Guías prácticas sobre contratos de alquiler, compraventa y gestión inmobiliaria en España. Aprende qué debe incluir cada documento y genera tu PDF gratis.",
  path: "/guias",
});

const LAST_UPDATED = "5 de julio de 2026";

export default function GuiasIndexPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
        ])}
      />
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-slate-400 transition-colors hover:text-brand-blue"
        >
          ← Volver al inicio
        </Link>

        <header className="mb-10 border-b border-slate-700/80 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Guías
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Guías de contratos inmobiliarios
          </h1>
          <p className="text-card-body mt-4 text-base text-slate-400">
            Información orientativa sobre los principales documentos inmobiliarios
            en España. Cada guía enlaza al generador gratuito para crear tu PDF.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Última actualización: {LAST_UPDATED}
          </p>
        </header>

        <div className="space-y-8">
          {seoGuides.map((guide) => (
            <section
              key={guide.slug}
              className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6"
            >
              <h2 className="text-lg font-semibold text-white">
                <Link
                  href={`/guias/${guide.slug}`}
                  className="transition-colors hover:text-brand-blue"
                >
                  {guide.title}
                </Link>
              </h2>
              <p className="text-card-body mt-3 text-sm text-slate-400">
                {guide.metaDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link
                  href={`/guias/${guide.slug}`}
                  className="text-brand-blue hover:underline"
                >
                  Leer guía
                </Link>
                <Link
                  href={getContractHref(guide.contractSlug)}
                  className="text-slate-400 transition-colors hover:text-brand-blue"
                >
                  Generar contrato →
                </Link>
              </div>
            </section>
          ))}
        </div>
      </main>
      <FooterDisclaimer />
    </div>
  );
}
