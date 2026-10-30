"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Layout, MessageSquareCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type ContextMode = "platform" | "external";

type Stage = {
  id: number;
  label: string;
  title: string;
  description: string;
  messageJson: string;
  platformPreview: {
    title: string;
    description: string;
    component: string;
  };
  externalPreview: {
    title: string;
    description: string;
    component: string;
  };
};

const STAGES: Stage[] = [
  {
    id: 1,
    label: "01",
    title: "Agent Decides",
    description:
      "The agent reasons over the user request and selects appropriate schema controls rather than generating freeform prose.",
    messageJson: JSON.stringify(
      {
        action: "render_input_form",
        target: "approval_pipeline",
        confidence: 0.94,
        state: "awaiting_user_action",
      },
      null,
      2
    ),
    platformPreview: {
      title: "Platform Intent",
      description: "Agent determines an approval gate is required before promoting to Production.",
      component: "Intent: ApprovalGate (Dev -> Prod)",
    },
    externalPreview: {
      title: "External Intent",
      description: "Agent determines user confirmation needed via webhook.",
      component: "Webhook Intent: PromptConfirm",
    },
  },
  {
    id: 2,
    label: "02",
    title: "Declarative Message",
    description:
      "Agent transmits an A2UI payload: a structured JSON schema defining component hierarchy, validation rules, and bindings.",
    messageJson: JSON.stringify(
      {
        type: "a2ui.schema",
        version: "1.0",
        component: "ApprovalForm",
        fields: [
          { id: "tenant", type: "select", options: ["US-East", "EU-Central"] },
          { id: "eval_score", type: "badge", value: "98.4%" },
          { id: "confirm", type: "toggle", label: "Acknowledge audit trail" },
        ],
        cta: "Approve Deployment",
      },
      null,
      2
    ),
    platformPreview: {
      title: "A2UI Declarative Contract",
      description: "Standard JSON payload sent across the Covasant platform bus.",
      component: "Schema: a2ui.form.v1",
    },
    externalPreview: {
      title: "Lightweight A2UI Payload",
      description: "Standardized JSON message received via REST/WebSocket client.",
      component: "Payload: a2ui.form.v1 (generic)",
    },
  },
  {
    id: 3,
    label: "03",
    title: "Renderer Resolves",
    description:
      "The host environment inspects the declarative payload and resolves it against local design tokens and capability packs.",
    messageJson: JSON.stringify(
      {
        host_environment: "covasant_enterprise_shell",
        theme: "system",
        resolved_tokens: {
          radius: "12px",
          primary: "var(--foreground)",
          elevation: "flat_hairline",
        },
      },
      null,
      2
    ),
    platformPreview: {
      title: "Platform Shell Resolution",
      description: "Resolved using Covasant Design System (Untitled UI + shadcn/ui tokens).",
      component: "Renderer: PlatformThemeAdapter",
    },
    externalPreview: {
      title: "External Host Resolution",
      description: "Resolved into plain HTML5 form controls with fallback styles.",
      component: "Renderer: GenericWebFallbackAdapter",
    },
  },
  {
    id: 4,
    label: "04",
    title: "Interface Renders",
    description:
      "The visitor interacts with native UI controls (not chat bubbles), executing actions with full validation and state updates.",
    messageJson: JSON.stringify(
      {
        status: "rendered",
        interactive: true,
        accessible: true,
        audit_ready: true,
      },
      null,
      2
    ),
    platformPreview: {
      title: "Interactive Platform Component",
      description: "Full-fidelity modal with live trace graph link, tenant picker, and signature button.",
      component: "Live Component: AgentPromotionCard",
    },
    externalPreview: {
      title: "Standard Web Embed",
      description: "Basic form inputs and submit button embedded inside third-party application.",
      component: "Live Component: SimpleHtmlForm",
    },
  },
];

export function A2UIExplainer() {
  const [currentStage, setCurrentStage] = useState(0);
  const [mode, setMode] = useState<ContextMode>("platform");
  const stage = STAGES[currentStage];

  const handlePrev = () => {
    if (currentStage > 0) setCurrentStage(currentStage - 1);
  };

  const handleNext = () => {
    if (currentStage < STAGES.length - 1) setCurrentStage(currentStage + 1);
  };

  return (
    <div className="my-10 flex flex-col gap-6 rounded-md border border-border bg-card p-6 md:p-8">
      {/* Header & Mode Selector */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="label text-accent-strong">A2UI Concept</span>
            <span className="label text-muted-foreground">· Interactive Walkthrough</span>
          </div>
          <h3 className="text-h3 font-medium text-foreground">
            How declarative components render from agent reasoning
          </h3>
        </div>

        {/* Context Mode Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="label text-[11px] text-muted-foreground hidden sm:inline">Host:</span>
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => {
              if (val) setMode(val as ContextMode);
            }}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="platform" className="text-xs">
              Inside platform
            </ToggleGroupItem>
            <ToggleGroupItem value="external" className="text-xs">
              External app
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Vertical Stepper */}
        <div className="flex flex-col gap-2 lg:col-span-5">
          <span className="label text-muted-foreground mb-1">Execution Stages</span>
          <ol className="flex flex-col">
            {STAGES.map((s, idx) => {
              const isActive = idx === currentStage;
              const isPast = idx < currentStage;
              return (
                <li key={s.id} className="relative">
                  {/* Vertical connector line */}
                  {idx < STAGES.length - 1 && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-4 top-8 -bottom-2 w-px transition-colors duration-200",
                        isPast ? "bg-accent-strong" : "bg-border"
                      )}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentStage(idx)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-accent",
                      isActive
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted/50 text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-medium transition-colors",
                        isActive
                          ? "bg-foreground text-background"
                          : isPast
                          ? "bg-accent-strong text-white"
                          : "border border-border text-muted-foreground"
                      )}
                    >
                      {s.label}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-body text-sm font-medium text-foreground">
                        {s.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-2">
                        {s.description}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Stepper Navigation Controls */}
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentStage === 0}
              className="gap-1 text-xs"
            >
              <ChevronLeft className="size-3.5" />
              <span>Previous</span>
            </Button>
            <span className="label text-xs text-muted-foreground">
              Stage {currentStage + 1} of {STAGES.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentStage === STAGES.length - 1}
              className="gap-1 text-xs"
            >
              <span>Next</span>
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Message & Result Preview Tabs */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <Tabs defaultValue="result" className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <TabsList className="bg-muted">
                <TabsTrigger value="result" className="text-xs gap-1.5">
                  <Layout className="size-3.5" />
                  <span>Result (Rendered UI)</span>
                </TabsTrigger>
                <TabsTrigger value="message" className="text-xs gap-1.5">
                  <MessageSquareCode className="size-3.5" />
                  <span>Message (Illustrative JSON)</span>
                </TabsTrigger>
              </TabsList>
              <Badge variant="chip" className="text-[10px]">
                {mode === "platform" ? "Platform Theme" : "Basic Fallback"}
              </Badge>
            </div>

            {/* Result Tab Content */}
            <TabsContent value="result" className="mt-4">
              <div
                className={cn(
                  "flex min-h-[260px] flex-col justify-between rounded-md border p-6 transition-opacity duration-250 motion-reduce:transition-none",
                  mode === "platform"
                    ? "border-border bg-background"
                    : "border-dashed border-border bg-muted/30"
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="label text-accent-strong">
                      {mode === "platform"
                        ? stage.platformPreview.title
                        : stage.externalPreview.title}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {mode === "platform"
                        ? stage.platformPreview.component
                        : stage.externalPreview.component}
                    </Badge>
                  </div>
                  <p className="text-body text-sm text-foreground">
                    {mode === "platform"
                      ? stage.platformPreview.description
                      : stage.externalPreview.description}
                  </p>
                </div>

                {/* Simulated UI Card for Stage 4 */}
                {currentStage === 3 ? (
                  <div
                    className={cn(
                      "mt-4 rounded-md p-4 transition-all duration-200",
                      mode === "platform"
                        ? "border border-border bg-muted/40 shadow-xs"
                        : "border border-border bg-background"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">
                        Promote Agent v2.4 to Production
                      </span>
                      <Badge variant="chip">Audit Logged</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="default" className="text-xs">
                        Confirm & Deploy
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Review DAG Trace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-md border border-dashed border-border p-4 text-center">
                    <span className="label text-[11px] text-muted-foreground">
                      [STAGE {stage.label}: {stage.title.toUpperCase()} IN ACTION]
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Message Tab Content */}
            <TabsContent value="message" className="mt-4">
              <div className="relative rounded-md border border-border bg-muted/60 p-4 font-mono text-xs text-foreground">
                <span className="label absolute right-3 top-3 text-[10px] text-muted-foreground">
                  Illustrative JSON
                </span>
                <pre className="overflow-x-auto pt-4 leading-relaxed">
                  <code>{stage.messageJson}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
