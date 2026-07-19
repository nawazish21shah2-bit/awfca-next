/**
 * Scrapes AWFCA.ca project pages, downloads gallery images locally,
 * and writes data/program-galleries.ts for static fallback + seeding.
 *
 * Usage: npx tsx scripts/import-program-galleries.ts
 */
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { createHash } from "node:crypto";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "public", "images", "awfca", "programs");
const DATA_FILE = join(ROOT, "data", "program-galleries.ts");
const MAX_PER_PROGRAM = 20;

const CHROME_NAME =
  /(?:^|\/)(?:bn-1\.png|logo|favicon|cropped-|site-icon|avatar|placeholder)/i;
const GLOBAL_FOOTER = new Set([
  "WhatsApp-Image-2025-05-08-at-4.25.11-PM.jpeg",
  "IMG-20250404-WA0015.jpg",
  "1-1.jpg",
  "bn-1.png",
]);

/** Site logo/chrome that appears on every AWFCA project page. */
const CHROME_SHA256 = new Set([
  "5533092f6d6c48781f0ff067431c4c2da11b865364bd069869867fd6772dd169",
  "aa7fdccfe767601a6f8e2e5e2e8700282eb619cc993f9b27a8b0ee7df0d34be9",
]);

const PROJECT_PAGES: { slug: string; urls: string[] }[] = [
  {
    slug: "orphan-support-program",
    urls: [
      "https://awfca.ca/projects/orphanage-support-program-providing-care-love-and-a-brighter-future/",
    ],
  },
  {
    slug: "student-scholarship-breaking-barriers-building-futures",
    urls: [
      "https://awfca.ca/projects/student-scholarship-breaking-barriers-building-futures/",
    ],
  },
  {
    slug: "computer-training-institute",
    urls: [
      "https://awfca.ca/projects/computer-training-institute-empowering-through-digital-skills/",
    ],
  },
  {
    slug: "mobile-health-unit",
    urls: ["https://awfca.ca/projects/mobile-health-unit-delivering-care-restoring-hope/"],
  },
  {
    slug: "new-beginnings-program",
    urls: ["https://awfca.ca/projects/new-beginnings-program/"],
  },
  {
    slug: "collective-qurbani-project",
    urls: [
      "https://awfca.ca/projects/collective-qurbani-project-bringing-eids-blessings-to-those-in-need/",
    ],
  },
  {
    slug: "emergency-relief-fund",
    urls: [
      "https://awfca.ca/projects/emergency-relief-fund/",
      "https://awfca.ca/projects/emergency-relief/",
    ],
  },
  {
    slug: "zakaat-fund",
    urls: ["https://awfca.ca/projects/zakaat-fund/"],
  },
  {
    slug: "sadaqah-tul-fitr",
    urls: ["https://awfca.ca/projects/sadaqah-tul-fitr/"],
  },
  {
    slug: "fidyaa",
    urls: ["https://awfca.ca/projects/fidyaa/"],
  },
  {
    slug: "clean-water-project",
    urls: [
      "https://awfca.ca/projects/clean-water-project/",
      "https://awfca.ca/projects/clean-water/",
    ],
  },
  {
    slug: "food-bank",
    urls: [
      "https://awfca.ca/projects/food-bank/",
      "https://awfca.ca/projects/arrahman-food-bank/",
    ],
  },
  {
    slug: "free-medical-dispensary",
    urls: [
      "https://awfca.ca/projects/free-medical-dispensary-accessible-healthcare-for-a-healthier-future/",
    ],
  },
  {
    slug: "ramadan-hamper",
    urls: [
      "https://awfca.ca/projects/ramadan-hamper-spreading-nourishment-compassion-and-hope/",
    ],
  },
  {
    slug: "eid-gift-hampers",
    urls: ["https://awfca.ca/projects/eid-gift-hampers/"],
  },
  {
    slug: "helping-hands-campaign",
    urls: [
      "https://awfca.ca/projects/helping-hands-campaign/",
      "https://awfca.ca/projects/helping-hands/",
    ],
  },
  {
    slug: "gaza-dignity-kits",
    urls: ["https://awfca.ca/projects/gaza-dignity-kits-delivered/"],
  },
];

function fileNameFromUrl(url: string) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "image.jpg");
  } catch {
    return "image.jpg";
  }
}

function isChrome(url: string) {
  const name = fileNameFromUrl(url);
  if (GLOBAL_FOOTER.has(name)) return true;
  if (CHROME_NAME.test(url)) return true;
  return false;
}

function normalizeUrl(url: string) {
  return url
    .replace(/-\d{2,4}x\d{2,4}(?=\.(?:jpe?g|png|webp))/i, "")
    .replace(/-scaled(?=\.(?:jpe?g|png|webp))/i, "");
}

function existingLocal(slug: string): string[] {
  const dir = join(OUT_DIR, slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort()
    .map((name) => `/images/awfca/programs/${slug}/${name}`);
}

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AWFCA-import/1.0; +https://awfca.ca)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) {
      console.warn(`  HTTP ${res.status} ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.warn(`  fetch failed ${url}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

function extractImageUrls(html: string): string[] {
  const re =
    /https:\/\/awfca\.ca\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpe?g|png|webp)/gi;
  const found = html.match(re) ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of found) {
    const url = normalizeUrl(raw.replace(/\\/g, ""));
    if (isChrome(url)) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

async function download(url: string, dest: string): Promise<boolean> {
  if (existsSync(dest)) return true;
  mkdirSync(dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AWFCA-import/1.0)" },
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok || !res.body) {
      console.warn(`  download ${res.status} ${url}`);
      return false;
    }
    const nodeStream = Readable.fromWeb(
      res.body as import("stream/web").ReadableStream,
    );
    await pipeline(nodeStream, createWriteStream(dest));
    return true;
  } catch (err) {
    console.warn(`  download failed ${url}:`, err instanceof Error ? err.message : err);
    return false;
  }
}

async function importProgram(slug: string, pageUrls: string[]) {
  console.log(`\n${slug}`);
  const already = existingLocal(slug);

  let remote: string[] = [];
  for (const pageUrl of pageUrls) {
    const html = await fetchHtml(pageUrl);
    if (!html) continue;
    remote = extractImageUrls(html);
    console.log(`  scraped ${remote.length} from ${pageUrl}`);
    if (remote.length) break;
  }

  remote = remote.slice(0, MAX_PER_PROGRAM);
  if (!remote.length) {
    console.log(`  no remote images, keeping ${already.length} local`);
    return already.slice(0, MAX_PER_PROGRAM);
  }

  const dir = join(OUT_DIR, slug);
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
  mkdirSync(dir, { recursive: true });

  const localPaths: string[] = [];
  const seenHashes = new Set<string>();

  for (const [i, url] of remote.entries()) {
    const ext = extname(new URL(url).pathname).toLowerCase() || ".jpg";
    const safe = `${String(i + 1).padStart(2, "0")}${ext}`;
    const dest = join(dir, safe);
    const ok = await download(url, dest);
    if (!ok) continue;

    // Drop duplicate chrome / repeated assets by content hash.
    const hash = createHash("sha256").update(readFileSync(dest)).digest("hex");
    if (CHROME_SHA256.has(hash) || seenHashes.has(hash)) {
      rmSync(dest, { force: true });
      continue;
    }
    seenHashes.add(hash);
    localPaths.push(`/images/awfca/programs/${slug}/${safe}`);
  }

  console.log(`  kept ${localPaths.length} local files (of ${remote.length} remote)`);
  return localPaths;
}

function writeGalleriesFile(galleries: Record<string, string[]>) {
  const body = `/** Auto-generated by scripts/import-program-galleries.ts — do not edit by hand. */\nexport const programGalleries: Record<string, string[]> = ${JSON.stringify(
    galleries,
    null,
    2,
  )};\n`;
  writeFileSync(DATA_FILE, body, "utf8");
  console.log(`\nWrote ${DATA_FILE}`);
}

async function main() {
  const galleries: Record<string, string[]> = {};

  for (const item of PROJECT_PAGES) {
    galleries[item.slug] = await importProgram(item.slug, item.urls);
  }

  writeGalleriesFile(galleries);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
