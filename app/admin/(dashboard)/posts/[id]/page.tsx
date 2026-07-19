import { getStaffSession } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostEditor } from "@/components/admin/PostEditor";
import type { Post } from "@/lib/cms/types";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const { id } = await params;
  const sp = await searchParams;
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  if (!siteId) return <div className="admin-empty">No site selected.</div>;

  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit post"
        description={(data as Post).title}
        eyebrow="Editor"
        backHref={`/admin/posts?site=${siteId}`}
        backLabel="Posts"
      />
      <PostEditor siteId={siteId} post={data as Post} />
    </>
  );
}
