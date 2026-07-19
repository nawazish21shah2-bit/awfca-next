import Image from "next/image";
import { HeartHandshake, Layers3 } from "lucide-react";
import { aboutPage } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const featureIcons = [Layers3, HeartHandshake];

export function AboutIntro() {
  const { intro } = aboutPage;

  return (
    <section className="about-page-intro">
      <div className="container-site about-page-intro__grid">
        <FadeInUp className="about-page-intro__media">
          <div className="about-page-intro__collage">
            <div className="glass-image image-shine about-page-intro__image about-page-intro__image--1">
              <Image
                src={intro.images[0]}
                alt=""
                width={270}
                height={302}
                sizes="(max-width: 991px) 42vw, 23vw"
                className="about-page-intro__img"
              />
            </div>
            <div className="glass-image image-shine about-page-intro__image about-page-intro__image--2">
              <Image
                src={intro.images[1]}
                alt=""
                width={413}
                height={540}
                sizes="(max-width: 991px) 42vw, 23vw"
                className="about-page-intro__img"
              />
            </div>
            <div className="glass-image image-shine about-page-intro__image about-page-intro__image--3">
              <Image
                src={intro.images[2]}
                alt=""
                width={240}
                height={250}
                sizes="(max-width: 991px) 90vw, 32vw"
                className="about-page-intro__img"
              />
            </div>
          </div>
        </FadeInUp>

        <div className="about-page-intro__content">
          <FadeInUp>
            <SectionEyebrow className="about-page-intro__eyebrow">
              {intro.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={intro.title}
            className="about-page-intro__title"
          />
          <FadeInUp delay={100}>
            <p className="about-page-intro__text">{intro.text}</p>
          </FadeInUp>

          <div className="about-page-intro__features">
            {intro.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? HeartHandshake;
              return (
                <FadeInUp key={feature.title} delay={150 + index * 80}>
                  <article className="about-page-intro__feature">
                    <span className="about-page-intro__feature-icon">
                      <Icon />
                    </span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  </article>
                </FadeInUp>
              );
            })}
          </div>

          <FadeInUp delay={320} className="about-page-intro__footer">
            <Button href={intro.cta.href}>{intro.cta.label}</Button>
            <div className="about-page-intro__founder">
              <Image
                src={intro.founder.image}
                alt={intro.founder.name}
                width={50}
                height={50}
              />
              <div>
                <strong>{intro.founder.name}</strong>
                <span>{intro.founder.role}</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
