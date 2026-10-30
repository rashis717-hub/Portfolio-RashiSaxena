import Image from "next/image";
import { site } from "@/content/site";

/**
 * Pillars Section ("How I work"):
 * 3-column editorial grid separated by hairlines showing a specific real screen per pillar.
 */
export function Pillars() {
  const items = site.howIWork.items;

  return (
    <section id="how-i-work" aria-labelledby="pillars-title" className="border-b border-border bg-card/30">
      <div className="container-site py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="label text-accent-strong">01 / Practice</span>
            <h2 id="pillars-title" className="text-display font-medium tracking-tight text-foreground mt-2">
              How I work
            </h2>
          </div>
          <span className="label text-muted-foreground hidden sm:inline">
            Core Focus Areas
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {items.map((item, idx) => (
            <article
              key={item.title}
              className={`flex flex-col gap-4 py-8 lg:py-0 ${
                idx === 0
                  ? "lg:pr-8 xl:pr-10"
                  : idx === 1
                  ? "lg:px-8 xl:px-10"
                  : "lg:pl-8 xl:pl-10"
              }`}
            >
              {item.image && (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-md border border-border bg-muted/40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <span className="label text-accent-strong">
                  {(idx + 1).toString().padStart(2, "0")} / Focus
                </span>
              </div>
              <h3 className="text-h3 font-medium text-foreground tracking-tight">
                {item.title}
              </h3>
              <p className="text-body text-muted-foreground text-sm leading-relaxed">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Kinetic Marquee:
 * Infinitely running Geist Pixel marquee with plus signs (matching jithinrp.com).
 */
export function KineticMarquee() {
  const words = [
    "Agent Experience",
    "Design Systems",
    "Platform UX",
    "Human-in-the-Loop",
    "AI-Assisted Workflow",
    "Enterprise AI",
  ];

  return (
    <div className="pixel-marquee" aria-hidden="true">
      <div className="pixel-marquee-track">
        <div className="pixel-marquee-group">
          {words.map((word, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span>{word}</span>
              <span className="pixel-marquee-plus">+</span>
            </span>
          ))}
        </div>
        <div className="pixel-marquee-group">
          {words.map((word, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-6">
              <span>{word}</span>
              <span className="pixel-marquee-plus">+</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
