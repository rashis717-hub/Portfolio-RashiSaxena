"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface Step {
  num: number;
  from: "Person" | "Client" | "Agent";
  to: "Person" | "Client" | "Agent" | "Self";
  directionLabel: string;
  label: string;
  validated?: boolean;
}

const STEPS: Step[] = [
  {
    num: 1,
    from: "Person",
    to: "Client",
    directionLabel: "Person to Client",
    label: "Sends a message",
  },
  {
    num: 2,
    from: "Client",
    to: "Agent",
    directionLabel: "Client to Agent",
    label: "Forwards the message",
  },
  {
    num: 3,
    from: "Agent",
    to: "Client",
    directionLabel: "Agent to Client",
    label: "Streams A2UI messages: structure and data",
    validated: true,
  },
  {
    num: 4,
    from: "Client",
    to: "Self",
    directionLabel: "Client (to itself)",
    label: "Validates, then renders with its own components, from the catalogue",
    validated: true,
  },
  {
    num: 5,
    from: "Client",
    to: "Person",
    directionLabel: "Client to Person",
    label: "Shows the interface",
  },
  {
    num: 6,
    from: "Person",
    to: "Client",
    directionLabel: "Person to Client",
    label: "Interacts: answers, chooses, approves",
  },
  {
    num: 7,
    from: "Client",
    to: "Agent",
    directionLabel: "Client to Agent",
    label: "Sends the action back",
  },
  {
    num: 8,
    from: "Agent",
    to: "Client",
    directionLabel: "Agent to Client",
    label: "Responds with updated A2UI messages",
  },
];

const CATALOGUE_PILLS = [
  "Question",
  "Decisions",
  "Plan",
  "Permission",
  "Form",
  "KPI Cards",
  "Data Table",
  "Charts",
  "Loading Orb",
];

export function A2UIFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // SVG coordinate system
  const SVG_WIDTH = 840;
  const SVG_HEIGHT = 650;
  const X_PERSON = 140;
  const X_CLIENT = 420;
  const X_AGENT = 700;

  // Y positions for each step
  const stepY: Record<number, number> = {
    1: 105,
    2: 165,
    3: 225,
    4: 285, // Self box centered at 285
    5: 350,
    6: 410,
    7: 470,
    8: 530,
  };

  return (
    <figure className="my-10 w-full flex flex-col gap-3.5">
      <figcaption className="text-center text-[15px] text-muted-foreground leading-normal px-4">
        The A2UI sequence: top to bottom, showing who sends what to whom and how the client renders from its trusted catalogue.
      </figcaption>

      {/* Screen-reader accessible ordered list */}
      <ol className="sr-only">
        {STEPS.map((s) => (
          <li key={s.num}>
            Step {s.num}: {s.directionLabel}: {s.label}
            {s.validated ? " (Validated)" : ""}
          </li>
        ))}
      </ol>

      {/* Mobile view: vertical numbered list (under 768px) */}
      <div className="flex md:hidden flex-col gap-3 w-full border border-border rounded-xl p-4 bg-muted/20">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Protocol Sequence
          </span>
          <span className="font-mono text-xs text-muted-foreground">8 steps</span>
        </div>

        <div className="flex flex-col gap-3 divide-y divide-border/60">
          {STEPS.map((step) => (
            <div key={step.num} className="pt-3 first:pt-0 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-5 rounded-full bg-foreground text-background font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <span className="font-mono text-xs text-foreground/80 font-medium">
                    {step.directionLabel}
                  </span>
                </div>
                {step.validated && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70 border border-border px-1.5 py-0.5 rounded-full bg-background">
                    ✓ Validated
                  </span>
                )}
              </div>
              <p className="text-[14px] text-foreground/90 pl-7 leading-relaxed">
                {step.label}
              </p>
              {step.num === 8 && (
                <div className="pl-7 pt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <span className="text-accent-strong">↺</span> Repeat from step 4
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Catalogue Box for mobile */}
        <div className="mt-4 pt-3 border-t border-dashed border-border flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-foreground font-medium">
            Catalogue: the components the agent is allowed to use
          </span>
          <p className="text-xs text-muted-foreground leading-normal">
            Pre-approved schema defining structure, data binding, allowed actions and safe fallbacks.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {CATALOGUE_PILLS.map((pill) => (
              <span
                key={pill}
                className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-border bg-background text-muted-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view: Sequence diagram SVG (768px and up) */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="hidden md:block w-full border border-border rounded-xl p-6 bg-card text-card-foreground select-none overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto max-w-full font-sans"
        >
          <defs>
            {/* Arrowhead marker right */}
            <marker
              id="seq-arrow-right"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" className="text-foreground" />
            </marker>
            {/* Arrowhead marker left */}
            <marker
              id="seq-arrow-left"
              viewBox="0 0 10 10"
              refX="2"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 10 1.5 L 2 5 L 10 8.5 z" fill="currentColor" className="text-foreground" />
            </marker>
            {/* Accent colored marker for repeat */}
            <marker
              id="seq-arrow-up"
              viewBox="0 0 10 10"
              refX="5"
              refY="2"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 1.5 10 L 5 2 L 8.5 10 z" fill="currentColor" className="text-foreground" />
            </marker>
          </defs>

          {/* 3 Lifeline headers and vertical hairlines */}
          {/* Person */}
          <line
            x1={X_PERSON}
            y1={52}
            x2={X_PERSON}
            y2={570}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="text-border"
          />
          {/* Client */}
          <line
            x1={X_CLIENT}
            y1={52}
            x2={X_CLIENT}
            y2={570}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="text-border"
          />
          {/* Agent */}
          <line
            x1={X_AGENT}
            y1={52}
            x2={X_AGENT}
            y2={570}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="text-border"
          />

          {/* Lifeline pill headers */}
          <g transform={`translate(${X_PERSON - 60}, 16)`}>
            <rect
              width={120}
              height={34}
              rx={17}
              fill="currentColor"
              className="text-muted/60 stroke-border stroke-[1]"
            />
            <text
              x={60}
              y={21}
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-semibold tracking-wider uppercase"
            >
              Person
            </text>
          </g>

          <g transform={`translate(${X_CLIENT - 85}, 16)`}>
            <rect
              width={170}
              height={34}
              rx={17}
              fill="currentColor"
              className="text-muted/60 stroke-border stroke-[1]"
            />
            <text
              x={85}
              y={21}
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-semibold tracking-wider uppercase"
            >
              Client (the app)
            </text>
          </g>

          <g transform={`translate(${X_AGENT - 60}, 16)`}>
            <rect
              width={120}
              height={34}
              rx={17}
              fill="currentColor"
              className="text-muted/60 stroke-border stroke-[1]"
            />
            <text
              x={60}
              y={21}
              textAnchor="middle"
              className="fill-foreground font-mono text-[13px] font-semibold tracking-wider uppercase"
            >
              Agent
            </text>
          </g>

          {/* Interactive Steps Group */}
          {STEPS.map((step) => {
            const isHovered = activeStep === step.num;
            const isDimmed = activeStep !== null && !isHovered;
            const y = stepY[step.num];
            const delay = shouldReduceMotion ? 0 : (step.num - 1) * 0.12;

            // Hover trigger zone
            return (
              <g
                key={step.num}
                tabIndex={0}
                onMouseEnter={() => setActiveStep(step.num)}
                onMouseLeave={() => setActiveStep(null)}
                onFocus={() => setActiveStep(step.num)}
                onBlur={() => setActiveStep(null)}
                className="cursor-pointer focus:outline-none"
                style={{
                  opacity: isDimmed ? 0.3 : 1,
                  transition: "opacity 150ms ease-out",
                }}
              >
                {/* Invisible hover hitbox */}
                <rect
                  x={80}
                  y={y - 20}
                  width={680}
                  height={40}
                  fill="transparent"
                />

                {/* Step 1: Person -> Client */}
                {step.num === 1 && (
                  <>
                    <circle cx={X_PERSON} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_PERSON}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      1
                    </text>
                    <text
                      x={(X_PERSON + X_CLIENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_PERSON + 12}
                      y1={y}
                      x2={X_CLIENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-right)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}

                {/* Step 2: Client -> Agent */}
                {step.num === 2 && (
                  <>
                    <circle cx={X_CLIENT} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_CLIENT}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      2
                    </text>
                    <text
                      x={(X_CLIENT + X_AGENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_CLIENT + 12}
                      y1={y}
                      x2={X_AGENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-right)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}

                {/* Step 3: Agent -> Client */}
                {step.num === 3 && (
                  <>
                    <circle cx={X_AGENT} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_AGENT}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      3
                    </text>
                    <text
                      x={(X_CLIENT + X_AGENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_AGENT - 12}
                      y1={y}
                      x2={X_CLIENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-left)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                    {/* Validated badge beside arrowhead */}
                    <g transform={`translate(${X_CLIENT + 8}, ${y - 12})`}>
                      <rect
                        width={78}
                        height={20}
                        rx={10}
                        fill="currentColor"
                        className="text-muted/80 stroke-border stroke-[1]"
                      />
                      <text
                        x={39}
                        y={14}
                        textAnchor="middle"
                        className="fill-foreground font-mono text-[10px] font-medium"
                      >
                        ✓ Validated
                      </text>
                    </g>
                  </>
                )}

                {/* Step 4: Client to itself (Box on Client lifeline) */}
                {step.num === 4 && (
                  <g transform={`translate(${X_CLIENT - 190}, ${y - 20})`}>
                    <rect
                      width={380}
                      height={40}
                      rx={8}
                      fill="currentColor"
                      className="text-background stroke-foreground stroke-[1.5]"
                    />
                    <circle cx={22} cy={20} r={10} fill="currentColor" className="text-foreground" />
                    <text
                      x={22}
                      y={23.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[10px] font-bold"
                    >
                      4
                    </text>
                    <text
                      x={38}
                      y={24}
                      className="fill-foreground text-[12px] font-medium tracking-tight"
                    >
                      Validates, then renders from catalogue
                    </text>
                    {/* Validated badge inside box */}
                    <g transform="translate(295, 10)">
                      <rect
                        width={74}
                        height={20}
                        rx={10}
                        fill="currentColor"
                        className="text-muted/80 stroke-border stroke-[1]"
                      />
                      <text
                        x={37}
                        y={14}
                        textAnchor="middle"
                        className="fill-foreground font-mono text-[10px] font-medium"
                      >
                        ✓ Validated
                      </text>
                    </g>
                  </g>
                )}

                {/* Step 5: Client -> Person */}
                {step.num === 5 && (
                  <>
                    <circle cx={X_CLIENT} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_CLIENT}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      5
                    </text>
                    <text
                      x={(X_PERSON + X_CLIENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_CLIENT - 12}
                      y1={y}
                      x2={X_PERSON}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-left)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}

                {/* Step 6: Person -> Client */}
                {step.num === 6 && (
                  <>
                    <circle cx={X_PERSON} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_PERSON}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      6
                    </text>
                    <text
                      x={(X_PERSON + X_CLIENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_PERSON + 12}
                      y1={y}
                      x2={X_CLIENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-right)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}

                {/* Step 7: Client -> Agent */}
                {step.num === 7 && (
                  <>
                    <circle cx={X_CLIENT} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_CLIENT}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      7
                    </text>
                    <text
                      x={(X_CLIENT + X_AGENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_CLIENT + 12}
                      y1={y}
                      x2={X_AGENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-right)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}

                {/* Step 8: Agent -> Client */}
                {step.num === 8 && (
                  <>
                    <circle cx={X_AGENT} cy={y} r={11} fill="currentColor" className="text-foreground" />
                    <text
                      x={X_AGENT}
                      y={y + 3.5}
                      textAnchor="middle"
                      className="fill-background font-mono text-[11px] font-bold"
                    >
                      8
                    </text>
                    <text
                      x={(X_CLIENT + X_AGENT) / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-foreground text-[13px] font-medium tracking-tight"
                    >
                      {step.label}
                    </text>
                    <motion.line
                      x1={X_AGENT - 12}
                      y1={y}
                      x2={X_CLIENT}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={1.75}
                      markerEnd="url(#seq-arrow-left)"
                      className="text-foreground"
                      initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.35, delay }}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Loopback arrow: from end of step 8 (x=420, y=530) curving left and up back into step 4 box (x=300, y=285) */}
          <path
            d={`M ${X_CLIENT - 4} 530 C ${X_CLIENT - 80} 530, ${X_CLIENT - 80} 330, ${X_CLIENT - 40} 305`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            markerEnd="url(#seq-arrow-up)"
            className="text-foreground/70"
          />
          <text
            x={X_CLIENT - 75}
            y={420}
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[11px]"
            transform={`rotate(-90, ${X_CLIENT - 75}, 420)`}
          >
            Repeat from step 4
          </text>

          {/* Catalogue Box across Client and Agent lifelines */}
          <g transform={`translate(${X_CLIENT - 190}, 565)`}>
            <rect
              width={530}
              height={75}
              rx={12}
              fill="currentColor"
              className="text-muted/20 stroke-border stroke-[1.5] stroke-dasharray-[4,4]"
            />
            <text
              x={265}
              y={22}
              textAnchor="middle"
              className="fill-foreground font-sans text-[13px] font-semibold"
            >
              Catalogue: the components the agent is allowed to use
            </text>
            <text
              x={265}
              y={38}
              textAnchor="middle"
              className="fill-muted-foreground font-sans text-[11px]"
            >
              Pre-approved schema defining structure, data binding, allowed actions and safe fallbacks
            </text>

            {/* Catalogue chips */}
            <g transform="translate(15, 48)">
              {CATALOGUE_PILLS.map((pill, i) => (
                <g key={pill} transform={`translate(${i * 56}, 0)`}>
                  <rect
                    width={52}
                    height={18}
                    rx={4}
                    fill="currentColor"
                    className="text-background stroke-border stroke-[1]"
                  />
                  <text
                    x={26}
                    y={12.5}
                    textAnchor="middle"
                    className="fill-foreground font-mono text-[9px]"
                  >
                    {pill.length > 9 ? pill.slice(0, 8) + "…" : pill}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
    </figure>
  );
}
