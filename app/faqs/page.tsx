import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqsContent } from "@/components/faqs/FaqsContent";
import { faqPage } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title={faqPage.hero.title}
        breadcrumbs={[...faqPage.hero.breadcrumbs]}
        background={faqPage.hero.background}
      />
      <FaqsContent />
    </>
  );
}
