import Image from "next/image";
import { faqSection } from "@/data/home";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedFaqItems } from "@/lib/cms/content";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { FadeInUp } from "@/components/effects/FadeInUp";

export async function Faq() {
  const site = await getRequestSite();
  const faqs = (await getPublishedFaqItems(site.id))
    .filter((f) => f.placement === "home" || f.placement === "both")
    .slice(0, 4)
    .map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <section className="faq-section">
      <Image
        src="/images/section-bg-shape-1.png"
        alt=""
        width={221}
        height={242}
        className="faq-shape faq-shape--top"
      />
      <Image
        src="/images/section-bg-shape-2.png"
        alt=""
        width={222}
        height={368}
        className="faq-shape faq-shape--bottom"
      />

      <div className="container-site faq-section__grid">
        <FadeInUp className="faq-media">
          <div className="faq-media__inner">
            <div className="glass-image faq-image">
              <Image
                src={faqSection.image}
                alt=""
                width={605}
                height={695}
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="faq-image__media"
              />
            </div>

            <div className="faq-cta-shell">
              <div className="faq-cta">
                <div>
                  <h3>{faqSection.ctaBox.title}</h3>
                  <p>{faqSection.ctaBox.text}</p>
                </div>
                <Button href={faqSection.ctaBox.cta.href}>
                  {faqSection.ctaBox.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </FadeInUp>

        <div className="faq-content">
          <FadeInUp>
            <SectionEyebrow variant="muted" className="faq-eyebrow" withDot={false}>
              {faqSection.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading text={faqSection.title} className="faq-title" />
          <FadeInUp delay={100}>
            <p className="faq-intro">{faqSection.text}</p>
          </FadeInUp>
          <FadeInUp delay={200}>
            <Accordion items={faqs} defaultOpen={1} className="faq-accordion" />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
