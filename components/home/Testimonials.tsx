"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { testimonials } from "@/data/home";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Counter } from "@/components/ui/Counter";
import { FadeInUp } from "@/components/effects/FadeInUp";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.438 5.489c0.451-0.451 1.161-0.451 1.613 0 0.436 0.436 0.436 1.161 0 1.596l-8.176 8.176h26.981c0.629 0 1.145 0.5 1.145 1.129s-0.516 1.145-1.145 1.145h-26.981l8.176 8.161c0.436 0.451 0.436 1.178 0 1.613-0.451 0.451-1.161 0.451-1.613 0l-10.112-10.112c-0.436-0.436-0.436-1.161 0-1.596l10.112-10.112z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M21.548 5.088c-0.436-0.451-1.162-0.451-1.613 0-0.436 0.436-0.436 1.162 0 1.596l8.177 8.177h-26.984c-0.629 0.001-1.129 0.501-1.129 1.13s0.5 1.145 1.129 1.145h26.984l-8.177 8.162c-0.436 0.451-0.436 1.178 0 1.613 0.451 0.451 1.178 0.451 1.613 0l10.113-10.113c0.451-0.436 0.451-1.162 0-1.596l-10.113-10.114z" />
    </svg>
  );
}

export function Testimonials() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="testimonials-section">
      <div className="container-site testimonials-section__grid">
        <div className="testimonials-content">
          <FadeInUp>
            <SectionEyebrow className="testimonials-eyebrow">
              {testimonials.eyebrow}
            </SectionEyebrow>
          </FadeInUp>

          <AnimatedHeading text={testimonials.title} className="testimonials-title" />

          <FadeInUp delay={100} className="testimonials-slider">
            <button
              ref={setPrevEl}
              type="button"
              className="testimonials-nav testimonials-swiper-prev"
              aria-label="Previous testimonial"
            >
              <ArrowLeftIcon />
            </button>
            <button
              ref={setNextEl}
              type="button"
              className="testimonials-nav testimonials-swiper-next"
              aria-label="Next testimonial"
            >
              <ArrowRightIcon />
            </button>

            <Swiper
              modules={[Navigation]}
              loop
              speed={1000}
              slidesPerView={1}
              navigation={{
                prevEl,
                nextEl,
              }}
              className="testimonials-swiper"
            >
              {testimonials.items.map((t) => (
                <SwiperSlide key={t.name}>
                  <article className="testimonial-card">
                    <Quote className="testimonial-card__quote" />
                    <p className="testimonial-card__text">{t.quote}</p>
                    <div className="testimonial-card__author">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={50}
                        height={50}
                        className="testimonial-card__avatar"
                      />
                      <div className="testimonial-card__author-body">
                        <h3>{t.name}</h3>
                        <p>{t.role}</p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeInUp>
        </div>

        <FadeInUp delay={150} className="testimonials-visual">
          <div className="glass-image testimonials-image">
            <Image
              src={testimonials.image}
              alt=""
              width={500}
              height={520}
              sizes="(max-width: 1023px) 83vw, 41vw"
              className="testimonials-image__media"
            />
          </div>

          <div className="testimonials-rating">
            <div className="testimonials-rating__score">
              <Counter
                value={testimonials.rating}
                suffix="/5"
                decimals={1}
                valueClassName="testimonials-rating__value"
              />
              <div className="testimonials-rating__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>
            <p>{testimonials.ratingNote}</p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
