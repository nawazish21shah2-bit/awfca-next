"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveReport, softDeleteReport } from "@/lib/cms/actions";
import type { Report } from "@/lib/cms/types";

export function ReportEditor({
  siteId,
  report,
}: {
  siteId: string;
  report?: Report | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const listHref = `/admin/reports?site=${siteId}`;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await saveReport({
          id: report?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          year: String(formData.get("year") ?? ""),
          report_type: String(formData.get("report_type") ?? ""),
          title: String(formData.get("title") ?? ""),
          cover_image_url:
            String(formData.get("cover_image_url") ?? "") || null,
          pdf_url: String(formData.get("pdf_url") ?? "") || null,
          external_url: String(formData.get("external_url") ?? "") || null,
          description: String(formData.get("description") ?? "") || null,
          status:
            formData.get("status") === "published" ? "published" : "draft",
        });
        router.push(listHref);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function onDelete() {
    if (!report || !confirm("Delete this report?")) return;
    startTransition(async () => {
      await softDeleteReport(report.id, report.site_id);
      router.push(listHref);
      router.refresh();
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Report</legend>
        <label>
          Title
          <input name="title" required defaultValue={report?.title ?? ""} />
        </label>
        <div className="admin-form__row">
          <label>
            Year
            <input name="year" required defaultValue={report?.year ?? ""} />
          </label>
          <label>
            Report type
            <input
              name="report_type"
              required
              defaultValue={report?.report_type ?? ""}
            />
          </label>
        </div>
        <label>
          Cover image URL
          <input
            name="cover_image_url"
            defaultValue={report?.cover_image_url ?? ""}
          />
        </label>
        <div className="admin-form__row">
          <label>
            PDF URL
            <input name="pdf_url" defaultValue={report?.pdf_url ?? ""} />
          </label>
          <label>
            External URL
            <input
              name="external_url"
              defaultValue={report?.external_url ?? ""}
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            name="description"
            defaultValue={report?.description ?? ""}
          />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Publishing</legend>
        <div className="admin-form__row">
          <label>
            Scope
            <select
              name="scope"
              defaultValue={report?.site_id ? "site" : "shared"}
            >
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={report?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
      </fieldset>

      <div className="admin-form-actions">
        <button
          className="admin-btn admin-btn--primary"
          disabled={pending}
        >
          {pending ? "Saving…" : "Save report"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {report ? (
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={onDelete}
            disabled={pending}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
