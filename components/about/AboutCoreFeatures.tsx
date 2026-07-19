import {
  GraduationCap,
  HandCoins,
  Layers3,
  LineChart,
  Lock,
  UsersRound,
} from "lucide-react";
import { aboutPage } from "@/data/about";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

const icons = [Lock, LineChart, Layers3];
const statIcons = [UsersRound, HandCoins, GraduationCap];

export function AboutCoreFeatures() {
  const { coreFeatures } = aboutPage;

  return (
    <section className="about-page-features">
      <div className="container-site about-page-features__inner">
        <div className="about-page-features__heading">
          <FadeInUp>
            <SectionEyebrow className="about-page-features__eyebrow">
              {coreFeatures.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={coreFeatures.title}
            className="about-page-features__title"
          />
          <FadeInUp delay={100}>
            <p className="about-page-features__text">{coreFeatures.text}</p>
          </FadeInUp>
        </div>

        <div className="about-page-features__cards">
          {coreFeatures.features.map((feature, index) => {
            const Icon = icons[index] ?? Lock;
            return (
              <FadeInUp key={feature.title} delay={index * 80}>
                <article className="about-page-features__card">
                  <span className="about-page-features__icon">
                    <Icon />
                  </span>
                  <div className="about-page-features__card-copy">
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </div>

        <div className="about-page-features__stats-shell">
          <div className="about-page-features__stats">
            {coreFeatures.stats.map((stat, index) => {
              const Icon = statIcons[index] ?? UsersRound;
              return (
                <FadeInUp key={stat.label} delay={index * 80}>
                  <article className="about-page-features__stat">
                    <span className="about-page-features__stat-icon">
                      <Icon />
                    </span>
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.decimals}
                      className="about-page-features__counter"
                      valueClassName="about-page-features__counter-value"
                    />
                    <div className="about-page-features__stat-copy">
                      <h3>{stat.label}</h3>
                      <p>{stat.text}</p>
                    </div>
                  </article>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
