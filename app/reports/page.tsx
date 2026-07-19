import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ReportsContent } from "@/components/reports/ReportsContent";
import { reportsPage } from "@/data/reports";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Explore AWFCA annual reports, project updates, and measurable impact.",
};

export default function ReportsPage() {
  const { hero } = reportsPage;

  return (
    <>
      <PageHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        background={hero.background}
      />
      <ReportsContent />
    </>
  );
}
