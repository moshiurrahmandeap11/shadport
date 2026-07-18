/**
 * Generate a URL-friendly slug from a string.
 * Converts to lowercase, replaces spaces with hyphens,
 * removes special characters.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

/**
 * Validate a slug format.
 * Must be lowercase, contain only letters, numbers, and hyphens.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Auto-generate a slug from a title.
 * If the title is empty, returns an empty string.
 */
export function generateSlug(title: string): string {
  if (!title.trim()) return "";
  return slugify(title);
}
