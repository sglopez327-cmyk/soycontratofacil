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
import { getRelatedGuideSlugs } from "@/lib/seo-guide-relations";
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

const LAST_UPDATED = "6 de julio de 2026";

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
        {guide.sections.map((section) => (
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
          contractSlugs={[guide.contractSlug]}
        />

        <LegalSection title="Genera tu documento">
          <LegalParagraph>
            Puedes crear este contrato de forma gratuita con nuestro generador
            automatizado. Solo tienes que completar el formulario paso a paso y
            descargar el PDF al instante, sin registro.
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
          <p className="text-sm text-slate-500">
            Este contenido es orientativo y no sustituye el asesoramiento de un
            profesional del derecho. Revisa siempre el documento antes de firmarlo.
          </p>
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
