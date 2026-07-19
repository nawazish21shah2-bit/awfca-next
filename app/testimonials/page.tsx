import type { Metadata } from "next";
import { testimonialsPage } from "@/data/testimonials-page";
import { PageHero } from "@/components/ui/PageHero";
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";
import { DonationBanner } from "@/components/home/DonationBanner";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title={testimonialsPage.hero.title}
        breadcrumbs={[...testimonialsPage.hero.breadcrumbs]}
        background={testimonialsPage.hero.background}
      />
      <TestimonialGrid />
      <DonationBanner />
    </>
  );
}
