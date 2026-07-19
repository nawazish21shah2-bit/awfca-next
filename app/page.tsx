import { HeroSection } from "@/components/home/HeroSection";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Volunteers } from "@/components/home/Volunteers";
import { Projects } from "@/components/home/Projects";
import { KeyFacts } from "@/components/home/KeyFacts";
import { DonationBanner } from "@/components/home/DonationBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Services />
      <WhyChooseUs />
      <Volunteers />
      <Projects />
      <KeyFacts />
      <DonationBanner />
      <Testimonials />
      <Faq />
      <BlogPreview />
    </>
  );
}
