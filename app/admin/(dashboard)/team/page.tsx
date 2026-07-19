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

export default async function TeamPage({
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
        .from("team_members")
        .select("id,name,role,status,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("sort_order")
    : { data: [] };

  const rows = data ?? [];
  const createHref = siteId ? `/admin/team/new?site=${siteId}` : undefined;

  return (
    <>
      <AdminPageHeader
        title="Team"
        description="Manage team and leadership profiles."
        actionHref={createHref}
        actionLabel="New member"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No team members yet"
          message="Add leadership and staff profiles for the public About pages."
          actionHref={createHref}
          actionLabel="New member"
        />
      ) : (
        <AdminTable headers={["Name", "Role", "Scope", "Status", ""]}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.name}</td>
              <td>{row.role}</td>
              <td>
                <ScopeBadge siteId={row.site_id} />
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td className="admin-table__actions">
                <Link
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  href={`/admin/team/${row.id}?site=${siteId}`}
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
