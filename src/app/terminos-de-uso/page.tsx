import {
  LegalList,
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Términos de Uso — SoyContratoFacil.es",
  description:
    "Condiciones generales de uso del servicio SoyContratoFacil.es para la generación de documentos contractuales.",
  path: "/terminos-de-uso",
});

const LAST_UPDATED = "28 de junio de 2026";

export default function TerminosDeUsoPage() {
  return (
    <LegalPageShell
      title="Términos de Uso"
      description="Al acceder y utilizar SoyContratoFacil.es aceptas las presentes condiciones. Léelas con atención antes de generar cualquier documento."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Objeto del servicio">
        <LegalParagraph>
          SoyContratoFacil.es es una plataforma web gratuita y sin registro que
          permite generar documentos contractuales inmobiliarios (arrendamientos,
          compraventas, arras y trámites complementarios) mediante formularios
          guiados y descarga en formato PDF.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Aceptación de los términos">
        <LegalParagraph>
          El acceso al sitio implica la aceptación plena de estos Términos de Uso.
          Si no estás de acuerdo con alguna de sus disposiciones, debes abstenerte
          de utilizar el servicio.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Naturaleza del servicio">
        <LegalParagraph>
          Los documentos generados se elaboran a partir de plantillas automatizadas
          basadas en la normativa general aplicable.{" "}
          <strong className="text-slate-200">
            El servicio no constituye asesoramiento jurídico personalizado
          </strong>{" "}
          ni establece una relación abogado-cliente. Cada situación contractual
          puede requerir cláusulas, comprobaciones o formalidades adicionales que
          deben ser evaluadas por un profesional cualificado.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. Condiciones de uso">
        <LegalParagraph>El usuario se compromete a:</LegalParagraph>
        <LegalList
          items={[
            "Facilitar información veraz, exacta y actualizada en los formularios.",
            "Utilizar el servicio de conformidad con la ley y la buena fe.",
            "Revisar el documento generado antes de firmarlo o hacerlo efectivo.",
            "No utilizar la plataforma para fines ilícitos, fraudulentos o contrarios al orden público.",
            "No intentar vulnerar la seguridad, disponibilidad o integridad del sitio.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Responsabilidad del usuario">
        <LegalParagraph>
          Eres el único responsable del contenido introducido, de la idoneidad del
          documento para tu caso concreto y de las consecuencias derivadas de su
          firma o utilización. SoyContratoFacil.es no verifica la veracidad de los
          datos aportados ni la conveniencia jurídica del resultado para un supuesto
          particular.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Propiedad intelectual">
        <LegalParagraph>
          El diseño, código, marcas, logotipos, textos legales base y plantillas
          del sitio son propiedad de SoyContratoFacil.es o de sus licenciantes. El
          documento PDF generado con tus datos te pertenece para tu uso personal o
          profesional, sin que ello implique cesión de los derechos sobre la
          plataforma o las plantillas subyacentes.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Limitación de responsabilidad">
        <LegalParagraph>
          El servicio se presta «tal cual» y «según disponibilidad». En la máxima
          medida permitida por la ley, SoyContratoFacil.es no será responsable de
          daños indirectos, lucro cesante o perjuicios derivados del uso o imposibilidad
          de uso del servicio, de errores en los datos introducidos por el usuario
          o de decisiones adoptadas exclusivamente sobre la base del documento
          generado sin revisión profesional.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Disponibilidad y modificaciones">
        <LegalParagraph>
          Nos reservamos el derecho a modificar, suspender o interrumpir total o
          parcialmente el servicio, así como a actualizar plantillas, funcionalidades
          o presentes Términos, informando en su caso mediante la publicación de
          la nueva versión en el sitio web.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Enlaces a terceros">
        <LegalParagraph>
          El sitio puede incluir enlaces a recursos externos. No controlamos ni
          asumimos responsabilidad sobre el contenido, políticas o prácticas de
          sitios de terceros.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. Legislación aplicable y jurisdicción">
        <LegalParagraph>
          Estos Términos se rigen por la legislación española. Para la resolución
          de controversias, las partes se someten a los Juzgados y Tribunales que
          correspondan conforme a la normativa de consumidores y usuarios, salvo
          disposición imperativa en contrario.
        </LegalParagraph>
      </LegalSection>
    </LegalPageShell>
  );
}
