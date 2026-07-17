import Link from "next/link";

import { LegalSection, LegalParagraph } from "@/components/legal/legal-page-shell";
import { getGuideBySlug } from "@/lib/seo-guides";
import { getArticleBySlug } from "@/lib/seo-articles";
import { getContractBySlug } from "@/lib/contracts";

type RelatedSeoLinksProps = {
  guideSlugs?: string[];
  articleSlugs?: string[];
  contractSlugs?: string[];
};

export function RelatedSeoLinks({
  guideSlugs = [],
  articleSlugs = [],
  contractSlugs = [],
}: RelatedSeoLinksProps) {
  const guides = guideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide) => guide !== undefined);
  const articles = articleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => article !== undefined);
  const contracts = contractSlugs
    .map((slug) => getContractBySlug(slug))
    .filter((contract) => contract !== undefined);

  if (guides.length === 0 && articles.length === 0 && contracts.length === 0) {
    return null;
  }

  return (
    <LegalSection title="Contenido relacionado">
      {guides.length > 0 ? (
        <div className="space-y-2">
          <p className="font-medium text-slate-200">Guías</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guias/${guide.slug}`}
                  className="text-brand-blue hover:underline"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {articles.length > 0 ? (
        <div className="space-y-2">
          <p className="font-medium text-slate-200">Artículos</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articulos/${article.slug}`}
                  className="text-brand-blue hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {contracts.length > 0 ? (
        <div className="space-y-2">
          <p className="font-medium text-slate-200">Generadores</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
            {contracts.map((contract) => (
              <li key={contract.slug}>
                <Link
                  href={contract.href}
                  className="text-brand-blue hover:underline"
                >
                  Generar {contract.title.toLowerCase()} gratis (PDF)
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <LegalParagraph>
        También puedes consultar el{" "}
        <Link href="/guias" className="text-brand-blue hover:underline">
          índice de guías
        </Link>{" "}
        y los{" "}
        <Link href="/articulos" className="text-brand-blue hover:underline">
          artículos
        </Link>{" "}
        para más información orientativa.
      </LegalParagraph>
    </LegalSection>
  );
}
