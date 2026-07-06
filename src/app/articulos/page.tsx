import Link from "next/link";

import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { seoArticles } from "@/lib/seo-articles";
import { articlesItemListSchema, breadcrumbSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: "Artículos sobre contratos inmobiliarios — SoyContratoFacil.es",
  description:
    "Artículos prácticos sobre alquiler, compraventa, arras, fianzas y suministros en España. Información orientativa con enlaces al generador gratuito.",
  path: "/articulos",
});

const LAST_UPDATED = "6 de julio de 2026";

export default function ArticulosIndexPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Artículos", path: "/articulos" },
          ]),
          articlesItemListSchema(),
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
            Artículos
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Artículos sobre contratos inmobiliarios
          </h1>
          <p className="text-card-body mt-4 text-base text-slate-400">
            Contenido orientativo sobre plazos, arras, fianzas, compraventa y
            suministros. Cada artículo enlaza a guías y generadores gratuitos.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Última actualización: {LAST_UPDATED}
          </p>
        </header>

        <div className="space-y-8">
          {seoArticles.map((article) => (
            <section
              key={article.slug}
              className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6"
            >
              <h2 className="text-lg font-semibold text-white">
                <Link
                  href={`/articulos/${article.slug}`}
                  className="transition-colors hover:text-brand-blue"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-card-body mt-3 text-sm text-slate-400">
                {article.metaDescription}
              </p>
              <p className="mt-4 text-sm">
                <Link
                  href={`/articulos/${article.slug}`}
                  className="text-brand-blue hover:underline"
                >
                  Leer artículo →
                </Link>
              </p>
            </section>
          ))}
        </div>
      </main>
      <FooterDisclaimer />
    </div>
  );
}
