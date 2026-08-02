#!/usr/bin/env python3
"""
Reel / TikTok vertical 1080×1920 — SoyContratoFacil.es

Visual:
  - Escala la captura para llenar el alto del móvil (sin bandas negras).
  - Sobresale a izquierda/derecha; centrado horizontal.
  - Por escena: 0–2s anclado ARRIBA; desde ~3s paneo suave hacia ABAJO.

Dependencias:
  pip install "moviepy>=2.0.0" pillow numpy imageio imageio-ffmpeg

Ejecutar:
  cd ads/promo-reel
  python make_promo_reel.py
"""

from __future__ import annotations

import argparse
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FRAMES_DIR = ROOT / "frames"
DEFAULT_AUDIO = Path(
    r"C:\Users\Usuario\Downloads\4.1-invideo-elevenlabs_text_to_speech.mp3"
)
DEFAULT_OUT = ROOT / "soycontratofacil-promo-reel.mp4"

W, H = 1080, 1920
FPS = 30
SAFE_TOP = 160
SAFE_BOTTOM = 280
SAFE_SIDE = 72
CROSSFADE = 0.45
RESAMPLE = Image.Resampling.BICUBIC

# Escala base: alto ≈ pantalla. Un poco de overscan (>1) permite scroll vertical
# real sin bandas negras (si fuera exactamente 1920px de alto, no habría paneo).
HEIGHT_OVERSCAN = 1.22

HOLD_TOP_UNTIL = 2.0
PAN_START = 3.0

SCENE_COPY = [
    ("1. Entra gratis", "Sin registro · En minutos"),
    ("2. Elige el contrato", "Alquiler, compraventa, arras…"),
    ("3. Rellena los datos", "Formulario guiado paso a paso"),
    ("4. Descarga tu PDF", "Listo para imprimir y firmar"),
    ("soycontratofacil.es", "Gratis · PDF al instante"),
]


def _font(size: int, bold: bool = True) -> ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def ease_in_out(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return 0.5 - 0.5 * math.cos(math.pi * t)


def pan_progress(t: float, duration: float) -> float:
    """0 = arriba, 1 = abajo. Hold 0–2s; pan principal desde 3s al final."""
    if t <= HOLD_TOP_UNTIL:
        return 0.0
    if t < PAN_START:
        return ease_in_out((t - HOLD_TOP_UNTIL) / max(0.001, PAN_START - HOLD_TOP_UNTIL)) * 0.06

    return ease_in_out((t - PAN_START) / max(0.001, duration - PAN_START))


def trim_bright_frame_edges(im: Image.Image, threshold: int = 180) -> Image.Image:
    """
    Quita el marco claro de captura (borde ventana / scrollbar) que en CapCut
    se ve como una línea blanca estática al letterboxear.
    No es CSS de la web: son píxeles blancos en el PNG.
    """
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()

    def col_bright(x: int) -> bool:
        samples = [sum(px[x, y]) / 3 for y in range(0, h, max(1, h // 40))]
        return (sum(samples) / len(samples)) >= threshold

    def row_bright(y: int) -> bool:
        samples = [sum(px[x, y]) / 3 for x in range(0, w, max(1, w // 40))]
        return (sum(samples) / len(samples)) >= threshold

    left = 0
    while left < w // 4 and col_bright(left):
        left += 1
    right = w - 1
    while right > w * 3 // 4 and col_bright(right):
        right -= 1
    top = 0
    while top < h // 4 and row_bright(top):
        top += 1
    bottom = h - 1
    while bottom > h * 3 // 4 and row_bright(bottom):
        bottom -= 1

    if left == 0 and right == w - 1 and top == 0 and bottom == h - 1:
        return rgb
    return rgb.crop((left, top, right + 1, bottom + 1))


def fit_height_overflow_sides(path: Path, overscan: float = HEIGHT_OVERSCAN) -> Image.Image:
    """
    Escala manteniendo aspect ratio para que el alto sea ~overscan×1920.
    El ancho suele superar 1080 (se corta a izquierda/derecha).
    Sin bandas negras: cada frame recorta exactamente 1080×1920.
    """
    im = trim_bright_frame_edges(Image.open(path).convert("RGB"))
    target_h = max(H + 1, int(round(H * overscan)))
    scale = target_h / im.height
    new_w = max(W + 1, int(round(im.width * scale)))
    return im.resize((new_w, target_h), RESAMPLE)


def frame_with_vertical_pan(scaled: Image.Image, t: float, duration: float) -> np.ndarray:
    ww, hh = scaled.size
    progress = pan_progress(t, duration)

    max_left = max(0, ww - W)
    max_top = max(0, hh - H)

    left = max_left // 2
    top = int(round(max_top * progress))

    frame = scaled.crop((left, top, left + W, top + H))
    if frame.size != (W, H):
        frame = frame.resize((W, H), RESAMPLE)
    return np.asarray(frame)


def make_text_overlay(title: str, subtitle: str) -> Image.Image:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    band_top = H - SAFE_BOTTOM - 220
    for i in range(260):
        alpha = int(160 * (i / 260))
        y = band_top + i
        if y < H:
            vdraw.line([(0, y), (W, y)], fill=(15, 23, 42, alpha))
    overlay = Image.alpha_composite(overlay, vignette)
    draw = ImageDraw.Draw(overlay)

    title_font = _font(64, bold=True)
    sub_font = _font(34, bold=False)
    pad_y = 28

    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
    tw = max(title_bbox[2] - title_bbox[0], sub_bbox[2] - sub_bbox[0])
    th = (title_bbox[3] - title_bbox[1]) + 12 + (sub_bbox[3] - sub_bbox[1])

    card_w = min(W - 2 * SAFE_SIDE, tw + 72)
    card_h = th + 2 * pad_y
    card_x = (W - card_w) // 2
    card_y = H - SAFE_BOTTOM - card_h

    card = Image.new("RGBA", (card_w, card_h), (15, 23, 42, 210))
    cdraw = ImageDraw.Draw(card)
    cdraw.rounded_rectangle(
        (0, 0, card_w - 1, card_h - 1),
        radius=28,
        outline=(59, 130, 246, 220),
        width=3,
    )
    overlay.paste(card, (card_x, card_y), card)

    draw = ImageDraw.Draw(overlay)
    title_w = title_bbox[2] - title_bbox[0]
    sub_w = sub_bbox[2] - sub_bbox[0]
    ty = card_y + pad_y
    draw.text(
        (card_x + (card_w - title_w) // 2, ty),
        title,
        font=title_font,
        fill=(255, 255, 255, 255),
    )
    draw.text(
        (
            card_x + (card_w - sub_w) // 2,
            ty + (title_bbox[3] - title_bbox[1]) + 12,
        ),
        subtitle,
        font=sub_font,
        fill=(148, 163, 184, 255),
    )

    brand_font = _font(28, bold=True)
    brand = "SoyContratoFacil.es"
    bb = draw.textbbox((0, 0), brand, font=brand_font)
    bx = (W - (bb[2] - bb[0])) // 2
    by = SAFE_TOP
    draw.text((bx + 1, by + 1), brand, font=brand_font, fill=(0, 0, 0, 140))
    draw.text((bx, by), brand, font=brand_font, fill=(255, 255, 255, 230))

    return overlay


def build_video(audio_path: Path, out_path: Path) -> None:
    try:
        from moviepy import AudioFileClip, VideoClip, concatenate_videoclips
    except ImportError as exc:
        raise SystemExit(
            "Falta MoviePy 2. Instala con:\n"
            '  pip install "moviepy>=2.0.0" pillow numpy imageio imageio-ffmpeg\n'
            f"Detalle: {exc}"
        ) from exc

    if not audio_path.exists():
        raise SystemExit(f"No se encuentra el audio: {audio_path}")

    frame_paths = sorted(FRAMES_DIR.glob("*.png"))
    if len(frame_paths) < 5:
        raise SystemExit(
            f"Se necesitan 5 PNG en {FRAMES_DIR} (encontrados: {len(frame_paths)})"
        )
    frame_paths = frame_paths[:5]

    audio = AudioFileClip(str(audio_path))
    total = float(audio.duration)
    n = len(frame_paths)
    scene_dur = (total + (n - 1) * CROSSFADE) / n

    scaled_shots = [fit_height_overflow_sides(path) for path in frame_paths]
    overlays = [
        make_text_overlay(SCENE_COPY[i][0], SCENE_COPY[i][1]) for i in range(n)
    ]

    clips = []
    for i in range(n):
        scaled = scaled_shots[i]
        overlay_rgba = overlays[i]
        dur = scene_dur

        def make_frame(t, _scaled=scaled, _overlay=overlay_rgba, _dur=dur):
            rgb = frame_with_vertical_pan(_scaled, t, _dur)
            canvas = Image.fromarray(rgb).convert("RGBA")
            alpha_scale = min(1.0, t / 0.45) if t < 0.45 else 1.0
            ov = _overlay.copy()
            if alpha_scale < 1.0:
                a = ov.split()[3].point(lambda p, s=alpha_scale: int(p * s))
                ov.putalpha(a)
            return np.asarray(Image.alpha_composite(canvas, ov).convert("RGB"))

        clips.append(VideoClip(make_frame, duration=dur).with_fps(FPS))

    video = concatenate_videoclips(clips, method="compose", padding=-CROSSFADE)

    if abs(video.duration - total) > 0.05:
        if video.duration > total:
            video = video.subclipped(0, total)
        else:
            deficit = total - video.duration
            tail = clips[-1].with_duration(deficit)
            video = concatenate_videoclips(
                [video, tail], method="compose"
            ).subclipped(0, total)

    final = video.with_audio(audio).with_duration(total).with_fps(FPS)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    final.write_videofile(
        str(out_path),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        preset="slow",
        threads=4,
        bitrate="20M",
        ffmpeg_params=["-crf", "16", "-pix_fmt", "yuv420p"],
    )

    audio.close()
    final.close()
    print(f"\nListo: {out_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Promo Reel SoyContratoFacil.es")
    parser.add_argument("--audio", type=Path, default=DEFAULT_AUDIO)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()
    build_video(args.audio.resolve(), args.out.resolve())


if __name__ == "__main__":
    main()
