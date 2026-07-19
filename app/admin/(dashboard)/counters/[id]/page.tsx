import { notFound } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CounterEditor } from "@/components/admin/CounterEditor";
import type { AchievementCounter } from "@/lib/cms/types";

export default async function EditCounterPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  if (!siteId) return <div className="admin-empty">No site selected.</div>;

  const supabase = await createClient();
  const { data } = await supabase
    .from("achievement_counters")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit counter"
        description={data.label}
        eyebrow="Editor"
        backHref={`/admin/counters?site=${siteId}`}
        backLabel="Counters"
      />
      <CounterEditor
        siteId={siteId}
        counter={data as AchievementCounter}
      />
    </>
  );
}
