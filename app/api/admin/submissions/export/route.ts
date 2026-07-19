import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";

const columns = [
  "id", "type", "status", "first_name", "last_name", "email", "phone",
  "message", "availability", "skills", "preferred_roles", "city", "country",
  "source_url", "internal_notes", "created_at",
] as const;

function csvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  const session = await getStaffSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const siteId = url.searchParams.get("site");
  if (!siteId || !session.sites.some((site) => site.id === siteId)) {
    return new Response("Forbidden", { status: 403 });
  }

  const type = url.searchParams.get("type");
  const status = url.searchParams.get("status");
  const supabase = await createClient();
  let query = supabase
    .from("form_submissions")
    .select(columns.join(","))
    .eq("site_id", siteId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (type === "contact" || type === "volunteer") query = query.eq("type", type);
  if (status && ["new", "in_progress", "resolved", "spam", "archived"].includes(status)) {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  if (error) return new Response(error.message, { status: 500 });

  const rows = (data ?? []) as unknown as Array<Record<string, unknown>>;
  const csv = [
    columns.map(csvCell).join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ].join("\r\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
