"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { savePost, softDeletePost } from "@/lib/cms/actions";
import type { Post } from "@/lib/cms/types";

export function PostEditor({
  siteId,
  post,
}: {
  siteId: string;
  post?: Post | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const body = post?.body ?? {};
  const listHref = `/admin/posts?site=${siteId}`;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const opening = String(formData.get("opening") ?? "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        const bullets = String(formData.get("bullets") ?? "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        const tags = String(formData.get("tags") ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        await savePost({
          id: post?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          title: String(formData.get("title") ?? ""),
          slug: String(formData.get("slug") ?? ""),
          excerpt: String(formData.get("excerpt") ?? ""),
          image_url: String(formData.get("image_url") ?? "") || null,
          published_at: String(formData.get("published_at") ?? "") || null,
          status: formData.get("status") === "published" ? "published" : "draft",
          tags,
          body: {
            opening,
            quote: String(formData.get("quote") ?? ""),
            body: String(formData.get("body") ?? "")
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
            heading: String(formData.get("heading") ?? ""),
            headingText: String(formData.get("headingText") ?? ""),
            bullets,
            tags,
          },
        });
        router.push(listHref);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function onDelete() {
    if (!post || !confirm("Delete this post?")) return;
    startTransition(async () => {
      await softDeletePost(post.id, post.site_id);
      router.push(listHref);
      router.refresh();
    });
  }

  return (
    <form className="admin-form" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Basics</legend>
        <label>
          Title
          <input name="title" required defaultValue={post?.title ?? ""} />
        </label>
        <div className="admin-form__row">
          <label>
            Slug
            <input
              name="slug"
              defaultValue={post?.slug ?? ""}
              placeholder="auto from title"
            />
          </label>
          <label>
            Published date
            <input
              type="date"
              name="published_at"
              defaultValue={post?.published_at ?? ""}
            />
          </label>
        </div>
        <label>
          Excerpt
          <textarea name="excerpt" defaultValue={post?.excerpt ?? ""} />
        </label>
        <label>
          Image URL
          <input name="image_url" defaultValue={post?.image_url ?? ""} />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Body content</legend>
        <p className="admin-hint">
          Use one paragraph per line for opening, body, and bullets.
        </p>
        <label>
          Opening paragraphs
          <textarea
            name="opening"
            defaultValue={(body.opening ?? []).join("\n")}
          />
        </label>
        <label>
          Quote
          <textarea name="quote" defaultValue={body.quote ?? ""} />
        </label>
        <label>
          Body paragraphs
          <textarea name="body" defaultValue={(body.body ?? []).join("\n")} />
        </label>
        <div className="admin-form__row">
          <label>
            Section heading
            <input name="heading" defaultValue={body.heading ?? ""} />
          </label>
          <label>
            Tags (comma separated)
            <input
              name="tags"
              defaultValue={(post?.tags ?? body.tags ?? []).join(", ")}
            />
          </label>
        </div>
        <label>
          Section text
          <textarea
            name="headingText"
            defaultValue={body.headingText ?? ""}
          />
        </label>
        <label>
          Bullets
          <textarea
            name="bullets"
            defaultValue={(body.bullets ?? []).join("\n")}
          />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Publishing</legend>
        <div className="admin-form__row">
          <label>
            Scope
            <select name="scope" defaultValue={post?.site_id ? "site" : "shared"}>
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={post?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
      </fieldset>

      <div className="admin-form-actions">
        <button
          type="submit"
          className="admin-btn admin-btn--primary"
          disabled={pending}
        >
          {pending ? "Saving…" : "Save post"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {post ? (
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
