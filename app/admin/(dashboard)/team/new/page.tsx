import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TeamEditor } from "@/components/admin/TeamEditor";

export default async function NewTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const sp = await searchParams;
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  if (!siteId) return <div className="admin-empty">No site selected.</div>;

  return (
    <>
      <AdminPageHeader
        title="New team member"
        description="Add a team profile."
        eyebrow="Editor"
        backHref={`/admin/team?site=${siteId}`}
        backLabel="Team"
      />
      <TeamEditor siteId={siteId} />
    </>
  );
}
