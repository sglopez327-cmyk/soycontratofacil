"""Genera iconos de app desde public/brand/logo-mark-clean.svg (marca oficial)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "app-mobile" / "assets" / "images"

BRAND_BLUE = "#3B82F6"
BRAND_NAVY = "#0F172A"
WHITE = "#FFFFFF"


def scale(value: float, size: int) -> int:
    return round(value * size / 48)


def draw_brand_mark(size: int, *, background: str | None = BRAND_BLUE) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if background:
        draw.rounded_rectangle(
            (0, 0, size - 1, size - 1),
            radius=scale(12, size),
            fill=background,
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
            fill=BRAND_BLUE if background else WHITE,
        )

    return img


def solid_background(size: int, color: str) -> Image.Image:
    img = Image.new("RGBA", (size, size), color)
    return img


def monochrome_mark(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle(
        (0, 0, size - 1, size - 1),
        radius=scale(12, size),
        fill=WHITE,
    )
    draw.rounded_rectangle(
        (
            scale(14, size),
            scale(12, size),
            scale(34, size),
            scale(38, size),
        ),
        radius=scale(2.5, size),
        fill=BRAND_NAVY,
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
            fill=WHITE,
        )

    return img


def splash_mark(size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), BRAND_NAVY)
    mark_size = round(size * 0.42)
    mark = draw_brand_mark(mark_size)
    offset = (size - mark_size) // 2
    canvas.alpha_composite(mark, (offset, offset))
    return canvas


def save_rgb(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if img.mode == "RGBA":
        background = Image.new("RGB", img.size, BRAND_NAVY)
        background.paste(img, mask=img.split()[3])
        background.save(path, format="PNG", optimize=True)
    else:
        img.convert("RGB").save(path, format="PNG", optimize=True)


def save_rgba(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def main() -> None:
    save_rgb(draw_brand_mark(1024), OUT / "icon.png")
    save_rgba(draw_brand_mark(1024), OUT / "android-icon-foreground.png")
    save_rgb(solid_background(1024, BRAND_NAVY), OUT / "android-icon-background.png")
    save_rgba(monochrome_mark(1024), OUT / "android-icon-monochrome.png")
    save_rgba(splash_mark(1024), OUT / "splash-icon.png")
    save_rgb(draw_brand_mark(48), OUT / "favicon.png")
    print(f"Iconos de marca generados en {OUT}")


if __name__ == "__main__":
    main()
