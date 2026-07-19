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

export default async function ProgramsPage({
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
        .from("programs")
        .select("id,title,slug,category,status,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("sort_order")
    : { data: [] };

  const rows = data ?? [];
  const createHref = siteId
    ? `/admin/programs/new?site=${siteId}`
    : undefined;

  return (
    <>
      <AdminPageHeader
        title="Programs"
        description="Manage site and shared programs."
        actionHref={createHref}
        actionLabel="New program"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No programs yet"
          message="Add a program to showcase AWFCA’s work on the public site."
          actionHref={createHref}
          actionLabel="New program"
        />
      ) : (
        <AdminTable
          headers={["Title", "Category", "Slug", "Scope", "Status", ""]}
        >
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.title}</td>
              <td>{row.category}</td>
              <td>
                <code>{row.slug}</code>
              </td>
              <td>
                <ScopeBadge siteId={row.site_id} />
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td className="admin-table__actions">
                <Link
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  href={`/admin/programs/${row.id}?site=${siteId}`}
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
