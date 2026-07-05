import type { Metadata } from "next";

import {
  LegalList,
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre nosotros — SoyContratoFacil.es",
  description:
    "Conoce SoyContratoFacil.es: herramienta gratuita para generar contratos inmobiliarios en España. Nuestra misión, funcionamiento y contacto.",
  path: "/sobre-nosotros",
});

const LAST_UPDATED = "5 de julio de 2026";

export default function SobreNosotrosPage() {
  return (
    <LegalPageShell
      title="Sobre nosotros"
      description="SoyContratoFacil.es nace para facilitar el acceso a documentos contractuales inmobiliarios bien estructurados, de forma gratuita y sin barreras."
      lastUpdated={LAST_UPDATED}
      eyebrow="Quiénes somos"
    >
      <LegalSection title="Nuestra misión">
        <LegalParagraph>
          Queremos que cualquier persona pueda generar un contrato de alquiler o
          compraventa con claridad y rapidez, sin necesidad de registrarse ni
          pagar por el servicio básico de generación del documento.
        </LegalParagraph>
        <LegalParagraph>
          Utilizamos plantillas elaboradas conforme a la normativa española
          vigente en materia inmobiliaria, con formularios guiados que solo
          solicitan la información legalmente relevante para cada tipo de contrato.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Cómo funciona">
        <LegalList
          items={[
            "Eliges el tipo de contrato que necesitas.",
            "Completas el formulario paso a paso en tu navegador.",
            "Generas y descargas el PDF al instante, sin crear cuenta.",
          ]}
        />
        <LegalParagraph>
          Los datos que introduces se procesan en tu dispositivo para generar el
          documento. No almacenamos la información de tus contratos en nuestros
          servidores.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Limitaciones del servicio">
        <LegalParagraph>
          SoyContratoFacil.es es una herramienta automatizada.{" "}
          <strong className="text-slate-200">
            No prestamos asesoramiento jurídico personalizado
          </strong>{" "}
          ni sustituimos la revisión de un abogado o asesor colegiado. El usuario
          es responsable de verificar que el documento se ajusta a su situación
          concreta antes de firmarlo.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Contacto">
        <LegalParagraph>
          Para consultas generales o cuestiones de privacidad puedes escribir a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-blue hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </LegalParagraph>
      </LegalSection>
    </LegalPageShell>
  );
}
