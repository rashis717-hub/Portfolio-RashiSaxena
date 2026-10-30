// Crossfades background-color and color for one theme switch (see .theme-transition in globals.css).
// Skipped entirely under prefers-reduced-motion.
const CROSSFADE_MS = 300; // --duration-theme (200ms) plus a frame or two for next-themes to apply the class

let timer: number | undefined;

export function withThemeTransition(apply: () => void) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }
  const root = document.documentElement;
  root.classList.add("theme-transition");
  apply();
  window.clearTimeout(timer);
  timer = window.setTimeout(() => root.classList.remove("theme-transition"), CROSSFADE_MS);
}
