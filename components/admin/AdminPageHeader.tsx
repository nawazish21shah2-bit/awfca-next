import Link from "next/link";

export function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel,
  count,
  eyebrow = "Content",
  backHref,
  backLabel = "Back",
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  count?: number;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header__titles">
        {backHref ? (
          <Link href={backHref} className="admin-page-header__back">
            ← {backLabel}
          </Link>
        ) : null}
        {eyebrow ? (
          <span className="admin-page-header__eyebrow">{eyebrow}</span>
        ) : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
        {typeof count === "number" ? (
          <div className="admin-page-header__meta">
            <span className="admin-page-header__count">{count}</span>
            {count === 1 ? "item" : "items"}
          </div>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="admin-btn admin-btn--primary">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
