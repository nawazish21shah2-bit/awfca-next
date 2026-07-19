"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export function AdminShell({
  children,
  isSuperAdmin,
  userLabel,
  roleLabel,
  topbar,
}: {
  children: React.ReactNode;
  isSuperAdmin: boolean;
  userLabel: string;
  roleLabel: string;
  topbar: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className={`admin-shell${menuOpen ? " is-nav-open" : ""}`}>
      <button
        type="button"
        className="admin-nav-backdrop"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside className="admin-sidebar" id="admin-sidebar">
        <div className="admin-sidebar__head">
          <div className="admin-brand">
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              <Image
                src="/images/logo-awfca.png"
                alt="AWFCA"
                width={40}
                height={40}
                className="admin-brand__logo"
                priority
              />
              <span className="admin-brand__text">
                <span className="admin-brand__name">AWFCA</span>
                <span className="admin-brand__tag">Content Portal</span>
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="admin-menu-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <AdminNav
          isSuperAdmin={isSuperAdmin}
          onNavigate={() => setMenuOpen(false)}
        />

        <div className="admin-sidebar-footer">
          <p className="admin-user">{userLabel}</p>
          <p className="admin-user-meta">{roleLabel}</p>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="admin-sidebar"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="admin-menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="admin-menu-toggle__label">Menu</span>
          </button>
          <div className="admin-topbar__tools">{topbar}</div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
