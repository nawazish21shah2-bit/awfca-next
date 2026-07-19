import type { Metadata } from "next";
import { AboutPageHero } from "@/components/about/AboutPageHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutWhyChoose } from "@/components/about/AboutWhyChoose";
import { AboutCoreFeatures } from "@/components/about/AboutCoreFeatures";
import { AboutCauses } from "@/components/about/AboutCauses";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutVolunteers } from "@/components/about/AboutVolunteers";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { AboutFaq } from "@/components/about/AboutFaq";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Arrahman Welfare Foundation Canada (AWFCA), a CRA-registered charity fighting poverty through education, healthcare, food relief, and community programs.",
};

export default function AboutPage() {
  return (
    <>
      <AboutPageHero />
      <AboutIntro />
      <AboutApproach />
      <AboutWhyChoose />
      <AboutCoreFeatures />
      <AboutCauses />
      <AboutStory />
      <AboutVolunteers />
      <AboutTestimonials />
      <AboutFaq />
    </>
  );
}
