export type ArticleSection = {
  title: string;
  paragraphs: string[];
};

export type SeoArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  relatedGuideSlugs: string[];
  relatedArticleSlugs: string[];
  relatedContractSlugs: string[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
};

export const seoArticles: SeoArticle[] = [
  {
    slug: "plazos-alquiler-vivienda",
    title: "Plazos y prórrogas del contrato de alquiler de vivienda en España",
    metaDescription:
      "Cuánto dura un contrato de alquiler de vivienda habitual, prórrogas obligatorias de la LAU y qué puede pactar arrendador e inquilino.",
    intro:
      "La duración del arrendamiento de vivienda habitual es uno de los puntos que más dudas genera entre propietarios e inquilinos. La Ley de Arrendamientos Urbanos (LAU) establece mínimos y prórrogas que conviene conocer antes de firmar.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "rescision", "cambio-suministros"],
    relatedArticleSlugs: ["fianza-deposito-alquiler"],
    relatedContractSlugs: ["vivienda", "rescision"],
    sections: [
      {
        title: "Duración mínima y prórroga obligatoria",
        paragraphs: [
          "Si el arrendador es persona física y la duración pactada es inferior a cinco años, el contrato se prorroga por plazos anuales hasta completar cinco años, salvo que el inquilino notifique su voluntad de no renovar con al menos treinta días de antelación.",
          "Si el arrendador es persona jurídica, el mínimo de prórroga obligatoria es de siete años en los términos previstos por la normativa vigente.",
        ],
      },
      {
        title: "Desistimiento del inquilino",
        paragraphs: [
          "Una vez transcurrido el primer año de vigencia del contrato o de cualquiera de sus prórrogas, el arrendatario puede desistir previo aviso con treinta días de antelación, salvo que las partes hayan pactado un plazo distinto en el contrato.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo firmar un contrato de un año?",
        answer:
          "Sí, pero si se trata de vivienda habitual y el arrendador es persona física, la ley prevé prórrogas obligatorias hasta alcanzar el mínimo legal salvo renuncia válida del inquilino en los supuestos permitidos.",
      },
    ],
  },
  {
    slug: "tipos-de-arras",
    title: "Diferencia entre arras penitenciales, confirmatorias y penales",
    metaDescription:
      "Qué son las arras en la compraventa de un inmueble, tipos existentes y consecuencias de desistir antes de la escritura pública.",
    intro:
      "Las arras son un anticipo entregado en señal al reservar o comprometer la compraventa de un inmueble. No todas las arras funcionan igual: el tipo pactado determina si las partes pueden desistir y qué consecuencias económicas tiene.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["arras", "compraventa-vivienda"],
    relatedArticleSlugs: ["checklist-compraventa-vivienda"],
    relatedContractSlugs: ["arras", "compraventa-vivienda"],
    sections: [
      {
        title: "Arras penitenciales",
        paragraphs: [
          "Permiten a cualquiera de las partes desistir del contrato: quien entregó las arras las pierde; quien las recibió debe devolver el doble. Es el tipo más habitual en el mercado residencial entre particulares.",
        ],
      },
      {
        title: "Arras confirmatorias y penales",
        paragraphs: [
          "Las confirmatorias refuerzan el compromiso sin conceder una facultad general de desistimiento. Las penales fijan una indemnización determinada por incumplimiento. Conviene identificarlas expresamente en el documento para evitar litigios.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Las arras sustituyen a la escritura pública?",
        answer:
          "No. Las arras son un paso previo que vincula a las partes, pero la transmisión plena de la propiedad requiere escritura pública ante notario e inscripción registral.",
      },
    ],
  },
  {
    slug: "fianza-deposito-alquiler",
    title: "Fianza y depósito en el alquiler de vivienda: diferencias",
    metaDescription:
      "Cuánto puede exigir el propietario de fianza, qué es el depósito en la comunidad autónoma y cómo recuperarlo al finalizar el alquiler.",
    intro:
      "Fianza y depósito son conceptos distintos en el arrendamiento de vivienda habitual. Confundirlos es uno de los errores más frecuentes al redactar o firmar un contrato de alquiler.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "habitacion", "rescision"],
    relatedArticleSlugs: ["plazos-alquiler-vivienda"],
    relatedContractSlugs: ["vivienda"],
    sections: [
      {
        title: "La fianza legal",
        paragraphs: [
          "En vivienda habitual, la fianza máxima legal es de un mes de renta. Se entrega al arrendador y se devuelve al finalizar el contrato, descontando únicamente cantidades adeudadas o daños imputables al inquilino conforme a la ley y al contrato.",
        ],
      },
      {
        title: "El depósito autonómico",
        paragraphs: [
          "Además de la fianza, muchas comunidades autónomas exigen consignar un depósito ante la administración competente (a menudo equivalente a un mes de renta). Su finalidad y devolución se rigen por la normativa autonómica correspondiente.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede el propietario pedir dos meses de fianza?",
        answer:
          "La fianza legal en vivienda habitual es de un mes. Puede pactarse garantía adicional de hasta dos mensualidades más en los supuestos legalmente previstos, pero no debe confundirse con el depósito administrativo.",
      },
    ],
  },
  {
    slug: "checklist-compraventa-vivienda",
    title: "Checklist antes de firmar la compraventa de una vivienda",
    metaDescription:
      "Lista de comprobaciones imprescindibles antes de firmar un contrato de compraventa de vivienda entre particulares en España.",
    intro:
      "Comprar una vivienda entre particulares implica verificar cargas, deudas y documentación antes de entregar arras o firmar un contrato privado. Esta checklist recoge los puntos más habituales.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["compraventa-vivienda", "arras", "garaje-trastero"],
    relatedArticleSlugs: ["tipos-de-arras"],
    relatedContractSlugs: ["compraventa-vivienda", "arras"],
    sections: [
      {
        title: "Documentación a revisar",
        paragraphs: [
          "Nota simple o certificado registral actualizado, referencia catastral, certificado de eficiencia energética, estado de pagos de comunidad e IBI, y comprobación de cargas o hipotecas pendientes.",
        ],
      },
      {
        title: "Cláusulas a concretar en el contrato",
        paragraphs: [
          "Precio total, calendario de pagos, fecha de entrega de llaves, distribución de gastos (notaría, registro, impuestos), y condición de que el inmueble se transmita libre de cargas y al corriente de pago.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es imprescindible la nota simple?",
        answer:
          "No es obligatoria por ley en todos los supuestos, pero es muy recomendable para verificar titularidad, cargas y limitaciones del inmueble antes de comprometerse económicamente.",
      },
    ],
  },
  {
    slug: "cambio-suministros-alquiler",
    title: "Cómo gestionar el cambio de suministros al alquilar un piso",
    metaDescription:
      "Pasos para cambiar luz, agua y gas al inicio o fin de un contrato de alquiler. Documento de conformidad y buenas prácticas.",
    intro:
      "Al entregar o recibir un piso en alquiler conviene dejar claro quién asume cada suministro desde una fecha concreta. Un mal traspaso puede generar facturas impagadas a nombre del propietario.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["cambio-suministros", "vivienda", "rescision"],
    relatedArticleSlugs: ["fianza-deposito-alquiler"],
    relatedContractSlugs: ["cambio-suministros", "vivienda"],
    sections: [
      {
        title: "Al inicio del alquiler",
        paragraphs: [
          "Conviene realizar lecturas de contador, comunicar el cambio de titularidad a cada comercializadora y dejar constancia escrita de la fecha de traspaso en el contrato o en un documento anexo firmado por ambas partes.",
        ],
      },
      {
        title: "Al finalizar el alquiler",
        paragraphs: [
          "El inquilino debe cancelar o cambiar los contratos de suministro a su nombre, o devolverlos al arrendador según lo pactado. Las lecturas finales son la referencia para liquidar consumos pendientes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Quién paga la luz durante el alquiler?",
        answer:
          "Salvo pacto en contrario, los suministros de uso individual (luz, agua, gas) suelen ser por cuenta del arrendatario. Debe constar expresamente en el contrato para evitar conflictos.",
      },
    ],
  },
  {
    slug: "contrato-alquiler-particulares",
    title: "Contrato de alquiler entre particulares: guía práctica",
    metaDescription:
      "Cómo redactar un contrato de alquiler entre particulares en España: datos obligatorios, fianza, duración y modelo gratuito descargable.",
    intro:
      "Alquilar una vivienda entre particulares es habitual en España. Aunque no siempre es obligatorio acudir a un profesional, sí es imprescindible dejar por escrito las condiciones del arrendamiento para evitar conflictos futuros.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "habitacion", "temporada"],
    relatedArticleSlugs: ["fianza-deposito-alquiler", "plazos-alquiler-vivienda"],
    relatedContractSlugs: ["vivienda"],
    sections: [
      {
        title: "Documentación previa recomendable",
        paragraphs: [
          "Antes de firmar conviene intercambiar copia del DNI o NIE, verificar la titularidad del inmueble y acordar el estado del piso (inventario si está amueblado).",
          "El contrato debe recoger identificación de las partes, descripción del inmueble, renta, duración, fianza y reparto de gastos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es obligatorio un contrato escrito?",
        answer:
          "La ley permite el arrendamiento verbal en algunos supuestos, pero es muy recomendable formalizarlo por escrito para acreditar las condiciones pactadas ante terceros o en caso de disputa.",
      },
    ],
  },
  {
    slug: "impago-alquiler-que-hacer",
    title: "Impago del alquiler: qué puede hacer el propietario",
    metaDescription:
      "Opciones legales ante el impago de la renta: requerimiento, reclamación y vías de resolución del contrato de arrendamiento en España.",
    intro:
      "El impago de la renta es una de las situaciones más delicadas en un arrendamiento. Conviene actuar con orden, documentar los pagos pendientes y conocer las vías legales disponibles.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "rescision"],
    relatedArticleSlugs: ["plazos-alquiler-vivienda", "fianza-deposito-alquiler"],
    relatedContractSlugs: ["vivienda", "rescision"],
    sections: [
      {
        title: "Primeros pasos recomendables",
        paragraphs: [
          "Conserva el contrato, los justificantes de pago y cualquier comunicación con el inquilino. Un requerimiento fehaciente de pago puede ser el primer paso antes de acciones judiciales.",
          "La fianza no sustituye el procedimiento de desahucio, pero puede compensar parte de la deuda al finalizar el contrato en los términos legalmente previstos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo cambiar la cerradura si no paga?",
        answer:
          "No de forma unilateral en la mayoría de supuestos. El arrendador debe seguir las vías legales de reclamación y, en su caso, desahucio. Actuar por cuenta propia puede generar responsabilidad.",
      },
    ],
  },
  {
    slug: "itp-compraventa-vivienda",
    title: "ITP en la compraventa de vivienda entre particulares",
    metaDescription:
      "Qué es el Impuesto sobre Transmisiones Patrimoniales (ITP) al comprar una vivienda de segunda mano entre particulares en España.",
    intro:
      "En la compraventa de vivienda usada entre particulares, el impuesto principal suele ser el ITP, gestionado por la comunidad autónoma. Conviene calcularlo antes de firmar arras o contrato.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["compraventa-vivienda", "arras"],
    relatedArticleSlugs: ["checklist-compraventa-vivienda", "tipos-de-arras"],
    relatedContractSlugs: ["compraventa-vivienda", "arras"],
    sections: [
      {
        title: "Quién paga y cuándo",
        paragraphs: [
          "Salvo pacto en contrario, el comprador es el sujeto pasivo del ITP. Debe liquidarse en el plazo que marque la normativa autónoma tras la escritura pública o, en algunos casos, del contrato privado.",
          "El tipo impositivo varía según la comunidad autónoma y pueden existir bonificaciones para jóvenes, familias numerosas u otros supuestos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se paga IVA en vez de ITP?",
        answer:
          "En vivienda de segunda mano entre particulares suele aplicarse ITP. El IVA corresponde generalmente a vivienda nueva vendida por empresario o profesional.",
      },
    ],
  },
  {
    slug: "alquiler-temporada-vs-habitual",
    title: "Alquiler de temporada vs vivienda habitual: diferencias clave",
    metaDescription:
      "Cuándo usar un contrato de temporada y cuándo uno de vivienda habitual. Régimen legal, duración y consecuencias prácticas.",
    intro:
      "No es lo mismo alquilar una vivienda para residencia permanente que para una estancia temporal. Elegir mal el tipo de contrato puede alterar plazos, prórrogas y protección del inquilino.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "temporada", "habitacion"],
    relatedArticleSlugs: ["contrato-alquiler-particulares", "plazos-alquiler-vivienda"],
    relatedContractSlugs: ["vivienda", "temporada"],
    sections: [
      {
        title: "Vivienda habitual",
        paragraphs: [
          "Se aplica cuando el inmueble se destina a residencia permanente del inquilino. La LAU prevé prórrogas obligatorias y un régimen de fianza específico.",
        ],
      },
      {
        title: "Temporada o uso distinto",
        paragraphs: [
          "Procede cuando existe causa temporal acreditada y el uso no es el de vivienda habitual. La duración y las condiciones de prórroga dependen más del pacto entre partes.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo poner temporada para esquivar la LAU?",
        answer:
          "No. Si el uso real es de vivienda habitual, los tribunales pueden calificar el contrato como arrendamiento de vivienda aunque se etiquete como temporada.",
      },
    ],
  },
  {
    slug: "inventario-mobiliario-alquiler",
    title: "Inventario de mobiliario en el contrato de alquiler",
    metaDescription:
      "Por qué conviene un inventario en pisos amueblados, qué debe incluir y cómo vincularlo al contrato de arrendamiento.",
    intro:
      "En alquileres amueblados o con electrodomésticos incluidos, el inventario evita discusiones sobre el estado y la propiedad de cada elemento al inicio y al final del contrato.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "habitacion", "temporada"],
    relatedArticleSlugs: ["contrato-alquiler-particulares"],
    relatedContractSlugs: ["vivienda", "habitacion"],
    sections: [
      {
        title: "Qué debe describir el inventario",
        paragraphs: [
          "Lista detallada de muebles y electrodomésticos, estado de conservación, número de llaves entregadas y fotografías fechadas como anexo firmado por ambas partes.",
          "Conviene indicar quién asume reparaciones menores y el procedimiento para comunicar averías.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es obligatorio el inventario?",
        answer:
          "No siempre es legalmente obligatorio, pero es muy recomendable en pisos amueblados y habitaciones para demostrar el estado del inmueble al inicio del arrendamiento.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): SeoArticle | undefined {
  return seoArticles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return seoArticles.map((article) => article.slug);
}
