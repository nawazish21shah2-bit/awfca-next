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

export default async function ReportsPage({
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
        .from("reports")
        .select("id,title,year,report_type,status,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("sort_order")
    : { data: [] };

  const rows = data ?? [];
  const createHref = siteId
    ? `/admin/reports/new?site=${siteId}`
    : undefined;

  return (
    <>
      <AdminPageHeader
        title="Reports"
        description="Manage annual and impact reports."
        actionHref={createHref}
        actionLabel="New report"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No reports yet"
          message="Upload annual and impact reports for public download."
          actionHref={createHref}
          actionLabel="New report"
        />
      ) : (
        <AdminTable
          headers={["Title", "Year", "Type", "Scope", "Status", ""]}
        >
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.title}</td>
              <td>{row.year}</td>
              <td>{row.report_type}</td>
              <td>
                <ScopeBadge siteId={row.site_id} />
              </td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td className="admin-table__actions">
                <Link
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  href={`/admin/reports/${row.id}?site=${siteId}`}
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
