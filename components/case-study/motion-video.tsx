"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MotionVideoProps {
  src: string;
  poster: string;
  caption: string;
  fullSrc?: string;
  fullLabel?: string;
}

export function MotionVideo({
  src,
  poster,
  caption,
  fullSrc,
  fullLabel,
}: MotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogVideoRef = useRef<HTMLVideoElement>(null);

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

  // IntersectionObserver: autoplay when >= 50% in view, pause when out of view
  useEffect(() => {
    if (isReducedMotion) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoEl.play().then(() => setIsPlaying(true)).catch(() => {
            // Autoplay prevented
            setIsPlaying(false);
          });
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

  const openDialog = () => {
    setDialogOpen(true);
    // Pause main video
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeDialog = () => {
    if (dialogVideoRef.current) {
      dialogVideoRef.current.pause();
    }
    setDialogOpen(false);
    triggerButtonRef.current?.focus();
  };

  // Handle ESC in dialog
  useEffect(() => {
    if (!dialogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialog();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialogOpen]);

  return (
    <figure className="my-10 flex flex-col gap-3.5 w-full">
      {/* Caption centred ABOVE the video */}
      {caption && (
        <figcaption className="text-center text-[15px] text-muted-foreground leading-normal px-4">
          {caption}
        </figcaption>
      )}

      {/* 16:9 Unboxed Video Container: no border, no radius, no shadow */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          muted
          loop
          className="h-full w-full object-cover"
        />

        {/* Floating play/pause button in bottom-right corner */}
        <button
          type="button"
          onClick={togglePlay}
          className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={isPlaying ? "Pause motion video" : "Play motion video"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Full Video Dialog Trigger */}
      {fullSrc && (
        <div className="text-center pt-1">
          <button
            ref={triggerButtonRef}
            type="button"
            onClick={openDialog}
            className="group inline-flex items-center gap-1.5 text-xs text-accent-strong hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-xs"
          >
            <span>{fullLabel || "Watch the full walkthrough"}</span>
            <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* Full Video Modal Dialog */}
      {dialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fullLabel || "Full video walkthrough"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-[1100px] overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/40">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {fullLabel || "Full Video Walkthrough"}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={closeDialog}
                aria-label="Close video dialog"
                className="size-7 rounded-full"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={dialogVideoRef}
                src={fullSrc}
                controls
                preload="none"
                playsInline
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </figure>
  );
}
