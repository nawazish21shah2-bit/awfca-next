import type { ReactNode } from "react";
import Image from "next/image";
import { BadgeCheck, ScanEye } from "lucide-react";
import { about } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function About() {
  return (
    <section className="about-section">
      <div className="container-site about-section__grid">
        <div className="about-visual">
          <div className="glass-image about-visual__small">
            <Image
              src={about.images[0]}
              alt=""
              width={300}
              height={320}
              sizes="(max-width: 767px) 48vw, (max-width: 991px) 300px, 24vw"
              className="about-visual__image"
            />
          </div>
          <div className="glass-image about-visual__large">
            <Image
              src={about.images[1]}
              alt=""
              width={490}
              height={648}
              sizes="(max-width: 767px) 75vw, (max-width: 991px) 490px, 38vw"
              className="about-visual__image"
            />
          </div>
        </div>

        <div className="about-content">
          <FadeInUp>
            <SectionEyebrow variant="about" className="about-eyebrow">
              {about.eyebrow}
            </SectionEyebrow>
          </FadeInUp>

          <AnimatedHeading text={about.title} className="about-heading" />

          <FadeInUp delay={100}>
            <p className="section-text about-description">{about.text}</p>
          </FadeInUp>

          <FadeInUp delay={200} className="about-cards">
            <InfoBox
              icon={<ScanEye />}
              title={about.mission.title}
              text={about.mission.text}
            />
            <InfoBox
              icon={<BadgeCheck />}
              title={about.vision.title}
              text={about.vision.text}
            />
          </FadeInUp>

          <FadeInUp delay={300} className="about-cta">
            <Button href={about.cta.href}>{about.cta.label}</Button>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

function InfoBox({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="about-card">
      <div className="about-card__content">
        <div className="about-card__icon">{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
