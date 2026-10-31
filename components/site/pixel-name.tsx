"use client";

import { useEffect, useRef, useState } from "react";

// Geist Pixel draws every glyph on a grid of square cells 0.038em wide, aligned to the glyph origin.
const CELL_EM = 0.038;
const DURATION = 3500; // ms until the real text takes over
const LAND = 3200; // the last cells all land here, so the name settles before the swap
const FADE = 90; // each cell fades in over this many ms

// Once per page load: navigating back to the home page inside the site shows the finished name.
let played = false;

type Cell = { x: number; y: number; t: number };

// Cell coordinates per letter, relative to the glyph origin on the baseline, in cells.
const glyphCache = new Map<string, [number, number][]>();

/** Renders one letter at one canvas pixel per cell and returns the cells that are on. */
function glyphCells(char: string): [number, number][] {
  const cached = glyphCache.get(char);
  if (cached) return cached;
  const size = 40;
  const ox = 4;
  const baseline = 30;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `${1 / CELL_EM}px "Geist Pixel"`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(char, ox, baseline);
  const data = ctx.getImageData(0, 0, size, size).data;
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (data[(y * size + x) * 4 + 3] > 127) cells.push([x - ox, y - baseline]);
    }
  }
  glyphCache.set(char, cells);
  return cells;
}

/**
 * Lays every letter's cells over the live text's exact position and gives each an arrival time.
 * Cells follow the nearest of a few randomly timed seeds, so the name fills in scattered clusters
 * rather than a sweep; arrivals start slowly and speed up, and the last few land together.
 */
function buildCells(box: HTMLElement): { cells: Cell[]; cell: number } {
  const style = getComputedStyle(box);
  const fontSize = parseFloat(style.fontSize);
  const cell = fontSize * CELL_EM;
  const origin = box.getBoundingClientRect();

  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `${fontSize}px "Geist Pixel"`;
  const metrics = measure.measureText("R");
  const ascent = metrics.fontBoundingBoxAscent;
  const descent = metrics.fontBoundingBoxDescent;

  const cells: Cell[] = [];
  for (const span of Array.from(box.children) as HTMLElement[]) {
    const char = span.textContent ?? "";
    if (!char.trim()) continue;
    const r = span.getBoundingClientRect();
    // Each letter is an inline-block line box: the baseline sits half the leading plus the ascent below its top.
    const baseline = r.top - origin.top + (r.height - ascent - descent) / 2 + ascent;
    const left = r.left - origin.left;
    for (const [cx, cy] of glyphCells(char)) cells.push({ x: left + cx * cell, y: baseline + cy * cell, t: 0 });
  }

  const width = origin.width;
  const seeds = Array.from({ length: 14 }, () => ({
    x: Math.random() * width,
    y: Math.random() * origin.height,
    t: Math.random(),
  }));
  const keys = cells.map((c) => {
    // About 8% of cells, picked at random across the whole name, form the final landing.
    if (Math.random() < 0.08) return Infinity;
    let key = Infinity;
    for (const s of seeds) key = Math.min(key, s.t + Math.hypot(c.x - s.x, c.y - s.y) / (width * 0.3));
    return key + Math.random() * 0.12;
  });
  const order = cells.map((_, i) => i).sort((a, b) => (keys[a] === keys[b] ? 0 : keys[a] - keys[b]));
  order.forEach((index, rank) => {
    // The count on screen grows with the square of time; the final 8% arrive together at LAND.
    cells[index].t = LAND * Math.min(1, Math.sqrt((rank + 1) / cells.length / 0.92));
  });

  return { cells, cell };
}

/**
 * The hero name in Geist Pixel. On the first load it builds itself cell by cell on a canvas laid
 * over the real glyphs, then hands over to the text so the result stays sharp. The h1 text is in
 * the DOM throughout; reduced motion shows the name at once.
 */
export function PixelName({ name, id }: { name: string; id: string }) {
  const [state, setState] = useState<"pending" | "running" | "done">(played ? "done" : "pending");
  const box = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const initial = useRef(state);

  useEffect(() => {
    if (initial.current !== "pending") return;
    played = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;
    const finish = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      setState("done");
    };

    document.fonts.load(`100px "Geist Pixel"`).then(() => {
      const el = box.current;
      const target = canvas.current;
      const ctx = target?.getContext("2d");
      if (cancelled || !el || !target || !ctx) return;

      const { cells, cell } = buildCells(el);
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = el.getBoundingClientRect();
      target.width = Math.round(width * dpr);
      target.height = Math.round(height * dpr);
      setState("running");

      const start = performance.now();
      const draw = (now: number) => {
        const elapsed = now - start;
        ctx.clearRect(0, 0, target.width, target.height);
        ctx.fillStyle = getComputedStyle(el).color;
        for (const c of cells) {
          if (c.t > elapsed) continue;
          ctx.globalAlpha = Math.min(1, (elapsed - c.t) / FADE);
          // Snapped to device pixels so neighbouring cells meet without seams.
          const x0 = Math.round(c.x * dpr);
          const y0 = Math.round(c.y * dpr);
          ctx.fillRect(x0, y0, Math.round((c.x + cell) * dpr) - x0, Math.round((c.y + cell) * dpr) - y0);
        }
        ctx.globalAlpha = 1;
        if (elapsed >= DURATION) setState("done");
        else frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    });

    // A resize mid-build would misplace the cells, so the finished name appears instead.
    window.addEventListener("resize", finish);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", finish);
    };
  }, []);

  return (
    <div className="relative">
      {/* The h1 holds only the name; the letters below are its visual rendering. */}
      <h1 id={id} className="sr-only">
        {name}
      </h1>
      <span ref={box} aria-hidden data-build={state} className="hero-pixel-name">
        {name
          .toUpperCase()
          .split("")
          .map((char, i) => (
            <span key={i} className={`hero-pixel-char${char === " " ? " w-[0.45em]" : ""}`}>
              {char === " " ? " " : char}
            </span>
          ))}
      </span>
      {state !== "done" && (
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
      )}
    </div>
  );
}
