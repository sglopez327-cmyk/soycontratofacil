import {
  createEmptyPartyValues,
  getPartyFieldDefinitions,
  type PartyFormVariant,
  validatePartyStep,
} from "@/lib/party-fields";
import {
  CERTIFICADO_ENERGETICO_OPTIONS,
  validateReferenciaCatastral,
} from "@/lib/property-fields";
import {
  getCampoPeriodicidadPago,
  getCampoSuministrosHabitacion,
  getCamposCondicionesLegalesArrendamiento,
  getCamposFechasContrato,
  getCamposPlazoPago,
  validateDiaPagoMes,
  validateIban,
} from "@/lib/lease-conditions-fields";
import { MOTIVO_RESCISION_OPTIONS } from "@/lib/rescision-fields";
import { fianzaMesesRecomendados } from "@/lib/legal-clause-builders";

function parseEuroAmount(value: string): number | null {
  const normalized = value.trim().replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  if (!normalized) {
    return null;
  }
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

export type ContractFieldType =
  | "text"
  | "number"
  | "date"
  | "email"
  | "textarea"
  | "select"
  | "currency"
  | "checkbox";

export type ContractFieldOption = {
  value: string;
  label: string;
};

export type ContractFieldDefinition = {
  id: string;
  label: string;
  type: ContractFieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: ContractFieldOption[];
};

export type ContractStepDefinition = {
  id: string;
  title: string;
  description?: string;
  fields: ContractFieldDefinition[];
  /** Renderiza PartesForm en lugar de campos sueltos para identificación de partes. */
  partyForm?: PartyFormVariant;
};

/** Configuración completa por slug: formulario, validación y plantilla PDF. */
export type ContractConfig = {
  slug: string;
  templateSlug: string;
  category: "arrendamiento" | "compraventa" | "gestion";
  steps: ContractStepDefinition[];
};

/** @deprecated Usar ContractConfig */
export type ContractSchema = ContractConfig;

function field(
  definition: ContractFieldDefinition
): ContractFieldDefinition {
  return definition;
}

function step(
  definition: ContractStepDefinition
): ContractStepDefinition {
  return definition;
}

function config(
  data: Omit<ContractConfig, "templateSlug"> & { templateSlug?: string }
): ContractConfig {
  return {
    ...data,
    templateSlug: data.templateSlug ?? data.slug,
  };
}

const responsabilidadGastosOptions: ContractFieldOption[] = [
  { value: "arrendatario", label: "A cargo del arrendatario" },
  { value: "arrendador", label: "A cargo del arrendador" },
  { value: "compartidos", label: "Compartidos" },
];

const camposGastosVivienda: ContractFieldDefinition[] = [
  field({
    id: "ibi",
    label: "IBI (Impuesto sobre Bienes Inmuebles)",
    type: "select",
    required: true,
    options: responsabilidadGastosOptions,
    helpText: "Indica quién asume el pago del IBI.",
  }),
  field({
    id: "gastos_comunidad",
    label: "Gastos de comunidad",
    type: "select",
    required: true,
    options: responsabilidadGastosOptions,
  }),
];

const pasoPartesArrendamiento = step({
  id: "partes",
  title: "Partes",
  description:
    "Identificación completa del arrendador y del arrendatario conforme a los datos exigidos en la comparecencia del contrato.",
  fields: [],
  partyForm: "arrendamiento",
});

const pasoPartesCompraventa = step({
  id: "partes",
  title: "Partes",
  description:
    "Identificación completa del vendedor y del comprador conforme a los datos exigidos en la comparecencia del contrato.",
  fields: [],
  partyForm: "compraventa",
});

const campoReferenciaCatastral = field({
  id: "referencia_catastral",
  label: "Referencia catastral",
  type: "text",
  required: true,
  placeholder: "1234567DF1234A0001XX",
  helpText:
    "Identificador catastral alfanumérico de 20 caracteres. Obligatorio para validez registral y tributaria.",
});

const campoSuperficieMetros = field({
  id: "superficie",
  label: "Superficie (m²)",
  type: "number",
  required: true,
  placeholder: "85",
  helpText: "Superficie útil o construida del inmueble en metros cuadrados.",
});

const campoCertificadoEnergetico = field({
  id: "certificado_energetico",
  label: "Certificado de Eficiencia Energética (CEE)",
  type: "select",
  required: true,
  options: CERTIFICADO_ENERGETICO_OPTIONS,
  helpText: "Calificación vigente del certificado o indique si está en trámite.",
});

const camposIdentificacionInmueble: ContractFieldDefinition[] = [
  campoReferenciaCatastral,
  campoSuperficieMetros,
  campoCertificadoEnergetico,
];

const camposUbicacionInmueble: ContractFieldDefinition[] = [
  field({
    id: "direccion_inmueble",
    label: "Dirección del inmueble",
    type: "text",
    required: true,
    placeholder: "Calle, número, piso y puerta",
  }),
  field({
    id: "ciudad",
    label: "Ciudad",
    type: "text",
    required: false,
    placeholder: "Madrid",
  }),
  field({
    id: "provincia",
    label: "Provincia",
    type: "text",
    required: false,
    placeholder: "Madrid",
  }),
  field({
    id: "codigo_postal",
    label: "Código postal",
    type: "text",
    required: false,
    placeholder: "28001",
  }),
];

const campoAlquilerAmueblado = field({
  id: "alquiler_amueblado",
  label: "¿Se alquila amueblado?",
  type: "checkbox",
  required: false,
});

const campoMetrosEscaparate = field({
  id: "metros_escaparate",
  label: "Metros de escaparate (m)",
  type: "number",
  required: false,
  placeholder: "3.5",
  helpText: "Longitud aproximada del escaparate o fachada comercial.",
});

const campoSuperficiePlaza = field({
  id: "superficie_plaza",
  label: "Superficie aproximada (m²)",
  type: "number",
  required: false,
  placeholder: "12",
  helpText: "Superficie útil de la plaza de garaje o trastero, si se conoce.",
});

/** Plazo de pago mensual compartido por los 5 contratos de arrendamiento. */
const camposPlazoPago = getCamposPlazoPago(field);
const campoPeriodicidadPago = getCampoPeriodicidadPago(field);
const camposFechasContrato = getCamposFechasContrato(field);
const camposFechasContratoInicioOpcional = getCamposFechasContrato(field, {
  fechaInicioRequired: false,
});

const condicionesEconomicasArrendamiento: ContractFieldDefinition[] = [
  field({
    id: "renta_mensual",
    label: "Renta mensual (€)",
    type: "currency",
    required: true,
    placeholder: "850",
    helpText: "Importe mensual sin incluir suministros, salvo pacto en contrario.",
  }),
  field({
    id: "fianza",
    label: "Fianza (€)",
    type: "currency",
    required: true,
    placeholder: "850",
    helpText:
      "Vivienda habitual: fianza legal de 1 mes de renta (art. 36 LAU). Uso distinto (local, temporada, garaje…): 2 meses.",
  }),
  field({
    id: "duracion_contrato",
    label: "Duración del contrato",
    type: "select",
    required: true,
    options: [
      { value: "1", label: "1 año" },
      { value: "3", label: "3 años" },
      { value: "5", label: "5 años" },
      { value: "7", label: "7 años" },
      { value: "otro", label: "Otra duración" },
    ],
  }),
];

const camposCondicionesLegalesBase =
  getCamposCondicionesLegalesArrendamiento(field);

const camposCondicionesLegalesVivienda =
  getCamposCondicionesLegalesArrendamiento(field, {
    includeCambioTitularidad: true,
    cambioTitularidadRequired: false,
  });

export const contractConfigs: Record<string, ContractConfig> = {
  vivienda: config({
    slug: "vivienda",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "inmueble",
        title: "Inmueble",
        description: "Ubicación y características de la vivienda arrendada.",
        fields: [
          ...camposUbicacionInmueble,
          ...camposIdentificacionInmueble,
          campoAlquilerAmueblado,
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        description: "Renta, fianza y plazo del arrendamiento.",
        fields: [
          ...condicionesEconomicasArrendamiento,
          campoPeriodicidadPago,
          ...camposPlazoPago,
          ...camposGastosVivienda,
          ...camposCondicionesLegalesVivienda,
          ...camposFechasContratoInicioOpcional,
        ],
      }),
    ],
  }),

  temporada: config({
    slug: "temporada",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "inmueble",
        title: "Inmueble y uso",
        description: "Ubicación, identificación catastral y motivo del arrendamiento.",
        fields: [
          ...camposUbicacionInmueble,
          ...camposIdentificacionInmueble,
          field({
            id: "motivo_temporada",
            label: "Motivo del arrendamiento de temporada",
            type: "select",
            required: true,
            options: [
              { value: "estudios", label: "Estudios o formación" },
              { value: "trabajo", label: "Traslado laboral temporal" },
              { value: "vacacional", label: "Uso vacacional" },
              { value: "otro", label: "Otro motivo justificado" },
            ],
          }),
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        fields: [
          field({
            id: "renta_mensual",
            label: "Renta mensual (€)",
            type: "currency",
            required: true,
            placeholder: "900",
          }),
          field({
            id: "fianza",
            label: "Fianza (€)",
            type: "currency",
            required: true,
            placeholder: "900",
            helpText: "En temporada (uso distinto de vivienda): fianza legal de 2 meses de renta (art. 36.1 LAU).",
          }),
          campoPeriodicidadPago,
          ...camposPlazoPago,
          ...camposCondicionesLegalesBase,
          ...camposFechasContrato,
          field({
            id: "fecha_fin",
            label: "Fecha de finalización",
            type: "date",
            required: true,
          }),
        ],
      }),
    ],
  }),

  habitacion: config({
    slug: "habitacion",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "habitacion",
        title: "Habitación",
        description: "Ubicación de la vivienda e identificación del espacio arrendado.",
        fields: [
          ...camposUbicacionInmueble.map((campo) =>
            campo.id === "direccion_inmueble"
              ? { ...campo, label: "Dirección de la vivienda" }
              : campo
          ),
          ...camposIdentificacionInmueble,
          field({
            id: "habitacion_descripcion",
            label: "Descripción de la habitación",
            type: "textarea",
            required: true,
            placeholder: "Habitación individual, amueblada, con ventana exterior…",
          }),
          field({
            id: "zonas_comunes",
            label: "Uso de zonas comunes",
            type: "textarea",
            required: false,
            placeholder: "Cocina, baño compartido, salón…",
          }),
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        fields: [
          field({
            id: "renta_mensual",
            label: "Renta mensual (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "fianza",
            label: "Fianza (€)",
            type: "currency",
            required: true,
            helpText: "Habitación: recomienda al menos 1 mes de renta; confirma el encaje jurídico de tu caso.",
          }),
          ...camposCondicionesLegalesBase,
          field({
            id: "duracion_contrato",
            label: "Duración del contrato",
            type: "select",
            required: true,
            options: [
              { value: "6", label: "6 meses" },
              { value: "12", label: "12 meses" },
              { value: "indefinida", label: "Indefinida" },
            ],
          }),
          ...camposFechasContrato,
        ],
      }),
    ],
  }),

  local: config({
    slug: "local",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "local",
        title: "Local",
        description: "Ubicación, identificación catastral y características del local.",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Dirección del local",
            type: "text",
            required: true,
            placeholder: "Calle, número, planta y local",
          }),
          field({
            id: "ciudad",
            label: "Ciudad",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "provincia",
            label: "Provincia",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "codigo_postal",
            label: "Código postal",
            type: "text",
            required: false,
            placeholder: "28001",
          }),
          field({
            id: "actividad_comercial",
            label: "Actividad comercial permitida",
            type: "text",
            required: true,
            placeholder: "Comercio minorista, oficina, restauración…",
          }),
          ...camposIdentificacionInmueble,
          campoMetrosEscaparate,
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        fields: [
          field({
            id: "renta_mensual",
            label: "Renta mensual (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "fianza",
            label: "Fianza (€)",
            type: "currency",
            required: true,
            helpText: "Local (uso distinto de vivienda): fianza legal de 2 meses de renta (art. 36.1 LAU).",
          }),
          field({
            id: "duracion_contrato",
            label: "Duración del contrato",
            type: "select",
            required: true,
            options: [
              { value: "5", label: "5 años" },
              { value: "7", label: "7 años" },
              { value: "10", label: "10 años" },
              { value: "otro", label: "Otra duración" },
            ],
          }),
          campoPeriodicidadPago,
          ...camposPlazoPago,
          field({
            id: "gastos_comunidad",
            label: "Gastos de comunidad",
            type: "select",
            required: false,
            options: responsabilidadGastosOptions,
          }),
          ...camposCondicionesLegalesBase,
          ...camposFechasContrato,
        ],
      }),
    ],
  }),

  "finca-rustica": config({
    slug: "finca-rustica",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "finca",
        title: "Finca",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Ubicación de la finca",
            type: "text",
            required: true,
            placeholder: "Paraje, municipio y provincia",
          }),
          field({
            id: "provincia",
            label: "Provincia",
            type: "text",
            required: false,
            placeholder: "Toledo",
          }),
          field({
            id: "referencia_catastral",
            label: "Referencia catastral",
            type: "text",
            required: true,
            placeholder: "1234567DF1234A0001XX",
            helpText:
              "Identificador catastral alfanumérico de 20 caracteres. Obligatorio para validez registral y tributaria.",
          }),
          field({
            id: "superficie",
            label: "Superficie (ha o m²)",
            type: "text",
            required: true,
            placeholder: "2,5 ha",
          }),
          campoCertificadoEnergetico,
          field({
            id: "uso_previsto",
            label: "Uso o explotación prevista",
            type: "textarea",
            required: false,
            placeholder: "Agricultura, ganadería, caza…",
          }),
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        fields: [
          field({
            id: "renta_mensual",
            label: "Renta (€/año o €/mes)",
            type: "currency",
            required: true,
            helpText: "Indica el importe y especifica la periodicidad en observaciones si es necesario.",
          }),
          field({
            id: "fianza",
            label: "Fianza (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "duracion_contrato",
            label: "Duración del contrato",
            type: "select",
            required: true,
            options: [
              { value: "5", label: "5 años" },
              { value: "10", label: "10 años" },
              { value: "15", label: "15 años" },
              { value: "otro", label: "Otra duración" },
            ],
          }),
          campoPeriodicidadPago,
          ...camposPlazoPago,
          ...camposCondicionesLegalesBase,
          ...camposFechasContrato,
        ],
      }),
    ],
  }),

  "arrendamiento-garaje": config({
    slug: "arrendamiento-garaje",
    category: "arrendamiento",
    steps: [
      pasoPartesArrendamiento,
      step({
        id: "inmueble",
        title: "Plaza o trastero",
        description: "Ubicación e identificación de la plaza de garaje o trastero arrendado.",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Dirección del edificio o garaje",
            type: "text",
            required: true,
            placeholder: "Calle, número y planta del parking",
          }),
          field({
            id: "ciudad",
            label: "Ciudad",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "provincia",
            label: "Provincia",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "codigo_postal",
            label: "Código postal",
            type: "text",
            required: false,
            placeholder: "28001",
          }),
          field({
            id: "numero_plaza",
            label: "Número de plaza o trastero",
            type: "text",
            required: true,
            placeholder: "Plaza 42, trastero 12…",
          }),
          campoReferenciaCatastral,
          campoSuperficiePlaza,
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones",
        description: "Renta, fianza y plazo del arrendamiento.",
        fields: [
          ...condicionesEconomicasArrendamiento,
          campoPeriodicidadPago,
          ...camposPlazoPago,
          ...camposCondicionesLegalesBase,
          ...camposFechasContratoInicioOpcional,
        ],
      }),
    ],
  }),

  "compraventa-vivienda": config({
    slug: "compraventa-vivienda",
    category: "compraventa",
    steps: [
      pasoPartesCompraventa,
      step({
        id: "inmueble",
        title: "Inmueble",
        description: "Ubicación e identificación catastral de la vivienda en venta.",
        fields: [...camposUbicacionInmueble, ...camposIdentificacionInmueble],
      }),
      step({
        id: "condiciones",
        title: "Condiciones de venta",
        fields: [
          field({
            id: "precio_venta",
            label: "Precio de venta (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "fecha_escritura",
            label: "Fecha prevista de escritura",
            type: "date",
            required: true,
          }),
          field({
            id: "forma_pago",
            label: "Forma de pago",
            type: "select",
            required: true,
            options: [
              { value: "contado", label: "Al contado" },
              { value: "hipoteca", label: "Con financiación hipotecaria" },
              { value: "mixta", label: "Entrega a cuenta + hipoteca" },
            ],
          }),
        ],
      }),
    ],
  }),

  arras: config({
    slug: "arras",
    category: "compraventa",
    steps: [
      pasoPartesCompraventa,
      step({
        id: "inmueble",
        title: "Inmueble",
        description: "Ubicación e identificación catastral del inmueble objeto de arras.",
        fields: [...camposUbicacionInmueble, ...camposIdentificacionInmueble],
      }),
      step({
        id: "arras",
        title: "Condiciones de las arras",
        fields: [
          field({
            id: "precio_total",
            label: "Precio de compraventa (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "cantidad_arras",
            label: "Señal / arras entregadas (€)",
            type: "currency",
            required: true,
            helpText: "Importe entregado en este acto en concepto de arras.",
          }),
          field({
            id: "tipo_arras",
            label: "Tipo de arras",
            type: "select",
            required: true,
            options: [
              { value: "penitenciales", label: "Penitenciales" },
              { value: "confirmatorias", label: "Confirmatorias" },
              { value: "penales", label: "Penales" },
            ],
          }),
          field({
            id: "plazo_compraventa",
            label: "Plazo para formalizar la compraventa",
            type: "date",
            required: true,
          }),
        ],
      }),
    ],
  }),

  "garaje-trastero": config({
    slug: "garaje-trastero",
    category: "compraventa",
    steps: [
      pasoPartesCompraventa,
      step({
        id: "inmueble",
        title: "Plaza o trastero",
        description: "Ubicación e identificación de la plaza o trastero en venta.",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Dirección del edificio o garaje",
            type: "text",
            required: true,
          }),
          field({
            id: "ciudad",
            label: "Ciudad",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "provincia",
            label: "Provincia",
            type: "text",
            required: false,
            placeholder: "Madrid",
          }),
          field({
            id: "codigo_postal",
            label: "Código postal",
            type: "text",
            required: false,
            placeholder: "28001",
          }),
          field({
            id: "numero_plaza",
            label: "Número de plaza o trastero",
            type: "text",
            required: true,
            placeholder: "Plaza 42, trastero 12…",
          }),
          ...camposIdentificacionInmueble,
          campoSuperficiePlaza,
        ],
      }),
      step({
        id: "condiciones",
        title: "Condiciones de venta",
        fields: [
          field({
            id: "precio_venta",
            label: "Precio de venta (€)",
            type: "currency",
            required: true,
          }),
          field({
            id: "fecha_escritura",
            label: "Fecha prevista de escritura",
            type: "date",
            required: false,
          }),
        ],
      }),
    ],
  }),

  rescision: config({
    slug: "rescision",
    category: "gestion",
    steps: [
      step({
        id: "partes",
        title: "Partes",
        description: "Identificación de las partes y del inmueble afectado.",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Dirección del inmueble",
            type: "text",
            required: true,
          }),
        ],
        partyForm: "arrendamiento",
      }),
      step({
        id: "rescision",
        title: "Rescisión",
        description: "Datos específicos de la entrega y la fianza.",
        fields: [
          field({
            id: "fecha_entrega_llaves",
            label: "Fecha de entrega de llaves",
            type: "date",
            required: true,
          }),
          field({
            id: "motivo_rescision",
            label: "Motivo de la rescisión",
            type: "select",
            required: false,
            options: MOTIVO_RESCISION_OPTIONS,
            helpText:
              "Opcional. Si no lo indicas o eliges «Otro», el documento incluirá una redacción legal genérica.",
          }),
          field({
            id: "estado_inmueble",
            label: "Estado del inmueble",
            type: "select",
            required: true,
            options: [
              { value: "buen_estado", label: "Buen estado general" },
              { value: "deterioros_menores", label: "Deterioros menores" },
              { value: "deterioros_relevantes", label: "Deterioros relevantes" },
              { value: "pendiente_revision", label: "Pendiente de revisión conjunta" },
            ],
          }),
          field({
            id: "devolucion_fianza",
            label: "Devolución de fianza",
            type: "select",
            required: true,
            options: [
              { value: "total", label: "Devolución total" },
              { value: "parcial", label: "Devolución parcial" },
              { value: "no_devolucion", label: "Sin devolución" },
              { value: "pendiente", label: "Pendiente de liquidación" },
            ],
          }),
          field({
            id: "importe_devolucion",
            label: "Importe a devolver (€)",
            type: "currency",
            required: false,
            helpText: "Obligatorio si la devolución es total o parcial.",
          }),
          field({
            id: "observaciones",
            label: "Observaciones",
            type: "textarea",
            required: false,
            placeholder: "Daños, limpieza, suministros pendientes…",
          }),
        ],
      }),
    ],
  }),

  "cambio-suministros": config({
    slug: "cambio-suministros",
    category: "gestion",
    steps: [
      step({
        id: "partes",
        title: "Titulares",
        fields: [
          field({
            id: "titular_saliente",
            label: "Titular saliente",
            type: "text",
            required: true,
          }),
          field({
            id: "titular_entrante",
            label: "Titular entrante",
            type: "text",
            required: true,
          }),
        ],
      }),
      step({
        id: "suministro",
        title: "Suministro",
        fields: [
          field({
            id: "direccion_inmueble",
            label: "Dirección del inmueble",
            type: "text",
            required: true,
          }),
          field({
            id: "tipo_suministro",
            label: "Tipo de suministro",
            type: "select",
            required: true,
            options: [
              { value: "luz", label: "Electricidad" },
              { value: "gas", label: "Gas" },
              { value: "agua", label: "Agua" },
              { value: "todos", label: "Todos los suministros" },
            ],
          }),
          field({
            id: "numero_contrato",
            label: "Número de contrato o CUPS",
            type: "text",
            required: false,
          }),
        ],
      }),
      step({
        id: "fecha",
        title: "Fecha del cambio",
        fields: [
          field({
            id: "fecha_cambio",
            label: "Fecha efectiva del cambio",
            type: "date",
            required: true,
          }),
          field({
            id: "lectura_contador",
            label: "Lectura del contador",
            type: "text",
            required: false,
            placeholder: "Opcional, según compañía",
          }),
        ],
      }),
    ],
  }),
};

/** @deprecated Usar contractConfigs */
export const contractSchemas = contractConfigs;

export function getContractConfig(slug: string): ContractConfig | undefined {
  return contractConfigs[slug];
}

/** @deprecated Usar getContractConfig */
export function getContractSchema(slug: string): ContractSchema | undefined {
  return getContractConfig(slug);
}

export function getConfigFields(config: ContractConfig): ContractFieldDefinition[] {
  return config.steps.flatMap((stepDefinition) => {
    const partyFields = stepDefinition.partyForm
      ? getPartyFieldDefinitions(stepDefinition.partyForm)
      : [];
    return [...partyFields, ...stepDefinition.fields];
  });
}

/** @deprecated Usar getConfigFields */
export function getSchemaFields(schema: ContractSchema): ContractFieldDefinition[] {
  return getConfigFields(schema);
}

export function validateField(
  fieldDefinition: ContractFieldDefinition,
  value: string,
  allValues: Record<string, string> = {},
  config?: ContractConfig
): string | null {
  const trimmed = value.trim();

  if (fieldDefinition.id === "importe_devolucion") {
    const devolucion = allValues.devolucion_fianza;
    if (
      (devolucion === "total" || devolucion === "parcial") &&
      !trimmed
    ) {
      return "Indica el importe a devolver";
    }
  }

  if (fieldDefinition.required && !trimmed) {
    return `${fieldDefinition.label} es obligatorio`;
  }

  if (fieldDefinition.id === "referencia_catastral") {
    if (!trimmed) {
      return "La referencia catastral es obligatoria";
    }
    if (!validateReferenciaCatastral(trimmed)) {
      return "Introduce una referencia catastral válida (14 o 20 caracteres alfanuméricos)";
    }
    return null;
  }

  if (fieldDefinition.id === "superficie" && fieldDefinition.type === "number") {
    if (!trimmed) {
      return null;
    }
    const superficie = Number(trimmed.replace(",", "."));
    if (Number.isNaN(superficie) || superficie <= 0) {
      return "La superficie debe ser mayor que 0 m²";
    }
    return null;
  }

  if (fieldDefinition.id === "codigo_postal" && trimmed && !/^\d{5}$/.test(trimmed)) {
    return "Introduce un código postal válido (5 dígitos)";
  }

  if (fieldDefinition.id === "preaviso_rescision") {
    if (!trimmed) {
      return null;
    }
    const dias = Number(trimmed);
    if (!Number.isInteger(dias) || dias <= 0) {
      return "Introduce un número entero de días mayor que 0";
    }
    if (config?.slug === "vivienda" && dias < 30) {
      return "En vivienda habitual el preaviso mínimo legal es de 30 días (art. 11 LAU)";
    }
    return null;
  }

  if (fieldDefinition.id === "fianza" && trimmed && config) {
    const meses = fianzaMesesRecomendados(config.slug);
    const fianza = parseEuroAmount(trimmed);
    const renta = parseEuroAmount(allValues.renta_mensual ?? "");
    if (meses && fianza !== null && renta !== null && renta > 0) {
      const minimo = renta * meses * 0.98;
      if (fianza + 0.001 < minimo) {
        return `Según el art. 36 LAU, la fianza legal orientativa es de ${meses} mes${meses > 1 ? "es" : ""} de renta (mín. aprox. ${Math.round(renta * meses)} €)`;
      }
    }
  }

  if (
    fieldDefinition.id === "dia_pago_inicio" ||
    fieldDefinition.id === "dia_pago_fin"
  ) {
    return validateDiaPagoMes(fieldDefinition.id, value, allValues);
  }

  if (fieldDefinition.id === "iban_pago") {
    if (!trimmed) {
      return null;
    }
    if (!validateIban(trimmed)) {
      return "Introduce un IBAN español válido (ES + 22 dígitos)";
    }
    return null;
  }

  if (!trimmed) {
    return null;
  }

  if (fieldDefinition.type === "number" || fieldDefinition.type === "currency") {
    if (
      fieldDefinition.id === "dia_pago_inicio" ||
      fieldDefinition.id === "dia_pago_fin" ||
      fieldDefinition.id === "preaviso_rescision"
    ) {
      return null;
    }

    const normalized = trimmed.replace(/\./g, "").replace(",", ".");
    if (Number.isNaN(Number(normalized)) || Number(normalized) < 0) {
      return `${fieldDefinition.label} debe ser un importe válido`;
    }
  }

  if (fieldDefinition.type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return "Introduce un correo electrónico válido";
    }
  }

  return null;
}

export function validateStep(
  stepDefinition: ContractStepDefinition,
  values: Record<string, string>,
  config?: ContractConfig
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (stepDefinition.partyForm) {
    Object.assign(errors, validatePartyStep(stepDefinition.partyForm, values));
  }

  for (const fieldDefinition of stepDefinition.fields) {
    const error = validateField(
      fieldDefinition,
      values[fieldDefinition.id] ?? "",
      values,
      config
    );
    if (error) {
      errors[fieldDefinition.id] = error;
    }
  }

  return errors;
}

export function validateConfig(
  config: ContractConfig,
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const stepDefinition of config.steps) {
    Object.assign(errors, validateStep(stepDefinition, values, config));
  }

  return errors;
}

/** @deprecated Usar validateConfig */
export function validateSchema(
  schema: ContractSchema,
  values: Record<string, string>
): Record<string, string> {
  return validateConfig(schema, values);
}

export function createEmptyFormValues(config: ContractConfig): Record<string, string> {
  const values: Record<string, string> = {};

  for (const stepDefinition of config.steps) {
    if (stepDefinition.partyForm) {
      Object.assign(values, createEmptyPartyValues(stepDefinition.partyForm));
    }

    for (const fieldDefinition of stepDefinition.fields) {
      if (!(fieldDefinition.id in values)) {
        values[fieldDefinition.id] = "";
      }
    }
  }

  return values;
}

export function hasConfigForSlug(slug: string): boolean {
  return slug in contractConfigs;
}

/** @deprecated Usar hasConfigForSlug */
export function hasSchemaForSlug(slug: string): boolean {
  return hasConfigForSlug(slug);
}

export function getAllConfigSlugs(): string[] {
  return Object.keys(contractConfigs);
}

/** @deprecated Usar getAllConfigSlugs */
export function getAllSchemaSlugs(): string[] {
  return getAllConfigSlugs();
}
