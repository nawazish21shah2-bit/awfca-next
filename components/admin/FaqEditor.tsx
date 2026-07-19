"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveFaqItem, softDeleteFaqItem } from "@/lib/cms/actions";
import type { FaqCategory, FaqItem } from "@/lib/cms/types";

export function FaqEditor({
  siteId,
  item,
  categories,
}: {
  siteId: string;
  item?: FaqItem | null;
  categories: FaqCategory[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const listHref = `/admin/faqs?site=${siteId}`;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await saveFaqItem({
          id: item?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          category_id: String(formData.get("category_id") ?? "") || null,
          question: String(formData.get("question") ?? ""),
          answer: String(formData.get("answer") ?? ""),
          placement: String(formData.get("placement") ?? "page"),
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
    if (!item || !confirm("Delete this FAQ?")) return;
    startTransition(async () => {
      await softDeleteFaqItem(item.id, item.site_id);
      router.push(listHref);
      router.refresh();
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Question</legend>
        <label>
          Question
          <input
            name="question"
            required
            defaultValue={item?.question ?? ""}
          />
        </label>
        <label>
          Answer
          <textarea name="answer" required defaultValue={item?.answer ?? ""} />
        </label>
        <div className="admin-form__row">
          <label>
            Category
            <select
              name="category_id"
              defaultValue={item?.category_id ?? ""}
            >
              <option value="">Uncategorized</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Placement
            <input
              name="placement"
              required
              defaultValue={item?.placement ?? "page"}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Publishing</legend>
        <div className="admin-form__row">
          <label>
            Scope
            <select
              name="scope"
              defaultValue={item?.site_id ? "site" : "shared"}
            >
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={item?.status ?? "draft"}>
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
          {pending ? "Saving…" : "Save FAQ"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {item ? (
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
