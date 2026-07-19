import type { Metadata } from "next";
import { programsPage } from "@/data/programs";
import { getProgramCategory } from "@/data/program-categories";
import { categoryHeroImages } from "@/data/page-heroes";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramsGrid } from "@/components/programs/ProgramsGrid";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore AWFCA programs supporting education, healthcare, hunger relief, and community welfare.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProgramsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const active = getProgramCategory(category);
  const { hero } = programsPage;
  const background =
    (active && categoryHeroImages[active.id]) || hero.background;

  return (
    <>
      <PageHero
        title={active?.label ?? hero.title}
        breadcrumbs={
          active
            ? [
                ...hero.breadcrumbs,
                { label: active.shortLabel, href: active.href },
              ]
            : hero.breadcrumbs
        }
        background={background}
      />
      <ProgramsGrid categoryId={category} />
    </>
  );
}
