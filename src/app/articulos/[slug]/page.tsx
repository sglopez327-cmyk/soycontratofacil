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
import {
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/lib/seo-articles";
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
    title: `${article.title} — SoyContratoFacil.es`,
    description: article.metaDescription,
    path: `/articulos/${slug}`,
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
        {article.sections.map((section) => (
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
          {article.relatedContractSlugs[0] ? (
            <p>
              <Link
                href={getContractHref(article.relatedContractSlugs[0])}
                className="font-medium text-brand-blue hover:underline"
              >
                Ir al generador →
              </Link>
            </p>
          ) : null}
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
