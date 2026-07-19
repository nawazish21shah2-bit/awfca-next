import { createClient } from "@/lib/supabase/server";
import { getStaffSession } from "@/lib/cms/auth";
import { uploadMedia } from "@/lib/cms/actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, EmptyState } from "@/components/admin/AdminTable";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const sp = await searchParams;
  const session = await getStaffSession();
  const siteId =
    sp.site ??
    session?.sites.find((s) => s.code === "ca")?.id ??
    session?.sites[0]?.id;
  const supabase = await createClient();
  const { data } = siteId
    ? await supabase
        .from("media_assets")
        .select("id,file_name,kind,public_url,alt_text,size_bytes,site_id")
        .or(`site_id.is.null,site_id.eq.${siteId}`)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
    : { data: [] };

  const rows = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Upload images and PDFs for the selected site."
        eyebrow="Assets"
        count={rows.length}
      />
      {siteId ? (
        <form className="admin-form" action={uploadMedia}>
          <input type="hidden" name="site_id" value={siteId} />
          <label>
            File
            <input
              type="file"
              name="file"
              accept="image/*,application/pdf"
              required
            />
          </label>
          <label>
            Alternative text
            <input name="alt_text" />
          </label>
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn--primary">Upload</button>
          </div>
        </form>
      ) : (
        <EmptyState message="No site selected." />
      )}
      {!rows.length ? (
        <EmptyState
          title="No media yet"
          message="Upload images or PDFs to reuse across posts, programs, and reports."
        />
      ) : (
        <AdminTable headers={["File", "Type", "Alt text", "Size", ""]}>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="admin-table__title">{row.file_name}</td>
              <td>{row.kind}</td>
              <td>{row.alt_text || "—"}</td>
              <td>{Math.ceil(row.size_bytes / 1024)} KB</td>
              <td className="admin-table__actions">
                {row.public_url ? (
                  <a
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    href={row.public_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open
                  </a>
                ) : null}
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
