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
console.log(`Código compartido sincronizado: ${source} → ${target}`);
