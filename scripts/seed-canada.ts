/**
 * Seeds Canada content from existing static TypeScript data files.
 * Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.
 *
 * Usage: npm run seed:canada
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { posts } from "../data/posts";
import { blogArticles } from "../data/blog-articles";
import { programsPage } from "../data/programs";
import { programGalleries } from "../data/program-galleries";
import { faqPage, faqs } from "../data/faqs";
import { volunteers } from "../data/volunteers";
import { reportsPage } from "../data/reports";
import { hero, keyFacts, coreFeatures } from "../data/home";

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env) || !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id")
    .eq("code", "ca")
    .single();
  if (siteError || !site) throw siteError ?? new Error("Canada site missing");

  const siteId = site.id as string;
  console.log("Seeding Canada site", siteId);

  // Posts (site-scoped for Canada)
  for (const [i, post] of posts.entries()) {
    const body = blogArticles[post.slug] ?? {};
    const { error } = await supabase.from("posts").upsert(
      {
        site_id: siteId,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image_url: post.image,
        body,
        tags: body.tags ?? [],
        status: "published",
        sort_order: i,
      },
      { onConflict: "site_id,slug" },
    );
    if (error) console.error("post", post.slug, error.message);
  }

  for (const [i, program] of programsPage.items.entries()) {
    const { data: saved, error } = await supabase
      .from("programs")
      .upsert(
        {
          site_id: siteId,
          slug: program.slug,
          nav_label: program.navLabel,
          category: program.category,
          title: program.title,
          image_url: program.image,
          summary: program.summary,
          status: "published",
          sort_order: i,
        },
        { onConflict: "site_id,slug" },
      )
      .select("id")
      .single();

    if (error || !saved) {
      console.error("program", program.slug, error?.message);
      continue;
    }

    const gallery = programGalleries[program.slug] ?? [];
    const { error: updateBodyError } = await supabase
      .from("programs")
      .update({ body: { gallery } })
      .eq("id", saved.id);
    if (updateBodyError) {
      console.error("gallery body", program.slug, updateBodyError.message);
    }

    const del = await supabase.from("program_images").delete().eq("program_id", saved.id);
    if (!del.error && gallery.length) {
      const { error: galleryError } = await supabase.from("program_images").insert(
        gallery.map((image_url, sort_order) => ({
          program_id: saved.id,
          image_url,
          sort_order,
        })),
      );
      if (galleryError && !/schema cache|PGRST205/i.test(galleryError.message)) {
        console.error("gallery", program.slug, galleryError.message);
      }
    }
  }

  for (const [i, member] of volunteers.entries()) {
    const { error } = await supabase.from("team_members").upsert(
      {
        site_id: siteId,
        slug: member.slug,
        name: member.name,
        role: member.role,
        bio: member.bio,
        image_url: member.image,
        status: "published",
        sort_order: i,
      },
      { onConflict: "site_id,slug" },
    );
    if (error) console.error("team", member.slug, error.message);
  }

  for (const [i, report] of reportsPage.items.entries()) {
    const { error } = await supabase.from("reports").insert({
      site_id: siteId,
      year: report.year,
      report_type: report.type,
      title: report.title,
      cover_image_url: report.image,
      external_url: report.href,
      status: "published",
      sort_order: i,
    });
    if (error && !error.message.includes("duplicate")) {
      console.error("report", report.title, error.message);
    }
  }

  for (const [ci, cat] of faqPage.categories.entries()) {
    const { data: category, error } = await supabase
      .from("faq_categories")
      .upsert(
        {
          site_id: siteId,
          code: cat.id,
          label: cat.label,
          sort_order: ci,
          status: "published",
        },
        { onConflict: "site_id,code" },
      )
      .select("id")
      .single();
    if (error || !category) {
      console.error("faq cat", cat.id, error?.message);
      continue;
    }
    for (const [ii, item] of cat.items.entries()) {
      const { error: itemError } = await supabase.from("faq_items").insert({
        site_id: siteId,
        category_id: category.id,
        question: item.question,
        answer: item.answer,
        placement: "page",
        status: "published",
        sort_order: ii,
      });
      if (itemError && !itemError.message.includes("duplicate")) {
        console.error("faq item", item.question, itemError.message);
      }
    }
  }

  for (const [i, item] of faqs.entries()) {
    await supabase.from("faq_items").insert({
      site_id: siteId,
      question: item.question,
      answer: item.answer,
      placement: "home",
      status: "published",
      sort_order: i,
    });
  }

  const counters = [
    {
      key: "funds_direct_aid",
      label: hero.counter.label,
      value: hero.counter.value,
      suffix: hero.counter.suffix,
      placement: "hero",
      sort_order: 0,
    },
    ...keyFacts.items.map((item, i) => ({
      key: item.label.toLowerCase().replace(/\s+/g, "_"),
      label: item.label,
      value: item.value,
      suffix: item.suffix,
      placement: "home",
      image_url: item.image,
      description: item.text,
      sort_order: i,
    })),
    {
      key: "food_packages_monthly",
      label: coreFeatures.stat.label,
      value: coreFeatures.stat.value,
      suffix: coreFeatures.stat.suffix,
      placement: "core_features",
      sort_order: 0,
    },
  ];

  for (const counter of counters) {
    const { error } = await supabase.from("achievement_counters").upsert(
      {
        site_id: siteId,
        ...counter,
        prefix: "",
        decimals: 0,
        status: "published",
      },
      { onConflict: "site_id,key,placement" },
    );
    if (error) console.error("counter", counter.key, error.message);
  }

  console.log("Canada seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
