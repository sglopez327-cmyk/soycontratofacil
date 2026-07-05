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
import {
  breadcrumbSchema,
  contractWebPageSchema,
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

  const title = `Generar contrato de ${contract.title.toLowerCase()} — SoyContratoFacil.es`;

  return createPageMetadata({
    title,
    description: `${contract.description} Genera y descarga tu documento en PDF gratis, sin registro.`,
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

  const Icon = contract.icon;
  const webPageSchema = contractWebPageSchema(slug);
  const breadcrumbs = breadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: contract.categoryTitle, path: `/#${contract.categoryId}` },
    { name: contract.title, path: contract.href },
  ]);

  return (
    <div className="flex min-h-full flex-col bg-[#0f172a]">
      <JsonLd
        data={
          webPageSchema
            ? [breadcrumbs, webPageSchema]
            : [breadcrumbs]
        }
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
                {contract.title}
              </h1>
              <p className="mt-2 text-card-body text-sm text-slate-400 sm:text-base">
                {contract.description}
              </p>
            </div>
          </div>

          <ContractWizard config={config} contractTitle={contract.title} />
        </div>
      </main>
    </div>
  );
}
