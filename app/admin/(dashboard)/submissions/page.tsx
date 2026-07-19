import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  AdminTable,
  EmptyState,
  StatusBadge,
} from "@/components/admin/AdminTable";

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string; type?: string; status?: string }>;
}) {
  const session = await getStaffSession();
  const params = await searchParams;
  const siteId =
    params.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;

  if (!siteId) {
    return <EmptyState message="No site selected." />;
  }

  const supabase = await createClient();
  let query = supabase
    .from("form_submissions")
    .select(
      "id, type, status, first_name, last_name, email, created_at, phone",
    )
    .eq("site_id", siteId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(200);

  if (params.type === "contact" || params.type === "volunteer") {
    query = query.eq("type", params.type);
  }
  if (params.status) {
    query = query.eq("status", params.status);
  }

  const { data: rows } = await query;
  const list = rows ?? [];
  const base = `/admin/submissions?site=${siteId}`;

  const filterClass = (active: boolean) =>
    active
      ? "admin-btn admin-btn--ghost admin-btn--sm is-active"
      : "admin-btn admin-btn--ghost admin-btn--sm";

  return (
    <>
      <AdminPageHeader
        title="Form submissions"
        description="Contact and volunteer inquiries for the selected site."
        eyebrow="Inbox"
        count={list.length}
      />
      <div className="admin-filters">
        <Link
          href={base}
          className={filterClass(!params.type && !params.status)}
        >
          All
        </Link>
        <Link
          href={`${base}&type=contact`}
          className={filterClass(params.type === "contact")}
        >
          Contact
        </Link>
        <Link
          href={`${base}&type=volunteer`}
          className={filterClass(params.type === "volunteer")}
        >
          Volunteer
        </Link>
        <Link
          href={`${base}&status=new`}
          className={filterClass(params.status === "new")}
        >
          New
        </Link>
        <span className="admin-filters__spacer" />
        <a
          href={`/api/admin/submissions/export?site=${siteId}${
            params.type ? `&type=${params.type}` : ""
          }`}
          className="admin-btn admin-btn--primary admin-btn--sm"
        >
          Export CSV
        </a>
      </div>
      {!list.length ? (
        <EmptyState
          title="No submissions"
          message="No submissions match the current filters for this site."
        />
      ) : (
        <AdminTable headers={["When", "Type", "Name", "Email", "Status", ""]}>
          {list.map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.created_at).toLocaleString()}</td>
              <td className="admin-table__title">{row.type}</td>
              <td>
                {row.first_name} {row.last_name}
              </td>
              <td>{row.email}</td>
              <td>
                <StatusBadge status={row.status} />
              </td>
              <td className="admin-table__actions">
                <Link
                  href={`/admin/submissions/${row.id}?site=${siteId}`}
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                >
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
