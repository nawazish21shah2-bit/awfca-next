import Image from "next/image";
import { LifeBuoy } from "lucide-react";
import {
  getService,
  serviceItems,
  servicesPage,
} from "@/data/services";
import { DetailSidebar } from "@/components/ui/DetailSidebar";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

type Props = {
  slug: string;
};

export function ServiceDetail({ slug }: Props) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <section className="service-detail">
      <div className="container-site service-detail__grid">
        <DetailSidebar
          navTitle="Explore Our Services"
          items={serviceItems.map((item) => ({
            href: `/services/${item.slug}`,
            label: item.title,
            current: item.slug === slug,
          }))}
          contact={servicesPage.contact}
        />

        <div className="service-detail__main">
          <FadeInUp>
            <div className="service-detail__image image-shine">
              <Image
                src={service.image}
                alt={service.title}
                width={857}
                height={520}
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
          </FadeInUp>

          <FadeInUp delay={80} className="service-detail__copy">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </FadeInUp>

          <div className="service-detail__block">
            <AnimatedHeading
              text={service.contribute.title}
              className="service-detail__heading"
            />
            <FadeInUp>
              <div className="service-detail__copy">
                {service.contribute.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </FadeInUp>
            <FadeInUp delay={100} className="service-detail__contribute">
              <div className="service-detail__contribute-cards">
                {service.contribute.cards.map((card, index) => (
                  <article key={`${card.title}-${index}`}>
                    <span aria-hidden="true">
                      <LifeBuoy />
                    </span>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </FadeInUp>
          </div>

          <div className="service-detail__block">
            <AnimatedHeading
              text={service.impact.title}
              className="service-detail__heading"
            />
            <FadeInUp>
              <div className="service-detail__copy">
                {service.impact.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </FadeInUp>
            <FadeInUp delay={100} className="service-detail__stats">
              {service.impact.stats.map((stat) => (
                <article key={stat.label}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    valueClassName="service-detail__stat-value"
                  />
                  <h3>{stat.label}</h3>
                  <p>{stat.text}</p>
                </article>
              ))}
            </FadeInUp>
          </div>

          <div className="service-detail__block">
            <AnimatedHeading
              text={service.faq.title}
              className="service-detail__heading"
            />
            <FadeInUp>
              <p className="service-detail__faq-intro">{service.faq.text}</p>
            </FadeInUp>
            <FadeInUp delay={100}>
              <Accordion
                items={[...service.faq.items]}
                defaultOpen={0}
                className="service-detail__accordion"
              />
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
