import { notFound } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TeamEditor } from "@/components/admin/TeamEditor";
import type { TeamMember } from "@/lib/cms/types";

export default async function EditTeamMemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  if (!siteId) return <div className="admin-empty">No site selected.</div>;

  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit team member"
        description={data.name}
        eyebrow="Editor"
        backHref={`/admin/team?site=${siteId}`}
        backLabel="Team"
      />
      <TeamEditor siteId={siteId} member={data as TeamMember} />
    </>
  );
}
