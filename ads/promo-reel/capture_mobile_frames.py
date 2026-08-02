#!/usr/bin/env python3
"""
Captura 5 frames verticales 1080×1920 de la web real (sin chrome, URL bar ni bordes).

Usa viewport CSS móvil (<640px) para que Tailwind aplique el layout de teléfono,
y escala el resultado a exactamente 1080×1920.

Uso:
  pip install playwright pillow
  python -m playwright install chromium
  python capture_mobile_frames.py
  python capture_mobile_frames.py --url http://localhost:3000
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
FRAMES_DIR = ROOT / "frames"

# Salida final (TikTok / Reels)
OUT_W, OUT_H = 1080, 1920

# Viewport CSS móvil (por debajo de sm:640 → layout teléfono real)
# 390×693 ≈ 9:16; device_scale_factor=3 da supersample nítido antes del resize
CSS_W, CSS_H = 390, 693
DEVICE_SCALE = 3

DEFAULT_URL = "https://www.soycontratofacil.es/"

SHOTS = [
    ("01-hero.png", None, "top"),
    ("02-guia.png", "#guia-de-uso", "section"),
    ("03-arrendamientos.png", "#arrendamientos", "section"),
    ("04-compraventa.png", "#compraventa", "section"),
    ("05-gestion.png", "#gestion", "section"),
]

HIDE_CHROME_CSS = """
html, body {
  overflow: hidden !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  background: #0f172a !important;
}
*::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
"""

DISABLE_MOTION_CSS = """
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}
"""


def to_exact_frame(raw_png: bytes) -> Image.Image:
    im = Image.open(__import__("io").BytesIO(raw_png)).convert("RGB")
    if im.size != (OUT_W, OUT_H):
        im = im.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
    return im


def assert_clean_frame(path: Path) -> None:
    im = Image.open(path).convert("RGB")
    if im.size != (OUT_W, OUT_H):
        raise SystemExit(f"{path.name}: tamaño {im.size}, se esperaba {(OUT_W, OUT_H)}")

    w, h = im.size
    px = im.load()

    def edge_too_bright(samples: list[tuple[int, int, int]], label: str) -> None:
        avg = sum(sum(c) / 3 for c in samples) / len(samples)
        if avg >= 180:
            raise SystemExit(
                f"{path.name}: borde {label} demasiado claro (avg={avg:.0f})."
            )

    edge_too_bright([px[x, 0] for x in range(0, w, 8)], "top")
    edge_too_bright([px[x, h - 1] for x in range(0, w, 8)], "bottom")
    edge_too_bright([px[0, y] for y in range(0, h, 8)], "left")
    edge_too_bright([px[w - 1, y] for y in range(0, h, 8)], "right")


def capture(url: str, out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": CSS_W, "height": CSS_H},
            device_scale_factor=DEVICE_SCALE,
            is_mobile=True,
            has_touch=True,
            color_scheme="dark",
            reduced_motion="reduce",
            locale="es-ES",
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 "
                "Mobile/15E148 Safari/604.1"
            ),
        )
        page = context.new_page()
        page.goto(url, wait_until="networkidle", timeout=90_000)
        page.add_style_tag(content=HIDE_CHROME_CSS + DISABLE_MOTION_CSS)
        page.wait_for_timeout(900)

        for filename, selector, mode in SHOTS:
            if mode == "top":
                page.evaluate("window.scrollTo(0, 0)")
            else:
                page.evaluate(
                    """(sel) => {
                      const el = document.querySelector(sel);
                      if (!el) throw new Error('No encontrado: ' + sel);
                      const y = el.getBoundingClientRect().top + window.scrollY - 56;
                      window.scrollTo(0, Math.max(0, Math.floor(y)));
                    }""",
                    selector,
                )
            page.wait_for_timeout(450)

            raw = page.screenshot(
                type="png",
                full_page=False,
                animations="disabled",
                caret="hide",
            )
            frame = to_exact_frame(raw)
            out = out_dir / filename
            frame.save(out, optimize=True)
            assert_clean_frame(out)
            print(f"OK {filename} ({OUT_W}x{OUT_H})  [css {CSS_W}x{CSS_H} @{DEVICE_SCALE}x]")

        browser.close()

    print(f"\nFrames limpios en: {out_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Capturas móviles 1080x1920")
    parser.add_argument("--url", default=DEFAULT_URL)
    parser.add_argument("--out", type=Path, default=FRAMES_DIR)
    args = parser.parse_args()
    capture(args.url.rstrip("/") + "/", args.out.resolve())


if __name__ == "__main__":
    main()
