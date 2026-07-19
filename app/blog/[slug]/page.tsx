import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedPost, getPublishedPosts } from "@/lib/cms/content";
import { toBlogDetail } from "@/lib/cms/view-models";
import { BlogDetail } from "@/components/blog/BlogDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const site = await getRequestSite();
    const posts = await getPublishedPosts(site.id);
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getRequestSite();
  const post = await getPublishedPost(site.id, slug);
  return {
    title: post?.seo_title || post?.title || "Blog",
    description: post?.seo_description || post?.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = await getRequestSite();
  const post = await getPublishedPost(site.id, slug);
  if (!post) notFound();

  return <BlogDetail post={toBlogDetail(post)} />;
}
