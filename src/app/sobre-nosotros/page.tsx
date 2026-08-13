import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalList,
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { aboutPageSchema } from "@/lib/seo-schema";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre nosotros — SoyContratoFacil.es",
  description:
    "Quiénes somos, cómo generamos contratos en PDF, cómo tratamos tus datos y qué límites tiene el servicio. Transparencia para alquiler y compraventa en España.",
  path: "/sobre-nosotros",
});

const LAST_UPDATED = "13 de agosto de 2026";

export default function SobreNosotrosPage() {
  return (
    <>
      <JsonLd data={[aboutPageSchema()]} />
      <LegalPageShell
        title="Sobre nosotros"
        description="SoyContratoFacil.es es una herramienta online para generar contratos inmobiliarios en PDF de forma gratuita, con transparencia sobre su alcance y límites."
        lastUpdated={LAST_UPDATED}
        eyebrow="Quiénes somos"
      >
        <LegalSection title="Qué es SoyContratoFacil.es">
          <LegalParagraph>
            {SITE_NAME} ({SITE_URL.replace("https://", "")}) es un servicio
            digital pensado para particulares y pequeños propietarios en España
            que necesitan un contrato de alquiler, compraventa, arras u otros
            documentos relacionados, claros y listos para descargar en PDF.
          </LegalParagraph>
          <LegalParagraph>
            Nuestra prioridad es reducir fricción: sin registro, sin tarjeta y
            con formularios que solo piden la información necesaria para
            completar cada documento.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Nuestra misión">
          <LegalParagraph>
            Facilitar el acceso a documentos contractuales inmobiliarios bien
            estructurados, adaptados al marco normativo español habitual, sin
            barreras de cuenta ni de pago para la generación básica del PDF.
          </LegalParagraph>
          <LegalParagraph>
            Publicamos también guías y artículos orientativos para ayudar a
            entender conceptos frecuentes (fianza, arras, temporada vs vivienda
            habitual, etc.) y enlazarlos con el generador correspondiente.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Cómo funciona">
          <LegalList
            items={[
              "Eliges el tipo de contrato (alquiler urbano, local, compraventa, arras u otros disponibles).",
              "Completas el formulario paso a paso en tu navegador.",
              "Revisas el resumen, generas el documento y descargas el PDF al instante.",
            ]}
          />
          <LegalParagraph>
            Los datos que introduces se procesan en tu dispositivo para generar
            el documento. No almacenamos el contenido de tus contratos en
            nuestros servidores ni exigimos crear una cuenta.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Criterios editoriales y de calidad">
          <LegalParagraph>
            Las plantillas y los textos de ayuda se revisan para alinearlos con
            la normativa española de referencia (por ejemplo, LAU y Código Civil
            en lo aplicable) y con buenas prácticas de redacción contractual.
          </LegalParagraph>
          <LegalParagraph>
            Cuando actualizamos un modelo o una guía, dejamos constancia de la
            fecha en las páginas de contenido. Si detectas un error, puedes
            escribirnos al correo de contacto.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Limitaciones del servicio (importante)">
          <LegalParagraph>
            SoyContratoFacil.es es una herramienta automatizada.{" "}
            <strong className="text-slate-200">
              No prestamos asesoramiento jurídico personalizado
            </strong>
            , no somos un despacho de abogados y no sustituimos la revisión de
            un profesional colegiado.
          </LegalParagraph>
          <LegalParagraph>
            El usuario es responsable de comprobar que el documento refleja lo
            acordado, de adaptar cláusulas a su caso (comunidad autónoma, zona
            tensionada, gran tenedor, licencias, etc.) y de consultar a un
            abogado o asesor cuando haya dudas o conflicto.
          </LegalParagraph>
          <LegalParagraph>
            Ningún generador online puede garantizar validez absoluta en todas
            las situaciones. Por eso preferimos claridad a promesas exageradas.
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Privacidad y datos">
          <LegalParagraph>
            No pedimos registro para generar el PDF. El tratamiento de datos de
            navegación y cookies se describe en nuestra{" "}
            <Link href="/privacidad" className="text-brand-blue hover:underline">
              política de privacidad
            </Link>{" "}
            y en la página de{" "}
            <Link href="/cookies" className="text-brand-blue hover:underline">
              cookies
            </Link>
            .
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Documentación legal del sitio">
          <LegalList
            items={[
              "Aviso legal: alcance del servicio y responsabilidad.",
              "Términos de uso: condiciones de uso de la herramienta.",
              "Privacidad y cookies: información sobre datos y trazas técnicas.",
            ]}
          />
          <LegalParagraph>
            Accesos rápidos:{" "}
            <Link href="/aviso-legal" className="text-brand-blue hover:underline">
              aviso legal
            </Link>
            ,{" "}
            <Link
              href="/terminos-de-uso"
              className="text-brand-blue hover:underline"
            >
              términos de uso
            </Link>
            ,{" "}
            <Link href="/privacidad" className="text-brand-blue hover:underline">
              privacidad
            </Link>
            .
          </LegalParagraph>
        </LegalSection>

        <LegalSection title="Contacto">
          <LegalParagraph>
            Para consultas generales, privacidad o reportar un problema en una
            plantilla, escribe a{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-blue hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . No ofrecemos dictámenes jurídicos por correo; si necesitas
            asesoramiento de caso, acude a un profesional colegiado.
          </LegalParagraph>
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
