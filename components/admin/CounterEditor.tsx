"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveCounter, softDeleteCounter } from "@/lib/cms/actions";
import type { AchievementCounter } from "@/lib/cms/types";

export function CounterEditor({
  siteId,
  counter,
}: {
  siteId: string;
  counter?: AchievementCounter | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const listHref = `/admin/counters?site=${siteId}`;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await saveCounter({
          id: counter?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          key: String(formData.get("key") ?? ""),
          label: String(formData.get("label") ?? ""),
          value: Number(formData.get("value") ?? 0),
          prefix: String(formData.get("prefix") ?? ""),
          suffix: String(formData.get("suffix") ?? ""),
          decimals: Number(formData.get("decimals") ?? 0),
          placement: String(formData.get("placement") ?? "home"),
          image_url: String(formData.get("image_url") ?? "") || null,
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
    if (!counter || !confirm("Delete this counter?")) return;
    startTransition(async () => {
      await softDeleteCounter(counter.id, counter.site_id);
      router.push(listHref);
      router.refresh();
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Counter</legend>
        <div className="admin-form__row">
          <label>
            Key
            <input name="key" required defaultValue={counter?.key ?? ""} />
          </label>
          <label>
            Label
            <input name="label" required defaultValue={counter?.label ?? ""} />
          </label>
        </div>
        <div className="admin-form__row">
          <label>
            Value
            <input
              name="value"
              type="number"
              step="any"
              required
              defaultValue={counter?.value ?? 0}
            />
          </label>
          <label>
            Decimals
            <input
              name="decimals"
              type="number"
              min="0"
              defaultValue={counter?.decimals ?? 0}
            />
          </label>
        </div>
        <div className="admin-form__row">
          <label>
            Prefix
            <input name="prefix" defaultValue={counter?.prefix ?? ""} />
          </label>
          <label>
            Suffix
            <input name="suffix" defaultValue={counter?.suffix ?? ""} />
          </label>
        </div>
        <label>
          Placement
          <input
            name="placement"
            required
            defaultValue={counter?.placement ?? "home"}
          />
        </label>
        <label>
          Image URL
          <input name="image_url" defaultValue={counter?.image_url ?? ""} />
        </label>
        <label>
          Description
          <textarea
            name="description"
            defaultValue={counter?.description ?? ""}
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
              defaultValue={counter?.site_id ? "site" : "shared"}
            >
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={counter?.status ?? "draft"}>
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
          {pending ? "Saving…" : "Save counter"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {counter ? (
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
