import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProgramEditor } from "@/components/admin/ProgramEditor";

export default async function NewProgramPage({
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
        title="New program"
        description="Create a draft or publish immediately."
        eyebrow="Editor"
        backHref={`/admin/programs?site=${siteId}`}
        backLabel="Programs"
      />
      <ProgramEditor siteId={siteId} />
    </>
  );
}
