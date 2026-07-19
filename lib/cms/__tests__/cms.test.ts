import { describe, expect, it } from "vitest";
import { resolveWithOverrides, slugify } from "../resolve";
import { contactSchema, rateLimit, volunteerSchema } from "../forms";
import { assertSiteAccess } from "../access";
import type { StaffSession } from "../types";

describe("resolveWithOverrides", () => {
  it("prefers site overrides over shared rows", () => {
    const rows = [
      {
        id: "shared-1",
        site_id: null,
        override_of_id: null,
        status: "published",
        sort_order: 1,
        deleted_at: null,
      },
      {
        id: "override-1",
        site_id: "site-ca",
        override_of_id: "shared-1",
        status: "published",
        sort_order: 1,
        deleted_at: null,
      },
      {
        id: "site-only",
        site_id: "site-ca",
        override_of_id: null,
        status: "published",
        sort_order: 2,
        deleted_at: null,
      },
      {
        id: "other-site",
        site_id: "site-uk",
        override_of_id: null,
        status: "published",
        sort_order: 3,
        deleted_at: null,
      },
      {
        id: "draft",
        site_id: null,
        override_of_id: null,
        status: "draft",
        sort_order: 0,
        deleted_at: null,
      },
    ];

    const resolved = resolveWithOverrides(rows, "site-ca");
    expect(resolved.map((r) => r.id)).toEqual(["override-1", "site-only"]);
  });
});

describe("slugify", () => {
  it("normalizes titles", () => {
    expect(slugify("Hello World's Impact!")).toBe("hello-worlds-impact");
  });
});

describe("form validation", () => {
  it("accepts valid contact payloads", () => {
    const result = contactSchema.safeParse({
      firstName: "Aisha",
      lastName: "Khan",
      email: "aisha@example.com",
      phone: "4165550100",
      message: "Hello",
      website: "",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects honeypot-filled volunteer without blocking schema when empty", () => {
    const result = volunteerSchema.safeParse({
      firstName: "Ali",
      lastName: "Raza",
      email: "ali@example.com",
      consent: true,
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("requires consent", () => {
    const result = contactSchema.safeParse({
      firstName: "A",
      lastName: "B",
      email: "a@b.com",
      consent: false,
    });
    expect(result.success).toBe(false);
  });
});

describe("rateLimit", () => {
  it("blocks after limit", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 8; i++) {
      expect(rateLimit(key, 8, 60_000).ok).toBe(true);
    }
    expect(rateLimit(key, 8, 60_000).ok).toBe(false);
  });
});

describe("assertSiteAccess", () => {
  const base: StaffSession = {
    user: { id: "u1", email: "editor@awfca.ca" },
    profile: {
      id: "u1",
      email: "editor@awfca.ca",
      full_name: "Editor",
      is_super_admin: false,
      created_at: "",
      updated_at: "",
    },
    memberships: [],
    sites: [
      {
        id: "site-ca",
        code: "ca",
        name: "Canada",
        country_code: "CA",
        hostname: "localhost",
        locale: "en",
        is_active: true,
        settings: {},
        created_at: "",
        updated_at: "",
      },
    ],
    isSuperAdmin: false,
  };

  it("allows assigned site only", () => {
    expect(assertSiteAccess(base, "site-ca")).toBe(true);
    expect(assertSiteAccess(base, "site-uk")).toBe(false);
  });

  it("allows super admin everywhere", () => {
    const admin = { ...base, isSuperAdmin: true };
    expect(assertSiteAccess(admin, "site-uk")).toBe(true);
  });
});
