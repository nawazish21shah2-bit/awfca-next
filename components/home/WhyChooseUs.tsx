import Image from "next/image";
import { Lock, HeartHandshake, BadgeCheck, Eye } from "lucide-react";
import { whyChooseUs } from "@/data/home";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const icons = [Eye, BadgeCheck, HeartHandshake, Lock];

export function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container-site why-section__inner">
        <div className="why-heading-row">
          <div className="why-heading">
            <FadeInUp>
              <SectionEyebrow className="why-eyebrow">
                {whyChooseUs.eyebrow}
              </SectionEyebrow>
            </FadeInUp>
            <AnimatedHeading text={whyChooseUs.title} className="why-title" />
          </div>

          <FadeInUp delay={100} className="why-intro">
            <p>{whyChooseUs.text}</p>
          </FadeInUp>
        </div>

        <div className="why-content">
          <div className="glass-image why-image">
            <Image
              src={whyChooseUs.image}
              alt=""
              width={635}
              height={612}
              sizes="(max-width: 991px) 100vw, 50vw"
              className="why-image__media"
            />
          </div>

          <div className="why-features">
            {whyChooseUs.items.map((item, i) => {
              const Icon = icons[i] ?? Eye;
              return (
                <FadeInUp key={item.title} delay={i * 100} className="why-feature">
                  <div className="why-feature__inner">
                    <span className="why-feature__icon">
                      <Icon />
                    </span>
                    <div className="why-feature__body">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </div>

        <FadeInUp delay={400} className="section-contact-note why-contact">
          You will be satisfy with our work. Contact us today{" "}
          <a href={site.phoneHref}>{site.phone}</a>
        </FadeInUp>
      </div>
    </section>
  );
}
