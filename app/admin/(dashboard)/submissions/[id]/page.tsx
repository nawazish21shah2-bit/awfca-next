import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SubmissionDetail } from "@/components/admin/SubmissionDetail";
import type { FormSubmission } from "@/lib/cms/types";

export default async function SubmissionPage({
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
    .from("form_submissions")
    .select("*")
    .eq("id", id)
    .eq("site_id", siteId)
    .is("deleted_at", null)
    .maybeSingle();
  if (!data) notFound();

  const submission = data as FormSubmission;
  const fields = [
    ["Type", submission.type],
    ["Name", `${submission.first_name} ${submission.last_name}`],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["City", submission.city],
    ["Country", submission.country],
    ["Message", submission.message],
    ["Availability", submission.availability],
    ["Skills", submission.skills],
    ["Preferred roles", submission.preferred_roles],
    ["Source", submission.source_url],
    ["Received", new Date(submission.created_at).toLocaleString()],
  ];

  return (
    <>
      <AdminPageHeader
        title="Submission details"
        description={`${submission.first_name} ${submission.last_name}`}
        eyebrow="Inbox"
        backHref={`/admin/submissions?site=${siteId}`}
        backLabel="Submissions"
      />
      <div className="admin-detail">
        {fields.map(([label, value]) => (
          <div key={label} className="admin-detail__row">
            <div className="admin-detail__label">{label}</div>
            <div className="admin-detail__value">{value || "—"}</div>
          </div>
        ))}
      </div>
      <SubmissionDetail submission={submission} />
    </>
  );
}
