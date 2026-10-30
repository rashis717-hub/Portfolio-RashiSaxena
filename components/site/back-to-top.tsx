"use client";

// Scrolls to the top (instantly under reduced motion) and moves focus to the wordmark,
// so keyboard users continue from the top of the page.
export function BackToTop() {
  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("site-home")?.focus({ preventScroll: true });
  };

  return (
    <button type="button" onClick={onClick} className="underline-draw text-sm text-muted-foreground">
      Back to top
    </button>
  );
}
