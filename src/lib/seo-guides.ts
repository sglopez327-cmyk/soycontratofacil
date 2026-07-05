import { findCatalogContract } from "@/lib/contract-catalog";
import { getContractHref } from "@/lib/contracts";

export type GuideSection = {
  title: string;
  paragraphs: string[];
};

export type SeoGuide = {
  slug: string;
  contractSlug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "vivienda",
    contractSlug: "vivienda",
    title: "Cómo hacer un contrato de alquiler de vivienda en España",
    metaDescription:
      "Guía práctica para redactar un contrato de arrendamiento de vivienda habitual: cláusulas esenciales, plazos, fianza y descarga gratuita del documento.",
    intro:
      "El contrato de alquiler de vivienda habitual es el documento que regula la relación entre arrendador e inquilino cuando el inmueble se destina a residencia permanente. En España, la Ley de Arrendamientos Urbanos (LAU) establece derechos y obligaciones mínimas que conviene reflejar por escrito.",
    sections: [
      {
        title: "Datos imprescindibles del contrato",
        paragraphs: [
          "Identificación completa de arrendador e inquilino, descripción del inmueble (dirección, referencia catastral si procede), duración del arrendamiento, renta mensual, periodicidad de pago y forma de pago (habitualmente transferencia bancaria con IBAN).",
          "También deben constar la fianza legal (un mes de renta en vivienda habitual), el depósito en la comunidad autónoma si aplica, y las condiciones de suministros, comunidad y posibles actualizaciones de renta.",
        ],
      },
      {
        title: "Plazos y prórrogas",
        paragraphs: [
          "En vivienda habitual, si la duración pactada es inferior a cinco años (o siete si el arrendador es persona jurídica), el contrato se prorroga obligatoriamente hasta alcanzar ese mínimo legal, salvo que las partes acuerden lo contrario en los términos previstos por la ley.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuánto puede pedir el propietario de fianza?",
        answer:
          "En arrendamiento de vivienda habitual, la fianza legal máxima es de un mes de renta. Además, puede exigirse hasta dos mensualidades adicionales como garantía complementaria en determinados supuestos.",
      },
      {
        question: "¿Es obligatorio registrar el contrato?",
        answer:
          "No es obligatorio inscribir el contrato en el Registro de la Propiedad, aunque el arrendatario puede solicitar la inscripción si el arrendador se niega a facilitar documentación. Sí es recomendable conservar copia firmada por ambas partes.",
      },
    ],
  },
  {
    slug: "temporada",
    contractSlug: "temporada",
    title: "Contrato de alquiler de temporada: qué debe incluir",
    metaDescription:
      "Aprende a redactar un contrato de arrendamiento de temporada o uso distinto del de vivienda. Requisitos, duración y modelo descargable.",
    intro:
      "El arrendamiento de temporada se aplica cuando el inmueble no se destina a vivienda habitual del inquilino, sino a estancias temporales por motivos laborales, formativos, vacacionales u otros usos distintos del residencial permanente.",
    sections: [
      {
        title: "Cuándo usar un contrato de temporada",
        paragraphs: [
          "Conviene este tipo de contrato cuando existe una causa temporal clara y el arrendatario declara que el inmueble no constituirá su domicilio habitual. La duración suele ser inferior a doce meses o vinculada a un evento concreto.",
        ],
      },
      {
        title: "Cláusulas recomendadas",
        paragraphs: [
          "Motivo de la temporalidad, fecha de inicio y fin, renta, fianza pactada, inventario del mobiliario si es amueblado, y reparto de gastos de suministros y comunidad.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se aplica la LAU de vivienda habitual?",
        answer:
          "No en los mismos términos. Si el uso no es de vivienda habitual, rigen otras previsiones de la LAU y el pacto entre partes adquiere mayor relevancia, siempre respetando la normativa imperativa.",
      },
    ],
  },
  {
    slug: "habitacion",
    contractSlug: "habitacion",
    title: "Contrato de alquiler de habitación: guía completa",
    metaDescription:
      "Todo lo que debes saber para firmar un contrato de alquiler de habitación en piso compartido: derechos, obligaciones y generador gratuito.",
    intro:
      "El alquiler de habitación en vivienda compartida es habitual en grandes ciudades. El contrato debe delimitar qué espacios son de uso exclusivo del inquilino y cuáles son compartidos con el arrendador u otros ocupantes.",
    sections: [
      {
        title: "Elementos clave del contrato",
        paragraphs: [
          "Descripción de la habitación arrendada, zonas comunes (cocina, baño, salón), normas de convivencia, importe de la renta, gastos incluidos o no, y duración del arrendamiento.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede el propietario vivir en el mismo piso?",
        answer:
          "Sí. Es un supuesto frecuente en alquiler de habitación. El contrato debe aclarar la convivencia y el régimen de uso de las zonas comunes.",
      },
    ],
  },
  {
    slug: "local",
    contractSlug: "local",
    title: "Contrato de arrendamiento de local comercial",
    metaDescription:
      "Guía para elaborar un contrato de alquiler de local o negocio: destino, renta, actualización, obras y descarga del documento en PDF.",
    intro:
      "El arrendamiento de locales de negocio se rige por la LAU con especificidades propias: es fundamental definir la actividad permitida, la duración, las actualizaciones de renta y las obligaciones de conservación y reforma.",
    sections: [
      {
        title: "Destino del local",
        paragraphs: [
          "Debe indicarse con precisión la actividad comercial o profesional autorizada. Cualquier cambio de actividad puede requerir consentimiento del arrendador y licencias municipales.",
        ],
      },
      {
        title: "Duración y desahucio",
        paragraphs: [
          "La duración mínima y las causas de resolución anticipada deben pactarse conforme a la LAU para locales. Conviene detallar preaviso, penalizaciones y estado del local en la devolución.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Quién paga las obras en un local comercial?",
        answer:
          "Depende de lo pactado. Las obras necesarias para mantener el local en condiciones de uso suelen corresponder al arrendador; las adaptaciones para la actividad del inquilino, a este último, salvo acuerdo distinto.",
      },
    ],
  },
  {
    slug: "finca-rustica",
    contractSlug: "finca-rustica",
    title: "Contrato de alquiler de finca rústica",
    metaDescription:
      "Cómo redactar un contrato de arrendamiento de finca rústica o terreno agrícola. Cláusulas esenciales y generador online gratuito.",
    intro:
      "El arrendamiento de fincas rústicas puede destinarse a explotación agrícola, ganadera, forestal u otros usos rurales. El contrato debe describir la finca, su superficie, aprovechamiento permitido y renta o canon.",
    sections: [
      {
        title: "Descripción de la finca",
        paragraphs: [
          "Incluye referencia catastral, polígono, parcela, superficie y linderos. Si existe aprovechamiento concreto (cultivo, pasto, caza, etc.), debe reflejarse expresamente.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se aplica la misma normativa que en vivienda?",
        answer:
          "No. Los arrendamientos rústicos tienen régimen específico. Es importante verificar la normativa autonómica y estatal aplicable al aprovechamiento pactado.",
      },
    ],
  },
  {
    slug: "arrendamiento-garaje",
    contractSlug: "arrendamiento-garaje",
    title: "Contrato de alquiler de garaje o trastero",
    metaDescription:
      "Modelo y guía para un contrato de arrendamiento de plaza de garaje o trastero. Datos necesarios y descarga gratuita en PDF.",
    intro:
      "El alquiler de plazas de garaje o trasteros es frecuente de forma independiente o como anexo a una vivienda. El contrato debe identificar la plaza o unidad, su ubicación y el uso permitido del vehículo o almacenamiento.",
    sections: [
      {
        title: "Qué incluir en el contrato",
        paragraphs: [
          "Número o identificación de la plaza, dirección del garaje, renta mensual, acceso (mando, llave), gastos de comunidad de garajes si los hubiera, y prohibiciones de uso (por ejemplo, almacenar materiales inflamables en trasteros).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede alquilarse un garaje sin alquilar la vivienda?",
        answer:
          "Sí. Las plazas de garaje y trasteros pueden arrendarse de forma independiente si así está previsto en la comunidad y en la titulación del inmueble.",
      },
    ],
  },
  {
    slug: "compraventa-vivienda",
    contractSlug: "compraventa-vivienda",
    title: "Contrato de compraventa de vivienda entre particulares",
    metaDescription:
      "Guía para redactar un contrato de compraventa de vivienda: precio, arras, cargas, plazos de escritura y generador gratuito de documentos.",
    intro:
      "La compraventa de vivienda entre particulares requiere un documento que refleje el precio, la forma de pago, la descripción del inmueble, el estado de cargas y el compromiso de otorgar escritura pública ante notario.",
    sections: [
      {
        title: "Datos esenciales",
        paragraphs: [
          "Identificación de comprador y vendedor, descripción registral y catastral de la vivienda, precio total, calendario de pagos, fecha prevista de firma ante notario, y quién asume gastos e impuestos (ITP, notaría, registro).",
        ],
      },
      {
        title: "Cargas y certificados",
        paragraphs: [
          "El vendedor debe garantizar que el inmueble está al corriente de comunidad e IBI, y que no existen cargas ocultas no declaradas. Es habitual exigir nota simple registral actualizada antes de firmar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Basta un contrato privado para comprar una vivienda?",
        answer:
          "El contrato privado vincula a las partes, pero la transmisión plena de la propiedad requiere escritura pública e inscripción en el Registro de la Propiedad. El contrato privado suele ser el paso previo a la escritura.",
      },
    ],
  },
  {
    slug: "arras",
    contractSlug: "arras",
    title: "Contrato de arras penitenciales: qué son y cómo redactarlas",
    metaDescription:
      "Explicación del contrato de arras en compraventa de inmuebles: arras penitenciales, confirmatorias y penales. Genera tu documento gratis.",
    intro:
      "Las arras son un anticipo entregado en señal del compromiso de comprar o vender un inmueble. Las arras penitenciales permiten desistir del contrato perdiendo o devolviendo el doble, según quién desista.",
    sections: [
      {
        title: "Tipos de arras",
        paragraphs: [
          "Arras penitenciales: cualquiera puede desistir perdiendo o devolviendo el doble. Arras confirmatorias: refuerzan el compromiso sin facultad unilateral de desistimiento. Arras penales: fijan indemnización por incumplimiento.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuánto se suele entregar de arras?",
        answer:
          "No hay cantidad legal fija. Lo habitual en el mercado inmobiliario español es entre el 5 % y el 10 % del precio de compraventa, aunque las partes pueden pactar otra cifra.",
      },
    ],
  },
  {
    slug: "garaje-trastero",
    contractSlug: "garaje-trastero",
    title: "Contrato de compraventa de garaje o trastero",
    metaDescription:
      "Guía para la compraventa de plaza de garaje o trastero entre particulares. Cláusulas clave y descarga del contrato en PDF.",
    intro:
      "La compraventa de garajes y trasteros puede realizarse junto con una vivienda o de forma independiente. El contrato debe identificar la unidad registral, el precio y si se transmite con o sin inquilino.",
    sections: [
      {
        title: "Aspectos a tener en cuenta",
        paragraphs: [
          "Referencia registral de la plaza, vinculación con la vivienda si existe, estado de pagos de la comunidad de propietarios del garaje, y fecha de otorgamiento de escritura pública.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se paga ITP en la compraventa de un garaje?",
        answer:
          "Sí. La compraventa de garajes entre particulares tributa en el Impuesto sobre Transmisiones Patrimoniales (ITP) de la comunidad autónoma correspondiente.",
      },
    ],
  },
  {
    slug: "rescision",
    contractSlug: "rescision",
    title: "Rescisión anticipada de contrato de alquiler",
    metaDescription:
      "Cómo documentar la rescisión o finalización anticipada de un contrato de arrendamiento. Modelo gratuito y cláusulas recomendadas.",
    intro:
      "La rescisión anticipada permite dejar constancia por escrito de que arrendador e inquilino acuerdan finalizar el contrato antes del vencimiento natural, fijando fecha de entrega de llaves, estado del inmueble y liquidación de fianza.",
    sections: [
      {
        title: "Contenido del documento",
        paragraphs: [
          "Referencia al contrato original, fecha de efectos de la rescisión, renuncia a reclamaciones futuras si procede, devolución de fianza y lecturas finales de suministros.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede el inquilino rescindir unilateralmente?",
        answer:
          "En vivienda habitual, tras el primer año de vigencia del contrato o de una prórroga, el inquilino puede desistir previo aviso con la antelación pactada (mínimo treinta días). Este documento formaliza el acuerdo entre las partes.",
      },
    ],
  },
  {
    slug: "cambio-suministros",
    contractSlug: "cambio-suministros",
    title: "Cambio de titularidad de suministros en alquiler",
    metaDescription:
      "Guía y modelo para comunicar el cambio de titularidad de luz, agua y gas al inquilino o arrendador. Documento gratuito descargable.",
    intro:
      "Al inicio o fin de un arrendamiento conviene comunicar a las compañías de suministros el cambio de titularidad. Este documento recoge la conformidad de las partes y los datos necesarios para la gestión.",
    sections: [
      {
        title: "Para qué sirve este documento",
        paragraphs: [
          "Acredita ante terceros que arrendador e inquilino acuerdan quién asume cada suministro desde una fecha determinada. Facilita los trámites con las comercializadoras sin sustituir los contratos propios de cada compañía.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es obligatorio cambiar los suministros al nombre del inquilino?",
        answer:
          "No siempre es obligatorio, pero es muy recomendable para evitar que el propietario siga siendo responsable de facturas impagadas. Cada compañía tiene su propio procedimiento de cambio de titular.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): SeoGuide | undefined {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return seoGuides.map((guide) => guide.slug);
}

export function getGuideContractHref(slug: string): string | undefined {
  const guide = getGuideBySlug(slug);
  if (!guide) return undefined;
  return getContractHref(guide.contractSlug);
}

export function getGuideCategoryTitle(slug: string): string | undefined {
  const guide = getGuideBySlug(slug);
  if (!guide) return undefined;
  return findCatalogContract(guide.contractSlug)?.category.title;
}
