import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReportEditor } from "@/components/admin/ReportEditor";

export default async function NewReportPage({
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
        title="New report"
        description="Add a report or external publication."
        eyebrow="Editor"
        backHref={`/admin/reports?site=${siteId}`}
        backLabel="Reports"
      />
      <ReportEditor siteId={siteId} />
    </>
  );
}
