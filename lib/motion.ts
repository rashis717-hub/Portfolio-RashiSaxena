import type { Transition, Variants } from "motion/react";

/**
 * Shared Motion Tokens & Variants (Quiet Precision design system).
 * Source of truth: DESIGN.md and .agents/rules/motion.md.
 *
 * Rules:
 * - Entrances: cubic-bezier(0.22, 1, 0.36, 1)
 * - Hovers: ease-out
 * - Durations: hover 180ms, reveal 500ms, page transition 350ms, reduced motion fade 150ms.
 * - Stagger delay: 60ms, maximum 8 items.
 * - Transforms: translateY 12-16px, never animate layout properties.
 * - Reduced motion: all movement stripped, only 150ms opacity fade or instant.
 */

export const EASING = {
  entrance: [0.22, 1, 0.36, 1] as const,
  hover: "easeOut" as const,
};

export const DURATION = {
  hover: 0.18,
  reveal: 0.5,
  page: 0.35,
  reduced: 0.15,
};

export const STAGGER_DELAY = 0.06;

export const defaultTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASING.entrance,
};

export const reducedTransition: Transition = {
  duration: DURATION.reduced,
  ease: "easeOut",
};

/**
 * Standard fadeUp reveal variant.
 * Translates translateY from 16px to 0, plus opacity fade.
 * When reduced motion is active, translateY is 0 and only a 150ms opacity fade runs.
 */
export const fadeUp = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? reducedTransition : defaultTransition,
  },
});

/**
 * Stagger container variant for animating child items in sequence.
 * Stagger delay: 60ms by default, disabled under reduced motion.
 */
export const stagger = (reduced = false, delay = STAGGER_DELAY): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : delay,
      delayChildren: 0.04,
    },
  },
});

/**
 * Word reveal variant for hero typography mask.
 * Rises 12px behind a clip-path mask.
 */
export const wordReveal = (reduced = false): Variants => ({
  hidden: {
    opacity: reduced ? 0 : 1,
    y: reduced ? 0 : 12,
    clipPath: reduced ? "none" : "inset(100% -0.1em -0.25em -0.1em)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(-0.25em -0.1em -0.25em -0.1em)",
    transition: reduced ? reducedTransition : defaultTransition,
  },
});

/**
 * Helper to count up numbers smoothly using requestAnimationFrame.
 * Honors prefers-reduced-motion (shows final value immediately).
 */
export function countUp(
  target: number,
  onUpdate: (value: number) => void,
  options: {
    duration?: number;
    reduced?: boolean;
    onComplete?: () => void;
  } = {}
) {
  const { duration = 1200, reduced = false, onComplete } = options;

  if (reduced) {
    onUpdate(target);
    onComplete?.();
    return () => {};
  }

  let frameId = 0;
  const start = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(easeOutCubic(progress) * target);
    onUpdate(current);

    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
    } else {
      onComplete?.();
    }
  };

  frameId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frameId);
}
