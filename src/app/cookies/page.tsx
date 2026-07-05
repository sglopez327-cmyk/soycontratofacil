import {
  LegalList,
  LegalPageShell,
  LegalParagraph,
  LegalSection,
} from "@/components/legal/legal-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de Cookies — SoyContratoFacil.es",
  description:
    "Información sobre el uso de cookies y tecnologías similares en SoyContratoFacil.es.",
  path: "/cookies",
});

const LAST_UPDATED = "28 de junio de 2026";

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Política de Cookies"
      description="Esta política describe qué cookies y tecnologías similares utiliza SoyContratoFacil.es, para qué sirven y cómo puedes gestionarlas."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection title="1. Identificación del responsable">
        <LegalParagraph>
          Responsable: <strong className="text-slate-200">SoyContratoFacil.es</strong>.
          Contacto:{" "}
          <a
            href="mailto:privacidad@soycontratofacil.es"
            className="text-brand-blue hover:underline"
          >
            privacidad@soycontratofacil.es
          </a>
          .
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. ¿Qué son las cookies?">
        <LegalParagraph>
          Las cookies son pequeños archivos de texto que se almacenan en tu navegador
          cuando visitas un sitio web. Permiten recordar preferencias, mantener sesiones
          técnicas o, en su caso, obtener estadísticas de uso. También pueden utilizarse
          tecnologías similares como almacenamiento local o identificadores del
          dispositivo con finalidades equivalentes.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Tipos de cookies que utilizamos">
        <LegalParagraph>
          En SoyContratoFacil.es priorizamos un modelo sin registro y con el mínimo
          tratamiento de datos posible. Actualmente empleamos principalmente:
        </LegalParagraph>
        <LegalList
          items={[
            "Cookies técnicas o estrictamente necesarias: imprescindibles para el funcionamiento del sitio, la seguridad y la entrega del servicio (por ejemplo, preferencias de interfaz o equilibrio de carga).",
            "Cookies de rendimiento o analítica (opcionales): solo si se activan herramientas de medición agregada para comprender el uso del servicio y mejorarlo, sin crear perfiles comerciales.",
          ]}
        />
        <LegalParagraph>
          No utilizamos cookies de publicidad comportamental ni vendemos datos derivados
          de la navegación a terceros con fines comerciales.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. Finalidad del tratamiento">
        <LegalParagraph>Las cookies nos permiten:</LegalParagraph>
        <LegalList
          items={[
            "Garantizar el correcto funcionamiento y la seguridad de la plataforma.",
            "Recordar preferencias básicas de visualización cuando sea necesario.",
            "Medir de forma agregada el tráfico y el rendimiento del sitio, si se habilita analítica.",
            "Detectar incidencias técnicas y prevenir usos abusivos.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Base jurídica">
        <LegalParagraph>
          Las cookies técnicas se instalan sobre la base del interés legítimo en
          prestar el servicio solicitado (art. 6.1.f RGPD) y, en su caso, de la
          ejecución del servicio. Las cookies no esenciales, como las analíticas,
          requerirán tu consentimiento previo conforme a la Ley 34/2002 (LSSI) y
          al RGPD cuando estén activas.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Conservación">
        <LegalParagraph>
          Las cookies técnicas suelen ser de sesión o de corta duración. Las cookies
          analíticas, si se utilizan, se conservarán durante los plazos indicados
          por el proveedor correspondiente y, en todo caso, el mínimo necesario para
          su finalidad.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Cómo gestionar o eliminar cookies">
        <LegalParagraph>
          Puedes configurar tu navegador para bloquear, eliminar o recibir avisos
          sobre las cookies. Ten en cuenta que desactivar las cookies técnicas puede
          afectar al funcionamiento del sitio. Consulta la ayuda de tu navegador:
        </LegalParagraph>
        <LegalList
          items={[
            "Google Chrome: Configuración → Privacidad y seguridad → Cookies.",
            "Mozilla Firefox: Opciones → Privacidad y seguridad.",
            "Safari: Preferencias → Privacidad.",
            "Microsoft Edge: Configuración → Cookies y permisos del sitio.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Derechos del usuario">
        <LegalParagraph>
          Puedes ejercer tus derechos de protección de datos descritos en nuestra{" "}
          <a href="/privacidad" className="text-brand-blue hover:underline">
            Política de Privacidad
          </a>
          . Para cualquier consulta sobre cookies, escríbenos a{" "}
          <a
            href="mailto:privacidad@soycontratofacil.es"
            className="text-brand-blue hover:underline"
          >
            privacidad@soycontratofacil.es
          </a>
          .
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Actualizaciones">
        <LegalParagraph>
          Esta Política de Cookies puede modificarse para reflejar cambios
          normativos o técnicos. Te recomendamos revisarla periódicamente. La fecha
          de la última versión figura al inicio de este documento.
        </LegalParagraph>
      </LegalSection>
    </LegalPageShell>
  );
}
