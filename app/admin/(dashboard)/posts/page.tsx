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

async function resolveSiteId(param?: string) {
  const session = await getStaffSession();
  return (
    param ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id ??
    null
  );
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const params = await searchParams;
  const siteId = await resolveSiteId(params.site);
  const supabase = await createClient();

  let rows: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    site_id: string | null;
    published_at: string | null;
  }> = [];

  if (siteId) {
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, status, site_id, published_at")
      .or(`site_id.is.null,site_id.eq.${siteId}`)
      .is("deleted_at", null)
      .order("sort_order")
      .order("created_at", { ascending: false });
    rows = data ?? [];
  }

  const createHref = siteId ? `/admin/posts/new?site=${siteId}` : undefined;

  return (
    <>
      <AdminPageHeader
        title="Posts / News"
        description="Add and edit blog and news posts for the selected site. Shared posts appear on all sites unless overridden."
        actionHref={createHref}
        actionLabel="New post"
        count={rows.length}
      />
      {!rows.length ? (
        <EmptyState
          title="No posts yet"
          message="Create the first post or run the Canada seed script."
          actionHref={createHref}
          actionLabel="New post"
        />
      ) : (
        <AdminTable headers={["Title", "Slug", "Scope", "Status", ""]}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.title}</td>
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
                  href={`/admin/posts/${row.id}?site=${siteId}`}
                  className="admin-btn admin-btn--ghost admin-btn--sm"
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
