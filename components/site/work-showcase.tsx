import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { publicFileExists } from "@/lib/site-files";
import { cn } from "@/lib/utils";
import type { ProjectFrontmatter } from "@/lib/schema";

export type ProjectItem = ProjectFrontmatter;

function getProjectScreenAlt(project: ProjectItem, type: "cover" | "hover" | "thumb"): string {
  switch (project.slug) {
    case "infrabot":
      if (type === "cover") return "Linux hardening compliance summary report showing 52.4% compliance score, 42 total rules, and circular compliance overview donuts";
      if (type === "hover") return "Governed approval panel with Approve Request, Request Change, and Reject Request options";
      return "Two circular compliance donuts showing endpoint status and rule findings";
    case "a2ui":
      if (type === "cover") return "Destructive action confirmation card from Leave Policy Agent showing irreversible warning, affected systems, and Withdraw request button";
      if (type === "hover") return "Proposed execution plan v2 showing 6 steps with Changed status badges and Begin button";
      return "Permission outcomes table specifying request type, target HRMS system, and affected employees";
    case "salespulze":
      if (type === "cover") return "Sales intelligence hub displaying KPI metrics, AI executive insights with confidence score, and regional field health heat map";
      if (type === "hover") return "Weekly regional sales review series with AI-inferred tag, high-confidence badge, and execution health trend graph";
      return "Field operations health status cards showing meeting volume and risk scores across regional tiers";
    case "agent-registry":
      if (type === "cover") return "Agent Registry platform interface showing agent blueprints, runtime configurations, and multi-tenant fleet status";
      if (type === "hover") return "Agent deployment canvas showing node graph and secret configuration";
      return "Agent blueprint card showing status and tenant mapping";
    default:
      return `${project.title} interface preview`;
  }
}

/**
 * Editorial Selected Works band inspired by jithinrp.com:
 * 3-column layout per project:
 * - Col 1: Title, Tagline/Summary, Timeline
 * - Col 2: High-impact media card with hairline border showing specific real screens with hover preview
 * - Col 3: Role, Platforms, Key Metric, and View Case Study action
 */
export function WorkShowcase({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="work" aria-labelledby="works-title" className="border-b border-border">
      <div className="container-site py-12 md:py-16 border-b border-border">
        <h2 id="works-title" className="text-display font-medium tracking-tight text-foreground">
          {site.work.title}
        </h2>
      </div>

      <div className="divide-y divide-border">
        {projects.map((project) => {
          const hasCover = !project.redact && publicFileExists(project.cover);
          const isPrivate = project.visibility === "private";

          return (
            <article
              key={project.slug}
              className="group/work container-site py-16 md:py-24 transition-colors hover:bg-card/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Col 1: Intro, Summary & Timeline (4 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="label text-accent-strong">{project.year}</span>
                      {isPrivate && (
                        <Badge variant="outline" className="text-[10px] gap-1">
                          <Lock className="size-2.5" />
                          <span>Private</span>
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-h3 font-medium text-foreground tracking-tight group-hover/work:text-accent-strong transition-colors">
                      <Link href={`/work/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-body text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {project.tagline || project.summary}
                    </p>
                  </div>

                  <dl className="border-t border-border pt-4">
                    <dt className="label text-muted-foreground">Project Timeline</dt>
                    <dd className="text-sm font-medium text-foreground mt-0.5">{project.timeline}</dd>
                  </dl>
                </div>

                {/* Col 2: Media Card (5 cols) */}
                <div className="lg:col-span-5">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group/media relative block aspect-video sm:aspect-16/10 overflow-hidden rounded-md border border-border bg-muted/40 transition-all duration-(--duration-hover) group-hover/work:border-foreground/30 group-hover/work:shadow-sm"
                  >
                    {hasCover ? (
                      <>
                        {/* Main 16:10 Cover image */}
                        <Image
                          src={project.cover}
                          alt={getProjectScreenAlt(project, "cover")}
                          width={1600}
                          height={1000}
                          loading="lazy"
                          className={cn(
                            "h-full w-full object-cover transition-all duration-500 ease-out group-hover/work:scale-[1.02]",
                            project.coverHover && "group-hover/media:opacity-0 transition-opacity duration-300"
                          )}
                        />
                        {/* Hover preview screen (3:2) revealing on desktop hover */}
                        {project.coverHover && (
                          <Image
                            src={project.coverHover}
                            alt={getProjectScreenAlt(project, "hover")}
                            width={720}
                            height={480}
                            loading="lazy"
                            className="hidden sm:block absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover/media:opacity-100"
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
                        <span className="label text-muted-foreground">
                          {isPrivate ? "[CONFIDENTIAL CASE STUDY]" : "[INTERFACE PREVIEW]"}
                        </span>
                        <span className="text-xs text-muted-foreground/80 max-w-xs">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </Link>
                </div>

                {/* Col 3: Role, Platforms, Metric, & CTA (3 cols) */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <dt className="label text-muted-foreground">Role</dt>
                      <dd className="text-sm font-medium text-foreground mt-0.5">{project.role}</dd>
                    </div>

                    <div>
                      <dt className="label text-muted-foreground">Platforms</dt>
                      <dd className="text-xs text-muted-foreground mt-0.5">
                        {project.platforms.join(", ")}
                      </dd>
                    </div>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="border-t border-border pt-3">
                        <dt className="label text-muted-foreground">Key Impact</dt>
                        <dd className="text-h3 font-medium text-foreground mt-1">
                          {project.metrics[0].value}
                          {project.metrics[0].suffix && (
                            <span className="text-accent-strong">{project.metrics[0].suffix}</span>
                          )}
                        </dd>
                        <span className="text-xs text-muted-foreground block">
                          {project.metrics[0].label}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent-strong"
                    >
                      <span>View case study</span>
                      <ArrowRight className="size-4 transition-transform duration-(--duration-hover) group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
