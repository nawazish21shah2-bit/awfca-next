import { createServiceClient, isServiceConfigured } from "@/lib/supabase/admin";
import { resolveWithOverrides } from "@/lib/cms/resolve";
import type {
  AchievementCounter,
  FaqCategory,
  FaqItem,
  Post,
  Program,
  ProgramImage,
  Report,
  TeamMember,
} from "@/lib/cms/types";
import { posts as staticPosts } from "@/data/posts";
import { blogArticles } from "@/data/blog-articles";
import { programsPage } from "@/data/programs";
import { programGalleries } from "@/data/program-galleries";
import { faqPage, faqs as staticFaqs } from "@/data/faqs";
import { volunteers as staticTeam } from "@/data/volunteers";
import { reportsPage } from "@/data/reports";
import { hero, keyFacts, coreFeatures } from "@/data/home";

function staticGallery(programId: string, slug: string): ProgramImage[] {
  return (programGalleries[slug] ?? []).map((image_url, index) => ({
    id: `static-gallery-${slug}-${index}`,
    program_id: programId,
    media_asset_id: null,
    image_url,
    alt_text: null,
    sort_order: index,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));
}

function galleryFromBody(program: Program): ProgramImage[] {
  const raw = program.body?.gallery;
  if (!Array.isArray(raw) || !raw.length) return [];

  const items: ProgramImage[] = [];
  raw.forEach((entry, index) => {
    let image_url: string | null = null;
    let alt_text: string | null = null;

    if (typeof entry === "string") {
      image_url = entry;
    } else if (entry && typeof entry === "object" && "image_url" in entry) {
      const row = entry as { image_url?: unknown; alt_text?: unknown };
      image_url = typeof row.image_url === "string" ? row.image_url : null;
      alt_text = typeof row.alt_text === "string" ? row.alt_text : null;
    }

    if (!image_url) return;

    items.push({
      id: `body-gallery-${program.id}-${index}`,
      program_id: program.id,
      media_asset_id: null,
      image_url,
      alt_text,
      sort_order: index,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    });
  });

  return items;
}

function resolveProgramGallery(program: Program, fromTable?: ProgramImage[]) {
  if (fromTable?.length) return fromTable;
  const fromBody = galleryFromBody(program);
  if (fromBody.length) return fromBody;
  return staticGallery(program.id, program.slug);
}

async function attachProgramGalleries(programs: Program[]): Promise<Program[]> {
  if (!programs.length) return programs;
  if (!isServiceConfigured()) {
    return programs.map((program) => ({
      ...program,
      gallery: resolveProgramGallery(program),
    }));
  }

  const supabase = createServiceClient();
  const ids = programs.map((p) => p.id).filter((id) => !id.startsWith("static-"));
  if (!ids.length) {
    return programs.map((program) => ({
      ...program,
      gallery: resolveProgramGallery(program),
    }));
  }

  const { data, error } = await supabase
    .from("program_images")
    .select("*")
    .in("program_id", ids)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (error) {
    // Table may not be migrated yet — fall back to body.gallery / static files.
    return programs.map((program) => ({
      ...program,
      gallery: resolveProgramGallery(program),
    }));
  }

  const byProgram = new Map<string, ProgramImage[]>();
  for (const row of (data as ProgramImage[]) ?? []) {
    const list = byProgram.get(row.program_id) ?? [];
    list.push(row);
    byProgram.set(row.program_id, list);
  }

  return programs.map((program) => ({
    ...program,
    gallery: resolveProgramGallery(program, byProgram.get(program.id)),
  }));
}

async function fetchTable<T>(table: string, siteId: string): Promise<T[]> {
  if (!isServiceConfigured()) return [];
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .or(`site_id.is.null,site_id.eq.${siteId}`)
    .is("deleted_at", null);
  if (error) {
    console.error(`[cms] ${table} fetch failed`, error.message);
    return [];
  }
  return (data as T[]) ?? [];
}

export async function getPublishedPosts(siteId: string): Promise<Post[]> {
  const rows = await fetchTable<Post>("posts", siteId);
  if (rows.length) return resolveWithOverrides(rows, siteId);

  return staticPosts.map((p, i) => ({
    id: `static-post-${p.slug}`,
    site_id: siteId,
    override_of_id: null,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    published_at: null,
    image_url: p.image,
    image_asset_id: null,
    body: blogArticles[p.slug] ?? {},
    seo_title: null,
    seo_description: null,
    tags: blogArticles[p.slug]?.tags ?? [],
    status: "published" as const,
    sort_order: i,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));
}

export async function getPublishedPost(
  siteId: string,
  slug: string,
): Promise<Post | null> {
  const all = await getPublishedPosts(siteId);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPublishedPrograms(siteId: string): Promise<Program[]> {
  const rows = await fetchTable<Program>("programs", siteId);
  if (rows.length) {
    const resolved = resolveWithOverrides(rows, siteId);
    return attachProgramGalleries(resolved);
  }

  const staticPrograms = programsPage.items.map((p, i) => {
    const id = `static-program-${p.slug}`;
    return {
      id,
      site_id: siteId,
      override_of_id: null,
      slug: p.slug,
      nav_label: p.navLabel,
      category: p.category,
      title: p.title,
      image_url: p.image,
      image_asset_id: null,
      summary: [...p.summary],
      body: {},
      seo_title: null,
      seo_description: null,
      status: "published" as const,
      sort_order: i,
      created_at: "",
      updated_at: "",
      deleted_at: null,
      gallery: staticGallery(id, p.slug),
    };
  });

  return staticPrograms;
}

export async function getPublishedProgram(
  siteId: string,
  slug: string,
): Promise<Program | null> {
  const all = await getPublishedPrograms(siteId);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPublishedTeam(siteId: string): Promise<TeamMember[]> {
  const rows = await fetchTable<TeamMember>("team_members", siteId);
  if (rows.length) return resolveWithOverrides(rows, siteId);

  return staticTeam.map((v, i) => ({
    id: `static-team-${v.slug}`,
    site_id: siteId,
    override_of_id: null,
    slug: v.slug,
    name: v.name,
    role: v.role,
    bio: v.bio,
    image_url: v.image,
    image_asset_id: null,
    status: "published" as const,
    sort_order: i,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));
}

export async function getPublishedTeamMember(
  siteId: string,
  slug: string,
): Promise<TeamMember | null> {
  const all = await getPublishedTeam(siteId);
  return all.find((m) => m.slug === slug) ?? null;
}

export async function getPublishedReports(siteId: string): Promise<Report[]> {
  const rows = await fetchTable<Report>("reports", siteId);
  if (rows.length) return resolveWithOverrides(rows, siteId);

  return reportsPage.items.map((r, i) => ({
    id: `static-report-${i}`,
    site_id: siteId,
    override_of_id: null,
    year: r.year,
    report_type: r.type,
    title: r.title,
    cover_image_url: r.image,
    cover_asset_id: null,
    pdf_url: null,
    pdf_asset_id: null,
    external_url: r.href,
    description: null,
    status: "published" as const,
    sort_order: i,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));
}

export async function getPublishedFaqCategories(
  siteId: string,
): Promise<FaqCategory[]> {
  const rows = await fetchTable<FaqCategory>("faq_categories", siteId);
  if (rows.length) return resolveWithOverrides(rows, siteId);

  return faqPage.categories.map((c, i) => ({
    id: `static-faq-cat-${c.id}`,
    site_id: siteId,
    override_of_id: null,
    code: c.id,
    label: c.label,
    sort_order: i,
    status: "published" as const,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));
}

export async function getPublishedFaqItems(
  siteId: string,
): Promise<FaqItem[]> {
  const rows = await fetchTable<FaqItem>("faq_items", siteId);
  if (rows.length) return resolveWithOverrides(rows, siteId);

  const pageItems = faqPage.categories.flatMap((c, ci) =>
    c.items.map((item, ii) => ({
      id: `static-faq-${c.id}-${ii}`,
      site_id: siteId,
      override_of_id: null,
      category_id: `static-faq-cat-${c.id}`,
      question: item.question,
      answer: item.answer,
      placement: "page",
      status: "published" as const,
      sort_order: ci * 100 + ii,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    })),
  );

  const homeItems = staticFaqs.map((item, i) => ({
    id: `static-faq-home-${i}`,
    site_id: siteId,
    override_of_id: null,
    category_id: null as string | null,
    question: item.question,
    answer: item.answer,
    placement: "home",
    status: "published" as const,
    sort_order: i,
    created_at: "",
    updated_at: "",
    deleted_at: null,
  }));

  return [...pageItems, ...homeItems];
}

export async function getPublishedCounters(
  siteId: string,
  placement?: string,
): Promise<AchievementCounter[]> {
  const rows = await fetchTable<AchievementCounter>(
    "achievement_counters",
    siteId,
  );
  if (rows.length) {
    const resolved = resolveWithOverrides(rows, siteId);
    return placement
      ? resolved.filter((c) => c.placement === placement)
      : resolved;
  }

  const fallback: AchievementCounter[] = [
    {
      id: "static-counter-funds",
      site_id: siteId,
      override_of_id: null,
      key: "funds_direct_aid",
      label: hero.counter.label,
      value: hero.counter.value,
      prefix: "",
      suffix: hero.counter.suffix,
      decimals: 0,
      placement: "hero",
      image_url: null,
      description: null,
      status: "published",
      sort_order: 0,
      as_of_date: null,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    },
    ...keyFacts.items.map((item, i) => ({
      id: `static-counter-key-${i}`,
      site_id: siteId,
      override_of_id: null,
      key: item.label.toLowerCase().replace(/\s+/g, "_"),
      label: item.label,
      value: item.value,
      prefix: "",
      suffix: item.suffix,
      decimals: 0,
      placement: "home",
      image_url: item.image,
      description: item.text,
      status: "published" as const,
      sort_order: i,
      as_of_date: null,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    })),
    {
      id: "static-counter-packages",
      site_id: siteId,
      override_of_id: null,
      key: "food_packages_monthly",
      label: coreFeatures.stat.label,
      value: coreFeatures.stat.value,
      prefix: "",
      suffix: coreFeatures.stat.suffix,
      decimals: 0,
      placement: "core_features",
      image_url: null,
      description: null,
      status: "published",
      sort_order: 0,
      as_of_date: null,
      created_at: "",
      updated_at: "",
      deleted_at: null,
    },
  ];

  return placement
    ? fallback.filter((c) => c.placement === placement)
    : fallback;
}
