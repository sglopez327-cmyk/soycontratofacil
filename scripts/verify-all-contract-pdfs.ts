/**
 * Comprueba que todos los slugs del catálogo generan PDF con el motor único.
 * Uso: npx tsx scripts/verify-all-contract-pdfs.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { getAllCatalogSlugs } from "../src/lib/contract-catalog";
import {
  createEmptyFormValues,
  getAllConfigSlugs,
  getConfigFields,
  getContractConfig,
} from "../src/lib/contract-config";
import { buildContractPdfDocument } from "../src/lib/generate-contract-pdf";

const FILLERS: Record<string, string> = {
  arrendador_tipo_persona: "fisica",
  arrendador_tipo_documento: "dni",
  arrendador_nombre: "Ana Test",
  arrendador_numero_documento: "12345678Z",
  arrendador_direccion: "Calle 1",
  arrendador_ciudad: "Madrid",
  arrendador_provincia: "Madrid",
  arrendador_codigo_postal: "28001",
  arrendador_email: "a@a.com",
  arrendador_telefono: "600000001",
  arrendatario_tipo_persona: "fisica",
  arrendatario_tipo_documento: "dni",
  arrendatario_nombre: "Luis Test",
  arrendatario_numero_documento: "87654321X",
  arrendatario_direccion: "Calle 2",
  arrendatario_ciudad: "Madrid",
  arrendatario_provincia: "Madrid",
  arrendatario_codigo_postal: "28002",
  arrendatario_email: "b@b.com",
  arrendatario_telefono: "600000002",
  vendedor_tipo_persona: "fisica",
  vendedor_tipo_documento: "dni",
  vendedor_nombre: "Ana Test",
  vendedor_numero_documento: "12345678Z",
  vendedor_direccion: "Calle 1",
  vendedor_ciudad: "Madrid",
  vendedor_provincia: "Madrid",
  vendedor_codigo_postal: "28001",
  vendedor_email: "a@a.com",
  vendedor_telefono: "600000001",
  comprador_tipo_persona: "fisica",
  comprador_tipo_documento: "dni",
  comprador_nombre: "Luis Test",
  comprador_numero_documento: "87654321X",
  comprador_direccion: "Calle 2",
  comprador_ciudad: "Madrid",
  comprador_provincia: "Madrid",
  comprador_codigo_postal: "28002",
  comprador_email: "b@b.com",
  comprador_telefono: "600000002",
  direccion_inmueble: "Calle Prueba 1",
  ciudad: "Madrid",
  provincia: "Madrid",
  codigo_postal: "28001",
  referencia_catastral: "1234567AB1234N0001AB",
  superficie: "70",
  certificado_energetico: "D",
  alquiler_amueblado: "no",
  renta_mensual: "700",
  fianza: "1400",
  duracion_contrato: "12",
  periodicidad_pago: "mensual",
  dia_pago_inicio: "1",
  dia_pago_fin: "5",
  ibi: "arrendador",
  gastos_comunidad: "arrendatario",
  plazo_cambio_suministros: "15",
  preaviso_rescision: "30",
  iban_pago: "ES9121000418450200051332",
  fecha_inicio: "2026-08-01",
  fecha_primer_pago: "2026-08-01",
  fecha_fin: "2027-07-31",
  motivo_temporada: "trabajo",
  descripcion_habitacion: "Habitacion exterior",
  uso_previsto: "agricola",
  precio_venta: "180000",
  senal_arras: "5000",
  tipo_arras: "penitenciales",
  plazo_escritura: "60",
  fecha_limite_escritura: "2026-12-01",
  identificacion_plaza: "Plaza 12",
  fecha_rescision: "2026-09-01",
  motivo_rescision: "mutuo acuerdo",
  estado_inmueble: "buen estado",
  devolucion_fianza: "integra",
  tipo_suministro: "luz",
  numero_contrato: "12345",
  fecha_cambio: "2026-08-15",
  lectura: "1000",
  destinacion: "comercio",
};

async function main() {
  const catalog = getAllCatalogSlugs();
  const configs = getAllConfigSlugs();
  const outDir = join(process.env.USERPROFILE || ".", "Desktop", "muestras-contratos");
  mkdirSync(outDir, { recursive: true });

  console.log("catalog:", catalog.join(", "));
  console.log("configs:", configs.join(", "));
  console.log(
    "catalog without config:",
    catalog.filter((s) => !configs.includes(s)).join(", ") || "(ninguno)"
  );

  const results: Array<{ slug: string; ok: boolean; pages?: number; err?: string }> =
    [];

  for (const slug of catalog) {
    const config = getContractConfig(slug);
    if (!config) {
      results.push({ slug, ok: false, err: "no config" });
      continue;
    }

    const values = { ...createEmptyFormValues(config), ...FILLERS };
    for (const field of getConfigFields(config)) {
      if (field.required && !values[field.id]?.trim()) {
        if (field.type === "date") values[field.id] = "2026-08-01";
        else if (field.type === "select" && field.options?.[0])
          values[field.id] = field.options[0].value;
        else if (field.type === "currency" || field.type === "number")
          values[field.id] = "100";
        else values[field.id] = "Dato de prueba";
      }
    }

    try {
      const doc = await buildContractPdfDocument({
        config,
        contractTitle: config.slug,
        values,
      });
      const pages = doc.getNumberOfPages();
      writeFileSync(
        join(outDir, `contrato-${slug}.pdf`),
        Buffer.from(doc.output("arraybuffer"))
      );
      results.push({ slug, ok: true, pages });
      console.log(`OK ${slug} (${pages} pag.)`);
    } catch (error) {
      const err = String(error).slice(0, 240);
      results.push({ slug, ok: false, err });
      console.error(`FAIL ${slug}:`, err);
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log("\nResumen:", JSON.stringify(results, null, 2));
  if (failed.length > 0) {
    process.exitCode = 1;
  } else {
    console.log(`\nTodos OK (${results.length}). PDFs en: ${outDir}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
