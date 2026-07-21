import Image from "next/image";
import Link from "next/link";
import { Aperture, BadgeCheck, Orbit, Phone, Star } from "lucide-react";
import { aboutPage } from "@/data/about";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const approachIcons = [Aperture, BadgeCheck, Orbit];

export function AboutApproach() {
  const { approach, trust } = aboutPage;

  return (
    <section className="about-page-approach">
      <Image
        src="/images/section-bg-shape-1.png"
        alt=""
        width={221}
        height={242}
        className="about-page-approach__shape about-page-approach__shape--right"
      />
      <Image
        src="/images/section-bg-shape-2.png"
        alt=""
        width={222}
        height={368}
        className="about-page-approach__shape about-page-approach__shape--left"
      />

      <div className="container-site about-page-approach__inner">
        <div className="about-page-approach__heading">
          <FadeInUp>
            <SectionEyebrow className="about-page-approach__eyebrow">
              {approach.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={approach.title}
            className="about-page-approach__title"
          />
          <FadeInUp delay={100}>
            <p className="about-page-approach__text">{approach.text}</p>
          </FadeInUp>
        </div>

        <div className="about-page-approach__grid">
          {approach.items.map((item, index) => {
            const Icon = approachIcons[index] ?? Aperture;
            return (
              <FadeInUp key={item.title} delay={index * 100}>
                <article className="about-page-approach__card">
                  <div className="about-page-approach__card-title">
                    <span className="about-page-approach__icon">
                      <Icon />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="glass-image image-shine about-page-approach__image">
                    <Image
                      src={item.image}
                      alt=""
                      width={353}
                      height={220}
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p>{item.text}</p>
                </article>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={280} className="about-page-trust">
          <div className="about-page-trust__quote">
            <Image
              src={trust.authorImage}
              alt=""
              width={50}
              height={50}
              className="about-page-trust__avatar"
            />
            <span className="about-page-trust__phone" aria-hidden>
              <Phone />
            </span>
            <p>
              {trust.quoteNote}{" "}
              <Link href={trust.quoteCta.href}>{trust.quoteCta.label}</Link>
            </p>
          </div>

<div className="about-page-trust__content">
          <div className="about-page-trust__users">
            <p>
              {trust.trustedText} <strong>{trust.trustedCount}</strong>{" "}
              {trust.trustedSuffix}
            </p>
          </div>

          <div className="about-page-trust__rating">
            <div className="about-page-trust__stars" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} />
              ))}
            </div>
            <strong>{trust.rating}</strong>
          </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
