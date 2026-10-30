"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Lock, Mail } from "lucide-react";

/**
 * Client-side gate for private case studies.
 *
 * ⚠️ This is a courtesy lock, not security. The page HTML is always in the
 * static export. For genuinely confidential work, use hosting-level protection
 * (e.g. Vercel password protection, Cloudflare Access rules) or do not publish.
 *
 * Passcode comparison: the browser hashes the entered passcode with SHA-256
 * and compares it to `NEXT_PUBLIC_PRIVATE_GATE_HASH`. Generate the hash with:
 *
 *   echo -n "your-passcode" | shasum -a 256
 *
 * then add to .env.local:
 *   NEXT_PUBLIC_PRIVATE_GATE_HASH=<hash>
 */

const HASH = process.env.NEXT_PUBLIC_PRIVATE_GATE_HASH ?? "";
const STORAGE_KEY = "private-gate-unlocked";

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function CaseStudyGate({
  title,
  slug,
  email,
  children,
}: {
  title: string;
  slug: string;
  email: string;
  children: ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === slug) {
        queueMicrotask(() => {
          setUnlocked(true);
          setVisible(true);
        });
      }
    }
  }, [slug]);

  // Focus the input on mount
  useEffect(() => {
    if (!unlocked) {
      inputRef.current?.focus();
    }
  }, [unlocked]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const passcode = (formData.get("passcode") as string).trim();

    if (!passcode) {
      triggerError("Please enter a passcode.");
      return;
    }

    if (!HASH) {
      triggerError("Access is not configured.");
      return;
    }

    const hash = await sha256(passcode);
    if (hash === HASH) {
      sessionStorage.setItem(STORAGE_KEY, slug);
      setUnlocked(true);
      // 300ms fade-in
      requestAnimationFrame(() => setVisible(true));
    } else {
      triggerError("Incorrect passcode.");
    }
  }

  function triggerError(msg: string) {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
    inputRef.current?.select();
  }

  const mailtoSubject = encodeURIComponent(`Access request: ${title}`);
  const mailtoBody = encodeURIComponent(
    `Hi Rashi,\n\nI'd like to view the "${title}" case study on your portfolio. Could you share the passcode?\n\nThank you.`
  );
  const mailto = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  if (unlocked) {
    return (
      <div
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-(--spacing-gutter) py-24">
      <div
        className={`w-full max-w-sm rounded-md border border-border bg-card p-8 text-center${
          shaking ? " gate-shake" : ""
        }`}
      >
        {/* Lock icon */}
        <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full border border-border">
          <Lock className="size-5 text-muted-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-h3 font-medium text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-8">
          This case study is shared by invitation.
        </p>

        {/* Passcode form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="gate-passcode" className="label">
              Passcode
            </label>
            <input
              ref={inputRef}
              id="gate-passcode"
              name="passcode"
              type="password"
              autoComplete="off"
              placeholder="Enter passcode"
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-sm text-foreground"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors duration-(--duration-hover) hover:bg-accent-strong hover:text-on-accent-strong"
          >
            Unlock
          </button>
        </form>

        {/* Request access link */}
        <div className="mt-6 border-t border-border pt-6">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-(--duration-hover) hover:text-foreground"
          >
            <Mail className="size-4" />
            <span>Request access</span>
          </a>
        </div>
      </div>
    </div>
  );
}
