"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Bot,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * 38-Second Interactive Motion Video Simulation for infraBOT
 * Demonstrates the end-to-end autonomous operational cycle:
 * Stage 1 (0-7s): Autonomous Anomaly Detection & Kubernetes Workload Investigation
 * Stage 2 (7-15s): AI Agent Ticket Generation with Diagnostic Evidence
 * Stage 3 (15-23s): Human-in-the-Loop Multi-stage Approval Gate
 * Stage 4 (23-30s): Governed Multi-Host Execution & Real-time Live Log Streaming
 * Stage 5 (30-38s): Rule-by-rule Compliance Proof & RCA Added to Knowledge Base
 */

const STAGES = [
  {
    id: 1,
    title: "1. Anomaly Detection",
    tag: "Autonomous Agent",
    duration: 7,
    summary: "Kubernetes Troubleshooter Agent detects memory leak in pod cluster prod-k8s-useast1",
    timeStart: 0,
    timeEnd: 7,
  },
  {
    id: 2,
    title: "2. Evidence & Ticket",
    tag: "Investigation",
    duration: 8,
    summary: "Agent collates pod metrics, isolates crash-loop root cause, and generates fix ticket",
    timeStart: 7,
    timeEnd: 15,
  },
  {
    id: 3,
    title: "3. Human-in-the-Loop",
    tag: "Governance Sign-off",
    duration: 8,
    summary: "SRE Lead reviews proposed rollback, approves change with one-tap audit verification",
    timeStart: 15,
    timeEnd: 23,
  },
  {
    id: 4,
    title: "4. Governed Execution",
    tag: "Zero-Downtime Run",
    duration: 7,
    summary: "infraBOT executes patch across 12 worker nodes with live streaming host logs",
    timeStart: 23,
    timeEnd: 30,
  },
  {
    id: 5,
    title: "5. RCA & Compliance",
    tag: "Closed-Loop Learning",
    duration: 8,
    summary: "CIS-benchmark verified; RCA logged into Knowledge Base for future incidents",
    timeStart: 30,
    timeEnd: 38,
  },
];

const TOTAL_SECONDS = 38;

export function InfraBotMotionVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= TOTAL_SECONDS) {
          return 0; // loop
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Derive active stage directly from seconds (no redundant state or effect)
  const currentStageIndex = Math.max(
    0,
    STAGES.findIndex((s) => seconds >= s.timeStart && seconds < s.timeEnd)
  );
  const selectedStage = currentStageIndex;
  const activeStage = STAGES[currentStageIndex] || STAGES[0];
  const progressPercent = (seconds / TOTAL_SECONDS) * 100;

  const jumpToStage = (idx: number) => {
    setSeconds(STAGES[idx].timeStart);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="my-10 flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm"
    >
      {/* Motion Stage Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent-strong animate-pulse" />
          <span className="label text-foreground">Interactive Motion Showcase</span>
          <span className="text-muted-foreground">·</span>
          <span className="label text-[11px] text-muted-foreground">
            38s Autonomous Ops Lifecycle
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">
            {formatTime(seconds)} / {formatTime(TOTAL_SECONDS)}
          </Badge>
          <Badge variant="chip" className="text-[10px] text-accent-strong">
            {activeStage.tag}
          </Badge>
        </div>
      </div>

      {/* Screen Canvas: Motion Viewport */}
      <div className="relative aspect-video sm:aspect-16/9 w-full overflow-hidden bg-background p-4 sm:p-8 flex flex-col justify-between">
        {/* Stage Content Renderers */}
        <div className="flex-1 flex flex-col justify-center">
          {selectedStage === 0 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Cpu className="size-4 text-accent-strong" />
                  <span>Kubernetes Cluster Health Monitor: prod-k8s-useast1</span>
                </div>
                <span className="label text-xs text-amber-500 font-mono flex items-center gap-1">
                  <AlertTriangle className="size-3" /> Degradation Detected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-md border border-border bg-card/60 p-3 flex flex-col gap-1">
                  <span className="label text-[10px]">Workload Pods</span>
                  <span className="font-mono text-lg font-medium text-foreground">18 / 24 Healthy</span>
                  <span className="text-[11px] text-amber-500">6 CrashLoopBackOff</span>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-3 flex flex-col gap-1">
                  <span className="label text-[10px]">Node Memory Pressure</span>
                  <span className="font-mono text-lg font-medium text-foreground">94.2%</span>
                  <span className="text-[11px] text-muted-foreground">Threshold: 85%</span>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-3 flex flex-col gap-1">
                  <span className="label text-[10px]">Assigned Agent</span>
                  <span className="font-mono text-sm font-medium text-accent-strong flex items-center gap-1">
                    <Bot className="size-3.5" /> Troubleshooter-Agent-04
                  </span>
                  <span className="text-[11px] text-muted-foreground">Investigating logs...</span>
                </div>
              </div>
              <div className="rounded-md bg-muted/60 p-3 font-mono text-xs text-muted-foreground border border-border">
                <span className="text-foreground">$ agent.investigate(target=&quot;prod-k8s-useast1&quot;)</span>
                <p className="mt-1 text-[11px]">→ OOMKilled detected in pod auth-service-7f89d. Inspecting commit diff &amp; heap dumps.</p>
              </div>
            </div>
          )}

          {selectedStage === 1 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Bot className="size-4 text-accent-strong" />
                  <span>Ticketing Agent: Automated Diagnosis &amp; Remediation Plan</span>
                </div>
                <span className="label text-xs text-accent font-mono">Confidence: 96.4%</span>
              </div>
              <div className="rounded-md border border-border bg-card/60 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Ticket #INC-8924: Rollback auth-service to v2.4.1 &amp; expand memory limit
                  </span>
                  <Badge variant="outline" className="text-[10px]">Auto-Generated</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Evidence collated from 3 cluster nodes confirms memory regression introduced in build #412.
                  Automated playbook verified against staging topology.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <span className="rounded bg-muted px-2 py-0.5 border border-border">Target: 3 Clusters</span>
                  <span className="rounded bg-muted px-2 py-0.5 border border-border">Impact: 0 Downtime (Rolling)</span>
                  <span className="rounded bg-muted px-2 py-0.5 border border-border text-accent-strong">
                    Approver Required: SRE Lead
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedStage === 2 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <UserCheck className="size-4 text-accent-strong" />
                  <span>Human-in-the-Loop Multi-Stage Approval Gate</span>
                </div>
                <span className="label text-xs text-muted-foreground font-mono">Awaiting 1 Approval</span>
              </div>
              <div className="rounded-md border border-border bg-card/60 p-4 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">Action Requested by AI Agent</span>
                    <h4 className="text-sm font-medium text-foreground mt-0.5">
                      Authorize Automated Rollback &amp; Parameter Adjustment
                    </h4>
                  </div>
                  <Badge variant="chip" className="text-[10px] text-accent-strong">
                    Pending Sign-off
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded border border-border bg-muted/40">
                    <span className="label text-[10px]">Playbook ID</span>
                    <p className="font-mono text-foreground mt-0.5">pb-k8s-rollback-v2</p>
                  </div>
                  <div className="p-2.5 rounded border border-border bg-muted/40">
                    <span className="label text-[10px]">Assigned Lead</span>
                    <p className="font-mono text-foreground mt-0.5">rashi.saxena@citiuscloud.com</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Inspect Trace
                  </Button>
                  <Button size="sm" className="h-8 text-xs bg-accent-strong hover:bg-accent-strong/90 gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    <span>Approve &amp; Execute</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selectedStage === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Server className="size-4 text-accent-strong" />
                  <span>Governed Execution Engine: Real-time Host Streaming</span>
                </div>
                <span className="label text-xs text-emerald-500 font-mono flex items-center gap-1">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" /> Executing
                </span>
              </div>
              <div className="rounded-md bg-muted/90 p-4 font-mono text-xs text-foreground/90 border border-border flex flex-col gap-1.5 overflow-hidden">
                <div className="flex items-center justify-between text-muted-foreground text-[11px] pb-1 border-b border-border/60">
                  <span>HOST</span>
                  <span>OPERATION</span>
                  <span>STATUS</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>k8s-worker-node-01</span>
                  <span>Rolling update pods: v2.4.1</span>
                  <span className="text-emerald-500 font-medium">SUCCESS</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>k8s-worker-node-02</span>
                  <span>Drain node &amp; apply memory limit</span>
                  <span className="text-emerald-500 font-medium">SUCCESS</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>k8s-worker-node-03</span>
                  <span>Restart daemonset &amp; health probe</span>
                  <span className="text-accent-strong font-medium animate-pulse">RUNNING...</span>
                </div>
              </div>
            </div>
          )}

          {selectedStage === 4 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="size-4 text-accent-strong" />
                  <span>Closed-Loop Compliance &amp; RCA Knowledge Base</span>
                </div>
                <span className="label text-xs text-emerald-500 font-mono">100% Compliant</span>
              </div>
              <div className="rounded-md border border-border bg-card/60 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <span className="text-sm font-medium text-foreground">
                      Remediation Verified · Zero Outage Recorded
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Audit Signed</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  RCA Agent published report #RCA-412: Root cause isolated to unindexed query caching in auth-service build.
                  Automated preventative rule applied across all production tenants.
                </p>
                <div className="flex items-center justify-between border-t border-border pt-3 text-[11px]">
                  <span className="text-muted-foreground">Logged to HashiCorp Vault &amp; S3 storage</span>
                  <span className="text-accent-strong font-mono">CIS Benchmark: PASSED</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-border">
          {/* Progress Bar */}
          <div
            className="relative h-1.5 w-full cursor-pointer rounded-full bg-muted overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              setSeconds(Math.floor(ratio * TOTAL_SECONDS));
            }}
          >
            <div
              className="h-full bg-accent-strong transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause motion demo" : "Play motion demo"}
              >
                {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSeconds(0)}
                aria-label="Restart motion demo"
              >
                <RotateCcw className="size-3.5" />
              </Button>
              <span className="font-mono text-xs text-muted-foreground">
                {formatTime(seconds)} / {formatTime(TOTAL_SECONDS)}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              {STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => jumpToStage(idx)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                    selectedStage === idx
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {stage.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Explainer Banner */}
      <div className="border-t border-border bg-card p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="label text-[11px] text-accent-strong">{activeStage.title}</span>
          <p className="text-xs text-muted-foreground mt-0.5">{activeStage.summary}</p>
        </div>
        <Badge variant="outline" className="text-[10px] self-start sm:self-auto shrink-0">
          Step {selectedStage + 1} of 5
        </Badge>
      </div>
    </div>
  );
}

/**
 * Interactive Information Architecture (IA) System Map
 * Maps the 5 pillars from the official infraBOT datasheet:
 * 1. Request (Catalogue, Guided Forms, Inventory)
 * 2. Build Without Code (Form Builder, Workflow Builder, Script Mapping)
 * 3. Run & Report (Execution Engine, Hardening, Reports, Dynamic Dashboard)
 * 4. AI Agents (Troubleshooter, Ticketing, Remediation, RCA, Health Monitor, Executive Advisor)
 * 5. Govern (Granular RBAC, SSO, Multi-Tenancy, Secret Vault, Storage)
 */
export function InfraBotArchitecture() {
  const [activeTier, setActiveTier] = useState<number>(0);

  const tiers = [
    {
      id: "request",
      title: "1. Request Layer",
      subtitle: "Self-Service Catalogue & Guided Requests",
      description: "Custom Day 1 and Day 2 operations published once as guided forms. People request servers, clusters, or patches without writing code or raising email threads.",
      capabilities: [
        "Self-Service Service Catalogue",
        "Guided 4-Step Request Flow",
        "Infrastructure Inventory (API / CSV)",
        "Multi-Cluster Onboarding",
      ],
    },
    {
      id: "build",
      title: "2. Build Layer",
      subtitle: "No-Code Form & Workflow Builders",
      description: "Infrastructure engineers convert scripts and playbooks into self-service offerings with conditional fields, live parameter dropdowns, and multi-stage approval logic.",
      capabilities: [
        "Dynamic Drag-and-Drop Form Builder",
        "Custom Multi-Stage Workflow Builder",
        "Playbook Versioning & Onboarding",
        "Parameter-to-OS Field Mapping",
      ],
    },
    {
      id: "run",
      title: "3. Run & Report",
      subtitle: "Governed Execution & Compliance Proof",
      description: "Automated execution engine streams real-time console output host by host. CIS-benchmark hardening reports provide rule-by-rule audit evidence.",
      capabilities: [
        "Streaming Execution Engine",
        "CIS-Benchmark Hardening Scanner",
        "Rule-by-Rule Compliance Reports",
        "Exportable KPI & Audit Report Builder",
      ],
    },
    {
      id: "agents",
      title: "4. Autonomous AI Agents",
      subtitle: "Kubernetes Investigation & Auto-Remediation",
      description: "Specialized agents monitor environments, investigate workloads, raise tickets with diagnosis evidence, and apply fixes only after human sign-off.",
      capabilities: [
        "Troubleshooter Agent (Cluster Diagnostics)",
        "Ticketing Agent (Evidence & Proposed Fix)",
        "Remediation Agent (Governed Execution)",
        "RCA Agent (Knowledge Base Logging)",
        "Infrastructure Health Monitor (Read-Only)",
        "Executive Advisor (Leadership Briefings)",
      ],
    },
    {
      id: "govern",
      title: "5. Governance & Security",
      subtitle: "Enterprise Isolation & Secret Management",
      description: "Credentials stay in your own secret manager (HashiCorp Vault, AWS, Azure). Multi-tenant isolation keeps business units and compliance domains completely separate.",
      capabilities: [
        "Granular RBAC & Permission Matrix",
        "Federated SSO with MFA (Entra, Okta, LDAP)",
        "Isolated Multi-Tenant Realms",
        "Secret Manager Integrations (Vault, OpenBao)",
        "Customer Storage (S3, Azure Blob, SFTP)",
      ],
    },
  ];

  const current = tiers[activeTier];

  return (
    <div className="my-10 flex flex-col rounded-md border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="label text-accent-strong">System Architecture</span>
        <h3 className="text-h2 font-medium tracking-tight text-foreground">
          Humans and Agents. One Unified Engine.
        </h3>
        <p className="text-body text-sm text-muted-foreground">
          infraBOT unifies human self-service requests and autonomous agent interventions
          through the same workflows, approval gates, execution engine, and compliance reports.
        </p>
      </div>

      {/* Tier Selector Pills */}
      <div className="flex flex-wrap gap-2 pt-6">
        {tiers.map((tier, idx) => (
          <button
            key={tier.id}
            onClick={() => setActiveTier(idx)}
            className={`label text-xs px-3.5 py-1.5 rounded-full border transition-all ${
              activeTier === idx
                ? "bg-foreground text-background border-foreground font-medium"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {tier.title}
          </button>
        ))}
      </div>

      {/* Active Tier Inspection Panel */}
      <div className="mt-8 rounded-md border border-border bg-muted/20 p-6 flex flex-col gap-6">
        <div>
          <span className="label text-[11px] text-accent-strong">{current.subtitle}</span>
          <h4 className="text-h3 font-medium text-foreground mt-1">{current.title}</h4>
          <p className="text-body text-sm text-muted-foreground mt-2 leading-relaxed">
            {current.description}
          </p>
        </div>

        <div>
          <span className="label text-[11px] text-muted-foreground mb-3 block">
            Core Designed Capabilities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-md border border-border bg-card p-3 text-xs text-foreground"
              >
                <CheckCircle2 className="size-4 text-accent-strong shrink-0" />
                <span className="font-medium">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Wireframes Suite
 * Shows the actual UX layouts designed by Rashi Saxena:
 * 1. Self-Service Catalogue & Guided Request Form
 * 2. AI Agent Ticket with Evidence & Approval Gate
 * 3. Live Host Execution & Rule-by-Rule Compliance Proof
 */
export function InfraBotWireframes() {
  const [wireframeTab, setWireframeTab] = useState<"catalogue" | "agent" | "compliance">("catalogue");

  return (
    <div className="my-10 flex flex-col rounded-md border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <span className="label text-accent-strong">UX &amp; Wireframe Breakdown</span>
        <h3 className="text-h3 font-medium text-foreground">
          Core Interface Wireframes
        </h3>
        <p className="text-body text-sm text-muted-foreground">
          Wireframe prototypes designed to make complex infrastructure operations legible and governed.
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 pt-4">
          <Button
            size="sm"
            variant={wireframeTab === "catalogue" ? "default" : "outline"}
            onClick={() => setWireframeTab("catalogue")}
            className="text-xs"
          >
            01. Guided Request Form
          </Button>
          <Button
            size="sm"
            variant={wireframeTab === "agent" ? "default" : "outline"}
            onClick={() => setWireframeTab("agent")}
            className="text-xs"
          >
            02. Agent Diagnosis &amp; Approval Gate
          </Button>
          <Button
            size="sm"
            variant={wireframeTab === "compliance" ? "default" : "outline"}
            onClick={() => setWireframeTab("compliance")}
            className="text-xs"
          >
            03. Rule-by-Rule Compliance Proof
          </Button>
        </div>
      </div>

      {/* Wireframe Canvas */}
      <div className="mt-8 rounded-md border border-border bg-background p-6 md:p-8 font-mono text-xs">
        {wireframeTab === "catalogue" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-sans font-medium text-foreground">
                Wireframe 1: Self-Service Catalogue · Step 2 of 4 (Target Selection)
              </span>
              <Badge variant="outline" className="text-[10px]">Day 2 Hardening</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stepper column */}
              <div className="flex flex-col gap-2 border-r border-border pr-4 text-[11px]">
                <div className="text-muted-foreground line-through">01. Category: Security</div>
                <div className="text-foreground font-bold">02. Operation: CIS Hardening</div>
                <div className="text-muted-foreground">03. Target Environment</div>
                <div className="text-muted-foreground">04. Review &amp; Sign-off</div>
              </div>

              {/* Form inputs */}
              <div className="md:col-span-2 flex flex-col gap-4 text-foreground/90">
                <div className="flex flex-col gap-1">
                  <span className="label text-[10px]">Select Target Clusters</span>
                  <div className="p-2 border border-border rounded bg-muted/30">
                    [x] prod-k8s-useast1 (24 Nodes) &nbsp;&nbsp; [ ] dev-k8s-cluster (6 Nodes)
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="label text-[10px]">Hardening Profile</span>
                  <div className="p-2 border border-border rounded bg-muted/30">
                    CIS Benchmark v1.8 (Level 2 - High Security)
                  </div>
                </div>

                <div className="p-3 border border-border/80 rounded bg-muted/40 text-[11px] text-muted-foreground">
                  Rule Exceptions Configured: 2 (Disable Ctrl-Alt-Delete, Root SSH Login)
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button size="sm" variant="outline" className="text-xs">Cancel</Button>
                  <Button size="sm" className="text-xs">Next: Target Hosts →</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {wireframeTab === "agent" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-sans font-medium text-foreground">
                Wireframe 2: AI Agent Ticket with Linked Evidence &amp; Human Approval
              </span>
              <Badge variant="chip" className="text-[10px] text-accent-strong">AI Auto-Triage</Badge>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded border border-border bg-muted/20 p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">TICKET #892: Autonomous Remediation Proposal</span>
                  <span className="text-emerald-500 font-bold">[READY FOR APPROVAL]</span>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Agent: Troubleshooter-Agent · Target: auth-service-k8s · Confidence: 94%
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border border-border rounded bg-card/60">
                  <span className="label text-[10px] block mb-1">Diagnostic Evidence</span>
                  <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1">
                    <li>3 Pods OOMKilled at 14:02 UTC</li>
                    <li>Memory leak localized to commit #a109</li>
                    <li>Heap profile attached (heap_dump_01.bin)</li>
                  </ul>
                </div>
                <div className="p-3 border border-border rounded bg-card/60">
                  <span className="label text-[10px] block mb-1">Proposed Fix Playbook</span>
                  <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Rollback Helm chart to v2.4.1</li>
                    <li>Increase pod memory request to 2Gi</li>
                    <li>Execute zero-downtime rolling restart</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">Sign-off Authority: Platform SRE Lead</span>
                <Button size="sm" className="bg-accent-strong hover:bg-accent-strong/90 text-xs">
                  Authorize &amp; Execute Playbook
                </Button>
              </div>
            </div>
          </div>
        )}

        {wireframeTab === "compliance" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-sans font-medium text-foreground">
                Wireframe 3: Rule-by-Rule Compliance Proof &amp; Audit Trail
              </span>
              <Badge variant="outline" className="text-[10px]">Export: CSV / PDF</Badge>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-2 border-b border-border">
                <span>RULE ID &amp; DESCRIPTION</span>
                <span>SEVERITY</span>
                <span>STATUS</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-card border border-border text-[11px]">
                <span>CIS-1.1.1: Ensure mounting of cramfs filesystems is disabled</span>
                <span className="text-muted-foreground">Low</span>
                <span className="text-emerald-500 font-bold">COMPLIANT (Pass)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-card border border-border text-[11px]">
                <span>CIS-2.2.1.1: Ensure time synchronization is in use (chrony)</span>
                <span className="text-amber-500">Medium</span>
                <span className="text-emerald-500 font-bold">REMEDIATED (Pass)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-card border border-border text-[11px]">
                <span>CIS-5.2.14: Ensure SSH access is limited to approved groups</span>
                <span className="text-accent-strong">High</span>
                <span className="text-accent font-bold">EXCEPTION NOTED</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
