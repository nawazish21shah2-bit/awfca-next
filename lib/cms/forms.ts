import { z } from "zod";

export const CONSENT_VERSION = "2026-07-01";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")), // honeypot
  consent: z.literal(true),
});

export const volunteerSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  availability: z.string().trim().max(500).optional().or(z.literal("")),
  skills: z.string().trim().max(1000).optional().or(z.literal("")),
  preferredRoles: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")), // honeypot
  consent: z.literal(true),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export async function hashIp(ip: string | null) {
  if (!ip) return null;
  const data = new TextEncoder().encode(ip + (process.env.IP_HASH_SALT ?? "awfca"));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}
