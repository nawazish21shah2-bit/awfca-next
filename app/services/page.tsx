import type { Metadata } from "next";
import { servicesPage } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AWFCA services across humanitarian aid, education, social welfare, and religious charitable giving.",
};

export default function ServicesPage() {
  const { hero } = servicesPage;

  return (
    <>
      <PageHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        background={hero.background}
      />
      <Services />
      <Testimonials />
      <Faq />
    </>
  );
}
