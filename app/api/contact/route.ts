import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  contactSchema,
  CONSENT_VERSION,
  hashIp,
  rateLimit,
} from "@/lib/cms/forms";
import { createServiceClient, isServiceConfigured } from "@/lib/supabase/admin";
import { resolveSiteByHostname } from "@/lib/cms/site";

export async function POST(request: Request) {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";

  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const honeypot = Boolean(data.website && data.website.length > 0);

  if (!isServiceConfigured()) {
    // Soft success in local/dev without DB so UX is not blocked
    return NextResponse.json({
      ok: true,
      stored: false,
      message: "Thanks! Your message was received.",
    });
  }

  const site = await resolveSiteByHostname(host);
  const supabase = createServiceClient();
  const { error } = await supabase.from("form_submissions").insert({
    site_id: site.id,
    type: "contact",
    status: honeypot ? "spam" : "new",
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email.toLowerCase(),
    phone: data.phone || null,
    message: data.message || null,
    consent_version: CONSENT_VERSION,
    consent_at: new Date().toISOString(),
    source_url: h.get("referer"),
    source_hostname: host,
    ip_hash: await hashIp(ip),
    user_agent: h.get("user-agent"),
    honeypot_triggered: honeypot,
  });

  if (error) {
    console.error("[contact] insert failed", error.message);
    return NextResponse.json(
      { ok: false, error: "Unable to save your message right now." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    stored: true,
    message: "Thanks! Your message was received.",
  });
}
