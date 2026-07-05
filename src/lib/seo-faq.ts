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
];
