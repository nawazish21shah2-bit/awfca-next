"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  saveProgram,
  softDeleteProgram,
  uploadProgramImages,
} from "@/lib/cms/actions";
import type { Program, ProgramImage, ProgramBody } from "@/lib/cms/types";

type GalleryDraft = {
  key: string;
  image_url: string;
  media_asset_id?: string | null;
  alt_text?: string | null;
};

function toDrafts(images: ProgramImage[] | undefined): GalleryDraft[] {
  return (images ?? []).map((item, index) => ({
    key: item.id || `existing-${index}`,
    image_url: item.image_url,
    media_asset_id: item.media_asset_id,
    alt_text: item.alt_text,
  }));
}

function parseBody(body: ProgramBody | undefined): ProgramBody {
  return body ?? {};
}

export function ProgramEditor({
  siteId,
  program,
}: {
  siteId: string;
  program?: (Program & { gallery?: ProgramImage[] }) | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState(program?.image_url ?? "");
  const [coverAssetId, setCoverAssetId] = useState<string | null>(
    program?.image_asset_id ?? null,
  );
  const [gallery, setGallery] = useState<GalleryDraft[]>(() =>
    toDrafts(program?.gallery),
  );
  const [uploading, setUploading] = useState(false);
  
  // Dynamic content state
  const [body, setBody] = useState<ProgramBody>(() => parseBody(program?.body as ProgramBody));
  const [expectTitle, setExpectTitle] = useState(body.expect?.title ?? "What to expect");
  const [expectText, setExpectText] = useState(body.expect?.text ?? "");
  const [expectItems, setExpectItems] = useState(body.expect?.items ?? []);
  const [howTitle, setHowTitle] = useState(body.how?.title ?? "How we work");
  const [howText, setHowText] = useState(body.how?.text ?? "");
  const [howItems, setHowItems] = useState(body.how?.items ?? []);
  const [fullContent, setFullContent] = useState(body.content ?? []);
  const [faqTitle, setFaqTitle] = useState(body.faq?.title ?? "Frequently asked questions");
  const [faqText, setFaqText] = useState(body.faq?.text ?? "");
  const [faqItems, setFaqItems] = useState(body.faq?.items ?? []);

  const canSave = useMemo(() => !pending && !uploading, [pending, uploading]);

  async function uploadFiles(files: FileList | File[], asCover = false) {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!list.length) return;

    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("site_id", siteId);
      for (const file of list) formData.append("files", file);

      const uploaded = await uploadProgramImages(formData);
      if (asCover && uploaded[0]) {
        setCoverUrl(uploaded[0].image_url);
        setCoverAssetId(uploaded[0].media_asset_id);
      }

      setGallery((current) => [
        ...current,
        ...uploaded.map((item, index) => ({
          key: `uploaded-${item.media_asset_id}-${index}`,
          image_url: item.image_url,
          media_asset_id: item.media_asset_id,
          alt_text: item.alt_text,
        })),
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function moveImage(index: number, direction: -1 | 1) {
    setGallery((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeImage(index: number) {
    setGallery((current) => current.filter((_, i) => i !== index));
  }

  function useAsCover(index: number) {
    const item = gallery[index];
    if (!item) return;
    setCoverUrl(item.image_url);
    setCoverAssetId(item.media_asset_id ?? null);
  }

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const programBody: ProgramBody = {
          expect: {
            title: expectTitle,
            text: expectText,
            items: expectItems.filter(item => item.title && item.text),
          },
          how: {
            title: howTitle,
            text: howText,
            items: howItems.filter(item => item.question && item.answer),
          },
          content: fullContent.filter(text => text.trim()),
          faq: {
            title: faqTitle,
            text: faqText,
            items: faqItems.filter(item => item.question && item.answer),
          },
        };

        await saveProgram({
          id: program?.id,
          site_id: formData.get("scope") === "shared" ? null : siteId,
          title: String(formData.get("title") ?? ""),
          nav_label: String(formData.get("nav_label") ?? ""),
          category: String(formData.get("category") ?? ""),
          slug: String(formData.get("slug") ?? ""),
          image_url: coverUrl || null,
          image_asset_id: coverAssetId,
          summary: String(formData.get("summary") ?? "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          body: programBody,
          status: formData.get("status") === "published" ? "published" : "draft",
          gallery: gallery.map((item, index) => ({
            image_url: item.image_url,
            media_asset_id: item.media_asset_id ?? null,
            alt_text: item.alt_text ?? null,
            sort_order: index,
          })),
        });
        router.push(`/admin/programs?site=${siteId}`);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  function onDelete() {
    if (!program || !confirm("Delete this program?")) return;
    startTransition(async () => {
      await softDeleteProgram(program.id, program.site_id);
      router.push(`/admin/programs?site=${siteId}`);
      router.refresh();
    });
  }

  const listHref = `/admin/programs?site=${siteId}`;

  return (
    <form className="admin-form admin-form--wide" action={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}

      <fieldset className="admin-fieldset">
        <legend>Basics</legend>
        <label>
          Title
          <input name="title" required defaultValue={program?.title ?? ""} />
        </label>
        <div className="admin-form__row">
          <label>
            Navigation label
            <input
              name="nav_label"
              required
              defaultValue={program?.nav_label ?? ""}
            />
          </label>
          <label>
            Category
            <input
              name="category"
              required
              defaultValue={program?.category ?? ""}
            />
          </label>
        </div>
        <label>
          Slug
          <input
            name="slug"
            defaultValue={program?.slug ?? ""}
            placeholder="auto from title"
          />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Cover image</legend>
        <p className="admin-hint">
          Used on program cards and as the main detail image. Upload below or pick
          one from the gallery.
        </p>
        {coverUrl ? (
          <div className="admin-cover-preview">
            <Image src={coverUrl} alt="" width={320} height={200} />
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--sm"
              onClick={() => {
                setCoverUrl("");
                setCoverAssetId(null);
              }}
            >
              Clear cover
            </button>
          </div>
        ) : null}
        <label className="admin-file-label">
          Upload cover
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(event) => {
              const files = event.target.files;
              if (files?.length) void uploadFiles(files, true);
              event.target.value = "";
            }}
          />
        </label>
        <label>
          Or cover URL
          <input
            value={coverUrl}
            onChange={(event) => {
              setCoverUrl(event.target.value);
              setCoverAssetId(null);
            }}
            placeholder="/images/... or https://..."
          />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Gallery</legend>
        <p className="admin-hint">
          Extra photos for the program detail page. Upload many at once, reorder,
          then save the program once.
        </p>
        <label className="admin-file-label">
          {uploading ? "Uploading…" : "Add gallery images"}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(event) => {
              const files = event.target.files;
              if (files?.length) void uploadFiles(files);
              event.target.value = "";
            }}
          />
        </label>

        {gallery.length ? (
          <ul className="admin-gallery-list">
            {gallery.map((item, index) => (
              <li key={item.key} className="admin-gallery-item">
                <Image src={item.image_url} alt="" width={120} height={90} />
                <div className="admin-gallery-item__actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === gallery.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => useAsCover(index)}
                  >
                    Use as cover
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin-hint">No gallery images yet.</p>
        )}
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>What to Expect</legend>
        <p className="admin-hint">
          Dynamic section that appears on the program detail page. Customize per program.
        </p>
        <label>
          Section title
          <input
            value={expectTitle}
            onChange={(e) => setExpectTitle(e.target.value)}
            placeholder="What to expect"
          />
        </label>
        <label>
          Section text
          <textarea
            value={expectText}
            onChange={(e) => setExpectText(e.target.value)}
            placeholder="Supporters can expect..."
            rows={2}
          />
        </label>
        <div>
          <label>Items</label>
          {expectItems.map((item, index) => (
            <div key={index} className="admin-form__row" style={{ marginBottom: '8px' }}>
              <input
                value={item.title}
                onChange={(e) => {
                  const next = [...expectItems];
                  next[index].title = e.target.value;
                  setExpectItems(next);
                }}
                placeholder="Title"
                style={{ flex: 1 }}
              />
              <input
                value={item.text}
                onChange={(e) => {
                  const next = [...expectItems];
                  next[index].text = e.target.value;
                  setExpectItems(next);
                }}
                placeholder="Description"
                style={{ flex: 2 }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={() => setExpectItems(expectItems.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--sm"
            onClick={() => setExpectItems([...expectItems, { title: '', text: '' }])}
          >
            Add item
          </button>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>How We Work</legend>
        <p className="admin-hint">
          Process explanation section with accordion items.
        </p>
        <label>
          Section title
          <input
            value={howTitle}
            onChange={(e) => setHowTitle(e.target.value)}
            placeholder="How we work"
          />
        </label>
        <label>
          Section text
          <textarea
            value={howText}
            onChange={(e) => setHowText(e.target.value)}
            placeholder="We follow a structured approach..."
            rows={2}
          />
        </label>
        <div>
          <label>Process steps (question/answer pairs for accordion)</label>
          {howItems.map((item, index) => (
            <div key={index} className="admin-form__row" style={{ marginBottom: '8px' }}>
              <input
                value={item.question}
                onChange={(e) => {
                  const next = [...howItems];
                  next[index].question = e.target.value;
                  setHowItems(next);
                }}
                placeholder="Step title (e.g., 01. Identify Needs)"
                style={{ flex: 1 }}
              />
              <input
                value={item.answer}
                onChange={(e) => {
                  const next = [...howItems];
                  next[index].answer = e.target.value;
                  setHowItems(next);
                }}
                placeholder="Step description"
                style={{ flex: 2 }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={() => setHowItems(howItems.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--sm"
            onClick={() => setHowItems([...howItems, { question: '', answer: '' }])}
          >
            Add step
          </button>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Full Program Content</legend>
        <p className="admin-hint">
          Detailed program description (one paragraph per line). This appears in the main content area.
        </p>
        <label>
          Content paragraphs
          <textarea
            value={fullContent.join('\n')}
            onChange={(e) => setFullContent(e.target.value.split('\n').filter(Boolean))}
            placeholder="Enter full program description, one paragraph per line..."
            rows={6}
          />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Program FAQs</legend>
        <p className="admin-hint">
          Program-specific frequently asked questions.
        </p>
        <label>
          Section title
          <input
            value={faqTitle}
            onChange={(e) => setFaqTitle(e.target.value)}
            placeholder="Frequently asked questions"
          />
        </label>
        <label>
          Section text
          <textarea
            value={faqText}
            onChange={(e) => setFaqText(e.target.value)}
            placeholder="Learn how AWFCA programs work..."
            rows={2}
          />
        </label>
        <div>
          <label>FAQ items</label>
          {faqItems.map((item, index) => (
            <div key={index} className="admin-form__row" style={{ marginBottom: '8px' }}>
              <input
                value={item.question}
                onChange={(e) => {
                  const next = [...faqItems];
                  next[index].question = e.target.value;
                  setFaqItems(next);
                }}
                placeholder="Question"
                style={{ flex: 1 }}
              />
              <input
                value={item.answer}
                onChange={(e) => {
                  const next = [...faqItems];
                  next[index].answer = e.target.value;
                  setFaqItems(next);
                }}
                placeholder="Answer"
                style={{ flex: 2 }}
              />
              <button
                type="button"
                className="admin-btn admin-btn--danger admin-btn--sm"
                onClick={() => setFaqItems(faqItems.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--sm"
            onClick={() => setFaqItems([...faqItems, { question: '', answer: '' }])}
          >
            Add FAQ
          </button>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Summary &amp; publishing</legend>
        <label>
          Summary (one paragraph per line)
          <textarea
            name="summary"
            defaultValue={(program?.summary ?? []).join("\n")}
          />
        </label>
        <div className="admin-form__row">
          <label>
            Scope
            <select
              name="scope"
              defaultValue={program?.site_id ? "site" : "shared"}
            >
              <option value="site">This site only</option>
              <option value="shared">Shared (all sites)</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" defaultValue={program?.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
      </fieldset>

      <div className="admin-form-actions">
        <button className="admin-btn admin-btn--primary" disabled={!canSave}>
          {pending ? "Saving…" : uploading ? "Uploading…" : "Save program"}
        </button>
        <Link href={listHref} className="admin-btn admin-btn--ghost">
          Cancel
        </Link>
        <span className="admin-form-actions__spacer" />
        {program ? (
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={onDelete}
            disabled={!canSave}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
