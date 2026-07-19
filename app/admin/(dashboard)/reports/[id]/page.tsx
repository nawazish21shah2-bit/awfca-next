import { notFound } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReportEditor } from "@/components/admin/ReportEditor";
import type { Report } from "@/lib/cms/types";

export default async function EditReportPage({
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
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit report"
        description={data.title}
        eyebrow="Editor"
        backHref={`/admin/reports?site=${siteId}`}
        backLabel="Reports"
      />
      <ReportEditor siteId={siteId} report={data as Report} />
    </>
  );
}
