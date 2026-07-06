"""Genera public/og-image.png (1200x630) para Open Graph y redes sociales."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"

WIDTH = 1200
HEIGHT = 630
BG = "#0f172a"
BRAND_BLUE = "#3B82F6"
WHITE = "#FFFFFF"
MUTED = "#94a3b8"


def scale(value: float, size: int) -> int:
    return round(value * size / 48)


def draw_brand_mark(size: int) -> Image.Image:
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


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(img)

    draw.ellipse(
        (WIDTH // 2 - 420, HEIGHT - 120, WIDTH // 2 + 420, HEIGHT + 280),
        fill="#1e3a5f",
    )

    logo = draw_brand_mark(160)
    img.paste(logo, (120, (HEIGHT - 160) // 2), logo)

    title_font = load_font(58, bold=True)
    subtitle_font = load_font(30)
    tagline_font = load_font(24)

    draw.text((320, 210), "SoyContratoFacil.es", fill=WHITE, font=title_font)
    draw.text(
        (320, 290),
        "Contratos inmobiliarios legales en minutos",
        fill=MUTED,
        font=subtitle_font,
    )
    draw.text(
        (320, 360),
        "Alquiler · Compraventa · Gestión  |  Gratis y sin registro",
        fill=BRAND_BLUE,
        font=tagline_font,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, format="PNG", optimize=True)
    print(f"OG image generada -> {OUT}")


if __name__ == "__main__":
    main()
