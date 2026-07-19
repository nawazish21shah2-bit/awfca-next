import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminTable,
  EmptyState,
  ScopeBadge,
  StatusBadge,
} from "@/components/admin/AdminTable";

export default async function FaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const sp = await searchParams;
  const session = await getStaffSession();
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  const supabase = await createClient();
  const { data } = siteId
    ? await supabase
        .from("faq_items")
        .select("id,question,placement,status,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("sort_order")
    : { data: [] };

  const rows = data ?? [];
  const createHref = siteId ? `/admin/faqs/new?site=${siteId}` : undefined;

  return (
    <>
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions."
        actionHref={createHref}
        actionLabel="New FAQ"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No FAQs yet"
          message="Add common questions to help visitors find answers quickly."
          actionHref={createHref}
          actionLabel="New FAQ"
        />
      ) : (
        <AdminTable
          headers={["Question", "Placement", "Scope", "Status", ""]}
        >
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.question}</td>
              <td>{row.placement}</td>
              <td>
                <ScopeBadge siteId={row.site_id} />
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td className="admin-table__actions">
                <Link
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  href={`/admin/faqs/${row.id}?site=${siteId}`}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
