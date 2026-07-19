import type { Post as CmsPost, Program as CmsProgram } from "@/lib/cms/types";

/** Shape expected by existing blog UI cards/detail. */
export type BlogCardModel = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

export type BlogDetailModel = BlogCardModel & {
  body: {
    opening: string[];
    quote: string;
    body: string[];
    heading: string;
    headingText: string;
    bullets: string[];
    tags: string[];
  };
};

export function toBlogCard(post: CmsPost): BlogCardModel {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date,
    image: post.image_url || "/images/awfca/page-title.jpg",
  };
}

export function toBlogDetail(post: CmsPost): BlogDetailModel {
  const body = post.body ?? {};
  return {
    ...toBlogCard(post),
    body: {
      opening: body.opening ?? [post.excerpt].filter(Boolean),
      quote: body.quote ?? "",
      body: body.body ?? [],
      heading: body.heading ?? "Why this work matters",
      headingText: body.headingText ?? "",
      bullets: body.bullets ?? [],
      tags: body.tags ?? post.tags ?? [],
    },
  };
}

export type ProgramCardModel = {
  slug: string;
  navLabel: string;
  category: string;
  title: string;
  image: string;
  summary: string[];
  gallery: string[];
};

export function toProgramCard(program: CmsProgram): ProgramCardModel {
  const gallery = (program.gallery ?? [])
    .map((item) => item.image_url)
    .filter(Boolean);

  return {
    slug: program.slug,
    navLabel: program.nav_label,
    category: program.category,
    title: program.title,
    image: program.image_url || gallery[0] || "/images/awfca/page-title.jpg",
    summary: program.summary ?? [],
    gallery,
  };
}
