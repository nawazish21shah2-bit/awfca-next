import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, HeartPulse, Utensils, HandHeart } from "lucide-react";
import { services } from "@/data/home";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const icons = [HeartPulse, GraduationCap, Utensils, HandHeart];

export function Services() {
  return (
    <section className="services-section">
      <Image
        src="/images/section-bg-shape-1.png"
        alt=""
        width={221}
        height={242}
        className="services-shape services-shape--left"
      />
      <Image
        src="/images/section-bg-shape-2.png"
        alt=""
        width={222}
        height={368}
        className="services-shape services-shape--right"
      />

      <div className="container-site services-section__inner">
        <div className="services-heading">
          <FadeInUp>
            <SectionEyebrow className="services-eyebrow">
              {services.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading text={services.title} className="services-title" />
        </div>

        <div className="services-grid">
          {services.items.map((item, i) => {
            const Icon = icons[i] ?? GraduationCap;
            return (
              <FadeInUp key={item.slug} delay={i * 100}>
                <article className="service-card">
                  <div className="service-card__heading">
                    <Link
                      href={item.href}
                      className="service-card__icon"
                      aria-label={item.title}
                    >
                      <Icon />
                    </Link>
                    <h3>
                      <Link href={item.href}>{item.title}</Link>
                    </h3>
                  </div>

                  <div className="service-card__body">
                    <p>{item.text}</p>
                    <Link href={item.href} className="service-card__link">
                      Read More <ArrowUpRight />
                    </Link>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={300} className="section-contact-note services-contact">
          {services.contactNote}{" "}
          <a href={site.phoneHref}>{site.phone}</a>
        </FadeInUp>
      </div>
    </section>
  );
}
