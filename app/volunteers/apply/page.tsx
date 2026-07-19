import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { pageHeroImages } from "@/data/page-heroes";

export const metadata: Metadata = {
  title: "Volunteer with AWFCA",
  description:
    "Apply to volunteer with Arrahman Welfare Foundation Canada and support community programs.",
};

export default function VolunteerApplyPage() {
  return (
    <>
      <PageHero
        title="Volunteer with AWFCA"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team", href: "/volunteers" },
          { label: "Apply", href: "/volunteers/apply" },
        ]}
        background={pageHeroImages.apply}
      />
      <section className="contact-page">
        <div className="container-site contact-page__grid">
          <div className="contact-page__details">
            <div className="contact-page__heading">
              <FadeInUp>
                <SectionEyebrow variant="muted" withDot={false}>
                  Get Involved
                </SectionEyebrow>
              </FadeInUp>
              <AnimatedHeading
                text="Share your time and skills where they matter most"
                className="contact-page__title"
              />
              <FadeInUp delay={100}>
                <p className="contact-page__intro">
                  Tell us about your interests and availability. Our AWFCA team
                  will follow up with suitable volunteer opportunities across
                  campaigns, outreach, and community programs.
                </p>
              </FadeInUp>
            </div>
          </div>
          <div className="contact-page__form-card">
            <AnimatedHeading
              text="Volunteer application"
              className="contact-page__form-title"
            />
            <FadeInUp delay={100}>
              <SubmissionForm
                endpoint="/api/volunteer"
                submitLabel="Submit application"
                variant="volunteer"
              />
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  );
}
