/**
 * Seeds program galleries into programs.body.gallery (and program_images when available).
 * Usage: npm run seed:galleries
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { programGalleries } from "../data/program-galleries";

function loadEnv(filename: string) {
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
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(".env.local");

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id")
    .eq("code", "ca")
    .single();
  if (siteError || !site) throw siteError ?? new Error("Canada site missing");

  const { data: programs, error } = await supabase
    .from("programs")
    .select("id, slug, body")
    .eq("site_id", site.id)
    .is("deleted_at", null);
  if (error) throw error;

  let updated = 0;
  for (const program of programs ?? []) {
    const gallery = programGalleries[program.slug] ?? [];
    const body = {
      ...((program.body as Record<string, unknown>) ?? {}),
      gallery,
    };

    const { error: updateError } = await supabase
      .from("programs")
      .update({ body })
      .eq("id", program.id);
    if (updateError) {
      console.error(program.slug, updateError.message);
      continue;
    }

    const del = await supabase.from("program_images").delete().eq("program_id", program.id);
    if (!del.error && gallery.length) {
      const { error: insertError } = await supabase.from("program_images").insert(
        gallery.map((image_url, sort_order) => ({
          program_id: program.id,
          image_url,
          sort_order,
        })),
      );
      if (insertError && !/schema cache|PGRST205/i.test(insertError.message)) {
        console.error(program.slug, insertError.message);
      }
    }

    updated += 1;
    console.log(`${program.slug}: ${gallery.length} images`);
  }

  console.log(`Done. Updated ${updated} programs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
