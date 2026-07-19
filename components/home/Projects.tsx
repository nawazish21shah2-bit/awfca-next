import Image from "next/image";
import { Cross, GraduationCap, Soup, Waves } from "lucide-react";
import { projects } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const initiativeIcons = [GraduationCap, Cross, Soup, Waves];

export function Projects() {
  return (
    <section className="projects-section">
      <div className="container-site projects-section__grid">
        <div className="glass-image projects-image">
          <Image
            src={projects.image}
            alt=""
            width={595}
            height={591}
            sizes="(max-width: 991px) 100vw, 48vw"
            className="projects-image__media"
          />
        </div>

        <div className="projects-content">
          <FadeInUp>
            <SectionEyebrow className="projects-eyebrow">
              {projects.eyebrow}
            </SectionEyebrow>
          </FadeInUp>

          <AnimatedHeading text={projects.title} className="projects-title" />

          <FadeInUp delay={100}>
            <p className="projects-description">{projects.text}</p>
          </FadeInUp>

          <FadeInUp delay={200} className="projects-initiatives">
            {projects.initiatives.map((item, index) => {
              const Icon = initiativeIcons[index] ?? GraduationCap;
              return (
                <div className="projects-initiative" key={item}>
                  <span className="projects-initiative__icon">
                    <Icon />
                  </span>
                  <h3>{item}</h3>
                </div>
              );
            })}
          </FadeInUp>

          <FadeInUp delay={300} className="projects-footer">
            <Button href={projects.cta.href}>{projects.cta.label}</Button>
            <div className="projects-profile">
              <Image
                src={projects.profile.image}
                alt={projects.profile.name}
                width={50}
                height={50}
                className="projects-profile__image"
              />
              <div className="projects-profile__body">
                <h3>{projects.profile.name}</h3>
                <p>{projects.profile.role}</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
