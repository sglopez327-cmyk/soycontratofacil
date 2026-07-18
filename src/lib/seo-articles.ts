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
    relatedArticleSlugs: [
      "checklist-compraventa-vivienda",
      "modelo-arras-penitenciales-pdf",
    ],
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
    relatedArticleSlugs: [
      "tipos-de-arras",
      "contrato-compraventa-vivienda-particulares-pdf",
      "modelo-arras-penitenciales-pdf",
    ],
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
    relatedArticleSlugs: [
      "contrato-alquiler-particulares",
      "plazos-alquiler-vivienda",
      "contrato-alquiler-temporada-pdf",
    ],
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
  {
    slug: "actualizacion-renta-alquiler",
    title: "Actualización de la renta en contratos de alquiler",
    metaDescription:
      "Cómo se actualiza la renta del alquiler de vivienda habitual en España: índice, límites, revisión anual y qué debe decir el contrato.",
    intro:
      "La revisión del precio del alquiler es una de las cláusulas que más litigios generan. En vivienda habitual la ley limita cómo y cuándo puede incrementarse la renta durante la vigencia del contrato.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["vivienda", "local"],
    relatedArticleSlugs: ["plazos-alquiler-vivienda", "contrato-alquiler-particulares"],
    relatedContractSlugs: ["vivienda"],
    sections: [
      {
        title: "Marco legal básico",
        paragraphs: [
          "En arrendamientos de vivienda habitual, la actualización suele vincularse a los índices y límites previstos por la normativa vigente en cada momento. El contrato debe indicar si las partes pactan revisión y con qué periodicidad.",
          "Conviene evitar cláusulas ambiguas del tipo «según IPC» sin concretar procedimiento, fecha de revisión y límites aplicables.",
        ],
      },
      {
        title: "Buenas prácticas al redactar",
        paragraphs: [
          "Incluye la renta inicial, la fecha de la primera revisión posible, el índice de referencia y cómo se comunicará el nuevo importe al inquilino. Guarda justificante de la notificación.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede el propietario subir la renta cada año libremente?",
        answer:
          "No en vivienda habitual. La actualización está sujeta a los límites y condiciones de la LAU y normativa complementaria. Lo pactado no puede contradecir la ley.",
      },
    ],
  },
  {
    slug: "gastos-compraventa-vivienda",
    title: "Gastos de una compraventa de vivienda: quién paga qué",
    metaDescription:
      "Desglose de gastos al comprar o vender una vivienda entre particulares: notaría, registro, ITP, gestoría y cómo reflejarlos en el contrato.",
    intro:
      "Antes de firmar arras o contrato privado conviene saber qué costes genera la operación y quién los asume. Una parte importante de conflictos surge porque no se pactó por escrito la distribución de gastos.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["compraventa-vivienda", "arras"],
    relatedArticleSlugs: ["itp-compraventa-vivienda", "checklist-compraventa-vivienda"],
    relatedContractSlugs: ["compraventa-vivienda", "arras"],
    sections: [
      {
        title: "Gastos habituales del comprador",
        paragraphs: [
          "Suele corresponder al comprador el ITP (en vivienda de segunda mano), gastos de notaría y registro de la parte proporcional que le corresponda, y honorarios de gestoría si se utilizan.",
        ],
      },
      {
        title: "Gastos habituales del vendedor",
        paragraphs: [
          "El vendedor suele asumir la plusvalía municipal si aplica, certificados que deba aportar, cancelación de hipoteca previa si existiera, y su parte de notaría y registro según pacto o costumbre local.",
          "Todo ello puede negociarse, pero debe constar expresamente en el contrato privado o en la escritura.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Pueden repartir los gastos al 50 %?",
        answer:
          "Sí, si ambas partes lo pactan libremente. Lo importante es que quede claro por escrito antes de comprometerse económicamente.",
      },
    ],
  },
  {
    slug: "nota-simple-antes-de-comprar",
    title: "Nota simple del Registro de la Propiedad: para qué sirve",
    metaDescription:
      "Qué es la nota simple registral, por qué pedirla antes de comprar una vivienda y qué datos comprueba el comprador antes de firmar.",
    intro:
      "La nota simple es uno de los documentos más útiles antes de comprar un inmueble. Permite verificar quién es el titular registral, si existen hipotecas, embargos u otras cargas que afecten a la operación.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["compraventa-vivienda", "arras"],
    relatedArticleSlugs: ["checklist-compraventa-vivienda", "gastos-compraventa-vivienda"],
    relatedContractSlugs: ["compraventa-vivienda"],
    sections: [
      {
        title: "Qué información aporta",
        paragraphs: [
          "Identifica al propietario registral, describe el inmueble, recoge cargas vigentes (hipotecas, servidumbres, anotaciones) y ayuda a detectar discrepancias entre la realidad registral y lo que declara el vendedor.",
        ],
      },
      {
        title: "Cuándo solicitarla",
        paragraphs: [
          "Lo ideal es pedirla antes de entregar arras o al menos antes de firmar un contrato privado con entrega de cantidades significativas. Conviene que sea reciente.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿La nota simple sustituye al contrato de compraventa?",
        answer:
          "No. Es un documento informativo previo. El contrato y la escritura son los que formalizan la transmisión entre las partes.",
      },
    ],
  },
  {
    slug: "cuando-usar-contrato-rescision",
    title: "Cuándo usar un documento de rescisión de alquiler",
    metaDescription:
      "En qué casos conviene firmar una rescisión anticipada del contrato de arrendamiento y qué ventajas tiene frente a una baja verbal.",
    intro:
      "Terminar un alquiler antes de tiempo puede hacerse por mutuo acuerdo, desistimiento legal del inquilino u otras causas. Un documento de rescisión deja constancia escrita de las condiciones de la salida y evita malentendidos sobre fianza y suministros.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["rescision", "vivienda", "cambio-suministros"],
    relatedArticleSlugs: ["impago-alquiler-que-hacer", "cambio-suministros-alquiler"],
    relatedContractSlugs: ["rescision", "cambio-suministros"],
    sections: [
      {
        title: "Supuestos frecuentes",
        paragraphs: [
          "Acuerdo amistoso de finalización, salida anticipada del inquilino tras el plazo legal de desistimiento, o cierre negociado tras impago parcial con renuncia a futuras reclamaciones si se pacta válidamente.",
        ],
      },
      {
        title: "Qué debe resolver el documento",
        paragraphs: [
          "Fecha de entrega de llaves, estado del inmueble, devolución de fianza, liquidación de rentas pendientes, traspaso de suministros y entrega de documentación (llaves, mandos, certificados).",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Basta con devolver las llaves?",
        answer:
          "No es recomendable. Sin documento firmado pueden quedar dudas sobre la fecha efectiva de salida, la fianza y los consumos pendientes.",
      },
    ],
  },
  {
    slug: "comprar-piso-entre-particulares",
    title: "Comprar un piso entre particulares: pasos esenciales",
    metaDescription:
      "Guía paso a paso para comprar una vivienda de segunda mano entre particulares en España: arras, contrato, notaría y registro.",
    intro:
      "Comprar a un particular sin promotora ni agencia puede ahorrar comisiones, pero exige más diligencia del comprador. Conviene seguir un orden lógico para no adelantar dinero sin garantías.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["compraventa-vivienda", "arras"],
    relatedArticleSlugs: ["nota-simple-antes-de-comprar", "tipos-de-arras", "gastos-compraventa-vivienda"],
    relatedContractSlugs: ["compraventa-vivienda", "arras"],
    sections: [
      {
        title: "Orden recomendable",
        paragraphs: [
          "1) Verificar titularidad y cargas. 2) Visitar y comprobar estado. 3) Negociar precio y calendario. 4) Firmar arras o contrato privado. 5) Preparar financiación e impuestos. 6) Otorgar escritura ante notario. 7) Inscribir en el Registro.",
        ],
      },
      {
        title: "Documentos útiles en cada fase",
        paragraphs: [
          "Nota simple, certificado energético, recibos de comunidad e IBI, contrato de arras si procede, contrato privado de compraventa y finalmente escritura pública.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es obligatorio pasar por notario?",
        answer:
          "Para transmitir plenamente la propiedad de una vivienda, sí: la escritura pública ante notario es el instrumento habitual y necesario para inscribir la titularidad a favor del comprador.",
      },
    ],
  },
  {
    slug: "alquiler-habitacion-piso-compartido",
    title: "Alquiler de habitación en piso compartido: aspectos legales",
    metaDescription:
      "Qué debe incluir el contrato de alquiler de habitación, convivencia, gastos compartidos y diferencias con el alquiler de vivienda completa.",
    intro:
      "Compartir piso es económicamente atractivo, pero jurídicamente distinto del alquiler de una vivienda entera. El contrato debe definir con precisión qué se arrienda y cómo se comparten gastos y espacios comunes.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["habitacion", "vivienda"],
    relatedArticleSlugs: ["inventario-mobiliario-alquiler", "contrato-alquiler-particulares"],
    relatedContractSlugs: ["habitacion"],
    sections: [
      {
        title: "Diferencias con el alquiler de vivienda completa",
        paragraphs: [
          "En habitación suele arrendarse un espacio privativo dentro de una vivienda con zonas comunes. El régimen de fianza, duración y desistimiento puede variar respecto a la vivienda habitual íntegra.",
        ],
      },
      {
        title: "Cláusulas de convivencia",
        paragraphs: [
          "Horarios, visitas, limpieza, uso de cocina y baño, mascotas, prohibición de subarriendo no consentido y reparto de suministros. Cuanto más claro, menos conflictos.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puede el casero entrar en la habitación cuando quiera?",
        answer:
          "No. Aunque el propietario conserve parte de la vivienda, el arrendatario de habitación tiene derecho al uso pacífico de su espacio. El contrato puede regular accesos por mantenimiento con preaviso razonable.",
      },
    ],
  },
  {
    slug: "contrato-arras-penitenciales-guia",
    title: "Contrato de arras penitenciales: guía y ejemplo práctico",
    metaDescription:
      "Cómo redactar un contrato de arras penitenciales al comprar una vivienda: importe, plazos, consecuencias de desistir y modelo gratuito.",
    intro:
      "Las arras penitenciales son el mecanismo más usado para reservar una vivienda en España. Permiten a comprador y vendedor desistir asumiendo una penalización económica conocida de antemano.",
    publishedAt: "2026-07-06",
    updatedAt: "2026-07-06",
    relatedGuideSlugs: ["arras", "compraventa-vivienda"],
    relatedArticleSlugs: [
      "tipos-de-arras",
      "comprar-piso-entre-particulares",
      "modelo-arras-penitenciales-pdf",
    ],
    relatedContractSlugs: ["arras"],
    sections: [
      {
        title: "Elementos imprescindibles",
        paragraphs: [
          "Identificación de las partes y del inmueble, precio total de compraventa, cantidad entregada en arras, fecha límite para escritura, distribución de gastos y mención expresa de que las arras son penitenciales.",
        ],
      },
      {
        title: "Consecuencias de desistir",
        paragraphs: [
          "Si desiste el comprador, pierde las arras. Si desiste el vendedor, debe devolver el doble. Esta claridad reduce incertidumbre, pero exige identificar correctamente el tipo de arras en el documento.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Las arras se descuentan del precio final?",
        answer:
          "Sí. Las arras penitenciales se imputan al precio total de compraventa si la operación se completa con normalidad.",
      },
    ],
  },
  {
    slug: "plantilla-contrato-alquiler-pdf",
    title: "Plantilla de contrato de alquiler gratis: PDF listo para firmar (2026)",
    metaDescription:
      "Descarga tu plantilla de contrato de alquiler de vivienda en PDF gratis. Modelo legal actualizado, sin registro y listo para firmar en minutos.",
    intro:
      "Si buscas una plantilla de contrato de alquiler lista para usar, lo decisivo es que el documento se adapte a un alquiler urbano de vivienda y a la normativa española. Con el generador rellenas los datos esenciales y descargas un PDF listo para imprimir y firmar, sin registro.",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedGuideSlugs: ["vivienda"],
    relatedArticleSlugs: [
      "contrato-alquiler-particulares",
      "fianza-deposito-alquiler",
      "plazos-alquiler-vivienda",
    ],
    relatedContractSlugs: ["vivienda"],
    sections: [
      {
        title: "Qué debe incluir una plantilla de contrato de alquiler",
        paragraphs: [
          "Identificación de arrendador e inquilino, descripción de la vivienda, renta, fianza, duración, gastos, suministros y condiciones de prórroga o desistimiento según la LAU.",
          "Una plantilla genérica o de otro país suele omitir cláusulas clave. Mejor partir de un modelo pensado para vivienda urbana en España y revisarlo antes de firmar.",
        ],
      },
      {
        title: "Plantilla estática vs generador online",
        paragraphs: [
          "Una plantilla Word o PDF fija te obliga a borrar y reescribir a mano. El generador solo pide los datos de tu caso y elabora el contrato con la estructura adecuada, listo para descargar.",
        ],
      },
      {
        title: "Cómo obtener tu PDF listo para firmar",
        paragraphs: [
          "Entra en el generador de contrato de alquiler de vivienda, completa el formulario paso a paso, revisa el resumen y descarga el PDF gratis. Ambas partes deben leerlo y firmarlo.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo descargar la plantilla de contrato de alquiler en PDF gratis?",
        answer:
          "Sí. En SoyContratoFacil.es generas el documento y descargas el PDF sin registro ni coste.",
      },
      {
        question: "¿Sirve esta plantilla para vivienda habitual?",
        answer:
          "Sí. Está orientada al alquiler urbano de vivienda. Si el uso es temporal o de local, usa el generador específico de temporada o de local comercial.",
      },
    ],
  },
  {
    slug: "contrato-compraventa-vivienda-particulares-pdf",
    title:
      "Contrato privado de compraventa de vivienda entre particulares (PDF gratis)",
    metaDescription:
      "Genera y descarga tu contrato privado de compraventa de vivienda entre particulares en PDF gratis. Listo para revisar, imprimir y firmar.",
    intro:
      "Cuando compras o vendes una vivienda entre particulares, un contrato privado deja por escrito precio, inmueble y condiciones. Puedes generar el PDF gratis en minutos y usarlo como base clara antes de la escritura notarial.",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedGuideSlugs: ["compraventa-vivienda", "arras"],
    relatedArticleSlugs: [
      "checklist-compraventa-vivienda",
      "modelo-arras-penitenciales-pdf",
      "comprar-piso-entre-particulares",
    ],
    relatedContractSlugs: ["compraventa-vivienda", "arras"],
    sections: [
      {
        title: "Para qué sirve el contrato privado de compraventa",
        paragraphs: [
          "Documenta el acuerdo entre comprador y vendedor particulares: identificación de la vivienda, precio, forma de pago y plazos. No sustituye por sí solo la escritura pública habitual para inscribir en el Registro, pero aporta prueba y claridad.",
        ],
      },
      {
        title: "Qué debe incluir el contrato",
        paragraphs: [
          "Datos de las partes, descripción del inmueble (dirección y referencia catastral si procede), precio total, pagos, estado de cargas si se declara y, si lo pactáis, la distribución de gastos.",
        ],
      },
      {
        title: "Generar y descargar el PDF ahora",
        paragraphs: [
          "Usa el generador de compraventa de vivienda: completa el formulario, revisa el resumen y descarga el PDF gratis. Si aún estás en fase de reserva, conviene valorar también un contrato de arras.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿El contrato privado sustituye a la notaría?",
        answer:
          "No. Suele documentar el acuerdo entre particulares. Para inscribir la transmisión lo habitual es elevar a escritura pública ante notario.",
      },
      {
        question: "¿Puedo descargar el contrato de compraventa en PDF gratis?",
        answer:
          "Sí. Lo generas en SoyContratoFacil.es y lo descargas listo para imprimir, sin registro.",
      },
    ],
  },
  {
    slug: "modelo-arras-penitenciales-pdf",
    title: "Modelo de arras penitenciales para comprar vivienda (descarga PDF)",
    metaDescription:
      "Descarga un modelo de arras penitenciales en PDF gratis para reservar una vivienda. Documento legal, claro y listo para firmar.",
    intro:
      "Las arras penitenciales permiten reservar una vivienda con una cantidad a cuenta y reglas claras si alguna parte desiste. Genera el modelo en PDF gratis y fírmalo con los datos de tu operación.",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedGuideSlugs: ["arras", "compraventa-vivienda"],
    relatedArticleSlugs: [
      "tipos-de-arras",
      "contrato-arras-penitenciales-guia",
      "contrato-compraventa-vivienda-particulares-pdf",
    ],
    relatedContractSlugs: ["arras"],
    sections: [
      {
        title: "Qué resuelve un modelo de arras penitenciales",
        paragraphs: [
          "Fija el importe entregado, el plazo para escriturar y las consecuencias de desistir: el comprador puede perder las arras y el vendedor, en su caso, devolver el doble. Esa claridad reduce conflictos en la reserva.",
        ],
      },
      {
        title: "Datos imprescindibles del documento",
        paragraphs: [
          "Identificación de las partes y de la vivienda, precio de compraventa, cantidad de arras, mención de que son penitenciales, fecha límite para la escritura y, si procede, distribución de gastos.",
        ],
      },
      {
        title: "Descargar el PDF con el generador",
        paragraphs: [
          "Entra en el generador de arras, completa los datos, revisa el resumen y descarga el PDF gratis, listo para imprimir. Revisa siempre el documento antes de firmar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Las arras penitenciales se descuentan del precio?",
        answer:
          "Sí, si la compraventa se perfecciona con normalidad, las arras se imputan al precio total.",
      },
      {
        question: "¿Puedo descargar el modelo de arras en PDF gratis?",
        answer:
          "Sí. En SoyContratoFacil.es generas el contrato de arras y descargas el PDF sin registro.",
      },
    ],
  },
  {
    slug: "contrato-alquiler-temporada-pdf",
    title: "Contrato de alquiler de temporada: cuándo usarlo y descargar PDF",
    metaDescription:
      "Contrato de alquiler de temporada o temporal en PDF gratis. Cuándo usarlo, diferencias con vivienda habitual y descarga lista para firmar.",
    intro:
      "El contrato de alquiler de temporada (o temporal) se usa cuando la vivienda urbana no es residencia habitual del inquilino, sino una estancia por trabajo, estudios u otro motivo temporal. Genera el PDF gratis y evita confundirlo con el contrato de vivienda habitual.",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedGuideSlugs: ["temporada", "vivienda"],
    relatedArticleSlugs: [
      "alquiler-temporada-vs-habitual",
      "plantilla-contrato-alquiler-pdf",
    ],
    relatedContractSlugs: ["temporada"],
    sections: [
      {
        title: "Cuándo usar el contrato de temporada",
        paragraphs: [
          "Cuando existe una causa temporal clara y el inmueble no se destina a domicilio habitual. Usarlo mal para eludir el régimen de vivienda habitual puede generar problemas legales.",
        ],
      },
      {
        title: "Qué debe incluir el contrato temporal",
        paragraphs: [
          "Partes, descripción de la vivienda, carácter temporal del uso, duración concreta, renta, fianza y reglas sobre suministros y entrega de llaves.",
        ],
      },
      {
        title: "Descargar el PDF de temporada",
        paragraphs: [
          "Completa el generador de alquiler de temporada, revisa los datos y descarga el PDF gratis. Si el uso es residencia habitual, usa el generador de vivienda en su lugar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es lo mismo temporada y temporal?",
        answer:
          "En la práctica se buscan ambos términos para el mismo tipo de contrato de uso no habitual. Lo importante es que el uso y la duración sean realmente temporales.",
      },
      {
        question: "¿Puedo descargar el contrato de temporada en PDF gratis?",
        answer:
          "Sí. Lo generas en SoyContratoFacil.es y lo descargas sin registro.",
      },
    ],
  },
  {
    slug: "contrato-alquiler-local-comercial-pdf",
    title: "Contrato de alquiler de local comercial en PDF (modelo gratis)",
    metaDescription:
      "Genera y descarga tu contrato de alquiler de local comercial en PDF gratis. Modelo para negocio, distinto del de vivienda, listo para firmar.",
    intro:
      "El contrato de alquiler de local comercial regula el arrendamiento de un local de negocio: destino, renta, duración y obligaciones. No uses una plantilla de piso: genera el PDF específico de local y fírmalo con las cláusulas adecuadas.",
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedGuideSlugs: ["local"],
    relatedArticleSlugs: [
      "plantilla-contrato-alquiler-pdf",
      "contrato-alquiler-particulares",
    ],
    relatedContractSlugs: ["local"],
    sections: [
      {
        title: "Qué debe cubrir el contrato de local comercial",
        paragraphs: [
          "Identificación de las partes, descripción del local, destino o actividad, duración, renta, fianza o garantías, gastos e impuestos, y condiciones de entrega y devolución.",
        ],
      },
      {
        title: "Por qué no sirve la plantilla de vivienda",
        paragraphs: [
          "El local de negocio no sigue el mismo régimen que la vivienda habitual. Destino, duración y desistimiento suelen pactarse de forma distinta; por eso conviene un modelo específico de local comercial.",
        ],
      },
      {
        title: "Generar el PDF del local ahora",
        paragraphs: [
          "Usa el generador de contrato de local: rellena el formulario, revisa el resumen y descarga el PDF gratis, listo para imprimir. Revisa siempre el documento antes de la firma.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Este contrato sirve para un local de negocio?",
        answer:
          "Sí. Está orientado a arrendamiento de local comercial. Adapta el destino y las condiciones a tu actividad concreta.",
      },
      {
        question: "¿El PDF del contrato de local es gratis?",
        answer:
          "Sí. Lo generas y descargas en SoyContratoFacil.es sin registro ni coste.",
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
