export type FaqItem = {
  question: string;
  answer: string;
};

export const homeFaqs: FaqItem[] = [
  {
    question: "¿Es gratis generar contratos en SoyContratoFacil.es?",
    answer:
      "Sí. Puedes generar y descargar tus contratos en PDF de forma gratuita, sin registro ni creación de cuenta.",
  },
  {
    question: "¿Los contratos generados son válidos legalmente en España?",
    answer:
      "Los documentos se elaboran a partir de plantillas adaptadas a la normativa española vigente en materia inmobiliaria. Debes revisar que el contenido se ajuste a tu caso concreto y, si tienes dudas, consultar con un profesional del derecho.",
  },
  {
    question: "¿Necesito registrarme para usar la herramienta?",
    answer:
      "No. El proceso es completamente anónimo: eliges el contrato, rellenas el formulario y descargas el PDF al instante.",
  },
  {
    question: "¿Qué tipos de contratos puedo generar?",
    answer:
      "Ofrecemos contratos de arrendamiento (vivienda, temporada, habitación, local, finca rústica, garaje), compraventa (vivienda, arras, garaje o trastero) y gestión (rescisión de contrato y cambio de suministros).",
  },
  {
    question: "¿SoyContratoFacil.es sustituye el asesoramiento de un abogado?",
    answer:
      "No. Es una herramienta automatizada de generación de documentos. No constituye asesoramiento jurídico personalizado. El usuario es responsable de revisar el documento antes de firmarlo.",
  },
  {
    question: "¿Dónde puedo leer guías sobre contratos de alquiler y compraventa?",
    answer:
      "En la sección de guías y artículos del sitio encontrarás información orientativa sobre vivienda, arras, fianzas, suministros y otros documentos inmobiliarios, con enlaces al generador gratuito.",
  },
  {
    question: "¿Los datos de mis contratos se guardan en vuestros servidores?",
    answer:
      "No. La información que introduces se utiliza en tu navegador para generar el PDF. No almacenamos el contenido de tus contratos ni requerimos registro.",
  },
];
