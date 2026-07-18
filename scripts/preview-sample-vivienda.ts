/**
 * Genera un PDF de muestra con el MISMO motor que la web (times, firmas, pie, logo).
 * Uso: npx tsx scripts/preview-sample-vivienda.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  createEmptyFormValues,
  getConfigFields,
  getContractConfig,
} from "../src/lib/contract-config";
import { buildContractPdfDocument } from "../src/lib/generate-contract-pdf";

/** Datos de ejemplo alineados con un contrato real de la app. */
const SAMPLE: Record<string, string> = {
  arrendador_tipo_persona: "fisica",
  arrendador_tipo_documento: "dni",
  arrendador_nombre: "Samuel Garnet",
  arrendador_numero_documento: "79018962R",
  arrendador_direccion: "Calle Cuenca 12",
  arrendador_ciudad: "Mijas",
  arrendador_provincia: "Malaga",
  arrendador_codigo_postal: "29651",
  arrendador_email: "samuel@gmail.com",
  arrendador_telefono: "633737741",
  arrendatario_tipo_persona: "fisica",
  arrendatario_tipo_documento: "dni",
  arrendatario_nombre: "Juana la Loca",
  arrendatario_numero_documento: "79018962R",
  arrendatario_direccion: "Calle Libertad 8",
  arrendatario_ciudad: "Mijas",
  arrendatario_provincia: "Malaga",
  arrendatario_codigo_postal: "29651",
  arrendatario_email: "juana@gmail.com",
  arrendatario_telefono: "633524178",
  direccion_inmueble: "Calle Coquina 6",
  ciudad: "Mijas",
  provincia: "Malaga",
  codigo_postal: "29651",
  referencia_catastral: "12458965212457847ASD",
  superficie: "80",
  certificado_energetico: "A",
  alquiler_amueblado: "si",
  renta_mensual: "800",
  fianza: "800",
  duracion_contrato: "12",
  periodicidad_pago: "mensual",
  dia_pago_inicio: "1",
  dia_pago_fin: "3",
  ibi: "arrendatario",
  gastos_comunidad: "arrendatario",
  plazo_cambio_suministros: "no_cambio",
  preaviso_rescision: "30",
  iban_pago: "ES4200491500010123456789",
  fecha_inicio: "2026-08-01",
  fecha_primer_pago: "2026-09-05",
};

async function main() {
  const config = getContractConfig("vivienda");
  if (!config) {
    throw new Error("No hay config de vivienda");
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
    contractTitle: "Vivienda",
    values,
  });

  const outPdf = join(
    process.env.USERPROFILE ?? process.cwd(),
    "Desktop",
    "contrato-muestra-vivienda-CORRECTO.pdf"
  );
  const repoPdf = join(process.cwd(), "contrato-muestra-vivienda-CORRECTO.pdf");
  const bytes = Buffer.from(doc.output("arraybuffer"));
  writeFileSync(outPdf, bytes);
  writeFileSync(repoPdf, bytes);

  console.log(`PDF (escritorio): ${outPdf}`);
  console.log(`PDF (proyecto):   ${repoPdf}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
