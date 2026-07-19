import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL("/admin/login?error=config", request.url),
      { status: 303 },
    );
  }

  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      { status: 303 },
    );
  }

  const safeNext = next.startsWith("/admin") ? next : "/admin";
  return NextResponse.redirect(new URL(safeNext, request.url), { status: 303 });
}
