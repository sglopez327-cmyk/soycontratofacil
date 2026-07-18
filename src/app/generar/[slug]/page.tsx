import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { ContractWizard } from "@/components/generar/contract-wizard";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { getContractConfig } from "@/lib/contract-config";
import { getAllContractSlugs, getContractBySlug } from "@/lib/contracts";
import { createPageMetadata } from "@/lib/seo";
import { getArticleBySlug } from "@/lib/seo-articles";
import { getContractSeoMetadata } from "@/lib/seo-contract-metadata";
import { getGuideSlugForContract } from "@/lib/seo-guide-relations";
import {
  breadcrumbSchema,
  contractFaqSchema,
  contractWebPageSchema,
  howToGenerateContractSchema,
} from "@/lib/seo-schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllContractSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contract = getContractBySlug(slug);

  if (!contract) {
    return createPageMetadata({
      title: "Contrato no encontrado — SoyContratoFacil.es",
      path: `/generar/${slug}`,
      noIndex: true,
    });
  }

  const seo = getContractSeoMetadata(
    slug,
    `Generar contrato de ${contract.title.toLowerCase()} — SoyContratoFacil.es`,
    `${contract.description} Genera y descarga tu documento en PDF gratis, sin registro.`
  );

  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: contract.href,
  });
}

export default async function GenerarContratoPage({ params }: PageProps) {
  const { slug } = await params;
  const contract = getContractBySlug(slug);
  const config = getContractConfig(slug);

  if (!contract || !config) {
    notFound();
  }

  const seo = getContractSeoMetadata(
    slug,
    contract.title,
    contract.description
  );
  const Icon = contract.icon;
  const guideSlug = getGuideSlugForContract(slug);
  const relatedArticles = (seo.relatedArticleSlugs ?? [])
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article) => article !== undefined);
  const webPageSchema = contractWebPageSchema(slug);
  const faqSchema = contractFaqSchema(slug);
  const howToSchema = howToGenerateContractSchema(slug);
  const breadcrumbs = breadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: contract.categoryTitle, path: `/#${contract.categoryId}` },
    { name: seo.heading, path: contract.href },
  ]);

  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={[
          breadcrumbs,
          ...(webPageSchema ? [webPageSchema] : []),
          ...(faqSchema ? [faqSchema] : []),
          ...(howToSchema ? [howToSchema] : []),
        ]}
      />
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/#arrendamientos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand-blue"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver a contratos
        </Link>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 shadow-lg backdrop-blur-md sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
            {contract.categoryTitle}
          </p>

          <div className="mt-4 flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {seo.heading}
              </h1>
              <p className="mt-2 text-card-body text-sm text-slate-400 sm:text-base">
                {seo.intro}
              </p>
              {guideSlug ? (
                <p className="mt-3 text-sm text-slate-500">
                  ¿Quieres orientarte antes?{" "}
                  <Link
                    href={`/guias/${guideSlug}`}
                    className="font-medium text-brand-blue hover:underline"
                  >
                    Lee la guía práctica
                  </Link>
                </p>
              ) : null}
            </div>
          </div>

          <ContractWizard config={config} contractTitle={contract.title} />

          {seo.bodySections && seo.bodySections.length > 0 ? (
            <div className="mt-10 space-y-8 border-t border-slate-700/80 pt-8">
              {seo.bodySections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h2 className="text-lg font-semibold text-white">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-card-body text-sm text-slate-400 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          ) : null}

          {relatedArticles.length > 0 ? (
            <div className="mt-10 space-y-3 border-t border-slate-700/80 pt-8">
              <h2 className="text-lg font-semibold text-white">
                Artículos relacionados
              </h2>
              <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/articulos/${article.slug}`}
                      className="text-sm text-brand-blue hover:underline sm:text-base"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {seo.faqs.length > 0 ? (
            <div className="mt-10 space-y-5 border-t border-slate-700/80 pt-8">
              <h2 className="text-lg font-semibold text-white">
                Preguntas frecuentes
              </h2>
              {seo.faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <p className="font-medium text-slate-200">{faq.question}</p>
                  <p className="text-card-body text-sm text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
