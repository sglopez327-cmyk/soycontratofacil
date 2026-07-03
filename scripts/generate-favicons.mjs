import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public/brand/logo-mark-clean.svg");
const appDir = join(root, "src/app");

mkdirSync(appDir, { recursive: true });

const svg = readFileSync(svgPath, "utf8");

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "transparent",
  });
  return resvg.render().asPng();
}

const sizes = [16, 32, 48];
const pngBuffers = sizes.map((size) => {
  const buffer = renderPng(size);
  return { size, buffer };
});

writeFileSync(join(appDir, "icon.png"), renderPng(48));
writeFileSync(join(appDir, "apple-icon.png"), renderPng(180));

const faviconIco = await pngToIco(pngBuffers.map(({ buffer }) => buffer));
writeFileSync(join(appDir, "favicon.ico"), faviconIco);

console.log("Generated favicon.ico, icon.png and apple-icon.png in src/app/");
