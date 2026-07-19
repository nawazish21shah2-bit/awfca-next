/**
 * Resolve shared + site-specific rows with overrides.
 * Prefer site override when override_of_id matches a shared row;
 * otherwise include shared rows and site-only rows.
 */
export function resolveWithOverrides<
  T extends {
    id: string;
    site_id: string | null;
    override_of_id: string | null;
    deleted_at?: string | null;
    status?: string;
    sort_order?: number;
  },
>(rows: T[], siteId: string, opts?: { publishedOnly?: boolean }): T[] {
  const publishedOnly = opts?.publishedOnly ?? true;
  const active = rows.filter((r) => {
    if (r.deleted_at) return false;
    if (publishedOnly && r.status && r.status !== "published") return false;
    return r.site_id === null || r.site_id === siteId;
  });

  const overrides = active.filter(
    (r) => r.site_id === siteId && r.override_of_id,
  );
  const overriddenIds = new Set(overrides.map((r) => r.override_of_id!));

  const result = active.filter((r) => {
    if (r.site_id === null && overriddenIds.has(r.id)) return false;
    return true;
  });

  return result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}
