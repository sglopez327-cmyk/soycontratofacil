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
import { createPageMetadata } from "@/lib/seo";
import { withCtrDescription, withCtrTitle } from "@/lib/seo-ctr";
import { shouldNoIndexGuide } from "@/lib/seo-contract-priority";
import { getRelatedGuideSlugs } from "@/lib/seo-guide-relations";
import { getRelatedArticleSlugsForGuide } from "@/lib/seo-articles";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  getGuideCategoryTitle,
  getGuideContractHref,
} from "@/lib/seo-guides";
import { breadcrumbSchema, guideFaqSchema } from "@/lib/seo-schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const LAST_UPDATED = "13 de agosto de 2026";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return createPageMetadata({
      title: "Guía no encontrada — SoyContratoFacil.es",
      path: `/guias/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: withCtrTitle(guide.title),
    description: withCtrDescription(guide.metaDescription),
    path: `/guias/${slug}`,
    noIndex: shouldNoIndexGuide(slug),
  });
}

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const generatorHref = getGuideContractHref(slug);
  const categoryTitle = getGuideCategoryTitle(slug);
  const faqSchema = guideFaqSchema(guide.faqs);
  const relatedGuideSlugs = getRelatedGuideSlugs(slug);
  const relatedArticleSlugs = getRelatedArticleSlugsForGuide(slug);
  const [firstSection, ...restSections] = guide.sections;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Guías", path: "/guias" },
            { name: guide.title, path: `/guias/${slug}` },
          ]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <LegalPageShell
        title={guide.title}
        description={guide.intro}
        lastUpdated={LAST_UPDATED}
        eyebrow={categoryTitle ? `Guía · ${categoryTitle}` : "Guía"}
      >
        {firstSection ? (
          <LegalSection title={firstSection.title}>
            {firstSection.paragraphs.map((paragraph) => (
              <LegalParagraph key={paragraph}>{paragraph}</LegalParagraph>
            ))}
          </LegalSection>
        ) : null}

        {generatorHref ? (
          <LegalSection title="Siguiente paso: genera el PDF">
            <LegalParagraph>
              Si ya tienes los datos básicos, crea el documento en el generador
              gratuito y descarga el PDF listo para imprimir, sin registro.
            </LegalParagraph>
            <p>
              <Link
                href={generatorHref}
                className="font-medium text-brand-blue hover:underline"
              >
                Generar este contrato gratis → Descargar PDF
              </Link>
            </p>
          </LegalSection>
        ) : null}

        {restSections.map((section) => (
          <LegalSection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <LegalParagraph key={paragraph}>{paragraph}</LegalParagraph>
            ))}
          </LegalSection>
        ))}

        {guide.faqs.length > 0 ? (
          <LegalSection title="Preguntas frecuentes">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <p className="font-medium text-slate-200">{faq.question}</p>
                <LegalParagraph>{faq.answer}</LegalParagraph>
              </div>
            ))}
          </LegalSection>
        ) : null}

        <RelatedSeoLinks
          guideSlugs={relatedGuideSlugs}
          articleSlugs={relatedArticleSlugs}
          contractSlugs={[guide.contractSlug]}
        />

        <LegalSection title="Genera tu documento">
          <LegalParagraph>
            Completa el formulario paso a paso y descarga el PDF al instante.
            Revisa siempre el documento antes de firmarlo: este contenido es
            orientativo y no sustituye el asesoramiento de un profesional del
            derecho.
          </LegalParagraph>
          {generatorHref ? (
            <p>
              <Link
                href={generatorHref}
                className="font-medium text-brand-blue hover:underline"
              >
                Ir al generador gratis → PDF listo para imprimir
              </Link>
            </p>
          ) : null}
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
