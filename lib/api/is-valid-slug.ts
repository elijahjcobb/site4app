export function isValidSlug(slug: string | undefined): boolean {
  if (!slug) return false;
  return /^[a-zA-Z0-9-]+$/gm.test(slug);
}
