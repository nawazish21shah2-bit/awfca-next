import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { pageHeroImages } from "@/data/page-heroes";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest AWFCA updates, campaign stories, and community impact reports.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Stories of impact from the field"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        background={pageHeroImages.blog}
      />
      <BlogGrid />
    </>
  );
}
