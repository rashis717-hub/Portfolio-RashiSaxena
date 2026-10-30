// "[YOUR INPUT: ...]" marks content Rashi has not supplied yet (see .agents/rules/content.md).
// Placeholders are visible in development and hidden in production builds.
export const PLACEHOLDER = /\[YOUR INPUT[^\]]*\]/;

export const showPlaceholders = process.env.NODE_ENV !== "production";

export function isPlaceholder(value: string) {
  return PLACEHOLDER.test(value);
}

/** The value, or undefined when it is a placeholder in a production build. */
export function supplied(value: string) {
  return isPlaceholder(value) && !showPlaceholders ? undefined : value;
}
