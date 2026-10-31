import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholder";
import type { ShellLinks } from "./command-menu";

// A [YOUR INPUT] value renders as plain muted text (development only), never as a link.
function Placeholder({ value }: { value: string }) {
  return <span className="font-mono text-xs text-muted-foreground">{value}</span>;
}

/**
 * Closing statement with email and LinkedIn. Each action appears once its value is supplied, and the
 * section itself only renders when there is at least one way to get in touch: an invitation with
 * nothing to click is a dead end. (In development, placeholders keep it visible.)
 */
export function Contact({ links }: { links: ShellLinks }) {
  const { line, emailCta, linkedinCta } = site.contact;
  const { email, linkedin } = links;
  if (!email && !linkedin) return null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-site py-section border-t border-border">
      <h2 id="contact-title" className="text-display max-w-4xl text-balance">
        {line}
      </h2>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {email &&
          (isPlaceholder(email) ? (
            <Placeholder value={email} />
          ) : (
            <Button asChild>
              <a href={`mailto:${email}`}>
                {emailCta}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </a>
            </Button>
          ))}
        {linkedin &&
          (isPlaceholder(linkedin) ? (
            <Placeholder value={linkedin} />
          ) : (
            <Button asChild variant="outline">
              <a href={linkedin} target="_blank" rel="noopener">
                {linkedinCta}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          ))}
      </div>
    </section>
  );
}
