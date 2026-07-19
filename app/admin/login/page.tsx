import Image from "next/image";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import "@/app/styles/admin.css";

export const metadata = {
  title: "Staff Login — AWFCA",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) redirect("/admin");
    } catch {
      // show login form
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <Image
            src="/images/logo-awfca.png"
            alt="AWFCA"
            width={48}
            height={48}
            className="admin-login__logo"
            priority
          />
          <div className="admin-login__brand-text">
            <strong>AWFCA</strong>
            <span>Content Management Portal</span>
          </div>
        </div>
        <h1>Staff login</h1>
        <p>Invite-only access for Arrahman Welfare Foundation Canada sites.</p>
        {params.error ? (
          <div className="admin-error" style={{ marginBottom: "1rem" }}>
            {params.error === "invalid"
              ? "Invalid email or password."
              : params.error === "config"
                ? "Supabase is not configured. Add credentials to .env.local."
                : "Unable to sign in."}
          </div>
        ) : null}
        <form className="admin-form" action="/api/admin/login" method="post">
          <input type="hidden" name="next" value={params.next ?? "/admin"} />
          <label>
            Email
            <input type="email" name="email" required autoComplete="username" />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
