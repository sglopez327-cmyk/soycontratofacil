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

const COMPARECENCIA_ARRENDAMIENTO =
  "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
  "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
  "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
  "Ambas partes se reconocen mutuamente capacidad legal suficiente para obligarse y, a tal efecto,";

const COMPARECENCIA_COMPRAVENTA =
  "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
  "De una parte, {{vendedor_comparecencia}}, en adelante «EL VENDEDOR».\n\n" +
  "Y de otra parte, {{comprador_comparecencia}}, en adelante «EL COMPRADOR».\n\n" +
  "Ambas partes se reconocen mutuamente capacidad legal suficiente para obligarse y, a tal efecto,";

const viviendaTemplate: ContractLegalTemplate = {
  slug: "vivienda",
  title: "CONTRATO DE ARRENDAMIENTO DE VIVIENDA",
  subtitle: "Arrendamiento de vivienda habitual (Título II LAU)",
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " convienen suscribir el presente contrato de arrendamiento de vivienda habitual.",
  sections: [
    {
      title: "PRIMERA. — OBJETO Y DESTINO",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO, que acepta, {{descripcion_inmueble}}, " +
        "destinada exclusivamente a satisfacer la necesidad permanente de vivienda de EL ARRENDATARIO, " +
        "conforme al Título II de la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU). " +
        "Queda prohibido el uso turístico, hotelero o de vivienda habitual de terceros sin autorización escrita de EL ARRENDADOR.",
    },
    {
      title: "SEGUNDA. — DURACIÓN Y PRÓRROGAS",
      content:
        "El contrato se concierta por un plazo de {{duracion_contrato}}{{#fecha_inicio}}, con fecha de inicio el {{fecha_inicio}}{{/fecha_inicio}}. " +
        "Si la duración pactada fuera inferior a cinco (5) años —o a siete (7) años si EL ARRENDADOR fuera persona jurídica—, " +
        "llegado el día del vencimiento el contrato se prorrogará obligatoriamente por plazos anuales hasta alcanzar dicha duración mínima, " +
        "salvo que EL ARRENDATARIO manifieste a EL ARRENDADOR, con treinta días de antelación como mínimo a la fecha de terminación del contrato " +
        "o de cualquiera de las prórrogas, su voluntad de no renovarlo (artículo 9 LAU). " +
        "Transcurrido el plazo mínimo, resultará de aplicación el régimen de prórroga del artículo 10 LAU, " +
        "sin perjuicio de las notificaciones de no renovación en los plazos legalmente previstos.",
    },
    {
      title: "TERCERA. — DESISTIMIENTO Y RESOLUCIÓN",
      content: "{{clausula_desistimiento_vivienda}}",
    },
    {
      title: "CUARTA. — RENTA Y FORMA DE PAGO",
      content:
        "La renta se fija en {{renta_mensual}}, con periodicidad {{periodicidad_pago}}, pagadera {{dia_pago}} " +
        "mediante transferencia bancaria al IBAN {{iban_pago}}{{#fecha_primer_pago}}. El primer pago se realizará el {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "La falta de pago de la renta o de cantidades asimiladas podrá dar lugar a la resolución del contrato " +
        "conforme al artículo 27 LAU, sin perjuicio de las acciones de reclamación que correspondan. " +
        "Cualquier actualización de la renta se realizará, en su caso, conforme a la normativa vigente en cada momento " +
        "y, si procediera, a lo pactado por escrito entre las partes dentro de los límites legales.",
    },
    {
      title: "QUINTA. — FIANZA Y GARANTÍAS",
      content:
        "EL ARRENDATARIO entrega en este acto la cantidad de {{fianza}} en concepto de fianza legal (artículo 36 LAU), " +
        "equivalente, con carácter general, a una mensualidad de renta en arrendamientos de vivienda. " +
        "EL ARRENDADOR se obliga a depositarla en el organismo competente de la comunidad autónoma donde radique la vivienda, " +
        "cuando así lo exija la normativa autonómica aplicable. " +
        "La fianza se restituirá a la finalización del contrato en los términos del artículo 36.4 LAU, " +
        "una vez comprobado el estado del inmueble y saldados rentas y cantidades pendientes. " +
        "Las partes podrán pactar garantías adicionales dentro de los límites legales.",
    },
    {
      title: "SEXTA. — GASTOS E IMPUESTOS",
      content:
        "El Impuesto sobre Bienes Inmuebles (IBI) será satisfecho {{ibi}}. " +
        "Los gastos de comunidad de propietarios serán abonados {{gastos_comunidad}}, " +
        "de conformidad con el artículo 20 LAU cuando se haya pactado su repercusión. " +
        "Los gastos de gestión inmobiliaria y formalización del contrato, si los hubiera, " +
        "correrán a cargo de la parte que legalmente corresponda según la normativa vigente.",
    },
    {
      title: "SÉPTIMA. — SUMINISTROS",
      content:
        "{{#clausula_suministros}}{{clausula_suministros}} {{/clausula_suministros}}" +
        "En todo caso, las partes colaborarán de buena fe en la titularidad y pago de agua, electricidad " +
        "y, en su caso, gas u otros suministros del inmueble.",
    },
    {
      title: "OCTAVA. — CONSERVACIÓN, OBRAS Y CESIÓN",
      content:
        "EL ARRENDADOR entregará la vivienda en estado de servir al uso convenido y realizará las reparaciones necesarias " +
        "para conservarla en condiciones de habitabilidad, conforme a los artículos 21 y siguientes de la LAU. " +
        "EL ARRENDATARIO usará la vivienda con la diligencia de un buen padre de familia, " +
        "comunicará de inmediato las reparaciones urgentes y no realizará obras que modifiquen la configuración de la vivienda " +
        "sin consentimiento escrito de EL ARRENDADOR, salvo las pequeñas reparaciones que le correspondan por el uso ordinario. " +
        "Quedan prohibidos el subarriendo, la cesión y el traspaso total o parcial sin autorización escrita de EL ARRENDADOR.",
    },
    {
      title: "NOVENA. — INVENTARIO Y ESTADO",
      content:
        "Las partes podrán anexar al presente contrato un inventario y descripción del estado de conservación del inmueble " +
        "y, en su caso, del mobiliario. A falta de inventario, se presume que la vivienda se entrega en estado de servir al uso pactado, " +
        "sin perjuicio de la prueba en contrario. A la finalización, EL ARRENDATARIO restituirá la vivienda en el mismo estado, " +
        "salvo deterioro por uso ordinario y desgaste natural.",
    },
    {
      title: "DÉCIMA. — LEGISLACIÓN Y FUERO",
      content:
        "En lo no previsto, será de aplicación la LAU y, supletoriamente, el Código Civil y demás normativa concordante, " +
        "incluida, cuando resulte aplicable, la legislación de vivienda. " +
        "Para cuantas cuestiones litigiosas pudieran derivarse, las partes se someten a los Juzgados y Tribunales " +
        "del lugar donde radique el inmueble arrendado, con renuncia a cualquier otro fuero que pudiera corresponderles, " +
        "salvo normas imperativas de competencia.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing:
    "Y en prueba de conformidad, firman el presente contrato por duplicado ejemplar y a un solo efecto en el lugar y fecha indicados en el encabezamiento.",
};

const fincaRusticaTemplate: ContractLegalTemplate = {
  slug: "finca-rustica",
  title: "CONTRATO DE ARRENDAMIENTO DE FINCA RÚSTICA",
  subtitle: "Arrendamiento rústico (Ley 49/2003)",
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " convienen el arrendamiento de finca rústica siguiente.",
  sections: [
    {
      title: "PRIMERA. — OBJETO",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO {{descripcion_inmueble}}, " +
        "para su explotación agraria o uso rústico conforme a la Ley 49/2003, de 26 de noviembre, de Arrendamientos Rústicos (LAR), " +
        "y demás normativa agraria, medioambiental y urbanística aplicable.",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "El arrendamiento se establece por un plazo de {{duracion_contrato}}, " +
        "contado{{#fecha_inicio}} desde el {{fecha_inicio}}{{/fecha_inicio}}, " +
        "sin perjuicio de las prórrogas legales o convencionales que resulten de la LAR. " +
        "Cualquier extinción anticipada por mutuo acuerdo o por las causas legalmente previstas " +
        "deberá notificarse de forma fehaciente con una antelación mínima de {{preaviso_rescision}} días, " +
        "salvo plazo distinto legalmente exigible.",
    },
    {
      title: "TERCERA. — RENTA Y FIANZA",
      content:
        "La renta se fija en {{renta_mensual}}, con periodicidad {{periodicidad_pago}}, pagadera {{dia_pago}} " +
        "mediante transferencia al IBAN {{iban_pago}}{{#fecha_primer_pago}}. El primer pago se realizará el {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "EL ARRENDATARIO entrega {{fianza}} en concepto de fianza o garantía, a devolver al término del arrendamiento " +
        "salvo compensación por daños, rentas o cantidades pendientes debidamente justificadas.",
    },
    {
      title: "CUARTA. — OBLIGACIONES Y USO",
      content:
        "EL ARRENDATARIO explotará la finca con la diligencia de un buen empresario agrario, " +
        "abonará puntualmente la renta y cumplirá la normativa medioambiental, de sanidad vegetal/animal y de uso del suelo. " +
        "No podrá cambiar el destino pactado ni realizar obras permanentes sin consentimiento escrito de EL ARRENDADOR, " +
        "salvo las mejoras que la LAR le atribuya o autorice. " +
        "EL ARRENDADOR garantizará el pacífico disfrute y el cumplimiento de las obligaciones legales del arrendador. " +
        "Las partes reconocen los derechos de tanteo, retracto u otros preferentes que, en su caso, atribuya la LAR u otras normas.",
    },
    {
      title: "QUINTA. — LEGISLACIÓN Y FUERO",
      content:
        "Será de aplicación la LAR y, en lo no previsto, el Código Civil y la normativa concordante. " +
        "Jurisdicción: Juzgados y Tribunales del lugar de ubicación de la finca.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing:
    "Leído el presente contrato y conformes con su contenido, lo firman por duplicado en el lugar y fecha indicados.",
};

const arrasTemplate: ContractLegalTemplate = {
  slug: "arras",
  title: "CONTRATO DE ARRAS",
  subtitle: "Precontrato de compraventa inmobiliaria",
  comparecencia: COMPARECENCIA_COMPRAVENTA + " acuerdan el siguiente contrato de arras.",
  sections: [
    {
      title: "PRIMERA. — INMUEBLE OBJETO",
      content:
        "EL VENDEDOR se obliga a vender y EL COMPRADOR a comprar {{descripcion_inmueble}}. " +
        "EL VENDEDOR declara que el inmueble se transmitirá libre de ocupantes y, " +
        "salvo lo que resulte de nota simple registral o información urbanística que deba facilitarse antes de la escritura, " +
        "en las condiciones de dominio y cargas que se harán constar en la escritura pública. " +
        "EL COMPRADOR declara conocer o haberse reservado el derecho a examinar título, Registro, catastro y certificado de eficiencia energética.",
    },
    {
      title: "SEGUNDA. — PRECIO Y ARRAS",
      content:
        "El precio total de la compraventa se fija en {{precio_total}}. " +
        "En este acto, EL COMPRADOR entrega a EL VENDEDOR la cantidad de {{cantidad_arras}} " +
        "en concepto de arras {{tipo_arras}}, que se imputarán al precio final en el otorgamiento de la escritura pública, " +
        "salvo los efectos específicos del desistimiento o incumplimiento previstos en la cláusula siguiente.",
    },
    {
      title: "TERCERA. — EFECTOS DE LAS ARRAS",
      content: "{{clausula_efectos_arras}}",
    },
    {
      title: "CUARTA. — PLAZO PARA LA ESCRITURA",
      content:
        "Las partes se comprometen a otorgar escritura pública de compraventa ante Notario " +
        "como máximo el {{plazo_compraventa}}, salvo prórroga escrita de común acuerdo o demora no imputable a ninguna de las partes. " +
        "EL VENDEDOR facilitará la documentación necesaria (título, nota simple actualizada, CEE, certificados de deuda de comunidad e IBI, y demás exigibles). " +
        "Los gastos e impuestos de la compraventa se distribuirán conforme a ley y a lo que se pacte en la escritura, " +
        "siendo lo habitual que EL COMPRADOR asuma ITP/AJD o IVA según proceda, y EL VENDEDOR la plusvalía municipal cuando resulte exigible, " +
        "sin perjuicio de pacto distinto válido.",
    },
    {
      title: "QUINTA. — LEGISLACIÓN Y FUERO",
      content:
        "El presente contrato se rige por el Código Civil y demás normativa aplicable a la compraventa inmobiliaria. " +
        "Fuero: Juzgados y Tribunales del lugar donde se ubique el inmueble, salvo norma imperativa en contrario.",
    },
  ],
  signatures: [
    { role: "EL VENDEDOR", nameField: "vendedor_nombre" },
    { role: "EL COMPRADOR", nameField: "comprador_nombre" },
  ],
  closing:
    "Y en señal de conformidad, firman el presente documento por duplicado en el lugar y fecha arriba indicados.",
};

const temporadaTemplate: ContractLegalTemplate = {
  slug: "temporada",
  title: "CONTRATO DE ARRENDAMIENTO DE TEMPORADA",
  subtitle: "Uso distinto del de vivienda habitual (art. 3 LAU)",
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " acuerdan el siguiente arrendamiento de temporada.",
  sections: [
    {
      title: "PRIMERA. — OBJETO Y CAUSA",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO {{descripcion_inmueble}}, " +
        "por motivo de {{motivo_temporada}}. " +
        "Las partes declaran expresamente que el arrendamiento tiene causa temporal determinada " +
        "y que el inmueble no constituye la vivienda permanente de EL ARRENDATARIO, " +
        "quedando sujeto al régimen de arrendamiento para uso distinto del de vivienda (artículo 3 y Título III LAU), " +
        "y no al de vivienda habitual del Título II.",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "El contrato tendrá vigencia desde el {{fecha_inicio}} hasta el {{fecha_fin}}, " +
        "fecha en la que quedará extinguido de pleno derecho sin prórroga tácita, " +
        "salvo pacto escrito posterior. " +
        "Cualquier extinción anticipada por mutuo acuerdo requerirá notificación fehaciente " +
        "con antelación mínima de {{preaviso_rescision}} días, sin perjuicio de las consecuencias del incumplimiento.",
    },
    {
      title: "TERCERA. — RENTA Y FIANZA",
      content:
        "La renta asciende a {{renta_mensual}}, con periodicidad {{periodicidad_pago}}, pagadera {{dia_pago}} " +
        "mediante transferencia al IBAN {{iban_pago}}{{#fecha_primer_pago}}. Primer pago: {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "La fianza asciende a {{fianza}}. En arrendamientos para uso distinto del de vivienda, " +
        "la fianza legal es de dos mensualidades de renta (artículo 36.1 LAU), sin perjuicio de garantías adicionales pactadas. " +
        "Se devolverá a la finalización conforme al artículo 36 LAU.",
    },
    {
      title: "CUARTA. — OBLIGACIONES",
      content:
        "EL ARRENDATARIO destinará el inmueble exclusivamente al uso temporal pactado, " +
        "cuidará de su conservación y no podrá cederlo ni subarrendarlo sin autorización escrita. " +
        "EL ARRENDADOR entregará el inmueble en estado de servir al uso convenido. " +
        "El impago de renta podrá dar lugar a resolución conforme a la LAU y al Código Civil.",
    },
    {
      title: "QUINTA. — LEGISLACIÓN Y FUERO",
      content:
        "Se aplica el Título III de la LAU y, en lo no previsto, el Código Civil. " +
        "Fuero: Juzgados y Tribunales del lugar del inmueble.",
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
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " acuerdan el arrendamiento de habitación siguiente.",
  sections: [
    {
      title: "PRIMERA. — OBJETO Y RÉGIMEN",
      content:
        "Se arrienda {{descripcion_inmueble}}{{#zonas_comunes}}, con derecho de uso de las siguientes zonas comunes: {{zonas_comunes}}{{/zonas_comunes}}. " +
        "Las partes manifiestan que el objeto es una habitación en vivienda compartida. " +
        "A falta de regulación estatal específica de este contrato, se regirá por lo pactado, " +
        "por las normas del Código Civil sobre arrendamiento y, en cuanto resulten aplicables a la naturaleza del uso, " +
        "por la LAU. No se aplicará automáticamente el régimen de vivienda habitual del Título II LAU " +
        "salvo que, por los hechos, el arrendamiento deba calificarse legalmente como tal.",
    },
    {
      title: "SEGUNDA. — DURACIÓN, RENTA Y FIANZA",
      content:
        "Duración: {{duracion_contrato}}. Renta: {{renta_mensual}}, periodicidad {{periodicidad_pago}}, " +
        "pagadera {{dia_pago}} mediante transferencia al IBAN {{iban_pago}}" +
        "{{#fecha_primer_pago}}. Primer pago: {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "Fianza: {{fianza}}. " +
        "La extinción anticipada por mutuo acuerdo o por desistimiento unilateral, cuando proceda, " +
        "requerirá preaviso fehaciente de {{preaviso_rescision}} días, sin perjuicio de las reglas imperativas que resulten aplicables.",
    },
    {
      title: "TERCERA. — CONVIVENCIA Y SUMINISTROS",
      content:
        "{{#clausula_suministros}}{{clausula_suministros}} {{/clausula_suministros}}" +
        "EL ARRENDATARIO respetará las normas de convivencia, el descanso de los demás ocupantes y el uso diligente de las zonas comunes. " +
        "Queda prohibido el alojamiento de terceros en la habitación sin autorización escrita de EL ARRENDADOR. " +
        "EL ARRENDADOR facilitará el acceso pacífico a la habitación y a las zonas comunes pactadas.",
    },
    {
      title: "CUARTA. — LEGISLACIÓN Y FUERO",
      content:
        "Código Civil, LAU en lo aplicable y normativa de convivencia. " +
        "Fuero: tribunales del lugar del inmueble, salvo norma imperativa.",
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
  subtitle: "Local de negocio (Título III LAU)",
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " acuerdan el arrendamiento de local de negocio.",
  sections: [
    {
      title: "PRIMERA. — OBJETO Y ACTIVIDAD",
      content:
        "Se arrienda {{descripcion_inmueble}}, para el ejercicio de la actividad de {{actividad_comercial}}. " +
        "EL ARRENDATARIO declara conocer el estado del local y se obliga a obtener y mantener " +
        "las licencias, autorizaciones y seguros necesarios para la actividad. " +
        "Cualquier cambio de actividad requerirá autorización escrita de EL ARRENDADOR.",
    },
    {
      title: "SEGUNDA. — DURACIÓN, RENTA Y FIANZA",
      content:
        "Plazo: {{duracion_contrato}}. Renta: {{renta_mensual}}, periodicidad {{periodicidad_pago}}, " +
        "pagadera {{dia_pago}} al IBAN {{iban_pago}}" +
        "{{#fecha_primer_pago}}. Primer pago: {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "Fianza: {{fianza}} (en uso distinto de vivienda, fianza legal de dos mensualidades conforme al artículo 36.1 LAU)" +
        "{{#gastos_comunidad}}. Gastos de comunidad: {{gastos_comunidad}}{{/gastos_comunidad}}. " +
        "La rescisión anticipada por acuerdo o las notificaciones de no renovación se efectuarán " +
        "con preaviso fehaciente de {{preaviso_rescision}} días, sin perjuicio de lo pactado sobre indemnizaciones.",
    },
    {
      title: "TERCERA. — OBRAS, CESIÓN E IMPUESTOS",
      content:
        "Las obras que alteren la configuración del local requerirán consentimiento escrito de EL ARRENDADOR. " +
        "La cesión, traspaso o subarriendo se regirán por lo pactado y por los artículos 32 y siguientes de la LAU. " +
        "En su caso, el IVA u otros tributos repercutibles se añadirán a la renta conforme a normativa fiscal. " +
        "EL ARRENDATARIO asumirá las tasas e impuestos ligados a la actividad, salvo pacto distinto.",
    },
    {
      title: "CUARTA. — LEGISLACIÓN Y FUERO",
      content:
        "Título III de la LAU y Código Civil. Jurisdicción: lugar del inmueble.",
    },
  ],
  signatures: [
    { role: "EL ARRENDADOR", nameField: "arrendador_nombre" },
    { role: "EL ARRENDATARIO", nameField: "arrendatario_nombre" },
  ],
  closing: "Firmado por duplicado en el lugar y fecha indicados.",
};

const arrendamientoGarajeTemplate: ContractLegalTemplate = {
  slug: "arrendamiento-garaje",
  title: "CONTRATO DE ARRENDAMIENTO DE PLAZA DE GARAJE O TRASTERO",
  subtitle: "Uso distinto del de vivienda (LAU)",
  comparecencia: COMPARECENCIA_ARRENDAMIENTO + " acuerdan el siguiente arrendamiento.",
  sections: [
    {
      title: "PRIMERA. — OBJETO",
      content:
        "EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO {{descripcion_inmueble}}, " +
        "destinada a aparcamiento o almacenamiento según el uso convenido. " +
        "Queda prohibido el uso como vivienda, taller industrial no autorizado o almacenamiento de materias peligrosas " +
        "sin consentimiento escrito y cumplimiento de normativa.",
    },
    {
      title: "SEGUNDA. — DURACIÓN",
      content:
        "Plazo de {{duracion_contrato}}{{#fecha_inicio}}, con inicio el {{fecha_inicio}}{{/fecha_inicio}}. " +
        "La extinción anticipada por mutuo acuerdo requerirá preaviso fehaciente de {{preaviso_rescision}} días.",
    },
    {
      title: "TERCERA. — RENTA Y FIANZA",
      content:
        "Renta: {{renta_mensual}}, periodicidad {{periodicidad_pago}}, pagadera {{dia_pago}} al IBAN {{iban_pago}}" +
        "{{#fecha_primer_pago}}. Primer pago: {{fecha_primer_pago}}{{/fecha_primer_pago}}. " +
        "Fianza: {{fianza}} (art. 36.1 LAU: dos mensualidades en uso distinto de vivienda, con carácter general).",
    },
    {
      title: "CUARTA. — OBLIGACIONES Y FUERO",
      content:
        "EL ARRENDATARIO usará el espacio con diligencia y respetará las normas de la comunidad de propietarios. " +
        "No podrá cederlo ni subarrendarlo sin autorización escrita. " +
        "Legislación: LAU (uso distinto) y Código Civil. Fuero: lugar del inmueble.",
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
  title: "CONTRATO PRIVADO DE COMPRAVENTA DE VIVIENDA",
  subtitle: "Compraventa entre particulares (Código Civil)",
  comparecencia: COMPARECENCIA_COMPRAVENTA + " acuerdan la compraventa siguiente.",
  sections: [
    {
      title: "PRIMERA. — OBJETO",
      content:
        "EL VENDEDOR vende y EL COMPRADOR compra {{descripcion_inmueble}}. " +
        "La transmisión del dominio se perfeccionará con el otorgamiento de escritura pública e inscripción en el Registro de la Propiedad, " +
        "sin perjuicio de la eficacia inter partes del presente contrato privado.",
    },
    {
      title: "SEGUNDA. — PRECIO Y PAGO",
      content:
        "El precio es {{precio_venta}}. Forma de pago: {{forma_pago_texto}}. " +
        "Fecha prevista de otorgamiento de escritura: {{fecha_escritura}}.",
    },
    {
      title: "TERCERA. — TÍTULO, CARGAS Y DOCUMENTACIÓN",
      content:
        "EL VENDEDOR se obliga a transmitir el inmueble con título legítimo y a facilitar, antes de la escritura, " +
        "nota simple registral actualizada, certificado de eficiencia energética vigente, " +
        "certificado de estar al corriente de gastos de comunidad (si procede), justificante de IBI y demás documentación exigible. " +
        "EL COMPRADOR declara haber podido examinar o haberse reservado el derecho a examinar el estado físico y jurídico del inmueble. " +
        "El inmueble se transmitirá libre de arrendatarios y ocupantes, salvo pacto escrito en contrario.",
    },
    {
      title: "CUARTA. — GASTOS E IMPUESTOS",
      content:
        "Salvo pacto distinto válido, EL COMPRADOR asumirá los gastos de Notaría, Registro e Impuesto sobre Transmisiones Patrimoniales " +
        "o, en su caso, IVA/AJD, según la operación, y EL VENDEDOR la plusvalía municipal (IIVTNU) cuando resulte exigible, " +
        "así como la cancelación de cargas que deba afrontar para transmitir libre de gravámenes, salvo acuerdo distinto.",
    },
    {
      title: "QUINTA. — ENTREGA Y SANEAMIENTO",
      content:
        "La posesión se entregará en el acto de la escritura, salvo pacto de entrega anticipada o diferida documentado. " +
        "EL VENDEDOR responde del saneamiento por evicción y por vicios ocultos conforme al Código Civil, " +
        "sin perjuicio de los pactos lícitos que consten en la escritura.",
    },
    {
      title: "SEXTA. — LEGISLACIÓN Y FUERO",
      content:
        "Código Civil y normativa registral, fiscal y de eficiencia energética aplicable. " +
        "Fuero: Juzgados y Tribunales del lugar del inmueble, salvo norma imperativa.",
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
  title: "CONTRATO PRIVADO DE COMPRAVENTA DE GARAJE O TRASTERO",
  subtitle: "Transmisión de plaza de garaje o trastero",
  comparecencia: COMPARECENCIA_COMPRAVENTA + " acuerdan la compraventa siguiente.",
  sections: [
    {
      title: "PRIMERA. — OBJETO",
      content:
        "EL VENDEDOR vende y EL COMPRADOR compra {{descripcion_inmueble}}. " +
        "La transmisión plena a efectos registrales se formalizará en escritura pública.",
    },
    {
      title: "SEGUNDA. — PRECIO",
      content:
        "Precio de venta: {{precio_venta}}" +
        "{{#fecha_escritura}}. Escritura prevista: {{fecha_escritura}}{{/fecha_escritura}}. " +
        "El pago se efectuará en la forma que las partes concreten en la escritura, " +
        "imputándose al precio las cantidades ya entregadas a cuenta, si las hubiera.",
    },
    {
      title: "TERCERA. — CARGAS, DOCUMENTACIÓN Y GASTOS",
      content:
        "EL VENDEDOR facilitará nota simple, título y, en su caso, CEE y certificados de deudas de comunidad. " +
        "Se transmite libre de ocupantes. " +
        "Gastos e impuestos: conforme a ley y pacto en escritura (criterio habitual: comprador ITP/AJD o IVA; " +
        "vendedor plusvalía municipal si procede; cancelación de cargas a cargo de quien corresponda).",
    },
    {
      title: "CUARTA. — SANEAMIENTO Y FUERO",
      content:
        "Saneamiento por evicción y vicios ocultos conforme al Código Civil. " +
        "Fuero: lugar del inmueble.",
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
  title: "ACUERDO DE EXTINCIÓN DE CONTRATO DE ARRENDAMIENTO",
  subtitle: "Resolución por mutuo acuerdo",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, comparecen:\n\n" +
    "De una parte, {{arrendador_comparecencia}}, en adelante «EL ARRENDADOR».\n\n" +
    "Y de otra parte, {{arrendatario_comparecencia}}, en adelante «EL ARRENDATARIO».\n\n" +
    "En relación con el inmueble sito en {{direccion_inmueble}}, y de común acuerdo,",
  sections: [
    {
      title: "PRIMERA. — EXTINCIÓN",
      content:
        "Las partes acuerdan extinguir el contrato de arrendamiento que les vincula, " +
        "con entrega de llaves y desocupación el {{fecha_entrega_llaves}}. {{clausula_motivo_rescision}} " +
        "A partir de dicha fecha, salvo cantidades pendientes expresamente reconocidas, " +
        "quedarán extinguidas las obligaciones de renta futura derivadas del contrato extinguido.",
    },
    {
      title: "SEGUNDA. — ESTADO DEL INMUEBLE Y FIANZA",
      content:
        "Estado del inmueble a la entrega: {{estado_inmueble}}. " +
        "Devolución de fianza: {{devolucion_fianza}}" +
        "{{#importe_devolucion}} ({{importe_devolucion}}){{/importe_devolucion}}" +
        "{{#observaciones}}. Observaciones: {{observaciones}}{{/observaciones}}. " +
        "La restitución de la fianza se efectuará conforme al artículo 36.4 LAU " +
        "y a lo aquí pactado, una vez comprobadas posibles deudas o desperfectos imputables.",
    },
    {
      title: "TERCERA. — EFECTOS Y FUERO",
      content:
        "El presente documento deja constancia del mutuo acuerdo y no altera el régimen legal " +
        "de desistimiento o resolución unilateral cuando una parte actúe al margen del acuerdo. " +
        "LAU y Código Civil. Tribunales del lugar del inmueble.",
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
  subtitle: "Solicitud a la compañía suministradora",
  comparecencia:
    "En {{lugar_firma}}, a {{fecha_documento}}, {{titular_saliente}} (titular saliente) y {{titular_entrante}} (titular entrante) " +
    "formalizan la siguiente comunicación relativa al inmueble sito en {{direccion_inmueble}}.",
  sections: [
    {
      title: "PRIMERA. — DATOS DEL SUMINISTRO",
      content:
        "Tipo de suministro: {{tipo_suministro}}" +
        "{{#numero_contrato}}. Nº contrato/CUPS: {{numero_contrato}}{{/numero_contrato}}.",
    },
    {
      title: "SEGUNDA. — FECHA Y LECTURA",
      content:
        "Fecha efectiva pretendida del cambio: {{fecha_cambio}}" +
        "{{#lectura_contador}}. Lectura del contador: {{lectura_contador}}{{/lectura_contador}}.",
    },
    {
      title: "TERCERA. — DECLARACIÓN",
      content:
        "Ambas partes declaran que el cambio se solicita de mutuo acuerdo y autorizan a la compañía suministradora " +
        "a tramitar el cambio de titularidad conforme a sus procedimientos, condiciones contractuales y normativa sectorial. " +
        "Este documento no sustituye los formularios, identificaciones o requisitos que exija la comercializadora o distribuidora.",
    },
  ],
  signatures: [
    { role: "TITULAR SALIENTE", nameField: "titular_saliente" },
    { role: "TITULAR ENTRANTE", nameField: "titular_entrante" },
  ],
  closing:
    "Firmado por duplicado a efectos de comunicación a la compañía suministradora.",
};

export const contractTemplates: Record<string, ContractLegalTemplate> = {
  vivienda: viviendaTemplate,
  "finca-rustica": fincaRusticaTemplate,
  arras: arrasTemplate,
  temporada: temporadaTemplate,
  habitacion: habitacionTemplate,
  local: localTemplate,
  "arrendamiento-garaje": arrendamientoGarajeTemplate,
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
