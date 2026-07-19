import { createClient } from "@/lib/supabase/server";
import type { Profile, Site, SiteMembership, StaffSession } from "@/lib/cms/types";

export { assertSiteAccess, canManageSite } from "@/lib/cms/access";

export async function getStaffSession(): Promise<StaffSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) return null;

  const { data: memberships } = await supabase
    .from("site_memberships")
    .select("*, site:sites(*)")
    .eq("user_id", user.id);

  let sites: Site[] = [];

  if (profile.is_super_admin) {
    const { data: allSites } = await supabase
      .from("sites")
      .select("*")
      .order("code");
    sites = (allSites as Site[]) ?? [];
  } else {
    sites = ((memberships as SiteMembership[]) ?? [])
      .map((m) => m.site)
      .filter((s): s is Site => Boolean(s));
  }

  return {
    user: { id: user.id, email: user.email },
    profile: profile as Profile,
    memberships: (memberships as SiteMembership[]) ?? [],
    sites,
    isSuperAdmin: Boolean(profile.is_super_admin),
  };
}
