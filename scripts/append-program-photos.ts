/**
 * Append up to N new photos per program from awfca.ca without wiping existing galleries.
 * Usage: npx tsx scripts/append-program-photos.ts [count=2]
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
import { createHash } from "node:crypto";
import { dirname, extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { spawnSync } from "node:child_process";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "public", "images", "awfca", "programs");
const ADD_COUNT = Math.max(1, Number(process.argv[2] ?? 2) || 2);

const CHROME_NAME =
  /(?:^|\/)(?:bn-1\.png|logo|favicon|cropped-|site-icon|avatar|placeholder)/i;
const GLOBAL_FOOTER = new Set([
  "WhatsApp-Image-2025-05-08-at-4.25.11-PM.jpeg",
  "IMG-20250404-WA0015.jpg",
  "1-1.jpg",
  "bn-1.png",
]);
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
  return GLOBAL_FOOTER.has(name) || CHROME_NAME.test(url);
}

function normalizeUrl(url: string) {
  return url
    .replace(/-\d{2,4}x\d{2,4}(?=\.(?:jpe?g|png|webp))/i, "")
    .replace(/-scaled(?=\.(?:jpe?g|png|webp))/i, "");
}

function existingFiles(slug: string) {
  const dir = join(OUT_DIR, slug);
  if (!existsSync(dir)) return [] as { path: string; file: string; hash: string; index: number }[];
  return readdirSync(dir)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .map((file) => {
      const full = join(dir, file);
      const match = /^(\d+)/.exec(file);
      return {
        path: `/images/awfca/programs/${slug}/${file}`,
        file,
        hash: createHash("sha256").update(readFileSync(full)).digest("hex"),
        index: match ? Number(match[1]) : 0,
      };
    })
    .sort((a, b) => a.index - b.index || a.file.localeCompare(b.file));
}

async function fetchHtml(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AWFCA-import/1.0; +https://awfca.ca)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractImageUrls(html: string) {
  const re =
    /https:\/\/awfca\.ca\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpe?g|png|webp)/gi;
  const found = html.match(re) ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of found) {
    const url = normalizeUrl(raw.replace(/\\/g, ""));
    if (isChrome(url) || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

async function download(url: string, dest: string) {
  mkdirSync(dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AWFCA-import/1.0)" },
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok || !res.body) return false;
    const nodeStream = Readable.fromWeb(
      res.body as import("stream/web").ReadableStream,
    );
    await pipeline(nodeStream, createWriteStream(dest));
    return true;
  } catch {
    return false;
  }
}

async function appendForProgram(slug: string, pageUrls: string[]) {
  console.log(`\n${slug}`);
  const existing = existingFiles(slug);
  const knownHashes = new Set(existing.map((item) => item.hash));
  let nextIndex = existing.reduce((max, item) => Math.max(max, item.index), 0) + 1;

  let remote: string[] = [];
  for (const pageUrl of pageUrls) {
    const html = await fetchHtml(pageUrl);
    if (!html) continue;
    remote = extractImageUrls(html);
    console.log(`  scraped ${remote.length} candidates`);
    if (remote.length) break;
  }

  let added = 0;
  const dir = join(OUT_DIR, slug);
  mkdirSync(dir, { recursive: true });

  for (const url of remote) {
    if (added >= ADD_COUNT) break;
    const ext = extname(new URL(url).pathname).toLowerCase() || ".jpg";
    const temp = join(dir, `.tmp-${Date.now()}-${added}${ext}`);
    const ok = await download(url, temp);
    if (!ok) continue;

    const hash = createHash("sha256").update(readFileSync(temp)).digest("hex");
    if (CHROME_SHA256.has(hash) || knownHashes.has(hash)) {
      rmSync(temp, { force: true });
      continue;
    }

    const safe = `${String(nextIndex).padStart(2, "0")}${ext}`;
    const dest = join(dir, safe);
    rmSync(dest, { force: true });
    // rename via write/copy by reading — Windows-safe
    writeFileSync(dest, readFileSync(temp));
    rmSync(temp, { force: true });

    knownHashes.add(hash);
    nextIndex += 1;
    added += 1;
    console.log(`  + ${safe}`);
  }

  console.log(`  added ${added}/${ADD_COUNT} (now ${existing.length + added})`);
  return added;
}

async function main() {
  console.log(`Appending up to ${ADD_COUNT} new photo(s) per program…`);
  let total = 0;
  for (const item of PROJECT_PAGES) {
    total += await appendForProgram(item.slug, item.urls);
  }
  console.log(`\nTotal new photos: ${total}`);

  spawnSync("npx", ["tsx", "scripts/rebuild-program-galleries.ts"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });
  spawnSync("npx", ["tsx", "scripts/seed-program-galleries.ts"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
