import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqEditor } from "@/components/admin/FaqEditor";
import type { FaqCategory } from "@/lib/cms/types";

export default async function NewFaqPage({
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

  const supabase = await createClient();
  const { data } = await supabase
    .from("faq_categories")
    .select("*")
    .or(`site_id.is.null,site_id.eq.${siteId}`)
    .is("deleted_at", null)
    .order("sort_order");

  return (
    <>
      <AdminPageHeader
        title="New FAQ"
        description="Add a frequently asked question."
        eyebrow="Editor"
        backHref={`/admin/faqs?site=${siteId}`}
        backLabel="FAQs"
      />
      <FaqEditor
        siteId={siteId}
        categories={(data ?? []) as FaqCategory[]}
      />
    </>
  );
}
