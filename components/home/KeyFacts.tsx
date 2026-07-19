import Image from "next/image";
import Link from "next/link";
import { Cross, Layers3, Users } from "lucide-react";
import { keyFacts } from "@/data/home";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedCounters } from "@/lib/cms/content";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

const factIcons = [Users, Layers3, Cross];

export async function KeyFacts() {
  const site = await getRequestSite();
  const counters = await getPublishedCounters(site.id, "home");
  const items =
    counters.length > 0
      ? counters.map((c) => ({
          label: c.label,
          value: Number(c.value),
          suffix: c.suffix,
          image: c.image_url || "/images/key-fact-item-image-1-silver.png",
          text: c.description || "",
        }))
      : keyFacts.items;

  return (
    <section className="facts-section">
      <Image
        src="/images/section-bg-shape-1.png"
        alt=""
        width={221}
        height={242}
        className="facts-shape facts-shape--left"
      />
      <Image
        src="/images/section-bg-shape-2.png"
        alt=""
        width={222}
        height={368}
        className="facts-shape facts-shape--right"
      />

      <div className="container-site facts-section__inner">
        <div className="facts-heading">
          <FadeInUp>
            <SectionEyebrow className="facts-eyebrow">
              {keyFacts.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading text={keyFacts.title} className="facts-title" />
        </div>

        <div className="facts-grid">
          {items.map((item, i) => {
            const Icon = factIcons[i] ?? Users;
            return (
              <FadeInUp key={item.label} delay={i * 100}>
                <article className="fact-card">
                  <div className="fact-card__main">
                    <div className="fact-card__header">
                      <Counter
                        value={item.value}
                        suffix={item.suffix}
                        label={item.label}
                        className="key-fact-counter"
                        valueClassName="key-fact-counter__value"
                      />
                      <span className="fact-card__icon">
                        <Icon />
                      </span>
                    </div>

                    <p className="fact-card__text">{item.text}</p>
                  </div>

                  <div className="fact-card__bottom">
                    <ul>
                      {keyFacts.itemBullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="fact-card__illustration">
                      <Image
                        src={item.image}
                        alt=""
                        width={219}
                        height={184}
                      />
                    </div>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={300} className="section-contact-note facts-note">
          {keyFacts.giftNote.prefix}{" "}
          <Link href={keyFacts.giftNote.linkHref}>
            {keyFacts.giftNote.linkLabel}
          </Link>{" "}
          {keyFacts.giftNote.suffix}
        </FadeInUp>
      </div>
    </section>
  );
}
