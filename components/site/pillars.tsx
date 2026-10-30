import { site } from "@/content/site";

/**
 * Pillars Section ("What I do"):
 * 3-column editorial grid separated by hairlines (inspired by jithinrp.com).
 */
export function Pillars() {
  const items = site.howIWork.items;

  return (
    <section aria-labelledby="pillars-title" className="border-b border-border bg-card/30">
      <div className="container-site py-12 md:py-16">
        <h2 id="pillars-title" className="label mb-8 text-muted-foreground">
          What I Do · Core Focus
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {items.map((item, idx) => (
            <article
              key={item.title}
              className={`flex flex-col gap-3 py-6 lg:py-0 ${
                idx === 0
                  ? "lg:pr-8 xl:pr-10"
                  : idx === 1
                  ? "lg:px-8 xl:px-10"
                  : "lg:pl-8 xl:pl-10"
              }`}
            >
              <div className="flex items-center justify-between">
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
