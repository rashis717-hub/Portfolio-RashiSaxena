"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { coverMotionSlugs, hasCoverMotion } from "@/lib/cover-motion";

/**
 * Each animated layer rests at --cm-from and moves to --cm-to while its row is hovered or holds
 * focus (or once on touch, see below). Timing per layer: --cm-dur, --cm-delay and, where it must
 * not ease out, --cm-ease. Reduced motion shows the final state. The rules live in globals.css
 * under "Cover motion".
 */
type Layer = {
  from?: string;
  to?: string;
  fromOpacity?: number;
  dur: number;
  delay: number;
  ease?: string;
  origin?: string;
};

function layer({ from = "none", to = "none", fromOpacity = 1, dur, delay, ease, origin }: Layer): CSSProperties {
  return {
    "--cm-from": from,
    "--cm-to": to,
    "--cm-from-o": fromOpacity,
    "--cm-dur": `${dur}s`,
    "--cm-delay": `${delay}s`,
    ...(ease && { "--cm-ease": ease }),
    transformOrigin: origin,
  } as CSSProperties;
}

/** The infraBOT logo shrinks to the top left while the compliance dashboard opens out of it. */
function InfrabotLayers() {
  return (
    <>
      <div className="absolute inset-0 bg-black/45" />
      {/* Final box: left 13%, top 19%, 74% wide (65.8% tall). It grows from the cover's centre. */}
      <div
        data-cm
        className="absolute top-[19%] left-[13%] w-[74%] overflow-hidden rounded-[0.6cqw] shadow-2xl ring-1 ring-white/20"
        style={layer({ from: "scale(0.12)", fromOpacity: 0, dur: 0.85, delay: 0.55, origin: "50% 47.1%" })}
      >
        <Image
          src="/work/infrabot/cover-panel.webp"
          alt=""
          width={1594}
          height={886}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
      {/* Rests centred at 44% wide; ends at left 5%, top 6%, 16% wide. */}
      <Image
        data-cm
        src="/work/infrabot/brand/infrabot-logo-dark.svg"
        alt=""
        width={2038}
        height={436}
        loading="lazy"
        className="absolute top-[42.47%] left-[28%] h-auto w-[44%]"
        style={layer({ to: "translate(-52.27%, -242.2%) scale(0.364)", dur: 0.6, delay: 0.4, origin: "0 0" })}
      />
    </>
  );
}

// Final card boxes as a share of the cover; `dx`/`dy` carry each card back to the cover's centre.
const A2UI_CARDS = [
  { name: "question", w: 30, left: 4, top: 24, dx: 31, dy: 7.39, delay: 0.25, width: 640, height: 378 },
  { name: "plan", w: 28, left: 36, top: 16, dx: 0, dy: 11.03, delay: 0.4, width: 640, height: 467 },
  { name: "permission", w: 30, left: 66, top: 32, dx: -31, dy: 5.01, delay: 0.55, width: 640, height: 266 },
];
const A2UI_LETTERS = [
  { char: "A", dx: -17 },
  { char: "2", dx: -6 },
  { char: "U", dx: 6 },
  { char: "I", dx: 17 },
];

/** A very large "A2UI" spreads apart and the Question, Plan and Permission cards slide out from behind it. */
function A2uiLayers() {
  return (
    <>
      {A2UI_CARDS.map((card) => (
        <div
          key={card.name}
          data-cm
          className="absolute overflow-hidden rounded-[0.5cqw] shadow-xl"
          style={{
            left: `${card.left}%`,
            top: `${card.top}%`,
            width: `${card.w}%`,
            ...layer({
              from: `translate(${card.dx}cqw, ${card.dy}cqw) scale(0.4)`,
              fromOpacity: 0,
              dur: 0.85,
              delay: card.delay,
            }),
          }}
        >
          <Image
            src={`/work/a2ui/cover-cards/${card.name}.webp`}
            alt=""
            width={card.width}
            height={card.height}
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-[22cqw] leading-none font-semibold tracking-[-0.04em] text-(--cover-a2ui)">
        {A2UI_LETTERS.map(({ char, dx }) => (
          <span key={char} data-cm className="inline-block" style={layer({ to: `translate(${dx}cqw, 9cqw)`, dur: 0.6, delay: 0 })}>
            {char}
          </span>
        ))}
      </div>
    </>
  );
}

// The line spans 8% to 92% of the width and draws at a constant speed, so each marker lights as
// the line reaches it: delay = LINE_DUR * (x - 8) / 84.
const LINE_DUR = 1.1;
const LIFECYCLE = [
  { label: "Build", x: 16 },
  { label: "Register", x: 50 },
  { label: "Deploy", x: 84 },
].map((step) => ({ ...step, delay: (LINE_DUR * (step.x - 8)) / 84 }));

/** A thin lifecycle line draws across the engineers, lighting Build, Register and Deploy in turn. */
function AgentRegistryLayers() {
  const line = "absolute inset-x-[8%] top-[84%] h-[max(1px,0.2cqw)]";
  return (
    <>
      <div className="absolute inset-0 bg-black/30" />
      <div className={`${line} bg-white/30`} />
      <div
        data-cm
        className={`${line} origin-left bg-white`}
        style={layer({ from: "scaleX(0)", dur: LINE_DUR, delay: 0, ease: "linear" })}
      />
      {LIFECYCLE.map((step) => (
        <div
          key={step.label}
          className="absolute top-[84%] flex -translate-x-1/2 -translate-y-[0.8cqw] flex-col items-center gap-[1cqw]"
          style={{ left: `${step.x}%` }}
        >
          <span className="relative block size-[1.6cqw] rounded-full border border-white/70">
            <span
              data-cm
              className="absolute -inset-px rounded-full bg-(--accent)"
              style={layer({ from: "scale(0.3)", fromOpacity: 0, dur: 0.3, delay: step.delay })}
            />
          </span>
          <span
            data-cm
            className="rounded-full bg-black/55 px-[1.2cqw] py-[0.4cqw] font-mono text-[max(9px,1.5cqw)] tracking-widest text-white uppercase"
            style={layer({ fromOpacity: 0.6, dur: 0.3, delay: step.delay })}
          >
            {step.label}
          </span>
        </div>
      ))}
    </>
  );
}

type CoverConfig = {
  Layers?: () => React.ReactNode;
  /** A slow push in on the photo, 1 to 1.06 over six seconds. */
  zoom?: boolean;
};

const COVERS: Record<(typeof coverMotionSlugs)[number], CoverConfig> = {
  infrabot: { Layers: InfrabotLayers },
  a2ui: { Layers: A2uiLayers },
  "agent-registry": { Layers: AgentRegistryLayers },
  salespulze: { zoom: true },
  "sales-ai": { zoom: true },
};

/**
 * A home-page cover: the photo of who the work is for, with the project's motion layered on top.
 * It plays while the row is hovered or focused on desktop; touch devices (no hover) play it once
 * when the cover is half in view. The layers are decorative; the photo carries the alt text.
 */
export function CoverMotion({ slug, src, alt }: { slug: string; src: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const { Layers, zoom }: CoverConfig = hasCoverMotion(slug) ? COVERS[slug as keyof typeof COVERS] : {};

  useEffect(() => {
    const el = box.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.play = "true";
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="cover-motion absolute inset-0 overflow-hidden [container-type:inline-size]">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
        {...(zoom && { "data-cm": true, style: layer({ to: "scale(1.06)", dur: 6, delay: 0, ease: "linear" }) })}
      />
      {Layers && (
        <div aria-hidden className="absolute inset-0">
          <Layers />
        </div>
      )}
    </div>
  );
}
