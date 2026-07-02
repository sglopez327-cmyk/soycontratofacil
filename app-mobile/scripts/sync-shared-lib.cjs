/**
 * Copia src/lib del monorepo a app-mobile/lib para que Metro/EAS
 * resuelvan @/lib/* sin rutas absolutas fuera del proyecto.
 */
const fs = require("fs");
const path = require("path");

const appRoot = path.resolve(__dirname, "..");
const source = path.resolve(appRoot, "..", "src", "lib");
const target = path.resolve(appRoot, "lib");

if (!fs.existsSync(source)) {
  console.error(`No se encontró código compartido en: ${source}`);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });

const mobilePdf = path.resolve(appRoot, "native-lib", "generate-contract-pdf.ts");
const syncedPdf = path.join(target, "generate-contract-pdf.ts");

if (!fs.existsSync(mobilePdf)) {
  console.error(`No se encontró generate-contract-pdf nativo en: ${mobilePdf}`);
  process.exit(1);
}

fs.copyFileSync(mobilePdf, syncedPdf);

const syncedContent = fs.readFileSync(syncedPdf, "utf8");
if (!syncedContent.includes("expo-print") || syncedContent.includes("jspdf")) {
  console.error(
    "generate-contract-pdf.ts en lib/ no es la versión nativa (debe usar expo-print, sin jspdf)"
  );
  process.exit(1);
}

console.log("Sobrescrito generate-contract-pdf.ts con versión nativa (expo-print)");

console.log(`Código compartido sincronizado: ${source} → ${target}`);
