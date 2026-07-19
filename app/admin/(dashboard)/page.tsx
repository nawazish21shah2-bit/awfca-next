import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/AdminTable";

async function countForSite(
  table: string,
  siteId: string,
  extra?: { column: string; value: string },
) {
  const supabase = await createClient();
  let query = supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .or(`site_id.is.null,site_id.eq.${siteId}`)
    .is("deleted_at", null);
  if (extra) query = query.eq(extra.column, extra.value);
  const { count } = await query;
  return count ?? 0;
}

async function countSubmissions(siteId: string, status?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("form_submissions")
    .select("id", { count: "exact", head: true })
    .eq("site_id", siteId)
    .is("deleted_at", null);
  if (status) query = query.eq("status", status);
  const { count } = await query;
  return count ?? 0;
}

function firstName(fullName: string | null | undefined, email: string) {
  const fromName = fullName?.trim().split(/\s+/)[0];
  if (fromName) return fromName;
  return email.split("@")[0] || "there";
}

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const params = await searchParams;
  const siteId =
    params.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;

  if (!siteId) {
    return (
      <div className="admin-empty">
        No sites assigned. Ask a super admin to grant access.
      </div>
    );
  }

  const site = session?.sites.find((s) => s.id === siteId);
  const greeting = firstName(
    session?.profile.full_name,
    session?.user.email ?? "",
  );

  let posts = 0;
  let programs = 0;
  let submissions = 0;
  let newSubs = 0;
  let recent: Array<{
    id: string;
    type: string;
    status: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
  }> = [];

  try {
    const supabase = await createClient();
    const [postsCount, programsCount, subsCount, newCount, recentRows] =
      await Promise.all([
        countForSite("posts", siteId),
        countForSite("programs", siteId),
        countSubmissions(siteId),
        countSubmissions(siteId, "new"),
        supabase
          .from("form_submissions")
          .select("id, type, status, first_name, last_name, email, created_at")
          .eq("site_id", siteId)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

    posts = postsCount;
    programs = programsCount;
    submissions = subsCount;
    newSubs = newCount;
    recent = recentRows.data ?? [];
  } catch {
    // DB may not be configured yet
  }

  const stats = [
    {
      label: "Posts / News",
      value: posts,
      href: `/admin/posts?site=${siteId}`,
      hint: "Manage stories",
    },
    {
      label: "Programs",
      value: programs,
      href: `/admin/programs?site=${siteId}`,
      hint: "Edit programs",
    },
    {
      label: "Submissions",
      value: submissions,
      href: `/admin/submissions?site=${siteId}`,
      hint: "All inquiries",
    },
    {
      label: "New inbox",
      value: newSubs,
      href: `/admin/submissions?site=${siteId}&status=new`,
      hint: newSubs ? "Needs attention" : "All clear",
      highlight: newSubs > 0,
    },
  ];

  const actions = [
    {
      href: `/admin/posts/new?site=${siteId}`,
      title: "New post",
      description: "Draft or publish a news story",
      primary: true,
    },
    {
      href: `/admin/programs/new?site=${siteId}`,
      title: "New program",
      description: "Add a program with gallery photos",
    },
    {
      href: `/admin/counters?site=${siteId}`,
      title: "Update counters",
      description: "Refresh impact numbers on the site",
    },
    {
      href: `/admin/media?site=${siteId}`,
      title: "Upload media",
      description: "Add images or PDFs to the library",
    },
  ];

  return (
    <>
      <AdminPageHeader
        title={`Welcome, ${greeting}`}
        description={`You’re managing ${site?.name ?? "the selected site"}. UK and Pakistan sites can be activated when those websites launch.`}
        eyebrow="Overview"
      />

      <div className="admin-card-grid">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`admin-card admin-card--stat admin-card--link${stat.highlight ? " is-highlight" : ""}`}
          >
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <em className="admin-card__hint">{stat.hint}</em>
          </Link>
        ))}
      </div>

      <div className="admin-overview-grid">
        <section className="admin-card">
          <h2>Quick actions</h2>
          <p className="admin-card__lead">
            Common updates for staff — no developer required.
          </p>
          <div className="admin-action-grid">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`admin-action-tile${action.primary ? " is-primary" : ""}`}
              >
                <strong>{action.title}</strong>
                <span>{action.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card__header">
            <h2>Recent submissions</h2>
            <Link
              href={`/admin/submissions?site=${siteId}`}
              className="admin-btn admin-btn--ghost admin-btn--sm"
            >
              View all
            </Link>
          </div>
          {!recent.length ? (
            <p className="admin-card__lead admin-card__lead--flush">
              No submissions yet for this site.
            </p>
          ) : (
            <ul className="admin-recent-list">
              {recent.map((row) => (
                <li key={row.id}>
                  <Link
                    href={`/admin/submissions/${row.id}?site=${siteId}`}
                    className="admin-recent-item"
                  >
                    <div className="admin-recent-item__main">
                      <strong>
                        {row.first_name} {row.last_name}
                      </strong>
                      <span>
                        {row.type} · {row.email}
                      </span>
                    </div>
                    <div className="admin-recent-item__meta">
                      <StatusBadge status={row.status} />
                      <time dateTime={row.created_at}>
                        {new Date(row.created_at).toLocaleDateString()}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
