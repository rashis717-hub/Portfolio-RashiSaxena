"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import wireframesManifest from "@/public/work/infrabot/wireframes/manifest.json";
import a2uiDiagramsManifest from "@/public/work/a2ui/diagrams/manifest.json";
import agentRegistryDiagramsManifest from "@/public/work/agent-registry/diagrams/manifest.json";
import salespulzeDiagramsManifest from "@/public/work/salespulze/diagrams/manifest.json";
import salesAiDiagramsManifest from "@/public/work/sales-ai/diagrams/manifest.json";

interface WireframeImageMeta {
  width: number;
  height: number;
}

const manifest: Record<string, WireframeImageMeta> = {
  ...(wireframesManifest as Record<string, WireframeImageMeta>),
  ...(a2uiDiagramsManifest as Record<string, WireframeImageMeta>),
  ...(agentRegistryDiagramsManifest as Record<string, WireframeImageMeta>),
  ...(salespulzeDiagramsManifest as Record<string, WireframeImageMeta>),
  ...(salesAiDiagramsManifest as Record<string, WireframeImageMeta>),
};

type Children = { children?: React.ReactNode };

/**
 * Numbered Section (C06 Spec)
 * Starts under a full-width hairline.
 * Section heading is an h2 of about 28 to 32px; the "01 / Title" number appears as a mono label above it.
 * Body text is muted, 17px, line height 1.7, about 68 characters wide.
 */
export function Section({
  n,
  number,
  label,
  title,
  headline,
  children,
}: Children & {
  n?: string;
  number?: string;
  label?: string;
  title?: string;
  headline?: string;
}) {
  const secNum = n || number || "01";
  const rawTitle = title || label || "";
  const secHeading = headline || rawTitle;
  const sectionId = `section-${secNum.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;

  return (
    <section
      id={sectionId}
      data-section-id={sectionId}
      data-section-n={secNum}
      data-section-title={rawTitle}
      className="border-t border-border pt-12 mt-16 md:mt-24 first:mt-0 first:border-t-0 first:pt-0 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {secNum} / {rawTitle}
        </span>
        <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight text-foreground leading-[1.25]">
          {secHeading}
        </h2>
      </div>
      <div className="flex flex-col gap-6 text-[17px] leading-[1.7] text-muted-foreground max-w-[68ch]">
        {children}
      </div>
    </section>
  );
}

/**
 * SubSection (C06 Spec)
 * Sub-headings (h3) are 20 to 22px, foreground colour, with a hairline divider above.
 */
export function SubSection({
  n,
  title,
  children,
}: Children & { n: string; title: string }) {
  return (
    <div className="mt-12 border-t border-border pt-8 first:mt-6 first:border-t-0 first:pt-0 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          {n} / {title}
        </span>
        <h3 className="text-[20px] md:text-[22px] font-medium text-foreground tracking-tight">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

/**
 * Figure (C06 / C08 Unboxed Spec)
 * Props: src, alt, caption, size ("column" | "wide" | "full", default "wide"), zoom, themed.
 * No box: no border, radius, background, shadow or padding. The image sits directly on the page.
 * Caption is centred above the image in muted body text (about 15px).
 * themed: renders src + ".light.png" (dark:hidden) and src + ".dark.png" (hidden dark:block).
 * Uses next/image with exact width and height from wireframes/manifest.json, sizes according to size prop, quality 90.
 */
export function Figure({
  src,
  alt,
  caption,
  size = "wide",
  zoom = false,
  themed = false,
}: {
  src: string;
  alt: string;
  caption: string;
  size?: "column" | "wide" | "full";
  zoom?: boolean;
  themed?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A missing file can fail before hydration, when onError is not attached yet.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMissing(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  let lightSrc = src;
  let darkSrc = src;
  let lightMeta: WireframeImageMeta | undefined;
  let darkMeta: WireframeImageMeta | undefined;

  if (themed) {
    const baseName = src.split("/").pop() || "";
    const lightFileName = `${baseName}.light.png`;
    const darkFileName = `${baseName}.dark.png`;

    lightMeta = manifest[lightFileName];
    darkMeta = manifest[darkFileName];

    lightSrc = `${src}.light.png`;
    darkSrc = `${src}.dark.png`;
  }

  const sizesAttr =
    size === "column"
      ? "(max-width: 768px) 100vw, 768px"
      : size === "wide"
      ? "(max-width: 1200px) 100vw, 1200px"
      : "100vw";

  const sizeClasses =
    size === "column"
      ? "max-w-[68ch] mx-auto"
      : "w-full max-w-full";

  const maxRenderedWidth = lightMeta ? Math.round(lightMeta.width / 2) : undefined;

  // A themed diagram not in a manifest yet shows the same labelled placeholder as a missing image.
  if (missing || (themed && (!lightMeta || !darkMeta))) {
    return (
      <figure className={`my-10 flex flex-col gap-3.5 ${sizeClasses}`}>
        {caption && (
          <figcaption className="text-center text-[15px] text-muted-foreground leading-normal px-4">
            {caption}
          </figcaption>
        )}
        <div
          role="img"
          aria-label={alt}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border px-6 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Image coming
          </span>
          <span className="break-all font-mono text-xs text-muted-foreground">{src}</span>
        </div>
      </figure>
    );
  }

  return (
    <>
      <figure className={`my-10 flex flex-col gap-3.5 ${sizeClasses}`}>
        {/* Caption centred ABOVE the image */}
        {caption && (
          <figcaption className="text-center text-[15px] text-muted-foreground leading-normal px-4">
            {caption}
          </figcaption>
        )}

        {/* Unboxed Image Container: no border, no radius, no bg, no shadow, no padding */}
        <div
          role={zoom ? "button" : undefined}
          tabIndex={zoom ? 0 : undefined}
          onClick={zoom ? () => setIsOpen(true) : undefined}
          onKeyDown={zoom ? (e) => (e.key === "Enter" || e.key === " ") && setIsOpen(true) : undefined}
          className={`relative w-full flex items-center justify-center mx-auto ${
            zoom ? "cursor-zoom-in hover:opacity-90 transition-opacity" : ""
          }`}
          style={maxRenderedWidth ? { maxWidth: `${maxRenderedWidth}px` } : undefined}
        >
          {themed && lightMeta && darkMeta ? (
            <>
              {/* Light Theme PNG */}
              <Image
                src={lightSrc}
                alt={alt}
                width={lightMeta.width}
                height={lightMeta.height}
                sizes={sizesAttr}
                quality={90}
                className="w-full h-auto object-contain dark:hidden"
                style={{ maxWidth: "100%" }}
              />
              {/* Dark Theme PNG */}
              <Image
                src={darkSrc}
                alt={alt}
                width={darkMeta.width}
                height={darkMeta.height}
                sizes={sizesAttr}
                quality={90}
                className="w-full h-auto object-contain hidden dark:block"
                style={{ maxWidth: "100%" }}
              />
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setMissing(true)}
              className="w-full h-auto object-contain max-w-full mx-auto"
            />
          )}
        </div>
      </figure>

      {/* Lightbox Modal */}
      {zoom && isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-md border border-border bg-background shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5 bg-muted/40">
              <span className="text-xs font-mono text-muted-foreground truncate max-w-xl">
                {alt}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close zoom"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-auto max-h-[75vh] flex items-center justify-center bg-white dark:bg-zinc-950">
              {themed && lightMeta && darkMeta ? (
                <>
                  <Image
                    src={lightSrc}
                    alt={alt}
                    width={lightMeta.width}
                    height={lightMeta.height}
                    quality={90}
                    className="max-h-[70vh] w-auto max-w-full object-contain dark:hidden"
                  />
                  <Image
                    src={darkSrc}
                    alt={alt}
                    width={darkMeta.width}
                    height={darkMeta.height}
                    quality={90}
                    className="max-h-[70vh] w-auto max-w-full object-contain hidden dark:block"
                  />
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              )}
            </div>
            <p className="px-4 py-2.5 text-xs text-muted-foreground border-t border-border text-center">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * MetricStrip (C06 Spec)
 * N equal cells (2 to 4), same style as the header metrics, inside the content column.
 * Separated by vertical hairlines with hairlines above and below across full width.
 */
export function MetricStrip({
  items = [],
}: {
  items: Array<{ value: string; suffix?: string; label: string }>;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 w-full border-y border-border py-8">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border"
        style={{
          gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
        }}
      >
        {items.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0">
            <span className="text-[32px] font-bold tracking-tight text-foreground leading-none">
              {m.value}
              {m.suffix && <span className="text-accent-strong">{m.suffix}</span>}
            </span>
            <span className="mt-2 text-sm text-muted-foreground leading-snug">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * CardGrid (C06 Spec)
 * Items separated by hairlines only (no boxes): a grid with 1px dividers between cells,
 * title in h3 weight, text in muted body.
 */
export function CardGrid({
  cols = 2,
  items = [],
}: {
  cols?: number;
  items: Array<{ title: string; text: string }>;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={`my-10 grid grid-cols-1 md:grid-cols-${cols} divide-y md:divide-y-0 md:divide-x divide-border border-y border-border`}
    >
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-2 p-6 first:pl-0 last:pr-0">
          <h4 className="text-[19px] font-medium text-foreground tracking-tight">
            {item.title}
          </h4>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Stakeholders
 */
export function Stakeholders({
  heardLabel = "What I heard",
  items,
  children,
}: Children & {
  heardLabel?: string;
  items?: Array<{ team: string; heard: string; shaped: string }>;
}) {
  if (items && items.length > 0) {
    return (
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border">
        {items.map((item, idx) => (
          <article key={idx} className="flex flex-col gap-3 p-6 first:pl-0 last:pr-0">
            <h4 className="text-[19px] font-medium text-foreground">{item.team}</h4>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {heardLabel}
              </span>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{item.heard}</p>
            </div>
            <div className="flex flex-col gap-1 border-t border-border pt-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-strong">
                How it shaped the design
              </span>
              <p className="text-[15px] leading-relaxed text-foreground/90">{item.shaped}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return <div className="my-8 flex flex-col gap-6">{children}</div>;
}

export function Stakeholder({
  team,
  heard,
  shaped,
}: {
  team: string;
  heard: string;
  shaped: string;
}) {
  return (
    <article className="flex flex-col gap-3 py-6 border-b border-border last:border-b-0">
      <h4 className="text-[19px] font-medium text-foreground">{team}</h4>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          What I heard
        </span>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{heard}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-border pt-3">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-strong">
          How it shaped the design
        </span>
        <p className="text-[15px] leading-relaxed text-foreground/90">{shaped}</p>
      </div>
    </article>
  );
}

/**
 * Decision Component with interactive tabs & arrow key navigation (Hairline style)
 */
export function Decision({
  title,
  context,
  options,
  tradeoffs,
  chosen,
  why,
}: {
  title?: string;
  context?: string;
  options?: string | string[];
  tradeoffs?: string | Record<string, string>;
  chosen?: string;
  why?: string;
}) {
  const optionList = Array.isArray(options) ? options : options ? [options] : [];
  const [selectedOption, setSelectedOption] = useState<string>(
    chosen || (optionList.length > 0 ? optionList[0] : "")
  );

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % optionList.length;
      setSelectedOption(optionList[nextIdx]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + optionList.length) % optionList.length;
      setSelectedOption(optionList[prevIdx]);
    }
  };

  const tradeoffText =
    typeof tradeoffs === "object" && tradeoffs !== null
      ? tradeoffs[selectedOption]
      : typeof tradeoffs === "string"
      ? tradeoffs
      : null;

  return (
    <div className="my-10 border-y border-border py-8 flex flex-col gap-5">
      {title && <h3 className="text-[20px] font-medium text-foreground">{title}</h3>}
      {context && (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Context</span>
          <p className="text-[15px] text-foreground/90">{context}</p>
        </div>
      )}

      {/* Options Tabs */}
      {optionList.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Options Considered</span>
          <div role="tablist" className="flex flex-wrap gap-2">
            {optionList.map((opt, idx) => {
              const isChosen = opt === chosen;
              const isSelected = opt === selectedOption;
              return (
                <button
                  key={opt}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedOption(opt)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-foreground text-background shadow-xs ring-1 ring-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {isChosen && (
                    <span className="size-1.5 rounded-full bg-accent inline-block" aria-label="Chosen direction" />
                  )}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Trade-off / Why Display */}
      <div className="flex flex-col gap-2 rounded-sm bg-muted/40 p-4 border border-border transition-opacity duration-200">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-strong">
            {selectedOption === chosen ? "Why Chosen" : `Trade-off: ${selectedOption}`}
          </span>
          {selectedOption === chosen && (
            <span className="font-mono text-[10px] text-accent-strong uppercase">Recommended</span>
          )}
        </div>
        <p className="text-[15px] text-foreground/90 leading-relaxed">
          {selectedOption === chosen && why ? why : tradeoffText || why || chosen}
        </p>
      </div>
    </div>
  );
}

/**
 * Flow Component
 */
export function Flow({
  steps,
}: {
  steps?: Array<{
    step?: string;
    label?: string;
    title?: string;
    detail?: string;
    description?: string;
  }>;
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-10 w-full border-y border-border py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {steps.map((s, idx) => {
          const stepNumber = s.step || (idx + 1).toString().padStart(2, "0");
          const stepTitle = s.label || s.title || "";
          const stepDetail = s.detail || s.description || "";
          return (
            <div key={idx} className="flex flex-col gap-2 px-4 first:pl-0 last:pr-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-strong font-bold">{stepNumber}</span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden size-4 text-muted-foreground lg:block" />
                )}
              </div>
              <h4 className="text-[17px] font-medium text-foreground">{stepTitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{stepDetail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Takeaways Quote Component (unboxed)
 */
export function Takeaways({ quote, children }: Children & { quote?: string }) {
  return (
    <aside className="my-12 border-l-2 border-accent-strong pl-6 py-2">
      <span className="font-mono text-xs uppercase tracking-widest text-accent-strong block mb-2">
        Key Takeaway
      </span>
      {quote && (
        <blockquote className="text-[24px] md:text-[28px] font-medium text-foreground leading-snug">
          “{quote}”
        </blockquote>
      )}
      {children && (
        <div className="mt-3 text-[17px] text-muted-foreground leading-relaxed">
          {children}
        </div>
      )}
    </aside>
  );
}

/**
 * Backward compatibility aliases for existing case studies
 */
export function Metrics({
  items,
  children,
}: Children & {
  items?: Array<{ value: string; suffix?: string; label: string }>;
}) {
  if (items && items.length > 0) {
    return <MetricStrip items={items} />;
  }
  return (
    <div className="my-10 grid grid-cols-1 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function Metric({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:px-6 first:sm:pl-0 last:sm:pr-0">
      <dd className="text-display font-medium tracking-tight text-foreground">
        {value}
        {suffix && <span className="text-accent-strong">{suffix}</span>}
      </dd>
      <dt className="label text-muted-foreground">{label}</dt>
    </div>
  );
}

export function Callout({ title, children }: Children & { title: string }) {
  return (
    <aside className="my-8 border-l-2 border-accent-strong bg-muted/30 p-6 flex flex-col gap-2">
      <p className="text-[19px] font-medium text-foreground">{title}</p>
      <div className="text-[16px] text-muted-foreground leading-relaxed">{children}</div>
    </aside>
  );
}

export function Annotated({
  src,
  alt,
  caption,
  notes,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  notes?: readonly string[] | string[];
}) {
  return (
    <div className="my-8 flex flex-col gap-4">
      {src && <Figure src={src} alt={alt ?? "Annotated interface"} caption={caption ?? ""} />}
      {notes && notes.length > 0 && (
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {notes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-accent-strong">{(idx + 1).toString().padStart(2, "0")}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function Compare({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
}: {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  return (
    <div className="my-8 flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground uppercase">{beforeLabel}</span>
          <div className="aspect-video w-full flex items-center justify-center">
            {before ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={before} alt={beforeLabel} className="h-full w-full object-contain" />
            ) : (
              <span className="font-mono text-xs text-muted-foreground">[BEFORE]</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-accent-strong uppercase">{afterLabel}</span>
          <div className="aspect-video w-full flex items-center justify-center">
            {after ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={after} alt={afterLabel} className="h-full w-full object-contain" />
            ) : (
              <span className="font-mono text-xs text-muted-foreground">[AFTER]</span>
            )}
          </div>
        </div>
      </div>
      {caption && <p className="text-center text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}
