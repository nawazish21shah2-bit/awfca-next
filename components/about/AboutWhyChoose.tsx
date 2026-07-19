import Image from "next/image";
import { aboutPage } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function AboutWhyChoose() {
  const { whyChoose } = aboutPage;

  return (
    <section className="about-page-why">
      <div className="container-site about-page-why__inner">
        <div className="about-page-why__visual">
          <FadeInUp className="about-page-why__collage">
            <div className="glass-image about-page-why__image about-page-why__image--1">
              <Image
                src={whyChoose.images[0]}
                alt=""
                width={410}
                height={600}
                sizes="(max-width: 991px) 48vw, 32vw"
              />
            </div>
            <div className="glass-image about-page-why__image about-page-why__image--2">
              <Image
                src={whyChoose.images[1]}
                alt=""
                width={300}
                height={300}
                sizes="(max-width: 991px) 40vw, 23vw"
              />
            </div>
            <div className="about-page-why__stat">
              <p>
                <strong>{whyChoose.volunteersStat.value}</strong>{" "}
                <span>{whyChoose.volunteersStat.label}</span>
              </p>
              <div className="about-page-why__avatars">
                {whyChoose.avatars.map((src) => (
                  <Image key={src} src={src} alt="" width={40} height={40} />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>

        <div className="about-page-why__content">
          <FadeInUp>
            <SectionEyebrow className="about-page-why__eyebrow">
              {whyChoose.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={whyChoose.title}
            className="about-page-why__title"
          />
          <FadeInUp delay={100}>
            <p className="about-page-why__text">{whyChoose.text}</p>
          </FadeInUp>

          <FadeInUp delay={180} className="about-page-why__panel">
            <div className="about-page-why__panel-copy">
              <h3>{whyChoose.tracking.title}</h3>
              <ul>
                {whyChoose.tracking.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div className="glass-image about-page-why__panel-image">
              <Image
                src={whyChoose.tracking.image}
                alt=""
                width={357}
                height={300}
                sizes="(max-width: 991px) 100vw, 28vw"
              />
            </div>
          </FadeInUp>
          <FadeInUp delay={260} className="about-page-why__footer">
            <Button href={whyChoose.tracking.cta.href}>
              {whyChoose.tracking.cta.label}
            </Button>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
