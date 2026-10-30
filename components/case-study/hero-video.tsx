"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface HeroVideoProps {
  src: string;
  poster?: string;
  videoCredit?: string;
  title?: string;
}

export function HeroVideo({
  src,
  poster,
  videoCredit = "CitiusCloud",
  title = "Case study video preview",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Detect prefers-reduced-motion using useSyncExternalStore
  const isReducedMotion = React.useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );

  // Autoplay loop while >= 50% in view
  useEffect(() => {
    if (isReducedMotion) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoEl.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
          videoEl.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [isReducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const desktopSrc = src;
  const mobileSrc = src.endsWith("-720.mp4") ? src : src.replace(/\.mp4$/, "-720.mp4");

  return (
    <div className="w-full">
      {/* 16:9 unboxed video - never wider than 1600px, 100% of container, no border/radius/shadow */}
      <div className="relative aspect-video w-full max-w-[1600px] mx-auto overflow-hidden bg-black">
        <video
          ref={videoRef}
          poster={poster}
          preload="metadata"
          playsInline
          muted
          loop
          aria-label={title}
          className="h-full w-full object-cover"
        >
          <source media="(min-width: 768px)" src={desktopSrc} type="video/mp4" />
          <source src={mobileSrc} type="video/mp4" />
        </video>

        {/* Small Play/Pause toggle in bottom-right corner */}
        <button
          type="button"
          onClick={togglePlay}
          className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={isPlaying ? "Pause hero video" : "Play hero video"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Credit line below, right aligned, mono uppercase muted */}
      {videoCredit && (
        <div className="w-full max-w-[1600px] mx-auto py-2 flex justify-end">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            VIDEO: {videoCredit}
          </span>
        </div>
      )}
    </div>
  );
}
