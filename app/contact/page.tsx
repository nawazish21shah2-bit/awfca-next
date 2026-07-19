import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { PageHero } from "@/components/ui/PageHero";
import { pageHeroImages } from "@/data/page-heroes";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Arrahman Welfare Foundation Canada at 416-471-9636 or info@awfca.ca. Visit us at 1515-70 Mornelle Court, Scarborough, ON.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let’s build hope together"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
        background={pageHeroImages.contact}
      />
      <ContactContent />
    </>
  );
}
