#!/usr/bin/env python3
"""
Reel / TikTok vertical 1080×1920 — SoyContratoFacil.es

Dependencias:
  pip install "moviepy>=2.0.0" pillow numpy imageio imageio-ffmpeg

Ejecutar (desde esta carpeta):
  cd ads/promo-reel
  pip install -r requirements.txt
  python make_promo_reel.py

Opcional:
  python make_promo_reel.py --audio "C:\\ruta\\audio.mp3" --out promo.mp4
"""

from __future__ import annotations

import argparse
import math
from dataclasses import dataclass
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

# Fondo corporativo (barras letterbox)
BG_RGB = (15, 23, 42)

# Redimensionado nítido (sin estirar)
RESAMPLE = Image.Resampling.BICUBIC

# Ken Burns muy suave: 100% → 105%
ZOOM_END = 1.05

SCENE_COPY = [
    ("1. Entra gratis", "Sin registro · En minutos"),
    ("2. Elige el contrato", "Alquiler, compraventa, arras…"),
    ("3. Rellena los datos", "Formulario guiado paso a paso"),
    ("4. Descarga tu PDF", "Listo para imprimir y firmar"),
    ("soycontratofacil.es", "Gratis · PDF al instante"),
]


@dataclass(frozen=True)
class LetterboxedShot:
    """Canvas 1080×1920 con la captura a ancho completo y barras arriba/abajo."""

    canvas: Image.Image
    shot_y: int
    shot_h: int


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


def fit_width_letterbox(path: Path) -> LetterboxedShot:
    """
    Escala la captura manteniendo aspect ratio hasta ancho = 1080px.
    Rellena arriba/abajo con fondo corporativo (sin estirar ni recortar).
    """
    im = Image.open(path).convert("RGB")
    scale = W / im.width
    new_w = W
    new_h = max(1, int(round(im.height * scale)))
    im = im.resize((new_w, new_h), RESAMPLE)

    canvas = Image.new("RGB", (W, H), BG_RGB)

    # Centrado vertical (ligero sesgo hacia arriba para priorizar cabecera/CTA)
    if new_h >= H:
        # Caso extremo: captura más alta que el lienzo → recorte mínimo centrado arriba
        top = 0
        im = im.crop((0, 0, new_w, H))
        new_h = H
        shot_y = 0
    else:
        shot_y = max(0, (H - new_h) // 2 - 60)
        if shot_y + new_h > H:
            shot_y = H - new_h

    canvas.paste(im, (0, shot_y))
    return LetterboxedShot(canvas=canvas, shot_y=shot_y, shot_h=new_h)


def ken_burns_frame(
    shot: LetterboxedShot,
    t: float,
    duration: float,
    zoom_end: float = ZOOM_END,
) -> np.ndarray:
    """
    Zoom sutil 1.00 → zoom_end, anclado a la zona superior de la captura
    (texto de la web más legible, sin pan brusco).
    """
    progress = 0.0 if duration <= 0 else min(1.0, max(0.0, t / duration))
    ease = 0.5 - 0.5 * math.cos(math.pi * progress)
    z = 1.0 + (zoom_end - 1.0) * ease

    crop_w = max(2, int(round(W / z)))
    crop_h = max(2, int(round(H / z)))

    # Punto de interés: centro horizontal + tercio superior de la captura
    focus_x = W * 0.5
    focus_y = shot.shot_y + shot.shot_h * 0.32

    left = int(round(focus_x - crop_w * 0.5))
    top = int(round(focus_y - crop_h * 0.32))

    left = max(0, min(left, W - crop_w))
    top = max(0, min(top, H - crop_h))

    frame = shot.canvas.crop((left, top, left + crop_w, top + crop_h)).resize(
        (W, H), RESAMPLE
    )
    return np.asarray(frame)


def make_text_overlay(title: str, subtitle: str) -> Image.Image:
    """Texto del tour centrado horizontalmente, en zona segura inferior."""
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    band_top = H - SAFE_BOTTOM - 220
    for i in range(260):
        alpha = int(150 * (i / 260))
        y = band_top + i
        if y < H:
            vdraw.line([(0, y), (W, y)], fill=(15, 23, 42, alpha))
    overlay = Image.alpha_composite(overlay, vignette)
    draw = ImageDraw.Draw(overlay)

    title_font = _font(64, bold=True)
    sub_font = _font(34, bold=False)
    pad_x, pad_y = 36, 28

    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
    tw = max(title_bbox[2] - title_bbox[0], sub_bbox[2] - sub_bbox[0])
    th = (title_bbox[3] - title_bbox[1]) + 12 + (sub_bbox[3] - sub_bbox[1])

    card_w = min(W - 2 * SAFE_SIDE, tw + 2 * pad_x)
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
    tx_title = card_x + (card_w - title_w) // 2
    tx_sub = card_x + (card_w - sub_w) // 2
    ty = card_y + pad_y
    draw.text((tx_title, ty), title, font=title_font, fill=(255, 255, 255, 255))
    draw.text(
        (tx_sub, ty + (title_bbox[3] - title_bbox[1]) + 12),
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

    shots = [fit_width_letterbox(path) for path in frame_paths]
    overlays = [
        make_text_overlay(SCENE_COPY[i][0], SCENE_COPY[i][1]) for i in range(n)
    ]

    clips = []
    for i in range(n):
        shot = shots[i]
        overlay_rgba = overlays[i]
        dur = scene_dur

        def make_frame(t, _shot=shot, _overlay=overlay_rgba, _dur=dur):
            rgb = ken_burns_frame(_shot, t, _dur, zoom_end=ZOOM_END)
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
