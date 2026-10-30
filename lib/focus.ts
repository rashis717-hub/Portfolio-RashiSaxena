/**
 * Moves keyboard focus to an in-page target such as "#work" without scrolling (the browser or
 * router already scrolled). Makes the target programmatically focusable if needed.
 * Returns false when there is no such element.
 */
export function focusHash(hash: string) {
  const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!target) return false;
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}
