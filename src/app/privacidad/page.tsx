import {
  LegalList,
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { createPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "Política de Privacidad — SoyContratoFacil.es",
  description:
    "Información sobre el tratamiento de datos personales en SoyContratoFacil.es conforme al RGPD y la LOPDGDD.",
  path: "/privacidad",
});

const LAST_UPDATED = "28 de junio de 2026";

export default function PrivacidadPage() {
  return (
    <LegalPageShell
      title="Política de Privacidad"
      description="En SoyContratoFacil.es respetamos tu privacidad. Esta política explica qué datos tratamos, con qué finalidad y cuáles son tus derechos."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Identificación del responsable">
        <LegalParagraph>
          Responsable del tratamiento: <strong className="text-slate-200">SoyContratoFacil.es</strong>
          . Contacto para cuestiones de privacidad:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-blue hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </LegalParagraph>
        <LegalParagraph>
          SoyContratoFacil.es es una herramienta en línea de generación automatizada
          de documentos contractuales inmobiliarios, accesible sin necesidad de registro
          ni creación de cuenta de usuario.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Datos que tratamos">
        <LegalParagraph>
          Dado que el servicio no requiere registro, no almacenamos perfiles de usuario
          ni credenciales de acceso. Los datos que introduces en los formularios de
          generación de contratos (nombres, direcciones, importes, fechas, etc.) se
          procesan en tu dispositivo para la creación del PDF y{" "}
          <strong className="text-slate-200">
            no se conservan en nuestros servidores
          </strong>{" "}
          una vez finalizada la sesión de generación, salvo que exista una obligación
          legal expresa o que actives funcionalidades futuras que lo indiquen
          expresamente.
        </LegalParagraph>
        <LegalParagraph>
          Podemos tratar, de forma limitada, datos técnicos derivados del uso del sitio:
        </LegalParagraph>
        <LegalList
          items={[
            "Dirección IP, tipo de navegador, sistema operativo y dispositivo.",
            "Páginas visitadas, fecha y hora de acceso y origen de la navegación.",
            "Datos de cookies técnicas necesarias para el funcionamiento del sitio (véase la Política de Cookies).",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Finalidad del tratamiento">
        <LegalParagraph>Tratamos los datos con las siguientes finalidades:</LegalParagraph>
        <LegalList
          items={[
            "Permitir la generación y descarga de documentos contractuales solicitados por el usuario.",
            "Garantizar la seguridad, el mantenimiento y el correcto funcionamiento de la plataforma.",
            "Analizar de forma agregada y anónima el uso del servicio para mejorar la experiencia.",
            "Cumplir obligaciones legales aplicables en materia de servicios digitales.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Base jurídica">
        <LegalParagraph>
          La base jurídica del tratamiento es, según el caso: la ejecución de medidas
          precontractuales o del servicio solicitado (art. 6.1.b RGPD), el interés
          legítimo en mantener y mejorar la plataforma de forma segura (art. 6.1.f
          RGPD) y, en su caso, el cumplimiento de obligaciones legales (art. 6.1.c
          RGPD).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Conservación de los datos">
        <LegalParagraph>
          Los datos introducidos en los formularios no se almacenan de forma persistente
          en nuestros sistemas. Los datos técnicos de navegación se conservan durante
          el tiempo estrictamente necesario para las finalidades indicadas y, en todo
          caso, dentro de los plazos legalmente establecidos.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Destinatarios y transferencias">
        <LegalParagraph>
          No cedemos tus datos a terceros con fines comerciales. Podremos recurrir a
          proveedores de servicios tecnológicos (alojamiento, CDN, analítica agregada)
          que actúan como encargados del tratamiento y que ofrecen garantías adecuadas
          conforme al RGPD. No se prevén transferencias internacionales salvo que se
          informe expresamente y existan las garantías exigidas por la normativa.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Derechos del usuario">
        <LegalParagraph>
          Puedes ejercer en cualquier momento los derechos de acceso, rectificación,
          supresión, oposición, limitación del tratamiento y portabilidad, así como
          retirar el consentimiento cuando el tratamiento se base en él, escribiendo a{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-blue hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          , adjuntando copia de un documento identificativo si fuera necesario para
          verificar tu identidad.
        </LegalParagraph>
        <LegalParagraph>
          Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española
          de Protección de Datos (
          <a
            href="https://www.aepd.es"
            className="text-brand-blue hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aepd.es
          </a>
          ).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Seguridad">
        <LegalParagraph>
          Aplicamos medidas técnicas y organizativas razonables para proteger la
          información tratada frente a accesos no autorizados, pérdida o alteración.
          No obstante, ningún sistema en Internet puede garantizar una seguridad
          absoluta; te recomendamos no incluir en los formularios más datos de los
          estrictamente necesarios para tu documento.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Modificaciones">
        <LegalParagraph>
          Podemos actualizar esta Política de Privacidad para adaptarla a cambios
          normativos o funcionales del servicio. La versión vigente estará siempre
          disponible en esta página con la fecha de última actualización.
        </LegalParagraph>
      </LegalSection>
    </LegalPageShell>
  );
}
