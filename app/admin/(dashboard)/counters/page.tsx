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

export default async function CountersPage({
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
        .from("achievement_counters")
        .select("id,key,label,value,placement,status,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("sort_order")
    : { data: [] };

  const rows = data ?? [];
  const createHref = siteId
    ? `/admin/counters/new?site=${siteId}`
    : undefined;

  return (
    <>
      <AdminPageHeader
        title="Counters"
        description="Manage achievement and impact counters."
        actionHref={createHref}
        actionLabel="New counter"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No counters yet"
          message="Add impact numbers that appear on the homepage and program pages."
          actionHref={createHref}
          actionLabel="New counter"
        />
      ) : (
        <AdminTable
          headers={["Label", "Value", "Placement", "Scope", "Status", ""]}
        >
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className="admin-table__title">{row.label}</span>
                <span className="admin-table__sub">
                  <code>{row.key}</code>
                </span>
              </td>
              <td className="admin-table__title">{row.value}</td>
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
                  href={`/admin/counters/${row.id}?site=${siteId}`}
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
