import { Mail, MapPin, PhoneCall } from "lucide-react";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { SubmissionForm } from "@/components/forms/SubmissionForm";

export function ContactContent() {
  return (
    <>
      <section className="contact-page">
        <div className="container-site contact-page__grid">
          <div className="contact-page__details">
            <div className="contact-page__heading">
              <FadeInUp>
                <SectionEyebrow variant="muted" withDot={false}>
                  Contact Us
                </SectionEyebrow>
              </FadeInUp>
              <AnimatedHeading
                text="We’re here to help you support communities in need"
                className="contact-page__title"
              />
              <FadeInUp delay={100}>
                <p className="contact-page__intro">
                  Reach out to AWFCA for donation questions, volunteer
                  opportunities, partnership inquiries, or general support. Our
                  Scarborough-based team responds with care and clarity.
                </p>
              </FadeInUp>
            </div>

            <FadeInUp delay={150} className="contact-page__info-card">
              <div className="contact-page__info-list">
                <a href={site.phoneHref} className="contact-page__info-item">
                  <span className="contact-page__info-icon" aria-hidden="true">
                    <PhoneCall />
                  </span>
                  <span>
                    <small>Call Us</small>
                    <strong>{site.phone}</strong>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="contact-page__info-item"
                >
                  <span className="contact-page__info-icon" aria-hidden="true">
                    <Mail />
                  </span>
                  <span>
                    <small>E-mail Us</small>
                    <strong>{site.email}</strong>
                  </span>
                </a>
                <div className="contact-page__info-item">
                  <span className="contact-page__info-icon" aria-hidden="true">
                    <MapPin />
                  </span>
                  <span>
                    <small>Visit Us</small>
                    <strong>{site.address}</strong>
                  </span>
                </div>
              </div>
            </FadeInUp>
          </div>

          <div className="contact-page__form-card">
            <AnimatedHeading
              text="Get In Touch"
              className="contact-page__form-title"
            />
            <FadeInUp>
              <p className="contact-page__form-intro">
                We&apos;d love to hear from you. Share your message and our team
                will follow up as soon as possible.
              </p>
            </FadeInUp>
            <FadeInUp delay={100}>
              <SubmissionForm
                endpoint="/api/contact"
                submitLabel="Submit Message"
                variant="contact"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      <section className="contact-locations">
        <div className="container-site">
          <div className="contact-locations__heading">
            <FadeInUp>
              <SectionEyebrow variant="muted" withDot={false}>
                Our Location
              </SectionEyebrow>
            </FadeInUp>
            <AnimatedHeading
              text="Serving communities from Scarborough, Ontario"
              className="contact-locations__title"
            />
          </div>
          <FadeInUp className="contact-locations__map">
            <iframe
              loading="lazy"
              src="https://maps.google.com/maps?q=1515-70%20Mornelle%20Court%2C%20Scarborough%2C%20ON%20M1E%204S8&t=m&z=14&output=embed&iwloc=near"
              title={site.address}
              aria-label={site.address}
            />
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
