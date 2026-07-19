import Link from "next/link";

export function StatusBadge({ status }: { status: string }) {
  return <span className={`admin-badge admin-badge--${status}`}>{status}</span>;
}

export function ScopeBadge({ siteId }: { siteId: string | null }) {
  const shared = !siteId;
  return (
    <span
      className={`admin-badge ${shared ? "admin-badge--scope-shared" : "admin-badge--scope-site"}`}
    >
      {shared ? "Shared" : "Site"}
    </span>
  );
}

export function EmptyState({
  message,
  title = "Nothing here yet",
  actionHref,
  actionLabel,
}: {
  message: string;
  title?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="admin-empty">
      <p className="admin-empty__title">{title}</p>
      <p className="admin-empty__message">{message}</p>
      {actionHref && actionLabel ? (
        <div className="admin-empty__action">
          <Link href={actionHref} className="admin-btn admin-btn--primary">
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h || "actions"}
                className={h === "" ? "admin-table__actions" : undefined}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
