import { notFound } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqEditor } from "@/components/admin/FaqEditor";
import type { FaqCategory, FaqItem } from "@/lib/cms/types";

export default async function EditFaqPage({
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
  const [{ data: item }, { data: categories }] = await Promise.all([
    supabase.from("faq_items").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("faq_categories")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${siteId}`)
      .is("deleted_at", null)
      .order("sort_order"),
  ]);
  if (!item) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit FAQ"
        description={item.question}
        eyebrow="Editor"
        backHref={`/admin/faqs?site=${siteId}`}
        backLabel="FAQs"
      />
      <FaqEditor
        siteId={siteId}
        item={item as FaqItem}
        categories={(categories ?? []) as FaqCategory[]}
      />
    </>
  );
}
