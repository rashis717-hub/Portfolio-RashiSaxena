import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ContrastRatio, TokenHex } from "./contrast";
import { ThemeControls } from "./theme-controls";

// Internal reference page for /DESIGN.md. Not linked from the site and not indexed.
// Placeholder copy only: no real projects, numbers or names.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// Every colour token, measured against the surface it is used on. min: 4.5 text, 3 non-text, null decorative.
const colours = [
  { token: "background", use: "Page", on: null, min: null, dark: null },
  { token: "foreground", use: "Text", on: "background", min: 4.5, dark: null },
  { token: "muted", use: "Secondary surface", on: null, min: null, dark: null },
  { token: "muted-foreground", use: "Secondary text", on: "background", min: 4.5, dark: null },
  { token: "border", use: "1px hairline, decorative", on: "background", min: null, dark: null },
  { token: "accent", use: "Dots, progress bars, focus rings, large icons", on: "background", min: 3, dark: null },
  { token: "accent-strong", use: "Links, small accent text, filled hovers", on: "background", min: 4.5, dark: "Same as accent in dark" },
  { token: "on-accent-strong", use: "Text on accent-strong", on: "accent-strong", min: 4.5, dark: "Same as background in dark" },
] as const;

// Accent used as a graphic (focus ring, progress bar, dots): needs 3:1 against what it sits on.
const accentGraphics = [
  { fg: "accent", bg: "background", use: "Focus ring, dots" },
  { fg: "accent", bg: "muted", use: "Progress bar on its track" },
] as const;

// Every text pairing the components use.
const textPairs = [
  { fg: "foreground", bg: "background", use: "Body text" },
  { fg: "muted-foreground", bg: "background", use: "Secondary text, labels" },
  { fg: "muted-foreground", bg: "muted", use: "Chip" },
  { fg: "accent-strong", bg: "background", use: "Link" },
  { fg: "accent-strong", bg: "muted", use: "Link on muted surface" },
  { fg: "background", bg: "foreground", use: "Primary button" },
  { fg: "on-accent-strong", bg: "accent-strong", use: "Primary button, hover" },
] as const;

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 160];

const layoutTokens = [
  { name: "max-w-site", value: "1200px container" },
  { name: "max-w-measure", value: "68ch reading width" },
  { name: "py-section", value: "96px mobile to 160px desktop" },
  { name: "px-gutter", value: "20px to 48px side margin" },
  { name: "grid-site", value: "12 columns" },
];

const motionTokens = [
  { name: "--duration-hover", value: "180ms", use: "Hover, underline draw" },
  { name: "--duration-theme", value: "200ms", use: "Theme crossfade, header" },
  { name: "--duration-page", value: "350ms", use: "Page transition" },
  { name: "--duration-reveal", value: "500ms", use: "Entrances" },
  { name: "ease-entrance", value: "cubic-bezier(0.22, 1, 0.36, 1)", use: "Entrances" },
];

/** Class name or token under a specimen, so it maps straight to code. */
function Cls({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-xs text-muted-foreground">{children}</code>;
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t pt-8">
      <h3 className="label">
        {String(n).padStart(2, "0")} / {title}
      </h3>
      {children}
    </section>
  );
}

function ContrastList({
  rows,
  min,
}: {
  rows: readonly { fg: string; bg: string; use: string }[];
  min: number;
}) {
  return (
    <ul className="flex flex-col divide-y border-y">
      {rows.map(({ fg, bg, use }) => (
        <li key={use} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
          <span className="text-sm">
            {use}
            <span className="block font-mono text-xs text-muted-foreground">
              {fg} on {bg}
            </span>
          </span>
          <ContrastRatio fg={fg} bg={bg} min={min} />
        </li>
      ))}
    </ul>
  );
}

function Specimen({ theme }: { theme: "light" | "dark" }) {
  let n = 0;
  const next = () => ++n;

  return (
    <div className={`${theme} flex flex-col gap-10 rounded-md border bg-background p-6 text-foreground sm:p-10`}>
      <h2 className="label text-foreground">{theme} theme</h2>

      <Section n={next()} title="Colour">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
          {colours.map(({ token, use, on, min, dark }) => (
            <li key={token} className="flex flex-col gap-1.5">
              <span className="h-14 rounded-sm border" style={{ background: `var(--${token})` }} />
              <code className="font-mono text-xs break-all">--{token}</code>
              <span className="text-xs text-muted-foreground">{use}</span>
              {theme === "dark" && dark && <span className="text-xs text-muted-foreground">{dark}</span>}
              {token !== "border" && <TokenHex name={token} />}
              {on && min !== null && <ContrastRatio fg={token} bg={on} min={min} />}
            </li>
          ))}
        </ul>
      </Section>

      <Section n={next()} title="Text contrast">
        <ContrastList rows={textPairs} min={4.5} />
      </Section>

      <Section n={next()} title="Accent graphics">
        <ContrastList rows={accentGraphics} min={3} />
      </Section>

      <Section n={next()} title="Type scale">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-display">Quiet precision</p>
            <Cls>text-display · 44px to 96px, 500, -0.04em</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h2">A headline that states a point</p>
            <Cls>text-h2 · 28px to 44px, 500, -0.03em</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-h3">Card and subsection title</p>
            <Cls>text-h3 · 24px, 500, -0.02em</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-body">
              Body text is set at 17px with a 1.65 line height and a 68 character measure, so long
              case-study paragraphs stay calm and easy to read. This sentence has an{" "}
              <a href="#top" className="link">
                inline link
              </a>
              .
            </p>
            <p className="text-body text-muted-foreground">Muted foreground for captions and details.</p>
            <Cls>text-body · 17px / 1.65, max 68ch</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <p className="label">Geist Mono, uppercase, 0.08em tracking</p>
            <Cls>label · 12px mono, muted</Cls>
          </div>
        </div>
      </Section>

      <Section n={next()} title="Spacing and layout">
        <ul className="flex flex-col gap-2">
          {spacing.map((px) => (
            <li key={px} className="flex items-center gap-3">
              <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">{px}</span>
              <span className="h-2 max-w-full rounded-full bg-muted-foreground" style={{ width: px }} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {layoutTokens.map(({ name, value }) => (
            <li key={name} className="flex flex-wrap justify-between gap-x-4 text-sm">
              <Cls>{name}</Cls>
              <span className="text-muted-foreground">{value}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section n={next()} title="Radius and elevation">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <span className="size-16 rounded-sm border" />
            <Cls>rounded-sm · 8px</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <span className="size-16 rounded-md border" />
            <Cls>rounded-md · 12px</Cls>
          </div>
          <div className="flex flex-col gap-2">
            <span className="h-10 w-24 rounded-full border" />
            <Cls>rounded-full · pill</Cls>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Flat by default: 1px hairline borders, no shadows. The only blur is the header after scroll.
        </p>
      </Section>

      <Section n={next()} title="Motion">
        <ul className="flex flex-col gap-1">
          {motionTokens.map(({ name, value, use }) => (
            <li key={name} className="flex flex-wrap justify-between gap-x-4 text-sm">
              <Cls>{name}</Cls>
              <span className="text-muted-foreground">
                {value} · {use}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Transform and opacity only (clip-path where specified), 6 to 16px of movement. Every animation
          has a reduced-motion version: no movement, fade or instant.
        </p>
      </Section>

      <Section n={next()} title="Buttons">
        <div className="flex flex-col gap-3">
          <p className="label">Variants</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              Primary
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Button>
            <Button variant="outline">Secondary</Button>
          </div>
          <Cls>Button · Button variant=&quot;outline&quot;</Cls>
        </div>
        <div className="flex flex-col gap-3">
          <p className="label">States (static previews)</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-strong px-5 text-sm font-medium text-on-accent-strong">
              Hover
              <ArrowRight className="size-4 translate-x-1" aria-hidden />
            </span>
            <span className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground outline-2 outline-offset-2 outline-ring">
              Keyboard focus
            </span>
            <Button disabled>Disabled</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Hover fills with accent-strong and nudges the arrow 4px; the secondary button draws an
            underline. Focus is a 2px accent outline, keyboard only.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="label">Sizes</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <Cls>size=&quot;sm&quot; 36px · default 44px · size=&quot;lg&quot; 48px</Cls>
        </div>
      </Section>

      <Section n={next()} title="Chips">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="chip">Tag</Badge>
          <Badge variant="chip">Another tag</Badge>
        </div>
        <Cls>Badge variant=&quot;chip&quot;</Cls>
      </Section>

      <Section n={next()} title="Links">
        <div className="flex flex-col gap-2">
          <p className="text-body">
            Inline:{" "}
            <a href="#top" className="link">
              resting underline, strengthens on hover
            </a>
          </p>
          <Cls>link</Cls>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <a href="#top" className="underline-draw text-accent-strong">
              Standalone: underline draws on hover
            </a>
          </p>
          <Cls>underline-draw text-accent-strong · nav and standalone links only</Cls>
        </div>
      </Section>

      <Section n={next()} title="Accent in use">
        <Progress value={60} aria-label="Example progress, 60%" />
        <Cls>Progress · bg-accent</Cls>
        <p className="text-sm text-muted-foreground">
          Bright accent: focus rings, progress, dots, large graphics. Accent-strong: links, small accent
          text and filled hovers. Never used for errors or warnings: those use foreground text, a
          hairline, an icon and a short sentence.
        </p>
      </Section>

      <Section n={next()} title="Card">
        <article className="flex flex-col gap-3 rounded-md border bg-card p-6 text-card-foreground transition-[transform,border-color] duration-(--duration-hover) ease-out hover:border-foreground/25 motion-safe:hover:-translate-y-0.5">
          <p className="label">Label</p>
          <p className="text-h3">Card title</p>
          <p className="text-muted-foreground">
            Flat, 1px hairline border, 12px radius, 24px padding. Hover lifts 2px and brightens the
            border.
          </p>
        </article>
      </Section>

      <Section n={next()} title="Case study section header">
        <div className="flex flex-col gap-3">
          <p className="label">01 / The Challenge</p>
          <p className="text-h2">A headline that states a point, not a topic</p>
        </div>
      </Section>

      <Section n={next()} title="Stakeholder card">
        <article className="flex flex-col gap-5 rounded-md border p-6">
          <p className="text-h3">Team name</p>
          <div className="flex flex-col gap-1.5">
            <p className="label">What I heard</p>
            <p className="text-muted-foreground">One or two sentences on what this team needed.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="label">How it shaped the design</p>
            <p className="text-muted-foreground">One or two sentences on the decision it led to.</p>
          </div>
        </article>
      </Section>

      <Section n={next()} title="Metric">
        <div className="flex flex-col gap-2">
          <p className="text-display tabular-nums">00</p>
          <p className="label">Metric label</p>
        </div>
      </Section>

      <Section n={next()} title="Not in DESIGN.md: avoid">
        <p className="text-sm text-muted-foreground">
          shadcn variants that ship with the components but are not part of the system. Do not use
          them without adding them to DESIGN.md first.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Muted fill</Button>
          <Button variant="link">Link button</Button>
          <Badge variant="outline">Outline badge</Badge>
        </div>
      </Section>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-site flex flex-col gap-10 py-16">
      <header id="top" className="flex flex-col gap-6">
        <p className="label">Internal · source of truth: /DESIGN.md</p>
        <h1 className="text-display">Styleguide</h1>
        <div className="flex flex-col gap-2">
          <ThemeControls />
          <p className="text-sm text-muted-foreground">
            Switches the page around the specimens; the two specimens below are fixed to their theme.
          </p>
        </div>
      </header>
      <Separator />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Specimen theme="light" />
        <Specimen theme="dark" />
      </div>
    </div>
  );
}
