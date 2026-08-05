Recreate the "Electric Gaze" ASCII-art effect from 21st.dev (https://21st.dev/community/ascii) using Canvas2D (or an equivalent 2D raster API).

Source photo: /ascii-editor/demos/generated/ref-002.webp

Render pipeline (reimplement, don't assume our internal code is available):
1. Draw the source photo into a canvas at the target size; `bgMode`/`bgBlur`/`bgOpacity` control what shows behind the effect (blurred copy, solid color, the original photo, or nothing).
2. Divide the canvas into a grid of `cellSize`px cells and sample the average color/luminance of each cell.
3. For each cell, draw a shape per `renderMode`: "characters" draws a glyph from `charSet` sized/colored by luminance; "dither"/"mosaic"/"pixel"/"dots"/"cross"/"diamond"/"voxel"/"lego"/"mixed"/"lines"/"diagonal"/"braille"/"disco"/"hexdump" (hex-digit glyphs)/"matrix" (green code rain, self-animated)/"rings"/"hearts"/"stars"/"hexagons" (honeycomb)/"triangles" (low-poly)/"bubbles"/"hatch" (pencil cross-hatch)/"contour" (topographic iso-lines)/"halfblocks" (double vertical detail) each draw their own primitive shape instead. Respect `coverage` (% of cells drawn), `density`, `invert`, and `edgeEmphasis`.
4. Apply color adjustments in order: `brightness`, `contrast`, `saturation`, `grayscale`, then the `tint` color at `tintOpacity` via `overlayBlend`, then `blurType`/`blurAmount`.
5. Layer post-effects from `pfx` for every key where `enabled` is true, at its `intensity` (0-100): scanLines, vignette, bloom, chromatic, filmGrain, glitch, halftone, pixelate, filmDust.
6. If `lights.enabled`, add glow at each point in `lights.points` (normalized x/y, radius, intensity).
7. If `mask.enabled`, use `mask.dataUrl` as a reveal mask back to the plain photo (inverted if `mask.invert`).
8. This look is animated — see `animSpeed`, `animStyle` (wave/pulse/shimmer/ripple/flicker), and `animIntensity` for how it moves over time.

Full parameters (JSON):
```json
{
  "pfx": {
    "bloom": {
      "enabled": false,
      "intensity": 25
    },
    "glitch": {
      "enabled": false,
      "intensity": 20
    },
    "filmDust": {
      "enabled": false,
      "intensity": 20
    },
    "halftone": {
      "enabled": false,
      "intensity": 20
    },
    "pixelate": {
      "enabled": false,
      "intensity": 15
    },
    "vignette": {
      "enabled": false,
      "intensity": 38
    },
    "chromatic": {
      "enabled": false,
      "intensity": 15
    },
    "filmGrain": {
      "enabled": false,
      "intensity": 30
    },
    "scanLines": {
      "enabled": false,
      "intensity": 40
    }
  },
  "mask": {
    "tool": "freehand",
    "invert": false,
    "shapes": [],
    "dataUrl": null,
    "enabled": false,
    "brushSize": 30,
    "showOverlay": false
  },
  "tint": "#3ca6ff",
  "bgBlur": 12,
  "bgMode": "none",
  "invert": false,
  "lights": {
    "points": [],
    "enabled": false
  },
  "charSet": "standard",
  "density": 20,
  "animated": true,
  "blurType": "off",
  "cellSize": 9,
  "contrast": 158,
  "coverage": 100,
  "animSpeed": {
    "enabled": true,
    "intensity": 100
  },
  "animStyle": "shimmer",
  "bgOpacity": 90,
  "blurAngle": 0,
  "grayscale": 0,
  "lensFocus": 40,
  "sourceUrl": "/ascii-editor/demos/generated/ref-002.webp",
  "tiltFocus": 35,
  "toneCurve": [
    {
      "x": 0,
      "y": 0
    },
    {
      "x": 1,
      "y": 1
    }
  ],
  "blurAmount": 35,
  "brightness": 0,
  "renderMode": "dither",
  "saturation": 100,
  "styleBlend": "source-over",
  "blurCenterX": 50,
  "blurCenterY": 50,
  "customChars": "",
  "tiltFeather": 15,
  "tintOpacity": 0,
  "edgeEmphasis": 0,
  "overlayBlend": "multiply",
  "tiltPosition": 50,
  "animIntensity": {
    "enabled": true,
    "intensity": 60
  },
  "progressiveReverse": false,
  "progressivePosition": 55,
  "directionalBothSides": false
}
```
