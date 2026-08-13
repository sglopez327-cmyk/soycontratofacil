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
  /** Otros generadores relacionados (enlaces internos /generar/...). */
  relatedContractSlugs?: string[];
};

const CONTRACT_SEO: Record<string, ContractSeoMetadata> = {
  vivienda: {
    title: "Contrato de alquiler de vivienda PDF gratis",
    description:
      "Genera tu contrato de alquiler de vivienda habitual en PDF. Adaptado a la normativa española, listo para imprimir y firmar. Gratis y sin registro.",
    heading: "Contrato de alquiler de vivienda (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de vivienda habitual adaptado a la normativa española. Completa el formulario, descarga el PDF listo para imprimir y fírmalo sin registro ni coste.",
    relatedArticleSlugs: [
      "plantilla-contrato-alquiler-pdf",
      "fianza-deposito-alquiler",
      "plazos-alquiler-vivienda",
      "quien-paga-comunidad-alquiler",
      "inventario-mobiliario-alquiler",
    ],
    relatedContractSlugs: ["temporada", "habitacion", "rescision", "cambio-suministros"],
    bodySections: [
      {
        title: "Qué incluye este contrato de alquiler de vivienda",
        paragraphs: [
          "El documento identifica a arrendador e inquilino, describe la vivienda (dirección, referencia catastral, superficie y certificado energético), fija la renta, la fianza, la duración y las reglas básicas sobre gastos, suministros y uso del inmueble.",
          "Está pensado para vivienda habitual en España. Si el uso es temporal o de local comercial, usa el generador específico de temporada o de local para evitar un régimen jurídico incorrecto.",
        ],
      },
      {
        title: "Cómo generar el PDF paso a paso",
        paragraphs: [
          "Completa las partes, los datos del inmueble y las condiciones económicas. Revisa el resumen, genera el documento y descarga el PDF gratis al instante.",
          "Ambas partes deben leer el contrato, comprobar que refleja lo acordado y firmarlo. El PDF queda listo para imprimir, archivar o firmar digitalmente.",
        ],
      },
      {
        title: "Errores frecuentes al alquilar una vivienda",
        paragraphs: [
          "Olvidar la fianza legal de vivienda habitual, no concretar quién paga comunidad o suministros, o usar un modelo de temporada cuando el piso es residencia permanente.",
          "También conviene anexar inventario si el piso va amueblado, fijar el IBAN de pago y guardar copia firmada por ambas partes.",
        ],
      },
      {
        title: "Normativa y revisión antes de firmar",
        paragraphs: [
          "La plantilla se orienta a la LAU y demás normativa española aplicable al arrendamiento de vivienda habitual. Cada caso puede tener matices (comunidad autónoma, zona tensionada, gran tenedor).",
          "Revisa siempre el PDF antes de firmar. Si tienes dudas jurídicas concretas, consulta a un profesional. SoyContratoFacil.es no sustituye asesoramiento legal personalizado.",
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
        question: "¿Cuánta fianza debo pedir en vivienda habitual?",
        answer:
          "En arrendamiento de vivienda habitual la fianza legal es, con carácter general, de una mensualidad de renta. Confirma el depósito en el organismo de tu comunidad autónoma cuando proceda.",
      },
      {
        question: "¿Puedo imprimir y firmar el PDF al momento?",
        answer:
          "Sí. El PDF se genera al instante, listo para imprimir o firmar digitalmente. No almacenamos los datos de tu contrato en el servidor.",
      },
      {
        question: "¿Sirve si el piso está amueblado?",
        answer:
          "Sí. Puedes indicar que el alquiler es amueblado y, además, conviene anexar un inventario fotográfico para evitar conflictos al finalizar el contrato.",
      },
    ],
  },
  temporada: {
    title: "Contrato de alquiler de temporada PDF gratis",
    description:
      "Genera un contrato de alquiler de temporada o uso distinto del de vivienda. PDF listo para imprimir. Gratis, sin registro.",
    heading: "Contrato de alquiler de temporada (PDF gratis)",
    intro:
      "Crea un contrato de arrendamiento de temporada o uso distinto del de vivienda. Documento adaptado a la normativa española y listo para imprimir en minutos, sin registro.",
    relatedArticleSlugs: [
      "contrato-alquiler-temporada-pdf",
      "alquiler-temporada-vs-habitual",
      "plantilla-contrato-alquiler-pdf",
    ],
    relatedContractSlugs: ["vivienda", "habitacion"],
    bodySections: [
      {
        title: "Cuándo usar el contrato de temporada",
        paragraphs: [
          "Cuando la estancia es temporal (trabajo, estudios u otro motivo concreto) y el inmueble no constituye la vivienda habitual del inquilino.",
          "Si el uso es residencia permanente, genera el contrato de alquiler de vivienda habitual. Confundir ambos regímenes es uno de los errores más habituales.",
        ],
      },
      {
        title: "Qué debe quedar claro en el PDF",
        paragraphs: [
          "Partes, descripción del inmueble, carácter temporal del uso y su motivo, duración, renta, fianza y condiciones de entrega y devolución.",
          "Documentar el motivo de la temporada ayuda a justificar que no se trata de un arrendamiento de vivienda habitual.",
        ],
      },
      {
        title: "Diferencias clave frente a vivienda habitual",
        paragraphs: [
          "El régimen de prórrogas, fianza y derechos del inquilino no es el mismo que en vivienda habitual. Por eso no debes reutilizar un modelo de piso habitual para una estancia temporal.",
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
          "Sí. Está pensado para el marco español de arrendamientos de uso distinto del de vivienda. Revisa siempre el contenido y consulta a un profesional si tienes dudas.",
      },
      {
        question: "¿Qué fianza suele aplicarse?",
        answer:
          "En usos distintos del de vivienda la fianza legal suele ser de dos mensualidades. Confirma el encaje de tu caso antes de firmar.",
      },
      {
        question: "¿Sirve para Airbnb o vacaciones cortas?",
        answer:
          "Este modelo documenta un arrendamiento temporal entre particulares. Si operas como alojamiento turístico, pueden aplicarte licencias y normas autonómicas adicionales.",
      },
    ],
  },
  habitacion: {
    title: "Contrato de alquiler de habitación PDF gratis",
    description:
      "Genera tu contrato de alquiler de habitación en piso compartido. PDF listo para firmar, con zonas comunes. Gratis y sin registro.",
    heading: "Contrato de alquiler de habitación (PDF gratis)",
    intro:
      "Genera un contrato de habitación en vivienda compartida. Adaptado a la normativa española y en PDF listo para imprimir. Gratis y sin registro.",
    relatedArticleSlugs: [
      "alquiler-habitacion-piso-compartido",
      "fianza-deposito-alquiler",
      "inventario-mobiliario-alquiler",
    ],
    relatedContractSlugs: ["vivienda", "temporada"],
    bodySections: [
      {
        title: "Qué debe incluir el contrato de habitación",
        paragraphs: [
          "Partes, identificación de la vivienda y de la habitación arrendada, renta, fianza, duración, uso de zonas comunes y reglas de convivencia y suministros.",
          "Cuanto más clara sea la descripción de la habitación y de las zonas compartidas, menos conflictos habrá durante el contrato.",
        ],
      },
      {
        title: "Habitación vs. vivienda habitual completa",
        paragraphs: [
          "Alquilar una habitación en piso compartido no es lo mismo que ceder una vivienda completa. Usa este generador cuando el objeto sea solo una habitación y el resto de la vivienda se comparta.",
          "Si cedes el piso entero como residencia habitual, genera el contrato de vivienda.",
        ],
      },
      {
        title: "Errores frecuentes en pisos compartidos",
        paragraphs: [
          "No definir quién paga suministros, no fijar normas de convivencia, omitir el inventario de la habitación amueblada o no dejar claro el preaviso de salida.",
        ],
      },
      {
        title: "Descarga el PDF gratis",
        paragraphs: [
          "Completa el formulario y descarga el contrato listo para imprimir. Revisa el contenido antes de firmar y guarda una copia firmada por ambas partes.",
        ],
      },
    ],
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
      {
        question: "¿Puedo incluir inventario de muebles?",
        answer:
          "Sí. Describe la habitación amueblada en el formulario y, si quieres más detalle, anexa un inventario fotográfico al PDF firmado.",
      },
      {
        question: "¿Qué régimen legal aplica?",
        answer:
          "A falta de regulación estatal específica, suele regirse por lo pactado, el Código Civil y, en lo aplicable, la LAU. Revisa tu caso si hay dudas de calificación.",
      },
    ],
  },
  local: {
    title: "Contrato de alquiler de local comercial PDF gratis",
    description:
      "Genera tu contrato de alquiler de local comercial o de negocio en PDF. Listo para imprimir y firmar. Gratis, sin registro.",
    heading: "Contrato de alquiler de local comercial (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de local de negocio. Documento adaptado a la normativa española en PDF, listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "contrato-alquiler-local-comercial-pdf",
      "plantilla-contrato-alquiler-pdf",
    ],
    relatedContractSlugs: ["vivienda", "arras"],
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
          "Identificación de las partes, descripción del local, actividad comercial, renta, fianza, plazo y condiciones básicas del arrendamiento para elaborar el PDF.",
        ],
      },
      {
        title: "Puntos críticos antes de firmar",
        paragraphs: [
          "Confirma la actividad permitida, quién asume comunidad e IBI si lo habéis pactado, la fianza y el preaviso de resolución. Un local mal documentado genera disputas caras.",
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
      {
        question: "¿Qué fianza suele pedirse en un local?",
        answer:
          "En usos distintos del de vivienda la fianza legal suele ser de dos mensualidades. Ajusta el importe a lo acordado y a la normativa aplicable.",
      },
      {
        question: "¿Sirve para oficina o nave?",
        answer:
          "Puedes usarlo como base para local de negocio u oficina si describes bien el inmueble y la actividad. Para casos especiales, revisa el texto con un profesional.",
      },
    ],
  },
  "compraventa-vivienda": {
    title: "Contrato de compraventa de vivienda entre particulares PDF",
    description:
      "Genera el contrato de compraventa de vivienda entre particulares en PDF. Listo para imprimir y firmar. Gratis, sin registro.",
    heading: "Contrato de compraventa de vivienda (PDF gratis)",
    intro:
      "Genera un contrato de compraventa de vivienda entre particulares. Adaptado a la normativa española y en PDF listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "contrato-compraventa-vivienda-particulares-pdf",
      "checklist-compraventa-vivienda",
      "modelo-arras-penitenciales-pdf",
      "gastos-compraventa-vivienda",
      "nota-simple-antes-de-comprar",
    ],
    relatedContractSlugs: ["arras"],
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
          "Conviene comprobar nota simple, certificado energético y que el vendedor tenga capacidad para transmitir.",
        ],
      },
      {
        title: "Si aún estás reservando la vivienda",
        paragraphs: [
          "En fase de señal o reserva, suele convenir un contrato de arras. Cuando la compraventa está cerrada en lo esencial, genera este contrato de compraventa en PDF.",
        ],
      },
      {
        title: "Descarga el PDF gratis",
        paragraphs: [
          "Completa el formulario, revisa el resumen y descarga el contrato listo para imprimir. Ambas partes deben conservar una copia firmada.",
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
      {
        question: "¿Qué diferencia hay con las arras?",
        answer:
          "Las arras reservan la operación y regulan el desistimiento. El contrato de compraventa documenta la transmisión pactada de forma más completa.",
      },
      {
        question: "¿Debo pedir nota simple antes?",
        answer:
          "Es muy recomendable. La nota simple ayuda a verificar titularidad, cargas e incidencias del inmueble antes de firmar.",
      },
    ],
  },
  arras: {
    title: "Contrato de arras PDF gratis | Particulares",
    description:
      "Genera un contrato de arras penitenciales o confirmatorias en PDF. Ideal para reservar una compraventa entre particulares. Gratis.",
    heading: "Contrato de arras (PDF gratis)",
    intro:
      "Crea un contrato de arras penitenciales o confirmatorias. Documento adaptado a la normativa española en PDF, listo para imprimir. Gratis y en minutos.",
    relatedArticleSlugs: [
      "modelo-arras-penitenciales-pdf",
      "tipos-de-arras",
      "contrato-arras-penitenciales-guia",
      "contrato-compraventa-vivienda-particulares-pdf",
    ],
    relatedContractSlugs: ["compraventa-vivienda"],
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
          "Indica bien el tipo de arras: penitenciales, confirmatorias o penales tienen efectos distintos si alguien desiste.",
        ],
      },
      {
        title: "Errores frecuentes en arras",
        paragraphs: [
          "No concretar el tipo de arras, olvidar el plazo para la escritura o no identificar correctamente el inmueble y el precio total.",
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
      {
        question: "¿Qué pasa si el comprador desiste en arras penitenciales?",
        answer:
          "Con carácter general, puede perder la cantidad entregada. Confirma el tipo de arras pactado y el texto del contrato antes de firmar.",
      },
      {
        question: "¿Después de las arras necesito otro contrato?",
        answer:
          "Habitualmente sí: cuando la operación avanza, conviene documentar la compraventa y elevar a escritura pública.",
      },
    ],
  },
  "finca-rustica": {
    title: "Contrato Alquiler Finca Rústica Gratis PDF",
    description:
      "Contrato de finca rústica adaptado a la normativa española. PDF listo para imprimir. Genera y descarga gratis. Empieza ahora.",
    heading: "Contrato de alquiler de finca rústica (PDF gratis)",
    intro:
      "Crea un contrato de arrendamiento de finca rústica, terreno o explotación. Adaptado a la normativa española y en PDF listo para imprimir. Gratis.",
    relatedArticleSlugs: ["contrato-arrendamiento-olivar"],
    relatedContractSlugs: ["local", "vivienda"],
    bodySections: [
      {
        title: "Para qué sirve este contrato",
        paragraphs: [
          "Documenta el arrendamiento de finca rústica: olivar, terreno u otra explotación. Identifica las partes, la finca, el uso y la renta o canon.",
        ],
      },
      {
        title: "Qué datos son críticos",
        paragraphs: [
          "Referencia catastral, superficie, uso previsto, renta, fianza y duración. Una finca mal identificada complica cualquier reclamación posterior.",
        ],
      },
      {
        title: "Cómo generar el PDF",
        paragraphs: [
          "Completa el formulario, revisa el resumen y descarga el PDF gratis. Revisa siempre el documento antes de firmar.",
        ],
      },
      {
        title: "Normativa aplicable",
        paragraphs: [
          "Los arrendamientos rústicos tienen particularidades frente al alquiler urbano. Usa este modelo como base y adapta el texto a tu explotación y territorio.",
        ],
      },
    ],
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
      {
        question: "¿Puedo usarlo para un olivar?",
        answer:
          "Sí. Describe la finca, el uso agrícola y las condiciones económicas. Si hay particularidades del cultivo, detállalas en el formulario.",
      },
      {
        question: "¿Es lo mismo que alquilar un local?",
        answer:
          "No. Local comercial y finca rústica tienen objetos y regímenes distintos. Usa el generador específico de cada uno.",
      },
    ],
  },
  "arrendamiento-garaje": {
    title: "Contrato Alquiler Garaje/Trastero Gratis PDF",
    description:
      "Contrato de garaje o trastero adaptado a la normativa española. PDF listo para imprimir. Gratis, sin registro. Descárgalo ya.",
    heading: "Contrato de alquiler de garaje o trastero (PDF gratis)",
    intro:
      "Genera un contrato de arrendamiento de plaza de garaje o trastero. Documento legal en PDF, listo para imprimir. Gratis y sin registro.",
    relatedArticleSlugs: ["plantilla-contrato-alquiler-pdf"],
    relatedContractSlugs: ["garaje-trastero", "vivienda"],
    bodySections: [
      {
        title: "Qué incluye el contrato de alquiler de garaje o trastero",
        paragraphs: [
          "Identificación de las partes, descripción de la plaza o trastero, renta, fianza, duración y condiciones de uso y pago.",
          "Sirve para documentar el arrendamiento de una plaza, un trastero o ambos, según indiques en el formulario.",
        ],
      },
      {
        title: "Errores frecuentes",
        paragraphs: [
          "No identificar bien el número de plaza, omitir la dirección del edificio o no fijar quién paga gastos comunitarios asociados al uso del garaje.",
        ],
      },
      {
        title: "Cómo generar el PDF",
        paragraphs: [
          "Rellena las partes y las condiciones, revisa el resumen y descarga el PDF gratis listo para firmar.",
        ],
      },
      {
        title: "Si quieres vender la plaza",
        paragraphs: [
          "Este generador es de arrendamiento. Para transmitir la propiedad, usa el contrato de compraventa de garaje o trastero.",
        ],
      },
    ],
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
      {
        question: "¿Qué fianza conviene pedir?",
        answer:
          "En usos distintos del de vivienda suele aplicarse fianza de dos mensualidades. Ajusta el importe a lo pactado.",
      },
      {
        question: "¿Sirve si el garaje está en otra finca?",
        answer:
          "Sí, siempre que identifiques correctamente la plaza o trastero y la dirección del inmueble en el formulario.",
      },
    ],
  },
  "garaje-trastero": {
    title: "Compraventa Garaje/Trastero Gratis PDF 2026",
    description:
      "Contrato de compraventa de garaje/trastero adaptado a la normativa española. PDF listo para imprimir. Gratis. Descárgalo ya.",
    heading: "Contrato de compraventa de garaje o trastero (PDF gratis)",
    intro:
      "Genera un contrato de compraventa de plaza de garaje o trastero. Adaptado a la normativa española y en PDF listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "checklist-compraventa-vivienda",
      "nota-simple-antes-de-comprar",
    ],
    relatedContractSlugs: ["compraventa-vivienda", "arras", "arrendamiento-garaje"],
    bodySections: [
      {
        title: "Compraventa de plaza o trastero entre particulares",
        paragraphs: [
          "Documenta la transmisión de una plaza de garaje o trastero: partes, inmueble, precio y forma de pago.",
          "Es un contrato privado útil para dejar constancia del acuerdo antes o además de la escritura notarial.",
        ],
      },
      {
        title: "Qué revisar antes de firmar",
        paragraphs: [
          "Titularidad, cargas, identificación exacta de la plaza y precio total. Una nota simple ayuda a evitar sorpresas.",
        ],
      },
      {
        title: "Arras o compraventa",
        paragraphs: [
          "Si solo estás reservando la operación, puede convenir un contrato de arras. Si la compraventa está cerrada en lo esencial, genera este PDF de compraventa.",
        ],
      },
      {
        title: "Descarga el PDF gratis",
        paragraphs: [
          "Completa el formulario y descarga el documento listo para imprimir. Conserva copia firmada por ambas partes.",
        ],
      },
    ],
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
      {
        question: "¿Sirve para trastero independiente?",
        answer:
          "Sí. Identifica el trastero y sus datos en el formulario para generar el PDF.",
      },
      {
        question: "¿Y si quiero alquilarlo en lugar de venderlo?",
        answer:
          "Usa el generador de arrendamiento de garaje o trastero, pensado para alquiler y no para compraventa.",
      },
    ],
  },
  rescision: {
    title: "Rescisión de contrato de alquiler PDF gratis",
    description:
      "Genera el documento de rescisión anticipada del alquiler en PDF. Deja constancia de fianza y fecha de fin. Gratis, sin registro.",
    heading: "Rescisión de contrato de alquiler (PDF gratis)",
    intro:
      "Genera un documento de rescisión anticipada del arrendamiento. Claro y en PDF listo para imprimir. Gratis, sin registro.",
    relatedArticleSlugs: [
      "preaviso-fin-contrato-alquiler",
      "cuando-usar-contrato-rescision",
      "fianza-deposito-alquiler",
    ],
    relatedContractSlugs: ["vivienda", "cambio-suministros"],
    bodySections: [
      {
        title: "Cuándo usar este documento",
        paragraphs: [
          "Cuando arrendador e inquilino acuerdan terminar el alquiler antes de tiempo y quieren dejar constancia de la entrega, la fianza y la fecha de fin.",
        ],
      },
      {
        title: "Qué debe quedar por escrito",
        paragraphs: [
          "Identificación de las partes y del contrato original, fecha de rescisión, motivo, estado del inmueble y acuerdo sobre devolución de la fianza.",
        ],
      },
      {
        title: "Preaviso y efectos legales",
        paragraphs: [
          "Este PDF documenta el acuerdo. Debes respetar además los plazos de preaviso y requisitos legales que apliquen a tu caso concreto.",
        ],
      },
      {
        title: "Genera el PDF ahora",
        paragraphs: [
          "Completa el formulario de rescisión y descarga el PDF gratis. Revisa el texto antes de firmar y conserva una copia.",
        ],
      },
    ],
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
      {
        question: "¿Puedo indicar qué pasa con la fianza?",
        answer:
          "Sí. El formulario contempla la devolución de la fianza para dejar constancia del acuerdo al finalizar el contrato.",
      },
      {
        question: "¿Sirve solo para vivienda?",
        answer:
          "Está orientado a rescisión de arrendamiento. Adapta los datos al contrato que queréis extinguir y revisa el texto antes de firmar.",
      },
    ],
  },
  "cambio-suministros": {
    title: "Cambio de titularidad de suministros PDF gratis",
    description:
      "Genera la comunicación de cambio de titular de luz, agua o gas al alquilar. PDF listo para imprimir. Gratis, sin registro.",
    heading: "Cambio de titularidad de suministros (PDF gratis)",
    intro:
      "Genera la comunicación de cambio de titular de luz, agua o gas. Documento listo para imprimir en PDF. Gratis y sin registro.",
    relatedArticleSlugs: [
      "cambio-suministros-alquiler",
      "quien-paga-comunidad-alquiler",
    ],
    relatedContractSlugs: ["vivienda", "rescision"],
    bodySections: [
      {
        title: "Para qué sirve este documento",
        paragraphs: [
          "Deja constancia escrita del cambio de titularidad de suministros (luz, agua, gas u otros) entre las partes del alquiler.",
          "Ayuda a evitar que el propietario o el inquilino sigan vinculados a un contrato de suministro que ya no les corresponde.",
        ],
      },
      {
        title: "Qué datos incluye",
        paragraphs: [
          "Identificación de titular saliente y entrante, tipo de suministro, número de contrato o referencia, fecha del cambio y lectura si la conocéis.",
        ],
      },
      {
        title: "Importante con las compañías",
        paragraphs: [
          "Este PDF es una comunicación entre particulares. Cada comercializadora puede exigir su propio formulario, DNI o trámites adicionales.",
        ],
      },
      {
        title: "Descarga el PDF gratis",
        paragraphs: [
          "Completa el formulario y descarga la comunicación lista para imprimir. Úsala como soporte junto al trámite ante la compañía.",
        ],
      },
    ],
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
      {
        question: "¿Cuándo conviene usarlo?",
        answer:
          "Al inicio o al fin del alquiler, cuando el titular del suministro debe pasar del propietario al inquilino o viceversa.",
      },
      {
        question: "¿Sustituye al contrato de alquiler?",
        answer:
          "No. Es un documento complementario. El arrendamiento se documenta con el contrato de alquiler correspondiente.",
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
