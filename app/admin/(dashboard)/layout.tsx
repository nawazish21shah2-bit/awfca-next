import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { SiteSelector } from "@/components/admin/SiteSelector";
import "@/app/styles/admin.css";

export const metadata = {
  title: "Content Portal — AWFCA",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getStaffSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      isSuperAdmin={session.isSuperAdmin}
      userLabel={session.profile.full_name ?? session.user.email ?? "Staff"}
      roleLabel={session.isSuperAdmin ? "Super admin" : "Site editor"}
      topbar={
        <>
          <Suspense fallback={<div className="admin-topbar__loading">Loading sites…</div>}>
            <SiteSelector sites={session.sites} />
          </Suspense>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="admin-btn admin-btn--ghost admin-btn--sm">
              Sign out
            </button>
          </form>
        </>
      }
    >
      {children}
    </AdminShell>
  );
}
