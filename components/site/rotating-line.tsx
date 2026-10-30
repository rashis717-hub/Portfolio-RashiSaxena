"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 1200;

/**
 * Shows each phrase once (12px slide, 350ms), then rests on the full line with every phrase.
 * The whole pass ends within 5s of load, so no pause control is needed (WCAG 2.2.2).
 *
 * - All states share one grid cell sized by the full line, so nothing shifts.
 * - Screen readers get `sentence` only; the moving phrases are hidden from them.
 * - Reduced motion shows the full line from the start.
 */
export function RotatingLine({
  phrases,
  sentence,
  className,
}: {
  phrases: string[];
  sentence: string;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = containerRef.current;
    if (!el) return;

    let timers: number[] = [];
    let isVisible = false;

    const startAnimation = () => {
      timers = phrases.map((_, i) =>
        window.setTimeout(() => setStep(i + 1), STEP_MS * (i + 1))
      );
    };

    const stopAnimation = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        isVisible = true;
        startAnimation();
      } else if (!entry.isIntersecting && isVisible) {
        isVisible = false;
        stopAnimation();
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [phrases]);

  const state = (i: number) => (i === step ? "current" : i < step ? "leaving" : "waiting");
  const cell =
    "col-start-1 row-start-1 transition-[opacity,translate] duration-350 ease-entrance data-[state=current]:translate-y-0 data-[state=current]:opacity-100 data-[state=leaving]:-translate-y-3 data-[state=leaving]:opacity-0 data-[state=waiting]:translate-y-3 data-[state=waiting]:opacity-0";
  const fullLine = phrases.join(" ");

  return (
    <p ref={containerRef} className={className}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden className="grid motion-reduce:hidden">
        {phrases.map((phrase, i) => (
          <span key={phrase} data-state={state(i)} className={cell}>
            {phrase}
          </span>
        ))}
        <span data-state={state(phrases.length)} className={cell}>
          {fullLine}
        </span>
      </span>
      <span aria-hidden className="hidden motion-reduce:inline">
        {fullLine}
      </span>
    </p>
  );
}
