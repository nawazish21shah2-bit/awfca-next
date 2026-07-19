import type { StaffSession } from "@/lib/cms/types";

export function assertSiteAccess(
  session: StaffSession,
  siteId: string | null | undefined,
) {
  if (session.isSuperAdmin) return true;
  if (!siteId) {
    return session.sites.length > 0;
  }
  return session.sites.some((s) => s.id === siteId);
}

export function canManageSite(session: StaffSession, siteId: string | null) {
  return assertSiteAccess(session, siteId);
}
