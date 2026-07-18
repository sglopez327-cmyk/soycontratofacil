const LOGO_MARK_SRC = "/brand/logo-mark-clean.svg";
const LOGO_MARK_RENDER_SIZE = 256;

export type PdfLogoAsset = {
  dataUrl: string;
  width: number;
  height: number;
};

async function loadLogoMarkFromDisk(): Promise<PdfLogoAsset> {
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const png = readFileSync(join(process.cwd(), "public", "icon-192.png"));
  return {
    dataUrl: `data:image/png;base64,${png.toString("base64")}`,
    width: 192,
    height: 192,
  };
}

async function rasterizeSvgToPng(
  svgText: string,
  size: number
): Promise<PdfLogoAsset> {
  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(svgBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("No se pudo cargar el logo SVG."));
      img.src = objectUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("No se pudo inicializar el canvas del logo.");
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return {
      dataUrl: canvas.toDataURL("image/png"),
      width: canvas.width,
      height: canvas.height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

let logoMarkCache: PdfLogoAsset | null = null;

export async function loadPdfLogoMark(): Promise<PdfLogoAsset> {
  if (logoMarkCache) {
    return logoMarkCache;
  }

  if (typeof window === "undefined") {
    logoMarkCache = await loadLogoMarkFromDisk();
    return logoMarkCache;
  }

  const response = await fetch(LOGO_MARK_SRC);
  if (!response.ok) {
    throw new Error(`No se pudo cargar el logo (${response.status}).`);
  }

  const svgText = await response.text();
  logoMarkCache = await rasterizeSvgToPng(svgText, LOGO_MARK_RENDER_SIZE);
  return logoMarkCache;
}
