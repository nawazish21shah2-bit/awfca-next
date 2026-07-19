"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavIcon = "overview" | "posts" | "programs" | "faqs" | "team" | "reports" | "counters" | "media" | "submissions";

const links: Array<{
  href: string;
  label: string;
  icon: NavIcon;
  exact?: boolean;
}> = [
  { href: "/admin", label: "Overview", icon: "overview", exact: true },
  { href: "/admin/posts", label: "Posts / News", icon: "posts" },
  { href: "/admin/programs", label: "Programs", icon: "programs" },
  { href: "/admin/faqs", label: "FAQs", icon: "faqs" },
  { href: "/admin/team", label: "Team", icon: "team" },
  { href: "/admin/reports", label: "Reports", icon: "reports" },
  { href: "/admin/counters", label: "Counters", icon: "counters" },
  { href: "/admin/media", label: "Media", icon: "media" },
  { href: "/admin/submissions", label: "Submissions", icon: "submissions" },
];

function NavIconSvg({ name }: { name: NavIcon }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "posts":
      return (
        <svg {...common}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "programs":
      return (
        <svg {...common}>
          <path d="M12 3 4 7.5 12 12l8-4.5L12 3Z" />
          <path d="M4 12.5 12 17l8-4.5" />
          <path d="M4 17.5 12 22l8-4.5" />
        </svg>
      );
    case "faqs":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
          <path d="M14 14.5c1.7-.4 3.5.2 4.5 2.5" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
    case "counters":
      return (
        <svg {...common}>
          <path d="M4 19V9" />
          <path d="M10 19V5" />
          <path d="M16 19v-7" />
          <path d="M22 19H2" />
        </svg>
      );
    case "media":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2.2" />
          <path d="m13 15 2.2-2.2a1.5 1.5 0 0 1 2.1 0L19 14" />
        </svg>
      );
    case "submissions":
      return (
        <svg {...common}>
          <path d="M4 5h16v12H8l-4 3V5Z" />
          <path d="M8 10h8M8 13h5" />
        </svg>
      );
    default:
      return null;
  }
}

export function AdminNav({
  isSuperAdmin,
  onNavigate,
}: {
  isSuperAdmin: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Admin">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "admin-nav__link is-active" : "admin-nav__link"}
            onClick={onNavigate}
          >
            <span className="admin-nav__icon">
              <NavIconSvg name={link.icon} />
            </span>
            <span className="admin-nav__label">{link.label}</span>
          </Link>
        );
      })}
      {isSuperAdmin ? (
        <p className="admin-nav__hint">
          UK &amp; Pakistan sites are ready for future domains.
        </p>
      ) : null}
    </nav>
  );
}
