import type { MDXComponents } from "mdx/types";
import { A2UIExplainer } from "@/components/case-study/a2ui-explainer";
import {
  A2UIFlow,
  AdaptationMatrix,
  CatalogueMap,
  StateLifecycle,
} from "@/components/case-study/a2ui/pending";
import { MotionVideo } from "@/components/case-study/motion-video";
import { HeroVideo } from "@/components/case-study/hero-video";
import {
  InfraBotArchitecture,
  InfraBotMotionVideo,
  InfraBotWireframes,
} from "@/components/case-study/infrabot-motion-walkthrough";
import {
  Annotated,
  CardGrid,
  Callout,
  Compare,
  Decision,
  Figure,
  Flow,
  Metric,
  Metrics,
  MetricStrip,
  Section,
  SubSection,
  Stakeholder,
  Stakeholders,
  Takeaways,
} from "@/components/case-study/case-study-components";

const components: MDXComponents = {
  Section,
  SubSection,
  Takeaways,
  Figure,
  Metrics,
  Metric,
  MetricStrip,
  CardGrid,
  Stakeholders,
  Stakeholder,
  Callout,
  Flow,
  Decision,
  Annotated,
  Compare,
  MotionVideo,
  HeroVideo,
  A2UIExplainer,
  A2UIFlow,
  CatalogueMap,
  AdaptationMatrix,
  StateLifecycle,
  InfraBotMotionVideo,
  InfraBotArchitecture,
  InfraBotWireframes,
  table: (props) => (
    <div className="my-10 w-full overflow-x-auto">
      <table className="w-full text-left border-collapse border-y border-border" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="border-b border-border bg-transparent" {...props} />
  ),
  th: (props) => (
    <th
      className="py-3 px-4 font-mono text-xs uppercase tracking-wider text-muted-foreground font-normal"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 text-[20px] md:text-[22px] font-medium tracking-tight text-foreground leading-snug"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="mt-4 text-[17px] font-medium text-foreground" {...props} />
  ),
  ul: (props) => (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol className="flex list-decimal flex-col gap-3 pl-5 marker:font-mono marker:text-[14px] marker:text-muted-foreground" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  a: (props) => (
    <a
      className="text-accent-strong underline decoration-1 underline-offset-4 hover:decoration-2"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 w-full overflow-x-auto rounded-md border border-border bg-muted px-5 py-4 font-mono text-[13px] leading-relaxed text-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground [pre_&]:rounded-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[inherit]"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-border py-4 px-4 text-[15px] leading-relaxed text-foreground/90 align-top"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
