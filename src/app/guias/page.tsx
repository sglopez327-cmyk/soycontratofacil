import Link from "next/link";

import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { getContractHref } from "@/lib/contracts";
import { createPageMetadata } from "@/lib/seo";
import { withCtrDescription, withCtrTitle } from "@/lib/seo-ctr";
import { shouldNoIndexGuide } from "@/lib/seo-contract-priority";
import { seoGuides } from "@/lib/seo-guides";
import { breadcrumbSchema, guidesItemListSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: withCtrTitle("Guías de contratos inmobiliarios PDF gratis 2026"),
  description: withCtrDescription(
    "Guías actualizadas 2026 sobre alquiler, compraventa y arras en España. Aprende qué incluir y genera tu PDF gratis sin registro."
  ),
  path: "/guias",
});

const LAST_UPDATED = "13 de agosto de 2026";

const visibleGuides = seoGuides.filter(
  (guide) => !shouldNoIndexGuide(guide.slug)
);

export default function GuiasIndexPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Guías", path: "/guias" },
          ]),
          guidesItemListSchema(),
        ]}
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
            Información orientativa actualizada sobre los principales documentos
            inmobiliarios en España. Cada guía enlaza al generador gratuito para
            crear tu PDF. También puedes leer nuestros{" "}
            <Link href="/articulos" className="text-brand-blue hover:underline">
              artículos
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Última actualización: {LAST_UPDATED}
          </p>
        </header>

        <div className="space-y-8">
          {visibleGuides.map((guide) => (
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
                  className="font-medium text-brand-blue hover:underline"
                >
                  Generar PDF gratis →
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
