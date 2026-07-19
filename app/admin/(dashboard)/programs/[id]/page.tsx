import { notFound } from "next/navigation";
import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProgramEditor } from "@/components/admin/ProgramEditor";
import type { Program, ProgramImage } from "@/lib/cms/types";

function galleryFromBody(program: Program): ProgramImage[] {
  const raw = program.body?.gallery;
  if (!Array.isArray(raw)) return [];

  const items: ProgramImage[] = [];
  raw.forEach((entry, index) => {
    const image_url = typeof entry === "string" ? entry : null;
    if (!image_url) return;
    items.push({
      id: `body-${index}`,
      program_id: program.id,
      media_asset_id: null,
      image_url,
      alt_text: null,
      sort_order: index,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    });
  });
  return items;
}

export default async function EditProgramPage({
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
  const { data } = await supabase.from("programs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const programRow = data as Program;
  const { data: gallery, error: galleryError } = await supabase
    .from("program_images")
    .select("*")
    .eq("program_id", id)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  const program = {
    ...programRow,
    gallery:
      !galleryError && gallery?.length
        ? (gallery as ProgramImage[])
        : galleryFromBody(programRow),
  };

  return (
    <>
      <AdminPageHeader
        title="Edit program"
        description={data.title}
        eyebrow="Editor"
        backHref={`/admin/programs?site=${siteId}`}
        backLabel="Programs"
      />
      <ProgramEditor siteId={siteId} program={program} />
    </>
  );
}
