import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { RelatedSeoLinks } from "@/components/seo/related-seo-links";
import { JsonLd } from "@/components/seo/json-ld";
import { getContractHref } from "@/lib/contracts";
import { createPageMetadata } from "@/lib/seo";
import { withCtrDescription, withCtrTitle } from "@/lib/seo-ctr";
import {
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/lib/seo-articles";
import { shouldNoIndexArticle } from "@/lib/seo-contract-priority";
import { getGuideBySlug } from "@/lib/seo-guides";
import {
  articleSchema,
  breadcrumbSchema,
  guideFaqSchema,
} from "@/lib/seo-schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Artículo no encontrado — SoyContratoFacil.es",
      path: `/articulos/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: withCtrTitle(article.title),
    description: withCtrDescription(article.metaDescription),
    path: `/articulos/${slug}`,
    ogType: "article",
    noIndex: shouldNoIndexArticle(slug),
  });
}

export default async function ArticuloPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const faqSchema = guideFaqSchema(article.faqs);
  const formattedDate = new Date(article.updatedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const primaryGuideSlug = article.relatedGuideSlugs[0];
  const primaryGuide = primaryGuideSlug
    ? getGuideBySlug(primaryGuideSlug)
    : undefined;
  const primaryContractSlug = article.relatedContractSlugs[0];
  const generatorHref = primaryContractSlug
    ? getContractHref(primaryContractSlug)
    : undefined;
  const [firstSection, ...restSections] = article.sections;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Artículos", path: "/articulos" },
            { name: article.title, path: `/articulos/${slug}` },
          ]),
          articleSchema(article),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <LegalPageShell
        title={article.title}
        description={article.intro}
        lastUpdated={formattedDate}
        eyebrow="Artículo"
      >
        {firstSection ? (
          <LegalSection title={firstSection.title}>
            {firstSection.paragraphs.map((paragraph) => (
              <LegalParagraph key={paragraph}>{paragraph}</LegalParagraph>
            ))}
          </LegalSection>
        ) : null}

        {primaryGuide || generatorHref ? (
          <LegalSection title="Siguiente paso recomendado">
            <LegalParagraph>
              Para pasar de la lectura a la acción: consulta la guía práctica y
              genera el PDF gratis cuando tengas los datos listos.
            </LegalParagraph>
            <ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">
              {primaryGuide ? (
                <li>
                  <Link
                    href={`/guias/${primaryGuide.slug}`}
                    className="text-brand-blue hover:underline"
                  >
                    Leer la guía: {primaryGuide.title}
                  </Link>
                </li>
              ) : null}
              {generatorHref ? (
                <li>
                  <Link
                    href={generatorHref}
                    className="font-medium text-brand-blue hover:underline"
                  >
                    Generar el contrato gratis → Descargar PDF
                  </Link>
                </li>
              ) : null}
            </ul>
          </LegalSection>
        ) : null}

        {restSections.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <LegalParagraph key={paragraph}>{paragraph}</LegalParagraph>
            ))}
          </LegalSection>
        ))}

        {article.faqs.length > 0 ? (
          <LegalSection title="Preguntas frecuentes">
            {article.faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <p className="font-medium text-slate-200">{faq.question}</p>
                <LegalParagraph>{faq.answer}</LegalParagraph>
              </div>
            ))}
          </LegalSection>
        ) : null}

        <RelatedSeoLinks
          guideSlugs={article.relatedGuideSlugs}
          articleSlugs={article.relatedArticleSlugs}
          contractSlugs={article.relatedContractSlugs}
        />

        <LegalSection title="Genera tu documento">
          <LegalParagraph>
            Si ya tienes claro qué contrato necesitas, puedes generarlo gratis
            con nuestro formulario guiado y descargar el PDF al instante.
          </LegalParagraph>
          {generatorHref ? (
            <p>
              <Link
                href={generatorHref}
                className="font-medium text-brand-blue hover:underline"
              >
                Generar contrato gratis → Descargar PDF
              </Link>
            </p>
          ) : null}
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
