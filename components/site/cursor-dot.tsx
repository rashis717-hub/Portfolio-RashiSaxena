"use client";

import { useEffect, useRef } from "react";

const SMOOTHING = 0.35; // share of the remaining distance covered each frame
const TEXT_FIELD = "input:not([type=button],[type=submit],[type=reset],[type=checkbox],[type=radio],[type=range],[type=color],[type=file]), textarea, select, [contenteditable=true]";

/**
 * On a fine pointer, a 10px white dot replaces the system cursor. Difference blending keeps it
 * visible on light and dark surfaces. Text fields keep their text cursor (the dot steps aside),
 * touch devices never see it, and reduced motion drops the smoothing.
 */
export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = dot.current;
    if (!fine.matches || !el) return;

    const root = document.documentElement;
    root.classList.add("has-cursor-dot");
    const p = { x: 0, y: 0, tx: 0, ty: 0, frame: 0, seen: false };

    const paint = () => {
      p.frame = 0;
      const lerp = reduce.matches ? 1 : SMOOTHING;
      p.x += (p.tx - p.x) * lerp;
      p.y += (p.ty - p.y) * lerp;
      el.style.transform = `translate3d(${p.x - 5}px, ${p.y - 5}px, 0)`;
      if (Math.abs(p.tx - p.x) > 0.1 || Math.abs(p.ty - p.y) > 0.1) p.frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      p.tx = event.clientX;
      p.ty = event.clientY;
      if (!p.seen) {
        p.seen = true;
        p.x = p.tx;
        p.y = p.ty;
      }
      const overField = event.target instanceof Element && !!event.target.closest(TEXT_FIELD);
      el.style.opacity = overField ? "0" : "1";
      if (!p.frame) p.frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor-dot");
      cancelAnimationFrame(p.frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[2147483647] size-2.5 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}
