import {
  Building2,
  CalendarRange,
  DoorOpen,
  FileSignature,
  FileText,
  Home,
  KeyRound,
  Landmark,
  Package,
  PlugZap,
  Trees,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type ContractType = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ContractCategory = {
  id: string;
  title: string;
  description: string;
  contracts: ContractType[];
};

export const contractCategories: ContractCategory[] = [
  {
    id: "arrendamientos",
    title: "Arrendamientos",
    description: "Contratos de alquiler para todo tipo de inmuebles",
    contracts: [
      {
        id: "vivienda",
        title: "Vivienda",
        description: "Alquiler de vivienda habitual con todas las garantías legales",
        href: "/contratos/arrendamiento/vivienda",
        icon: Home,
      },
      {
        id: "temporada",
        title: "Temporada",
        description: "Arrendamiento de temporada o uso distinto del de vivienda",
        href: "/contratos/arrendamiento/temporada",
        icon: CalendarRange,
      },
      {
        id: "habitacion",
        title: "Habitación",
        description: "Alquiler de habitación en vivienda compartida",
        href: "/contratos/arrendamiento/habitacion",
        icon: DoorOpen,
      },
      {
        id: "local",
        title: "Local",
        description: "Arrendamiento de local comercial o de negocio",
        href: "/contratos/arrendamiento/local",
        icon: Building2,
      },
      {
        id: "finca-rustica",
        title: "Finca Rústica",
        description: "Alquiler de finca rústica, terreno o explotación agrícola",
        href: "/contratos/arrendamiento/finca-rustica",
        icon: Trees,
      },
    ],
  },
  {
    id: "compraventa",
    title: "Compraventa",
    description: "Documentos para la transmisión de propiedad",
    contracts: [
      {
        id: "vivienda",
        title: "Vivienda",
        description: "Contrato de compraventa de vivienda entre particulares",
        href: "/contratos/compraventa/vivienda",
        icon: Landmark,
      },
      {
        id: "arras",
        title: "Arras",
        description: "Contrato de arras penitenciales o confirmatorias",
        href: "/contratos/compraventa/arras",
        icon: FileSignature,
      },
      {
        id: "garaje-trastero",
        title: "Garaje / Trastero",
        description: "Compraventa de plaza de garaje o trastero",
        href: "/contratos/compraventa/garaje-trastero",
        icon: Warehouse,
      },
    ],
  },
  {
    id: "gestion",
    title: "Gestión",
    description: "Trámites y documentos complementarios",
    contracts: [
      {
        id: "rescisión",
        title: "Rescisión de contrato",
        description: "Documento para la finalización anticipada del arrendamiento",
        href: "/contratos/gestion/rescision",
        icon: FileText,
      },
      {
        id: "suministros",
        title: "Cambio de suministros",
        description: "Comunicación de cambio de titularidad de suministros",
        href: "/contratos/gestion/cambio-suministros",
        icon: PlugZap,
      },
    ],
  },
];

export const navLinks = [
  { href: "/mis-contratos", label: "Mis Contratos", icon: Package },
  { href: "/precios", label: "Precios", icon: KeyRound },
  { href: "/ayuda", label: "Ayuda", icon: FileText },
] as const;
