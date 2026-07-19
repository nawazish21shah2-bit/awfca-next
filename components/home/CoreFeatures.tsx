import Image from "next/image";
import { Award, BadgeDollarSign, CheckCircle2, ShieldCheck } from "lucide-react";
import { coreFeatures } from "@/data/home";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedCounters } from "@/lib/cms/content";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

const featureIcons = [BadgeDollarSign, ShieldCheck];

export async function CoreFeatures() {
  const site = await getRequestSite();
  const counters = await getPublishedCounters(site.id, "core_features");
  const stat = counters[0]
    ? {
        value: Number(counters[0].value),
        suffix: counters[0].suffix,
        label: counters[0].label,
      }
    : coreFeatures.stat;

  return (
    <section className="features-section">
      <div className="container-site features-section__grid">
        <div className="features-content">
          <FadeInUp>
            <SectionEyebrow className="features-eyebrow">
              {coreFeatures.eyebrow}
            </SectionEyebrow>
          </FadeInUp>

          <AnimatedHeading text={coreFeatures.title} className="features-title" />

          <FadeInUp delay={100}>
            <p className="features-description">{coreFeatures.text}</p>
          </FadeInUp>

          <FadeInUp delay={200} className="features-primary">
            {coreFeatures.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? BadgeDollarSign;
              return (
                <div className="features-primary__item" key={feature.title}>
                  <span>
                    <Icon />
                  </span>
                  <h3>{feature.title}</h3>
                </div>
              );
            })}
          </FadeInUp>

          <FadeInUp delay={300}>
            <ul className="features-list">
              {coreFeatures.bullets.map((item) => (
                <li key={item}>
                  <CheckCircle2 />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeInUp>

          <FadeInUp delay={400} className="features-cta">
            <Button href={coreFeatures.cta.href}>{coreFeatures.cta.label}</Button>
          </FadeInUp>
        </div>

        <div className="features-collage">
          <div className="features-collage__left">
            <div className="glass-image features-image features-image--first">
              <Image
                src={coreFeatures.images[0]}
                alt=""
                width={370}
                height={390}
                sizes="(max-width: 991px) 45vw, 29vw"
                className="features-image__media"
              />
            </div>

            <div className="features-stat">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                className="features-stat__counter"
                valueClassName="features-stat__value"
              />
            </div>
          </div>

          <div className="features-collage__right">
            <div className="features-highlight">
              <span className="features-highlight__icon">
                <Award />
              </span>
              <p>{coreFeatures.highlight}</p>
            </div>

            <div className="glass-image features-image features-image--second">
              <Image
                src={coreFeatures.images[1]}
                alt=""
                width={370}
                height={390}
                sizes="(max-width: 991px) 45vw, 29vw"
                className="features-image__media"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
