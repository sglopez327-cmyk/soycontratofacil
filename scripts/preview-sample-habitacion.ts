/**
 * Genera un PDF de muestra de alquiler de habitación (mismo motor que la web).
 * Uso: npx tsx scripts/preview-sample-habitacion.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  createEmptyFormValues,
  getConfigFields,
  getContractConfig,
} from "../src/lib/contract-config";
import { buildContractPdfDocument } from "../src/lib/generate-contract-pdf";

/** Datos ficticios realistas para revisar el PDF. */
const SAMPLE: Record<string, string> = {
  arrendador_tipo_persona: "fisica",
  arrendador_tipo_documento: "dni",
  arrendador_nombre: "Carmen Ruiz Delgado",
  arrendador_numero_documento: "25147896K",
  arrendador_direccion: "Calle de Fuencarral 48, 3º A",
  arrendador_ciudad: "Madrid",
  arrendador_provincia: "Madrid",
  arrendador_codigo_postal: "28004",
  arrendador_email: "carmen.ruiz@email.com",
  arrendador_telefono: "612345678",

  arrendatario_tipo_persona: "fisica",
  arrendatario_tipo_documento: "nie",
  arrendatario_nombre: "Lucas Moretti Bianchi",
  arrendatario_numero_documento: "X1234567L",
  arrendatario_direccion: "Via Roma 15",
  arrendatario_ciudad: "Milán",
  arrendatario_provincia: "Milán",
  arrendatario_codigo_postal: "20121",
  arrendatario_email: "lucas.moretti@email.com",
  arrendatario_telefono: "698765432",

  direccion_inmueble: "Calle de Fuencarral 48, 3º A",
  ciudad: "Madrid",
  provincia: "Madrid",
  codigo_postal: "28004",
  referencia_catastral: "1234567VK4700A0001WX",
  superficie: "78",
  certificado_energetico: "D",

  habitacion_descripcion:
    "Habitación individual amueblada (cama de 135 cm, armario empotrado, escritorio y silla), con ventana exterior a patio interior, de unos 12 m², situada al fondo del pasillo.",
  zonas_comunes:
    "Uso compartido de cocina, baño completo, salón-comedor y terraza. Limpieza de zonas comunes a cargo de todos los ocupantes por turnos semanales.",

  renta_mensual: "450",
  fianza: "450",
  preaviso_rescision: "30",
  iban_pago: "ES9121000418450200051332",
  duracion_contrato: "12",
  fecha_inicio: "2026-10-01",
  fecha_primer_pago: "2026-10-01",
};

async function main() {
  const config = getContractConfig("habitacion");
  if (!config) {
    throw new Error("No hay config de habitacion");
  }

  const values = { ...createEmptyFormValues(config), ...SAMPLE };
  const missing = getConfigFields(config)
    .filter((field) => field.required && !values[field.id]?.trim())
    .map((field) => field.id);

  if (missing.length > 0) {
    throw new Error(`Faltan campos: ${missing.join(", ")}`);
  }

  const doc = await buildContractPdfDocument({
    config,
    contractTitle: "Alquiler de habitación",
    values,
  });

  const fileName = "contrato-muestra-habitacion-logo-nitido.pdf";
  const outPdf = join(
    process.env.USERPROFILE ?? process.cwd(),
    "Desktop",
    fileName
  );
  const bytes = Buffer.from(doc.output("arraybuffer"));
  writeFileSync(outPdf, bytes);

  console.log(`PDF (escritorio): ${outPdf}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
