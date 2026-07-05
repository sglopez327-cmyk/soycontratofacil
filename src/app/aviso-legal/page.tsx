import type { Metadata } from "next";

import {
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Aviso legal — SoyContratoFacil.es",
  description:
    "Aviso legal de SoyContratoFacil.es: naturaleza del servicio, limitación de responsabilidad y uso de los documentos generados.",
  path: "/aviso-legal",
});

const LAST_UPDATED = "5 de julio de 2026";

export default function AvisoLegalPage() {
  return (
    <LegalPageShell
      title="Aviso legal"
      description="Información sobre la naturaleza del servicio, las limitaciones de responsabilidad y el uso adecuado de los documentos generados."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="Naturaleza del servicio">
        <LegalParagraph>
          SoyContratoFacil.es es una herramienta en línea de generación
          automatizada de documentos contractuales inmobiliarios. El acceso es
          gratuito y no requiere registro ni creación de cuenta de usuario.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="No constituye asesoramiento jurídico">
        <LegalParagraph>
          Los contratos generados se elaboran a partir de plantillas adaptadas a
          la normativa general vigente, pero{" "}
          <strong className="text-slate-200">
            no constituyen asesoramiento legal personalizado
          </strong>
          . Cada situación puede requerir cláusulas, comprobaciones o trámites
          adicionales que la herramienta no puede evaluar de forma individual.
        </LegalParagraph>
        <LegalParagraph>
          Antes de firmar cualquier documento, el usuario debe revisar su
          contenido, comprobar que refleja fielmente lo acordado entre las partes
          y, en caso de duda, consultar con un abogado o asesor jurídico
          colegiado.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Responsabilidad del usuario">
        <LegalParagraph>
          El usuario es el único responsable de la veracidad de los datos
          introducidos, de la elección del tipo de contrato adecuado y de las
          consecuencias derivadas del uso, firma o transmisión del documento
          generado.
        </LegalParagraph>
        <LegalParagraph>
          SoyContratoFacil.es no verifica la identidad de los usuarios ni la
          exactitud de la información facilitada en los formularios.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Limitación de responsabilidad">
        <LegalParagraph>
          En la medida permitida por la legislación aplicable, SoyContratoFacil.es
          no será responsable de daños directos o indirectos derivados del uso de
          los documentos generados, de errores u omisiones en los datos
          introducidos por el usuario, ni de la interpretación o aplicación del
          contenido contractual por terceros.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="Propiedad intelectual">
        <LegalParagraph>
          El diseño, la marca, las plantillas y el software de la plataforma son
          propiedad de SoyContratoFacil.es o de sus licenciantes. El documento
          PDF generado puede ser utilizado por el usuario para su finalidad
          contractual, sin que ello implique cesión de los derechos sobre la
          plataforma o sus plantillas.
        </LegalParagraph>
      </LegalSection>
    </LegalPageShell>
  );
}
