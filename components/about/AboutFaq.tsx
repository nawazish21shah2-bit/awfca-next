import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { aboutPage } from "@/data/about";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Accordion } from "@/components/ui/Accordion";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function AboutFaq() {
  const { faq } = aboutPage;

  return (
    <section className="about-page-faq">
      <div className="container-site about-page-faq__grid">
        <FadeInUp className="about-page-faq__media">
          <div className="glass-image about-page-faq__image">
            <Image
              src={faq.image}
              alt=""
              width={524}
              height={667}
              sizes="(max-width: 1023px) 100vw, 41vw"
            />
          </div>
          <Link
            href="/contact"
            className="about-page-faq__contact-ring"
            aria-label="Contact us"
          >
            <svg viewBox="0 0 120 120" aria-hidden>
              <defs>
                <path
                  id="about-faq-contact-path"
                  d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                />
              </defs>
              <text>
                <textPath href="#about-faq-contact-path">
                  CONTACT US • CONTACT US • CONTACT US •
                </textPath>
              </text>
            </svg>
          </Link>
          <div className="about-page-faq__rating">
            <div className="about-page-faq__stars" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} />
              ))}
            </div>
            <div className="about-page-faq__avatars">
              {faq.avatars.map((src) => (
                <Image key={src} src={src} alt="" width={40} height={40} />
              ))}
            </div>
            <div className="about-page-faq__score-row">
              <svg
                className="about-page-faq__google"
                viewBox="0 0 40 40"
                aria-hidden
              >
                <path d="M8.86 24.17 7.47 29.37l-5.09.11A20 20 0 0 1 2.24 10.8l4.53.83 1.98 4.5A11.9 11.9 0 0 0 8.86 24.17Z" fill="#FBBB00" />
                <path d="M39.65 16.26A20 20 0 0 1 32.52 35.6l-5.71-.3-.8-5.04a11.92 11.92 0 0 0 5.12-6.09H20.44v-7.91h19.21Z" fill="#518EF8" />
                <path d="M32.52 35.6A20 20 0 0 1 2.38 29.48l6.48-5.31A11.89 11.89 0 0 0 26 30.26l6.52 5.34Z" fill="#28B446" />
                <path d="m32.77 4.6-6.48 5.31A11.88 11.88 0 0 0 8.75 16.14L2.24 10.8A20 20 0 0 1 32.77 4.6Z" fill="#DE103C" />
              </svg>
              <div>
                <Counter
                  value={faq.rating}
                  suffix="/5"
                  decimals={1}
                  valueClassName="about-page-faq__score-value"
                />
                <p>{faq.ratingNote}</p>
              </div>
            </div>
          </div>
        </FadeInUp>

        <div className="about-page-faq__content">
          <FadeInUp>
            <SectionEyebrow
              variant="muted"
              withDot={false}
              className="about-page-faq__eyebrow"
            >
              {faq.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading text={faq.title} className="about-page-faq__title" />
          <FadeInUp delay={120}>
            <Accordion
              items={[...faq.items]}
              defaultOpen={0}
              className="about-page-faq__accordion"
            />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
