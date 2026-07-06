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
];

export function getArticleBySlug(slug: string): SeoArticle | undefined {
  return seoArticles.find((article) => article.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return seoArticles.map((article) => article.slug);
}
