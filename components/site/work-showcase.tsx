import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { publicFileExists } from "@/lib/site-files";
import type { ProjectFrontmatter } from "@/lib/schema";

export type ProjectItem = ProjectFrontmatter;

/**
 * Editorial Selected Works band inspired by jithinrp.com:
 * 3-column layout per project:
 * - Col 1: Title, Tagline/Summary, Timeline
 * - Col 2: High-impact media card with hairline border
 * - Col 3: Role, Platforms, Key Metric, and View Case Study action
 */
export function WorkShowcase({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="work" aria-labelledby="works-title" className="border-b border-border">
      <div className="container-site py-12 md:py-16 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <span className="label text-accent-strong">02 / Portfolio</span>
            <h2 id="works-title" className="text-display font-medium tracking-tight text-foreground mt-2">
              Selected Works
            </h2>
          </div>
          <span className="label text-muted-foreground hidden sm:inline">
            {projects.length} Case Studies
          </span>
        </div>
      </div>

      <div className="divide-y divide-border">
        {projects.map((project, idx) => {
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
                      <span className="label text-accent-strong">
                        {(idx + 1).toString().padStart(2, "0")} / {project.year}
                      </span>
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
                    className="relative block aspect-video sm:aspect-16/10 overflow-hidden rounded-md border border-border bg-muted/40 transition-all duration-(--duration-hover) group-hover/work:border-foreground/30 group-hover/work:shadow-sm"
                  >
                    {hasCover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.cover}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/work:scale-[1.02]"
                      />
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
