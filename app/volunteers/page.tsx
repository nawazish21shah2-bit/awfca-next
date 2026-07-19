import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VolunteersGrid } from "@/components/volunteers/VolunteersGrid";
import { volunteersPage } from "@/data/volunteers";

export const metadata: Metadata = {
  title: "Our Volunteers",
};

export default function VolunteersPage() {
  return (
    <>
      <PageHero
        title={volunteersPage.hero.title}
        breadcrumbs={[...volunteersPage.hero.breadcrumbs]}
        background={volunteersPage.hero.background}
      />
      <VolunteersGrid />
    </>
  );
}
