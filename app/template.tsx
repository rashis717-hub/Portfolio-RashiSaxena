"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// Page transition: content fades and rises 12px over 350ms on client-side navigation.
// The first page load renders without it so content is never hidden before hydration,
// and reduced motion skips it entirely.
import { DURATION, EASING } from "@/lib/motion";

let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={
        shouldAnimate
          ? reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 12 }
          : false
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? DURATION.reduced : DURATION.page,
        ease: reduceMotion ? "easeOut" : EASING.entrance,
      }}
    >
      {children}
    </motion.div>
  );
}
