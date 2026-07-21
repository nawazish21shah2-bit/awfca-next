"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getStaffSession, assertSiteAccess } from "@/lib/cms/auth";
import { slugify } from "@/lib/cms/resolve";

async function requireSession() {
  const session = await getStaffSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

async function audit(
  actorId: string,
  action: string,
  entityType: string,
  entityId: string | null,
  siteId: string | null,
  metadata: Record<string, unknown> = {},
) {
  const supabase = await createClient();
  await supabase.from("audit_events").insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    site_id: siteId,
    metadata,
  });
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/programs");
  revalidatePath("/faqs");
  revalidatePath("/volunteers");
  revalidatePath("/reports");
  revalidatePath("/about");
}

export async function savePost(input: {
  id?: string;
  site_id: string | null;
  override_of_id?: string | null;
  slug?: string;
  title: string;
  excerpt: string;
  published_at?: string | null;
  image_url?: string | null;
  body?: Record<string, unknown>;
  tags?: string[];
  status: "draft" | "published";
  sort_order?: number;
  seo_title?: string | null;
  seo_description?: string | null;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");

  const supabase = await createClient();
  const slug = input.slug?.trim() || slugify(input.title);
  const payload = {
    ...input,
    slug,
    updated_by: session.user.id,
    created_by: session.user.id,
  };

  let id = input.id;
  if (id) {
    const { error } = await supabase.from("posts").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("posts")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }

  await audit(session.user.id, input.id ? "update" : "create", "posts", id!, input.site_id);
  revalidatePublic();
  revalidatePath("/admin/posts");
  return { id };
}

export async function softDeletePost(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "posts", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/posts");
}

export type ProgramGalleryInput = {
  id?: string;
  image_url: string;
  media_asset_id?: string | null;
  alt_text?: string | null;
  sort_order?: number;
};

export async function saveProgram(input: {
  id?: string;
  site_id: string | null;
  override_of_id?: string | null;
  slug?: string;
  nav_label: string;
  category: string;
  title: string;
  image_url?: string | null;
  image_asset_id?: string | null;
  summary: string[];
  body?: Record<string, unknown>;
  status: "draft" | "published";
  sort_order?: number;
  gallery?: ProgramGalleryInput[];
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const slug = input.slug?.trim() || slugify(input.title);
  const { gallery, body: inputBody, ...rest } = input;

  let existingBody: Record<string, unknown> = {};
  if (input.id) {
    const { data: existing } = await supabase
      .from("programs")
      .select("body")
      .eq("id", input.id)
      .maybeSingle();
    existingBody = (existing?.body as Record<string, unknown>) ?? {};
  }

  // Merge existing body with new body content, preserving gallery if not provided
  const mergedBody = {
    ...existingBody,
    ...(inputBody ?? {}),
    ...(gallery !== undefined
      ? { gallery: gallery.map((item) => item.image_url) }
      : {}),
  };

  const payload = {
    ...rest,
    slug,
    body: mergedBody,
    updated_by: session.user.id,
    created_by: session.user.id,
  };

  let id = input.id;
  if (id) {
    const { error } = await supabase.from("programs").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("programs")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }

  if (gallery) {
    await replaceProgramGallery(id!, gallery);
  }

  await audit(session.user.id, input.id ? "update" : "create", "programs", id!, input.site_id);
  revalidatePublic();
  revalidatePath("/admin/programs");
  revalidatePath(`/programs/${slug}`);
  return { id };
}

async function replaceProgramGallery(programId: string, gallery: ProgramGalleryInput[]) {
  const supabase = await createClient();
  const { error: clearError } = await supabase
    .from("program_images")
    .delete()
    .eq("program_id", programId);

  // Ignore missing-table errors until the migration is applied.
  if (clearError && !/schema cache|does not exist|PGRST205/i.test(clearError.message)) {
    throw new Error(clearError.message);
  }
  if (clearError) return;

  if (!gallery.length) return;

  const rows = gallery.map((item, index) => ({
    program_id: programId,
    image_url: item.image_url,
    media_asset_id: item.media_asset_id ?? null,
    alt_text: item.alt_text ?? null,
    sort_order: item.sort_order ?? index,
  }));

  const { error } = await supabase.from("program_images").insert(rows);
  if (error && !/schema cache|does not exist|PGRST205/i.test(error.message)) {
    throw new Error(error.message);
  }
}

export async function softDeleteProgram(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("programs")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "programs", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/programs");
}

export async function saveFaqItem(input: {
  id?: string;
  site_id: string | null;
  category_id?: string | null;
  question: string;
  answer: string;
  placement?: string;
  status: "draft" | "published";
  sort_order?: number;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const payload = {
    ...input,
    updated_by: session.user.id,
    created_by: session.user.id,
  };
  let id = input.id;
  if (id) {
    const { error } = await supabase.from("faq_items").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("faq_items")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await audit(session.user.id, input.id ? "update" : "create", "faq_items", id!, input.site_id);
  revalidatePublic();
  revalidatePath("/admin/faqs");
  return { id };
}

export async function softDeleteFaqItem(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("faq_items")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "faq_items", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/faqs");
}

export async function saveTeamMember(input: {
  id?: string;
  site_id: string | null;
  slug?: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string | null;
  status: "draft" | "published";
  sort_order?: number;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const slug = input.slug?.trim() || slugify(input.name);
  const payload = {
    ...input,
    slug,
    updated_by: session.user.id,
    created_by: session.user.id,
  };
  let id = input.id;
  if (id) {
    const { error } = await supabase.from("team_members").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("team_members")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await audit(session.user.id, input.id ? "update" : "create", "team_members", id!, input.site_id);
  revalidatePublic();
  revalidatePath("/admin/team");
  return { id };
}

export async function softDeleteTeamMember(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "team_members", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/team");
}

export async function saveReport(input: {
  id?: string;
  site_id: string | null;
  year: string;
  report_type: string;
  title: string;
  cover_image_url?: string | null;
  pdf_url?: string | null;
  external_url?: string | null;
  description?: string | null;
  status: "draft" | "published";
  sort_order?: number;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const payload = {
    ...input,
    updated_by: session.user.id,
    created_by: session.user.id,
  };
  let id = input.id;
  if (id) {
    const { error } = await supabase.from("reports").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("reports")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await audit(session.user.id, input.id ? "update" : "create", "reports", id!, input.site_id);
  revalidatePublic();
  revalidatePath("/admin/reports");
  return { id };
}

export async function softDeleteReport(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("reports")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "reports", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/reports");
}

export async function saveCounter(input: {
  id?: string;
  site_id: string | null;
  key: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  placement: string;
  image_url?: string | null;
  description?: string | null;
  status: "draft" | "published";
  sort_order?: number;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const payload = {
    ...input,
    key: slugify(input.key).replace(/-/g, "_"),
    updated_by: session.user.id,
    created_by: session.user.id,
  };
  let id = input.id;
  if (id) {
    const { error } = await supabase
      .from("achievement_counters")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("achievement_counters")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    id = data.id;
  }
  await audit(
    session.user.id,
    input.id ? "update" : "create",
    "achievement_counters",
    id!,
    input.site_id,
  );
  revalidatePublic();
  revalidatePath("/admin/counters");
  return { id };
}

export async function softDeleteCounter(id: string, siteId: string | null) {
  const session = await requireSession();
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { error } = await supabase
    .from("achievement_counters")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "delete", "achievement_counters", id, siteId);
  revalidatePublic();
  revalidatePath("/admin/counters");
}

export async function updateSubmission(input: {
  id: string;
  site_id: string;
  status?: "new" | "in_progress" | "resolved" | "spam" | "archived";
  internal_notes?: string;
  assigned_to?: string | null;
}) {
  const session = await requireSession();
  if (!assertSiteAccess(session, input.site_id)) throw new Error("Forbidden");
  const supabase = await createClient();
  const { id, site_id, ...rest } = input;
  const { error } = await supabase
    .from("form_submissions")
    .update(rest)
    .eq("id", id)
    .eq("site_id", site_id);
  if (error) throw new Error(error.message);
  await audit(session.user.id, "update", "form_submissions", id, site_id, rest);
  revalidatePath("/admin/submissions");
}

export async function uploadMedia(formData: FormData) {
  const session = await requireSession();
  const siteId = (formData.get("site_id") as string) || null;
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");

  const file = formData.get("file") as File | null;
  const altText = (formData.get("alt_text") as string) || "";
  if (!file) throw new Error("No file provided");

  const data = await uploadMediaFile(session.user.id, siteId, file, altText);
  revalidatePath("/admin/media");
  return data;
}

/** Upload one or more images in one round-trip; returns public URLs + asset ids. */
export async function uploadProgramImages(formData: FormData) {
  const session = await requireSession();
  const siteId = (formData.get("site_id") as string) || null;
  if (!assertSiteAccess(session, siteId)) throw new Error("Forbidden");

  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (!files.length) throw new Error("No files provided");
  if (files.length > 20) throw new Error("Upload up to 20 images at a time");

  const uploaded = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`${file.name} is not an image`);
    }
    uploaded.push(await uploadMediaFile(session.user.id, siteId, file));
  }

  revalidatePath("/admin/media");
  return uploaded.map((row) => ({
    id: row.id as string,
    image_url: row.public_url as string,
    media_asset_id: row.id as string,
    alt_text: (row.alt_text as string | null) ?? null,
  }));
}

async function uploadMediaFile(
  userId: string,
  siteId: string | null,
  file: File,
  altText = "",
) {
  const isPdf = file.type === "application/pdf";
  const isImage = file.type.startsWith("image/");
  if (!isPdf && !isImage) throw new Error("Only images and PDFs are allowed");
  if (isImage && file.size > 5 * 1024 * 1024) throw new Error("Image max 5MB");
  if (isPdf && file.size > 20 * 1024 * 1024) throw new Error("PDF max 20MB");

  const bucket = isPdf ? "reports" : "media";
  const ext = file.name.split(".").pop()?.toLowerCase() || (isPdf ? "pdf" : "bin");
  const path = `${siteId ?? "shared"}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

  const supabase = await createClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      site_id: siteId,
      kind: isPdf ? "pdf" : "image",
      bucket,
      path,
      public_url: publicUrl,
      file_name: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altText || null,
      created_by: userId,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  await audit(userId, "upload", "media_assets", data.id, siteId);
  return data;
}
