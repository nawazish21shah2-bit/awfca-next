import { headers } from "next/headers";
import { createServiceClient, isServiceConfigured } from "@/lib/supabase/admin";
import type { Site } from "@/lib/cms/types";

/** Default Canada site when DB is unavailable (local static fallback). */
export const FALLBACK_SITE: Site = {
  id: "00000000-0000-0000-0000-0000000000ca",
  code: "ca",
  name: "Arrahman Welfare Foundation Canada",
  country_code: "CA",
  hostname: "localhost",
  locale: "en",
  is_active: true,
  settings: {},
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
};

/**
 * Parse SITE_HOST_MAP env: "localhost=ca,awfca.ca=ca,uk.awfca.org=uk"
 */
function hostMap(): Record<string, string> {
  const raw = process.env.SITE_HOST_MAP ?? "";
  const map: Record<string, string> = {};
  for (const part of raw.split(",")) {
    const [host, code] = part.trim().split("=");
    if (host && code) map[host.toLowerCase()] = code.toLowerCase();
  }
  return map;
}

export function normalizeHostname(host: string | null | undefined) {
  if (!host) return "localhost";
  return host.split(":")[0].trim().toLowerCase();
}

export async function resolveSiteByHostname(
  hostname?: string | null,
): Promise<Site> {
  const host = normalizeHostname(hostname);

  if (!isServiceConfigured()) {
    return { ...FALLBACK_SITE, hostname: host };
  }

  const supabase = createServiceClient();
  const map = hostMap();
  const codeFromMap = map[host];

  if (codeFromMap) {
    const { data } = await supabase
      .from("sites")
      .select("*")
      .eq("code", codeFromMap)
      .maybeSingle();
    if (data) return data as Site;
  }

  const { data: byHost } = await supabase
    .from("sites")
    .select("*")
    .eq("hostname", host)
    .maybeSingle();

  if (byHost) return byHost as Site;

  // Default to Canada for unknown hosts during development
  const { data: canada } = await supabase
    .from("sites")
    .select("*")
    .eq("code", "ca")
    .maybeSingle();

  return (canada as Site) ?? { ...FALLBACK_SITE, hostname: host };
}

export async function getRequestSite(): Promise<Site> {
  try {
    const h = await headers();
    const host =
      h.get("x-forwarded-host") ??
      h.get("host") ??
      process.env.DEFAULT_SITE_HOST;
    return resolveSiteByHostname(host);
  } catch {
    // Static generation / build contexts without request headers
    return resolveSiteByHostname(process.env.DEFAULT_SITE_HOST ?? "localhost");
  }
}

export async function getSiteByCode(code: string): Promise<Site | null> {
  if (!isServiceConfigured()) {
    return code === "ca" ? FALLBACK_SITE : null;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("sites")
    .select("*")
    .eq("code", code)
    .maybeSingle();
  return (data as Site) ?? null;
}
