/** Meta y copy SEO orientados a CTR/ranking para /generar/[slug]. */

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContractBodySection = {
  title: string;
  paragraphs: string[];
};

export type ContractSeoMetadata = {
  title: string;
  description: string;
  /** H1 visible (misma tipografía; más keywords). */
  heading: string;
  /** Intro bajo el H1. */
  intro: string;
  faqs: FaqItem[];
  /** Contenido SEO bajo el formulario (páginas core). */
  bodySections?: ContractBodySection[];
  relatedArticleSlugs?: string[];
};

const CONTRACT_SEO: Record<string, ContractSeoMetadata> = {
  vivienda: {
    title: "Contrato Alquiler Vivienda Gratis PDF 2026",
    description:
      "Crea tu contrato de alquiler legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
    heading: "Contrato de alquiler de vivienda (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de vivienda habitual legal y actualizado. Completa el formulario, descarga el PDF listo para imprimir y fírmalo sin registro ni coste.",
    relatedArticleSlugs: [
      "plantilla-contrato-alquiler-pdf",
      "fianza-deposito-alquiler",
      "plazos-alquiler-vivienda",
    ],
    bodySections: [
      {
        title: "Qué incluye este contrato de alquiler de vivienda",
        paragraphs: [
          "El documento identifica a arrendador e inquilino, describe la vivienda, fija la renta, la fianza, la duración y las reglas básicas sobre gastos, suministros y uso del inmueble.",
          "Está pensado para vivienda habitual en España. Si el uso es temporal o de local comercial, usa el generador específico de temporada o de local.",
        ],
      },
      {
        title: "Cómo generar el PDF paso a paso",
        paragraphs: [
          "Completa las partes, los datos del inmueble y las condiciones económicas. Revisa el resumen, genera el documento y descarga el PDF gratis al instante.",
          "Ambas partes deben leer el contrato, comprobar que refleja lo acordado y firmarlo. El PDF queda listo para imprimir o archivar.",
        ],
      },
      {
        title: "Errores frecuentes al alquilar una vivienda",
        paragraphs: [
          "Olvidar la fianza legal, no concretar quién paga comunidad o suministros, o usar un modelo de temporada cuando el piso es vivienda habitual.",
          "También conviene anexar inventario si el piso va amueblado y guardar copia firmada por ambas partes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Este contrato de alquiler de vivienda es gratis?",
        answer:
          "Sí. Puedes generar y descargar el PDF gratis, sin crear cuenta ni introducir tarjeta.",
      },
      {
        question: "¿El documento está actualizado a 2026?",
        answer:
          "Sí. La plantilla está adaptada a la normativa española vigente para arrendamiento de vivienda habitual. Debes revisar que se ajuste a tu caso antes de firmar.",
      },
      {
        question: "¿Puedo imprimir y firmar el PDF al momento?",
        answer:
          "Sí. El PDF se genera al instante, listo para imprimir o firmar digitalmente. No almacenamos los datos de tu contrato en el servidor.",
      },
    ],
  },
  temporada: {
    title: "Contrato Alquiler Temporada Gratis PDF 2026",
    description:
      "Contrato de temporada legal y actualizado. PDF listo para imprimir. Genera y descarga gratis en minutos. Empieza ya.",
    heading: "Contrato de alquiler de temporada (PDF gratis)",
    intro:
      "Crea un contrato de arrendamiento de temporada o uso distinto del de vivienda. Documento legal, actualizado y listo para imprimir en minutos, sin registro.",
    relatedArticleSlugs: [
      "contrato-alquiler-temporada-pdf",
      "alquiler-temporada-vs-habitual",
      "plantilla-contrato-alquiler-pdf",
    ],
    bodySections: [
      {
        title: "Cuándo usar el contrato de temporada",
        paragraphs: [
          "Cuando la estancia es temporal (trabajo, estudios u otro motivo concreto) y el inmueble no constituye la vivienda habitual del inquilino.",
          "Si el uso es residencia permanente, genera el contrato de alquiler de vivienda habitual en su lugar.",
        ],
      },
      {
        title: "Qué debe quedar claro en el PDF",
        paragraphs: [
          "Partes, descripción del inmueble, carácter temporal del uso, duración, renta, fianza y condiciones de entrega y devolución.",
        ],
      },
      {
        title: "Descarga el contrato de temporada gratis",
        paragraphs: [
          "Rellena el formulario, revisa el resumen y descarga el PDF listo para imprimir. Sin registro y en pocos minutos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuándo usar un contrato de temporada?",
        answer:
          "Cuando el inmueble no se destina a vivienda habitual, sino a una estancia temporal (trabajo, estudios, vacaciones u otro uso temporal acreditado).",
      },
      {
        question: "¿Puedo descargar el contrato de temporada en PDF gratis?",
        answer:
          "Sí. Generas el documento en el formulario y descargas el PDF gratis, listo para imprimir y firmar.",
      },
      {
        question: "¿Es un modelo legal para España?",
        answer:
          "Sí. Está pensado para el marco español de arrendamientos. Revisa siempre el contenido y consulta a un profesional si tienes dudas.",
      },
    ],
  },
  habitacion: {
    title: "Contrato Alquiler Habitación Gratis PDF 2026",
    description:
      "Contrato de habitación legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
    heading: "Contrato de alquiler de habitación (PDF gratis)",
    intro:
      "Genera un contrato de habitación en vivienda compartida. Legal, actualizado y en PDF listo para imprimir. Gratis y sin registro.",
    faqs: [
      {
        question: "¿Sirve para piso compartido?",
        answer:
          "Sí. El modelo contempla el alquiler de una habitación dentro de una vivienda, con identificación de las partes y del espacio arrendado.",
      },
      {
        question: "¿El PDF es gratis?",
        answer:
          "Sí. Descargas el contrato de habitación en PDF sin registro y listo para imprimir.",
      },
      {
        question: "¿Qué debo revisar antes de firmar?",
        answer:
          "Datos de las partes, descripción de la habitación, renta, fianza, duración y reglas de uso de zonas comunes y suministros.",
      },
    ],
  },
  local: {
    title: "Contrato Alquiler Local Gratis PDF 2026",
    description:
      "Contrato de local comercial legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ya.",
    heading: "Contrato de alquiler de local comercial (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de local de negocio. Documento legal y actualizado en PDF, listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "contrato-alquiler-local-comercial-pdf",
      "plantilla-contrato-alquiler-pdf",
    ],
    bodySections: [
      {
        title: "Por qué un contrato específico de local",
        paragraphs: [
          "El local comercial no sigue el mismo régimen que la vivienda habitual. Destino de la actividad, duración y condiciones económicas deben quedar bien definidos.",
          "Evita usar una plantilla de piso: genera el modelo de local y adapta el destino a tu negocio.",
        ],
      },
      {
        title: "Qué datos pide el generador",
        paragraphs: [
          "Identificación de las partes, descripción del local, renta, plazo y condiciones básicas del arrendamiento para elaborar el PDF.",
        ],
      },
      {
        title: "Descarga el PDF del local ahora",
        paragraphs: [
          "Completa el formulario, revisa el resumen y descarga el contrato en PDF gratis, listo para imprimir y firmar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Este contrato vale para un local comercial?",
        answer:
          "Sí. Está orientado a arrendamiento de local de negocio o actividad comercial en España.",
      },
      {
        question: "¿Puedo descargarlo en PDF gratis?",
        answer:
          "Sí. Completas el formulario y descargas el PDF al instante, listo para imprimir y firmar.",
      },
      {
        question: "¿Incluye duración y renta?",
        answer:
          "Sí. El formulario te pide las condiciones esenciales (renta, plazo e identificación del local) para generar el documento.",
      },
    ],
  },
  "compraventa-vivienda": {
    title: "Contrato Compraventa Vivienda Gratis PDF 2026",
    description:
      "Contrato de compraventa legal y actualizado 2026. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
    heading: "Contrato de compraventa de vivienda (PDF gratis)",
    intro:
      "Genera un contrato de compraventa de vivienda entre particulares. Legal, actualizado 2026 y en PDF listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "contrato-compraventa-vivienda-particulares-pdf",
      "checklist-compraventa-vivienda",
      "modelo-arras-penitenciales-pdf",
    ],
    bodySections: [
      {
        title: "Contrato privado entre particulares",
        paragraphs: [
          "Documenta el acuerdo de compraventa: partes, vivienda, precio y forma de pago. Es útil como contrato privado antes o además de la escritura notarial.",
          "Para inscribir la transmisión en el Registro suele requerirse escritura pública; este PDF deja claro lo pactado entre las partes.",
        ],
      },
      {
        title: "Qué debes revisar antes de firmar",
        paragraphs: [
          "Identificación del inmueble, precio total, plazos de pago, cargas declaradas y distribución de gastos si la habéis acordado.",
        ],
      },
      {
        title: "Si aún estás reservando la vivienda",
        paragraphs: [
          "En fase de señal o reserva, suele convenir un contrato de arras. Cuando la compraventa está cerrada en lo esencial, genera este contrato de compraventa en PDF.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Sirve para compraventa entre particulares?",
        answer:
          "Sí. El modelo está orientado a transmisión de vivienda entre particulares en España.",
      },
      {
        question: "¿Puedo descargar el PDF gratis?",
        answer:
          "Sí. Generas el documento y lo descargas listo para imprimir, sin registro ni pago.",
      },
      {
        question: "¿Sustituye a la escritura notarial?",
        answer:
          "No. Es un contrato privado útil para documentar el acuerdo. La escritura pública ante notario sigue siendo el cauce habitual para inscribir la transmisión.",
      },
    ],
  },
  arras: {
    title: "Contrato de Arras Gratis PDF 2026 | Descargar",
    description:
      "Contrato de arras legal y actualizado. PDF listo para imprimir. Genera y descarga gratis en minutos. Empieza ya.",
    heading: "Contrato de arras (PDF gratis 2026)",
    intro:
      "Crea un contrato de arras penitenciales o confirmatorias. Documento legal actualizado en PDF, listo para imprimir. Gratis y en minutos.",
    relatedArticleSlugs: [
      "modelo-arras-penitenciales-pdf",
      "tipos-de-arras",
      "contrato-compraventa-vivienda-particulares-pdf",
    ],
    bodySections: [
      {
        title: "Para qué sirven las arras",
        paragraphs: [
          "Reservan la compraventa con una cantidad a cuenta y definen qué ocurre si comprador o vendedor desisten. En arras penitenciales, las consecuencias económicas suelen estar muy claras.",
        ],
      },
      {
        title: "Datos imprescindibles del documento",
        paragraphs: [
          "Partes, inmueble, precio de compraventa, importe de las arras, tipo de arras y plazo para elevar a escritura.",
        ],
      },
      {
        title: "Genera el PDF de arras gratis",
        paragraphs: [
          "Completa el formulario, revisa el resumen y descarga el PDF listo para imprimir. Después puedes pasar al contrato de compraventa cuando corresponda.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué tipos de arras puedo documentar?",
        answer:
          "El generador contempla arras habituales en compraventas inmobiliarias. Indica en el formulario el tipo y condiciones que hayáis acordado.",
      },
      {
        question: "¿El PDF es gratis y listo para imprimir?",
        answer:
          "Sí. Descargas el contrato de arras al instante, sin registro.",
      },
      {
        question: "¿Es un documento legal en España?",
        answer:
          "Sí, como modelo privado orientativo. Revisa importes, plazos y efectos antes de firmar; consulta a un profesional si lo necesitas.",
      },
    ],
  },
  "finca-rustica": {
    title: "Contrato Alquiler Finca Rústica Gratis PDF",
    description:
      "Contrato de finca rústica legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ahora.",
    heading: "Contrato de alquiler de finca rústica (PDF gratis)",
    intro:
      "Crea un contrato de arrendamiento de finca rústica, terreno o explotación. Legal, actualizado y en PDF listo para imprimir. Gratis.",
    faqs: [
      {
        question: "¿Sirve para terreno o explotación agrícola?",
        answer:
          "Sí. El modelo está pensado para finca rústica, terreno o explotación, con identificación del inmueble y condiciones del arrendamiento.",
      },
      {
        question: "¿El documento es gratis en PDF?",
        answer:
          "Sí. Generas y descargas el PDF sin registro, listo para imprimir.",
      },
      {
        question: "¿Está actualizado legalmente?",
        answer:
          "La plantilla refleja un modelo habitual en España. Debes comprobar que se adapta a tu caso concreto antes de firmar.",
      },
    ],
  },
  "arrendamiento-garaje": {
    title: "Contrato Alquiler Garaje/Trastero Gratis PDF",
    description:
      "Contrato de garaje o trastero legal y actualizado. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
    heading: "Contrato de alquiler de garaje o trastero (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de plaza de garaje o trastero. Documento legal en PDF, listo para imprimir. Gratis y sin registro.",
    faqs: [
      {
        question: "¿Puedo usarlo para plaza de garaje y trastero?",
        answer:
          "Sí. El formulario permite identificar si se trata de plaza, trastero o ambos según tu caso.",
      },
      {
        question: "¿Descarga PDF gratis?",
        answer:
          "Sí. El contrato se genera al instante y puedes descargarlo en PDF listo para imprimir, sin coste.",
      },
      {
        question: "¿Necesito registrarme?",
        answer:
          "No. El proceso es anónimo: rellenas, generas y descargas.",
      },
    ],
  },
  "garaje-trastero": {
    title: "Compraventa Garaje/Trastero Gratis PDF 2026",
    description:
      "Contrato de compraventa de garaje/trastero legal y actualizado. PDF listo para imprimir. Gratis. Descárgalo ya.",
    heading: "Contrato de compraventa de garaje o trastero (PDF gratis)",
    intro:
      "Genera un contrato de compraventa de plaza de garaje o trastero. Legal, actualizado y en PDF listo para imprimir. Gratis, sin registro.",
    faqs: [
      {
        question: "¿Puedo comprar o vender solo el garaje?",
        answer:
          "Sí. El modelo permite documentar la transmisión de plaza de garaje o trastero de forma independiente.",
      },
      {
        question: "¿Descarga gratuita en PDF?",
        answer:
          "Sí. Generas el contrato y descargas el PDF listo para imprimir sin coste.",
      },
      {
        question: "¿Necesito notario después?",
        answer:
          "Para inscribir la transmisión suele requerirse escritura pública. Este contrato documenta el acuerdo privado entre las partes.",
      },
    ],
  },
  rescision: {
    title: "Rescisión Contrato Alquiler Gratis PDF 2026",
    description:
      "Documento de rescisión legal y actualizado. PDF listo para imprimir. Genera y descarga gratis. Empieza ahora.",
    heading: "Rescisión de contrato de alquiler (PDF gratis)",
    intro:
      "Genera un documento de rescisión anticipada del arrendamiento. Legal, claro y en PDF listo para imprimir. Gratis, sin registro.",
    faqs: [
      {
        question: "¿Para qué sirve este documento?",
        answer:
          "Para formalizar por escrito el acuerdo de finalización anticipada del contrato de alquiler entre las partes.",
      },
      {
        question: "¿Puedo descargarlo gratis en PDF?",
        answer:
          "Sí. Completas los datos y descargas el PDF listo para imprimir al instante.",
      },
      {
        question: "¿Sustituye al preaviso legal?",
        answer:
          "Documenta el acuerdo de las partes. Debes respetar además los plazos y requisitos legales que apliquen a tu caso.",
      },
    ],
  },
  "cambio-suministros": {
    title: "Cambio Suministros Alquiler Gratis PDF 2026",
    description:
      "Comunicación de cambio de titular legal y actualizada. PDF listo para imprimir. Gratis. Descárgalo ya.",
    heading: "Cambio de titularidad de suministros (PDF gratis)",
    intro:
      "Genera la comunicación de cambio de titular de luz, agua o gas. Documento listo para imprimir en PDF. Gratis y sin registro.",
    faqs: [
      {
        question: "¿Qué suministros cubre?",
        answer:
          "Sirve como comunicación de cambio de titularidad para suministros habituales (luz, agua, gas u otros que indiques).",
      },
      {
        question: "¿Es gratis descargar el PDF?",
        answer:
          "Sí. Generas el documento y lo descargas listo para imprimir, sin registro.",
      },
      {
        question: "¿Lo aceptan las compañías?",
        answer:
          "Es un modelo de comunicación entre particulares. Cada comercializadora puede pedir su propio formulario o datos adicionales.",
      },
    ],
  },
};

export function getContractSeoMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): ContractSeoMetadata {
  return (
    CONTRACT_SEO[slug] ?? {
      title: fallbackTitle,
      description: fallbackDescription,
      heading: fallbackTitle,
      intro: fallbackDescription,
      faqs: [],
    }
  );
}
