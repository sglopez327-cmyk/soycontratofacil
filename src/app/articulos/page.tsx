import Link from "next/link";

import { FooterDisclaimer } from "@/components/layout/footer-disclaimer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { withCtrDescription, withCtrTitle } from "@/lib/seo-ctr";
import { seoArticles } from "@/lib/seo-articles";
import { shouldNoIndexArticle } from "@/lib/seo-contract-priority";
import { articlesItemListSchema, breadcrumbSchema } from "@/lib/seo-schema";

export const metadata = createPageMetadata({
  title: withCtrTitle("Artículos de contratos inmobiliarios PDF 2026"),
  description: withCtrDescription(
    "Artículos prácticos 2026 sobre alquiler, compraventa, arras y fianzas. Enlazan a guías y generadores PDF gratis."
  ),
  path: "/articulos",
});

const LAST_UPDATED = "13 de agosto de 2026";

const visibleArticles = seoArticles.filter(
  (article) => !shouldNoIndexArticle(article.slug)
);

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
            Contenido orientativo actualizado sobre plazos, arras, fianzas,
            compraventa y suministros. Cada artículo enlaza a guías y
            generadores gratuitos.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Última actualización: {LAST_UPDATED}
          </p>
        </header>

        <div className="space-y-8">
          {visibleArticles.map((article) => (
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
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link
                  href={`/articulos/${article.slug}`}
                  className="text-brand-blue hover:underline"
                >
                  Leer artículo →
                </Link>
                {article.relatedGuideSlugs[0] ? (
                  <Link
                    href={`/guias/${article.relatedGuideSlugs[0]}`}
                    className="text-slate-400 transition-colors hover:text-brand-blue"
                  >
                    Ver guía
                  </Link>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </main>
      <FooterDisclaimer />
    </div>
  );
}
