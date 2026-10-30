// Placeholder implementations of the case-study MDX components. P7 replaces each one with the
// real component; the names and props here are the contract the MDX files rely on.

type Children = { children?: React.ReactNode };

/** Numbered section: a mono label ("01 / The Challenge") above an h2 that states a point. */
export function Section({
  number,
  label,
  title,
  children,
}: Children & { number: string; label: string; title: string }) {
  return (
    <section>
      <p className="label">
        {number} / {label}
      </p>
      <h2 className="text-h2">{title}</h2>
      {children}
    </section>
  );
}

/** Image with required alt text and a one-line caption that says what to notice. */
export function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure data-src={src}>
      <div role="img" aria-label={alt} className="aspect-video rounded-md border bg-muted" />
      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Row of big numbers. Values come from Rashi only. */
export function Metrics({ children }: Children) {
  return <dl>{children}</dl>;
}

export function Metric({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="text-h2">
        {value}
        {suffix}
      </dd>
    </div>
  );
}

/** Group of stakeholder cards. */
export function Stakeholders({ children }: Children) {
  return <div>{children}</div>;
}

export function Stakeholder({ team, heard, shaped }: { team: string; heard: string; shaped: string }) {
  return (
    <article>
      <h3 className="text-h3">{team}</h3>
      <p className="label">What I heard</p>
      <p>{heard}</p>
      <p className="label">How it shaped the design</p>
      <p>{shaped}</p>
    </article>
  );
}

/** Highlighted insight or decision. */
export function Callout({ title, children }: Children & { title: string }) {
  return (
    <aside>
      <p className="text-h3">{title}</p>
      {children}
    </aside>
  );
}
