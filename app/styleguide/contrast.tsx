"use client";

// Measures token colours as the browser renders them in the nearest theme scope (.light / .dark),
// so the ratios reflect globals.css, not a copy of DESIGN.md. Values are written into an empty
// span after mount; React owns no children there, so nothing is overwritten on re-render.

let ctx: CanvasRenderingContext2D | null = null;

// Paints colours in order onto one pixel (later ones composite over earlier) and reads it back.
function paint(colours: string[]) {
  ctx ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return [0, 0, 0];
  ctx.clearRect(0, 0, 1, 1);
  for (const colour of colours) {
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 1, 1);
  }
  return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
}

const channel = (v: number) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]: number[]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const hex = (rgb: number[]) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
const token = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(`--${name}`).trim();

function ratio(el: Element, fg: string, bg: string) {
  const back = paint([token(el, bg)]);
  const front = paint([token(el, bg), token(el, fg)]); // translucent tokens composite over the background
  const [hi, lo] = [luminance(front), luminance(back)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/** Rendered hex value of an opaque token in this theme scope. */
export function TokenHex({ name }: { name: string }) {
  return (
    <span
      className="font-mono text-xs text-muted-foreground"
      ref={(el) => {
        if (el) el.textContent = hex(paint([token(el, name)]));
      }}
    />
  );
}

/**
 * Contrast of fg on bg, marked pass or fail against a minimum (4.5 for text, 3 for non-text).
 * A fail is stated in words with heavier foreground text, never in colour (DESIGN.md: no pink, or
 * pink-adjacent red, for errors or warnings).
 */
export function ContrastRatio({ fg, bg, min }: { fg: string; bg: string; min: number }) {
  return (
    <span
      className="font-mono text-xs whitespace-nowrap tabular-nums text-muted-foreground data-[pass=false]:font-medium data-[pass=false]:text-foreground"
      ref={(el) => {
        if (!el) return;
        const r = ratio(el, fg, bg);
        el.dataset.pass = String(r >= min);
        el.textContent =
          r >= min
            ? `${r.toFixed(2)}:1 pass (min ${min})`
            : `${r.toFixed(2)}:1 fails: below the ${min}:1 minimum`;
      }}
    />
  );
}
