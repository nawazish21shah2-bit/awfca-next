import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CounterEditor } from "@/components/admin/CounterEditor";

export default async function NewCounterPage({
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
        title="New counter"
        description="Add an achievement counter."
        eyebrow="Editor"
        backHref={`/admin/counters?site=${siteId}`}
        backLabel="Counters"
      />
      <CounterEditor siteId={siteId} />
    </>
  );
}
