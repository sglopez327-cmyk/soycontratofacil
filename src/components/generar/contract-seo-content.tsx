import Link from "next/link";
import { BookOpen, ChevronDown, FileText } from "lucide-react";

import { getContractBySlug } from "@/lib/contracts";
import { getArticleBySlug } from "@/lib/seo-articles";
import type { ContractSeoMetadata } from "@/lib/seo-contract-metadata";
import { getGuideBySlug } from "@/lib/seo-guides";

type ContractSeoContentProps = {
  slug: string;
  seo: ContractSeoMetadata;
  guideSlug?: string;
};

export function ContractSeoContent({
  slug,
  seo,
  guideSlug,
}: ContractSeoContentProps) {
  const guide = guideSlug ? getGuideBySlug(guideSlug) : undefined;
  const relatedArticles = (seo.relatedArticleSlugs ?? [])
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article): article is NonNullable<typeof article> => article !== undefined);
  const relatedContracts = (seo.relatedContractSlugs ?? [])
    .map((contractSlug) => getContractBySlug(contractSlug))
    .filter(
      (contract): contract is NonNullable<typeof contract> =>
        contract !== undefined && contract.slug !== slug
    );

  const hasBody = (seo.bodySections?.length ?? 0) > 0;
  const hasFaqs = seo.faqs.length > 0;
  const hasGuide = Boolean(guide);
  const hasArticles = relatedArticles.length > 0;
  const hasContracts = relatedContracts.length > 0;

  if (!hasBody && !hasFaqs && !hasGuide && !hasArticles && !hasContracts) {
    return null;
  }

  return (
    <div className="mt-10 space-y-10 border-t border-slate-700/80 pt-8">
      {hasBody ? (
        <div className="space-y-8">
          {seo.bodySections!.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-card-body text-sm leading-relaxed text-slate-400 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      ) : null}

      {hasGuide || hasContracts ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Recursos relacionados
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {hasGuide ? (
              <Link
                href={`/guias/${guide!.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/40 p-4 transition-colors hover:border-brand-blue/50 hover:bg-slate-900/70"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                  <BookOpen className="size-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white group-hover:text-brand-blue">
                    Guía práctica
                  </span>
                  <span className="mt-1 block text-sm text-slate-400">
                    {guide!.title}
                  </span>
                </span>
              </Link>
            ) : null}

            {relatedContracts.map((contract) => (
              <Link
                key={contract.slug}
                href={contract.href}
                className="group flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/40 p-4 transition-colors hover:border-brand-blue/50 hover:bg-slate-900/70"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue ring-1 ring-brand-blue/25">
                  <FileText className="size-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white group-hover:text-brand-blue">
                    {contract.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-400">
                    Generar PDF gratis
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {hasArticles ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Artículos relacionados
          </h2>
          <ul className="space-y-2">
            {relatedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articulos/${article.slug}`}
                  className="text-sm font-medium text-brand-blue hover:underline sm:text-base"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {hasFaqs ? (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Preguntas frecuentes
          </h2>
          <div className="divide-y divide-slate-700/80 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/40">
            {seo.faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-start gap-3 p-4 text-left transition-colors hover:bg-slate-800/50 sm:p-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-sm font-semibold text-white sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="mt-0.5 size-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="text-card-body border-t border-slate-700/50 px-4 pb-4 pt-3 text-sm text-slate-400 sm:px-5 sm:pb-5">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
