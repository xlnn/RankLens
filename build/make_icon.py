#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the RankLens extension logo at browser icon sizes.

The mark combines a magnifying lens with three rising ranking bars. It is
rendered at 1024px and downsampled for antialiased browser-toolbar assets.
"""

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

S = 1024
ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "icon"


def _lerp(a, b, t):
    return int(a + (b - a) * t)


def _rounded_mask(size, radius):
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=radius, fill=255
    )
    return mask


def _vertical_gradient(size, stops):
    """Return an RGBA vertical gradient from [(position, rgb), ...]."""
    image = Image.new("RGBA", (size, size))
    draw = ImageDraw.Draw(image)
    for y in range(size):
        p = y / max(size - 1, 1)
        for index in range(len(stops) - 1):
            p0, c0 = stops[index]
            p1, c1 = stops[index + 1]
            if p <= p1:
                t = 0 if p1 == p0 else (p - p0) / (p1 - p0)
                color = tuple(_lerp(c0[i], c1[i], t) for i in range(3)) + (255,)
                draw.line((0, y, size, y), fill=color)
                break
    return image


def _background(small):
    image = _vertical_gradient(
        S,
        [
            (0.0, (27, 39, 83)),
            (0.52, (13, 23, 55)),
            (1.0, (6, 11, 29)),
        ],
    )
    image.putalpha(_rounded_mask(S, int(S * 0.225)))

    if not small:
        accents = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        draw = ImageDraw.Draw(accents)
        draw.ellipse((-310, -410, 650, 470), fill=(91, 134, 255, 28))
        draw.ellipse((520, 540, 1300, 1270), fill=(117, 76, 255, 18))
        accents = accents.filter(ImageFilter.GaussianBlur(80))
        image = Image.alpha_composite(image, accents)

    border = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        (10, 10, S - 11, S - 11),
        radius=int(S * 0.215),
        outline=(139, 169, 255, 62),
        width=12,
    )
    return Image.alpha_composite(image, border)


def _line_with_round_caps(draw, start, end, width, fill):
    draw.line((start, end), width=width, fill=fill)
    radius = width / 2
    for x, y in (start, end):
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=fill)


def _star(draw, cx, cy, radius, fill):
    points = []
    for i in range(8):
        angle = math.pi * i / 4 - math.pi / 2
        r = radius if i % 2 == 0 else radius * 0.24
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=fill)


def _draw_handle(image, small):
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    start = (595, 604)
    end = (813, 822)

    _line_with_round_caps(
        draw,
        (start[0] + 14, start[1] + 19),
        (end[0] + 14, end[1] + 19),
        146 if not small else 158,
        (0, 0, 0, 105),
    )
    layer = layer.filter(ImageFilter.GaussianBlur(20 if not small else 12))
    image.alpha_composite(layer)

    handle = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(handle)
    _line_with_round_caps(
        draw, start, end, 126 if not small else 140, (255, 211, 129, 255)
    )
    _line_with_round_caps(
        draw, start, end, 96 if not small else 106, (255, 112, 91, 255)
    )
    if not small:
        _line_with_round_caps(
            draw,
            (start[0] - 13, start[1] - 13),
            (end[0] - 13, end[1] - 13),
            19,
            (255, 246, 213, 150),
        )
    image.alpha_composite(handle)


def _circle_gradient(cx, cy, radius):
    diameter = radius * 2
    lens = Image.new("RGBA", (diameter, diameter), (0, 0, 0, 0))
    pixels = lens.load()
    for y in range(diameter):
        for x in range(diameter):
            dx = (x - radius) / radius
            dy = (y - radius) / radius
            distance = math.sqrt(dx * dx + dy * dy)
            if distance <= 1:
                vertical = y / max(diameter - 1, 1)
                edge = max(0.0, min(1.0, distance))
                r = _lerp(42, 20, vertical) + int(9 * (1 - edge))
                g = _lerp(103, 47, vertical) + int(18 * (1 - edge))
                b = _lerp(150, 98, vertical) + int(24 * (1 - edge))
                pixels[x, y] = (r, g, b, 244)
    return lens


def _draw_lens(image, small):
    cx, cy = (414, 411) if not small else (413, 420)
    radius = 280 if not small else 290

    shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse(
        (cx - radius + 22, cy - radius + 32, cx + radius + 22, cy + radius + 32),
        fill=(0, 0, 0, 130),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(30 if not small else 18))
    image.alpha_composite(shadow)

    if not small:
        glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        gd.ellipse(
            (cx - radius - 20, cy - radius - 20, cx + radius + 20, cy + radius + 20),
            fill=(92, 221, 255, 70),
        )
        glow = glow.filter(ImageFilter.GaussianBlur(30))
        image.alpha_composite(glow)

    ring = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse(
        (cx - radius, cy - radius, cx + radius, cy + radius),
        fill=(232, 250, 255, 255),
    )
    ring_width = 45 if not small else 58
    rd.ellipse(
        (
            cx - radius + ring_width,
            cy - radius + ring_width,
            cx + radius - ring_width,
            cy + radius - ring_width,
        ),
        fill=(48, 111, 157, 255),
    )
    image.alpha_composite(ring)

    inner_radius = radius - ring_width - (10 if not small else 5)
    glass = _circle_gradient(cx, cy, inner_radius)
    image.alpha_composite(glass, (cx - inner_radius, cy - inner_radius))

    # Ranking bars inside the lens: CCF, SCI and XinRui colors.
    bars = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bars)
    baseline = 585 if not small else 606
    width = 84 if not small else 98
    gap = 31 if not small else 25
    heights = (150, 245, 350) if not small else (178, 278, 377)
    colors = (
        (255, 133, 88, 255),
        (255, 76, 111, 255),
        (159, 140, 255, 255),
    )
    x0 = 270 if not small else 250
    for index, (height, color) in enumerate(zip(heights, colors)):
        x = x0 + index * (width + gap)
        bd.rounded_rectangle(
            (x, baseline - height, x + width, baseline),
            radius=width // 2,
            fill=color,
        )
        if not small:
            bd.rounded_rectangle(
                (x + 15, baseline - height + 13, x + width - 15, baseline - height + 27),
                radius=7,
                fill=(255, 255, 255, 95),
            )

    clip = Image.new("L", (S, S), 0)
    ImageDraw.Draw(clip).ellipse(
        (
            cx - inner_radius,
            cy - inner_radius,
            cx + inner_radius,
            cy + inner_radius,
        ),
        fill=255,
    )
    bars.putalpha(Image.composite(bars.getchannel("A"), Image.new("L", (S, S), 0), clip))
    image.alpha_composite(bars)

    highlight = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    if not small:
        hd.arc(
            (cx - radius + 32, cy - radius + 32, cx + radius - 32, cy + radius - 32),
            196,
            308,
            fill=(255, 255, 255, 205),
            width=18,
        )
        hd.ellipse((cx - 155, cy - 150, cx - 103, cy - 98), fill=(255, 255, 255, 85))
    image.alpha_composite(highlight)


def draw_icon(small=False):
    image = _background(small)
    _draw_handle(image, small)
    _draw_lens(image, small)

    if not small:
        details = Image.new("RGBA", (S, S), (0, 0, 0, 0))
        draw = ImageDraw.Draw(details)
        _star(draw, 798, 188, 55, (255, 255, 255, 230))
        _star(draw, 892, 284, 24, (255, 222, 154, 235))
        image.alpha_composite(details)

    return image


def main():
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    large = draw_icon(small=False)
    for size in (128, 64, 32):
        large.resize((size, size), Image.Resampling.LANCZOS).save(
            ICON_DIR / f"{size}x{size}.png"
        )
        print(f"icon/{size}x{size}.png written")

    small = draw_icon(small=True)
    for size in (24, 16):
        small.resize((size, size), Image.Resampling.LANCZOS).save(
            ICON_DIR / f"{size}x{size}.png"
        )
        print(f"icon/{size}x{size}.png written (simplified)")

    large.resize((256, 256), Image.Resampling.LANCZOS).save(
        ICON_DIR / "preview-256.png"
    )
    print("icon/preview-256.png written")


if __name__ == "__main__":
    main()
