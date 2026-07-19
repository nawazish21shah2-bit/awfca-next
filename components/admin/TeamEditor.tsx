"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveTeamMember, softDeleteTeamMember } from "@/lib/cms/actions";
import type { TeamMember } from "@/lib/cms/types";

export function TeamEditor({
  siteId,
  member,
}: {
  siteId: string;
  member?: TeamMember | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const listHref = `/admin/team?site=${siteId}`;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await saveTeamMember({
          id: member?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          name: String(formData.get("name") ?? ""),
          slug: String(formData.get("slug") ?? ""),
          role: String(formData.get("role") ?? ""),
          bio: String(formData.get("bio") ?? ""),
          image_url: String(formData.get("image_url") ?? "") || null,
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
    if (!member || !confirm("Delete this team member?")) return;
    startTransition(async () => {
      await softDeleteTeamMember(member.id, member.site_id);
      router.push(listHref);
      router.refresh();
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Profile</legend>
        <div className="admin-form__row">
          <label>
            Name
            <input name="name" required defaultValue={member?.name ?? ""} />
          </label>
          <label>
            Role
            <input name="role" required defaultValue={member?.role ?? ""} />
          </label>
        </div>
        <label>
          Slug
          <input
            name="slug"
            defaultValue={member?.slug ?? ""}
            placeholder="auto from name"
          />
        </label>
        <label>
          Biography
          <textarea name="bio" defaultValue={member?.bio ?? ""} />
        </label>
        <label>
          Image URL
          <input name="image_url" defaultValue={member?.image_url ?? ""} />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Publishing</legend>
        <div className="admin-form__row">
          <label>
            Scope
            <select
              name="scope"
              defaultValue={member?.site_id ? "site" : "shared"}
            >
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={member?.status ?? "draft"}>
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
          {pending ? "Saving…" : "Save member"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {member ? (
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
