import Script from "next/script";

/**
 * Optional privacy-friendly analytics (Plausible, Fathom, or self-hosted).
 * Disabled by default. Zero cookies, GDPR compliant, no personal data tracked.
 *
 * To enable:
 * Set in your environment:
 *   NEXT_PUBLIC_ANALYTICS_DOMAIN="rashisaxena.com"
 *   NEXT_PUBLIC_ANALYTICS_SRC="https://plausible.io/js/script.js" (optional, defaults to Plausible)
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "https://plausible.io/js/script.js";

  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
