export type SignatureParty = {
  role: string;
  nameField: string;
};

export type ContractTemplateSection = {
  title: string;
  content: string;
};

export type ContractLegalTemplate = {
  slug: string;
  title: string;
  subtitle: string;
  comparecencia: string;
  sections: ContractTemplateSection[];
  signatures: [SignatureParty, SignatureParty];
  closing: string;
};

const viviendaTemplate: ContractLegalTemplate = {
  slug: "vivienda",
  title: "CONTRATO DE ARRENDAMIENTO DE VIVIENDA",
  subtitle: "Arrendamiento de vivienda habitual",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "Ambas partes se reconocen mutuamente la capacidad legal necesaria para contratar y, a tal efecto,",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO DEL CONTRATO",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO, que acepta, {{descripcion_inmueble}}, destinada exclusivamente a satisfacer la necesidad permanente de vivienda del arrendatario, conforme a la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU).",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "El presente contrato se concierta por un plazo de {{duracion_contrato}}{{#fecha_inicio}}, con fecha de inicio el {{fecha_inicio}}{{/fecha_inicio}}. Cualquier rescisión anticipada deberá notificarse fehacientemente con una antelación mínima de {{preaviso_rescision}} días. Las partes podrán ejercer las prórrogas y derechos de extensión previstos en la LAU, salvo pacto en contrario conforme a derecho.",
    },
    {
      title: "TERCERA. — RENTA Y FORMA DE PAGO",
      content:
        "La renta mensual se fija en {{renta_mensual}}, pagadera {{dia_pago}} mediante transferencia bancaria al IBAN {{iban_pago}}. EL ARRENDATARIO abonará asimismo la fianza legal en la cuantía de {{fianza}}, que será depositada conforme a la normativa vigente.",
    },
    {
      title: "CUARTA. — GASTOS E IMPUESTOS",
      content:
        "El IBI será satisfecho {{ibi}}. Los gastos de comunidad serán abonados {{gastos_comunidad}}, salvo pacto distinto expresamente recogido en anexo.",
    },
    {
      title: "QUINTA. — SUMINISTROS",
      content: "{{clausula_suministros}}",
    },
    {
      title: "SEXTA. — OBLIGACIONES DE LAS PARTES",
      content:
        "EL ARRENDADOR se obliga a entregar la vivienda en estado de servir para el uso convenido y a realizar las reparaciones que legalmente le correspondan. EL ARRENDATARIO se obliga a usar diligentemente la vivienda, pagar puntualmente la renta y comunicar cualquier daño que precise reparación urgente.",
    },
    {
      title: "SÉPTIMA. — FUERO Y LEGISLACIÓN APLICABLE",
      content:
        "En lo no previsto expresamente en este contrato, las partes se someten a lo dispuesto en la LAU y demás normativa concordante. Para cuantas cuestiones litigiosas pudieran derivarse del presente contrato, las partes se someten a los Juzgados y Tribunales del lugar donde radique el inmueble arrendado.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing:
    "Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto en el lugar y fecha indicados en el encabezamiento.",
};

const fincaRusticaTemplate: ContractLegalTemplate = {
  slug: "finca-rustica",
  title: "CONTRATO DE ARRENDAMIENTO DE FINCA RÚSTICA",
  subtitle: "Arrendamiento de finca rústica o rústico",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "Con capacidad legal para obligarse, convienen lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO {{descripcion_inmueble}}, conforme a la Ley 49/2003, de 26 de noviembre, de Arrendamientos Rústicos.",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "El arrendamiento se establece por un plazo de {{duracion_contrato}}, contado desde la firma del presente documento o desde la fecha de efectividad que las partes determinen, sin perjuicio de las prórrogas legales o convencionales aplicables. Cualquier rescisión anticipada deberá notificarse fehacientemente con una antelación mínima de {{preaviso_rescision}} días.",
    },
    {
      title: "TERCERA. — RENTA Y FIANZA",
      content:
        "La renta se fija en {{renta_mensual}}, pagadera {{dia_pago}} mediante transferencia al IBAN {{iban_pago}}. EL ARRENDATARIO entrega en este acto la cantidad de {{fianza}} en concepto de fianza o garantía, a devolver al término del arrendamiento, salvo compensación por daños o cantidades pendientes debidamente justificadas.",
    },
    {
      title: "CUARTA. — SUMINISTROS",
      content: "{{clausula_suministros}}",
    },
    {
      title: "QUINTA. — OBLIGACIONES",
      content:
        "EL ARRENDATARIO explotará la finca con la diligencia de un buen empresario agrario, abonará puntualmente la renta y cumplirá la normativa medioambiental y de uso del suelo. EL ARRENDADOR garantizará el pacífico disfrute de la finca y el cumplimiento de las obligaciones legalmente asignadas al arrendador.",
    },
    {
      title: "SEXTA. — FUERO",
      content:
        "Para la interpretación y cumplimiento del presente contrato será de aplicación la legislación sobre arrendamientos rústicos y, en su defecto, el Código Civil. Las partes se someten a los Juzgados y Tribunales del lugar de ubicación de la finca.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing:
    "Leído el presente contrato por ambas partes y conformes con su contenido, lo firman por duplicado en el lugar y fecha indicados.",
};

const arrasTemplate: ContractLegalTemplate = {
  slug: "arras",
  title: "CONTRATO DE ARRAS",
  subtitle: "Arras penitenciales, confirmatorias o penales",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{vendedor_comparecencia}}, en adelante «EL VENDEDOR».\n\n" +
    "Y de otra parte, {{comprador_comparecencia}}, en adelante «EL COMPRADOR».\n\n" +
    "Con capacidad legal para contratar, acuerdan suscribir el presente contrato de arras en relación con el inmueble que se describe a continuación.",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "EL VENDEDOR se obliga a vender y EL COMPRADOR a comprar {{descripcion_inmueble}}, en las condiciones y precio establecidos en el presente documento.",
    },
    {
      title: "SEGUNDA. — PRECIO Y ARRAS",
      content:
        "El precio total de la compraventa se fija en {{precio_total}}. En este acto, EL COMPRADOR entrega a EL VENDEDOR la cantidad de {{cantidad_arras}} en concepto de arras {{tipo_arras}}, que se imputarán al precio final en el momento de otorgarse la escritura pública de compraventa.",
    },
    {
      title: "TERCERA. — PLAZO PARA LA COMPRAVENTA",
      content:
        "Las partes se comprometen a formalizar la compraventa ante Notario en el plazo máximo de {{plazo_compraventa}}, salvo causa justificada de demora no imputable a ninguna de las partes.",
    },
    {
      title: "CUARTA. — EFECTOS DE LAS ARRAS",
      content:
        "En caso de incumplimiento, se estará a lo dispuesto en el artículo 1.454 y siguientes del Código Civil para las arras {{tipo_arras}}, pudiendo la parte cumplidora optar entre exigir el cumplimiento o la resolución del contrato con los efectos legales correspondientes.",
    },
    {
      title: "QUINTA. — LEGISLACIÓN Y FUERO",
      content:
        "El presente contrato se rige por el Código Civil y demás normativa aplicable. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del lugar donde se ubique el inmueble objeto del contrato.",
    },
  ],
  signatures: [
    { role: "EL VENDEDOR", nameField: "vendedor_nombre" },
    { role: "EL COMPRADOR", nameField: "comprador_nombre" },
  ],
  closing:
    "Y en señal de conformidad, las partes firman el presente documento por duplicado en el lugar y fecha arriba indicados.",
};

const temporadaTemplate: ContractLegalTemplate = {
  slug: "temporada",
  title: "CONTRATO DE ARRENDAMIENTO DE TEMPORADA",
  subtitle: "Arrendamiento de uso distinto al de vivienda habitual",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "Con capacidad legal para contratar, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "El ARRENDADOR cede en arrendamiento al ARRENDATARIO {{descripcion_inmueble}}, por motivo de {{motivo_temporada}}, quedando expresamente excluida su consideración de arrendamiento de vivienda habitual conforme a la LAU.",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "El contrato tendrá vigencia desde el {{fecha_inicio}} hasta el {{fecha_fin}}, sin posibilidad de prórroga tácita salvo pacto escrito posterior. Cualquier rescisión anticipada deberá notificarse fehacientemente con una antelación mínima de {{preaviso_rescision}} días.",
    },
    {
      title: "TERCERA. — RENTA Y FIANZA",
      content:
        "La renta mensual asciende a {{renta_mensual}}, pagadera {{dia_pago}} mediante transferencia bancaria al IBAN {{iban_pago}}. La fianza asciende a {{fianza}} y se devolverá al finalizar el arrendamiento conforme a la ley.",
    },
    {
      title: "CUARTA. — SUMINISTROS",
      content: "{{clausula_suministros}}",
    },
    {
      title: "QUINTA. — FUERO",
      content:
        "Las partes se someten a la LAU en lo aplicable y, para conflictos, a los Juzgados del lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing: "Firmado por duplicado en el lugar y fecha indicados.",
};

const habitacionTemplate: ContractLegalTemplate = {
  slug: "habitacion",
  title: "CONTRATO DE ARRENDAMIENTO DE HABITACIÓN",
  subtitle: "Arrendamiento de habitación en vivienda compartida",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "Con capacidad legal para contratar, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "Se arrienda {{descripcion_inmueble}}{{#zonas_comunes}}, con uso de las siguientes zonas comunes: {{zonas_comunes}}{{/zonas_comunes}}.",
    },
    {
      title: "SEGUNDA. — DURACIÓN Y RENTA",
      content:
        "Duración: {{duracion_contrato}}. Renta mensual: {{renta_mensual}}, pagadera {{dia_pago}} mediante transferencia al IBAN {{iban_pago}}. Fianza: {{fianza}}. Cualquier rescisión anticipada requerirá preaviso fehaciente de {{preaviso_rescision}} días.",
    },
    {
      title: "TERCERA. — SUMINISTROS",
      content: "{{clausula_suministros}}",
    },
    {
      title: "CUARTA. — FUERO",
      content:
        "Se aplicará la LAU y la normativa de arrendamientos de habitación. Fuero: tribunales del lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing: "Firmado por duplicado en el lugar y fecha indicados.",
};

const localTemplate: ContractLegalTemplate = {
  slug: "local",
  title: "CONTRATO DE ARRENDAMIENTO DE LOCAL COMERCIAL",
  subtitle: "Arrendamiento de local de negocio",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "Con capacidad legal para contratar, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "Se arrienda {{descripcion_inmueble}}, para el ejercicio de la actividad de {{actividad_comercial}}.",
    },
    {
      title: "SEGUNDA. — DURACIÓN Y RENTA",
      content:
        "Plazo: {{duracion_contrato}}. Renta mensual: {{renta_mensual}}, pagadera {{dia_pago}} mediante transferencia al IBAN {{iban_pago}}. Fianza: {{fianza}}{{#gastos_comunidad}}. Gastos de comunidad {{gastos_comunidad}}{{/gastos_comunidad}}. La rescisión anticipada requerirá preaviso fehaciente de {{preaviso_rescision}} días.",
    },
    {
      title: "TERCERA. — SUMINISTROS",
      content: "{{clausula_suministros}}",
    },
    {
      title: "CUARTA. — FUERO",
      content:
        "Régimen de arrendamientos de locales de negocio conforme a la LAU. Jurisdicción: lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing: "Firmado por duplicado en el lugar y fecha indicados.",
};

const compraventaViviendaTemplate: ContractLegalTemplate = {
  slug: "compraventa-vivienda",
  title: "CONTRATO DE COMPRAVENTA DE VIVIENDA",
  subtitle: "Compraventa entre particulares",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{vendedor_comparecencia}}, en adelante «EL VENDEDOR».\n\n" +
    "Y de otra parte, {{comprador_comparecencia}}, en adelante «EL COMPRADOR».\n\n" +
    "Con capacidad legal para contratar, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content:
        "El VENDEDOR vende y el COMPRADOR compra {{descripcion_inmueble}}.",
    },
    {
      title: "SEGUNDA. — PRECIO Y FORMA DE PAGO",
      content:
        "Precio: {{precio_venta}}. Forma de pago: {{forma_pago}}. Fecha prevista de escritura: {{fecha_escritura}}.",
    },
    {
      title: "TERCERA. — FUERO",
      content:
        "Código Civil y normativa aplicable. Tribunales del lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL VENDEDOR", nameField: "vendedor_nombre" },
    { role: "EL COMPRADOR", nameField: "comprador_nombre" },
  ],
  closing: "Firmado por duplicado en el lugar y fecha indicados.",
};

const garajeTrasteroTemplate: ContractLegalTemplate = {
  slug: "garaje-trastero",
  title: "CONTRATO DE COMPRAVENTA DE GARAJE O TRASTERO",
  subtitle: "Transmisión de plaza de garaje o trastero",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{vendedor_comparecencia}}, en adelante «EL VENDEDOR».\n\n" +
    "Y de otra parte, {{comprador_comparecencia}}, en adelante «EL COMPRADOR».\n\n" +
    "Con capacidad legal para contratar, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — DESCRIPCIÓN DEL INMUEBLE Y OBJETO",
      content: "Se vende {{descripcion_inmueble}}.",
    },
    {
      title: "SEGUNDA. — PRECIO",
      content:
        "Precio de venta: {{precio_venta}}{{#fecha_escritura}}. Escritura prevista: {{fecha_escritura}}{{/fecha_escritura}}.",
    },
    {
      title: "TERCERA. — FUERO",
      content: "Código Civil. Jurisdicción: lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL VENDEDOR", nameField: "vendedor_nombre" },
    { role: "EL COMPRADOR", nameField: "comprador_nombre" },
  ],
  closing: "Firmado por duplicado.",
};

const rescisionTemplate: ContractLegalTemplate = {
  slug: "rescision",
  title: "DOCUMENTO DE RESCISIÓN DE CONTRATO DE ARRENDAMIENTO",
  subtitle: "Finalización anticipada del arrendamiento",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "En relación con el inmueble sito en {{direccion_inmueble}}, acuerdan lo siguiente:",
  sections: [
    {
      title: "PRIMERA. — RESCISIÓN",
      content:
        "Las partes acuerdan la rescisión del contrato de arrendamiento con entrega de llaves el {{fecha_entrega_llaves}}.",
    },
    {
      title: "SEGUNDA. — ESTADO Y FIANZA",
      content:
        "Estado del inmueble: {{estado_inmueble}}. Devolución de fianza: {{devolucion_fianza}}{{#importe_devolucion}} ({{importe_devolucion}}){{/importe_devolucion}}{{#observaciones}}. Observaciones: {{observaciones}}{{/observaciones}}.",
    },
    {
      title: "TERCERA. — FUERO",
      content: "LAU y Código Civil. Tribunales del lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing: "Firmado por duplicado en señal de conformidad.",
};

const cambioSuministrosTemplate: ContractLegalTemplate = {
  slug: "cambio-suministros",
  title: "COMUNICACIÓN DE CAMBIO DE TITULARIDAD DE SUMINISTROS",
  subtitle: "Cambio de titular de suministros",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, {{titular_saliente}} (titular saliente) y {{titular_entrante}} (titular entrante) comunican el cambio de titularidad respecto del inmueble sito en {{direccion_inmueble}}.",
  sections: [
    {
      title: "PRIMERA. — DATOS DEL SUMINISTRO",
      content:
        "Tipo de suministro: {{tipo_suministro}}{{#numero_contrato}}. Nº contrato/CUPS: {{numero_contrato}}{{/numero_contrato}}.",
    },
    {
      title: "SEGUNDA. — FECHA Y LECTURA",
      content:
        "Fecha efectiva del cambio: {{fecha_cambio}}{{#lectura_contador}}. Lectura del contador: {{lectura_contador}}{{/lectura_contador}}.",
    },
    {
      title: "TERCERA. — DECLARACIÓN",
      content:
        "Ambas partes declaran que el cambio se realiza por mutuo acuerdo y solicitan a la compañía suministradora la actualización de la titularidad conforme a sus procedimientos.",
    },
  ],
  signatures: [
    { role: "TITULAR SALIENTE", nameField: "titular_saliente" },
    { role: "TITULAR ENTRANTE", nameField: "titular_entrante" },
  ],
  closing: "Firmado por duplicado a efectos de comunicación a la compañía suministradora.",
};

export const contractTemplates: Record<string, ContractLegalTemplate> = {
  vivienda: viviendaTemplate,
  "finca-rustica": fincaRusticaTemplate,
  arras: arrasTemplate,
  temporada: temporadaTemplate,
  habitacion: habitacionTemplate,
  local: localTemplate,
  "compraventa-vivienda": compraventaViviendaTemplate,
  "garaje-trastero": garajeTrasteroTemplate,
  rescision: rescisionTemplate,
  "cambio-suministros": cambioSuministrosTemplate,
};

export function getContractTemplate(
  slug: string
): ContractLegalTemplate | undefined {
  return contractTemplates[slug];
}

export function hasContractTemplate(slug: string): boolean {
  return slug in contractTemplates;
}
