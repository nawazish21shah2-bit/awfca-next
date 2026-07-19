import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programsPage } from "@/data/programs";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedProgram, getPublishedPrograms } from "@/lib/cms/content";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramDetail } from "@/components/programs/ProgramDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const site = await getRequestSite();
    const programs = await getPublishedPrograms(site.id);
    return programs.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getRequestSite();
  const item = await getPublishedProgram(site.id, slug);
  return {
    title: item?.seo_title || item?.title || "Program",
    description: item?.seo_description || item?.summary?.[0],
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = await getRequestSite();
  const item = await getPublishedProgram(site.id, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        title={item.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: item.title, href: `/programs/${item.slug}` },
        ]}
        background={item.image_url || programsPage.hero.background}
      />
      <ProgramDetail slug={slug} />
    </>
  );
}
