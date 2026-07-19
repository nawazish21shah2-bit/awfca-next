import { getStaffSession } from "@/lib/cms/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostEditor } from "@/components/admin/PostEditor";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const session = await getStaffSession();
  const params = await searchParams;
  const siteId =
    params.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  if (!siteId) return <div className="admin-empty">No site selected.</div>;

  return (
    <>
      <AdminPageHeader
        title="New post"
        description="Create a draft or publish immediately."
        eyebrow="Editor"
        backHref={`/admin/posts?site=${siteId}`}
        backLabel="Posts"
      />
      <PostEditor siteId={siteId} />
    </>
  );
}
