"""Genera favicon.ico, icon.png y apple-icon.png en src/app/ desde logo-mark-clean.svg."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "app"
SVG_SOURCE = ROOT / "public" / "brand" / "logo-mark-clean.svg"

BRAND_BLUE = "#3B82F6"
WHITE = "#FFFFFF"


def scale(value: float, size: int) -> int:
    return round(value * size / 48)


def draw_brand_mark(size: int) -> Image.Image:
    """Isotipo oficial: cuadrado azul + documento blanco + líneas azules."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle(
        (0, 0, size - 1, size - 1),
        radius=scale(12, size),
        fill=BRAND_BLUE,
    )

    draw.rounded_rectangle(
        (
            scale(14, size),
            scale(12, size),
            scale(34, size),
            scale(38, size),
        ),
        radius=scale(2.5, size),
        fill=WHITE,
    )

    for y, width in ((18, 12), (23, 12), (28, 8)):
        draw.rounded_rectangle(
            (
                scale(18, size),
                scale(y, size),
                scale(18 + width, size),
                scale(y + 2, size),
            ),
            radius=max(1, scale(1, size)),
            fill=BRAND_BLUE,
        )

    return img


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGBA").save(path, format="PNG", optimize=True)


def save_favicon_ico(path: Path) -> None:
    sizes = (16, 32, 48)
    images = [draw_brand_mark(size) for size in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(size, size) for size in sizes],
        append_images=images[1:],
    )


def main() -> None:
    if not SVG_SOURCE.exists():
        raise SystemExit(f"No se encontró el isotipo oficial: {SVG_SOURCE}")

    save_png(draw_brand_mark(48), OUT / "icon.png")
    save_png(draw_brand_mark(180), OUT / "apple-icon.png")
    save_favicon_ico(OUT / "favicon.ico")

    print(f"Favicons generados desde {SVG_SOURCE.name} -> {OUT}")


if __name__ == "__main__":
    main()
