"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { aboutPage } from "@/data/about";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function AboutTestimonials() {
  const { testimonials } = aboutPage;

  return (
    <section
      className="about-page-testimonials"
      style={
        {
          "--about-testimonial-photo": `url(${testimonials.background})`,
        } as CSSProperties
      }
    >
      <div className="about-page-testimonials__overlay" />
      <div className="container-site about-page-testimonials__inner">
        <div className="about-page-testimonials__heading">
          <FadeInUp>
            <div className="about-page-testimonials__label">
              <div className="about-page-testimonials__avatars" aria-hidden>
                {testimonials.avatars.map((avatar) => (
                  <Image key={avatar} src={avatar} alt="" width={50} height={50} />
                ))}
              </div>
              <SectionEyebrow
                variant="blog"
                withDot={false}
                className="about-page-testimonials__eyebrow"
              >
                {testimonials.eyebrow}
              </SectionEyebrow>
            </div>
          </FadeInUp>
          <AnimatedHeading
            text={testimonials.title}
            className="about-page-testimonials__title"
          />
        </div>

        <FadeInUp delay={120} className="about-page-testimonials__slider">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1000}
            slidesPerView={1}
            spaceBetween={30}
          >
            {testimonials.items.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="about-page-testimonial-card">
                  <div
                    className="about-page-testimonial-card__stars"
                    aria-hidden
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} />
                    ))}
                  </div>
                  <Quote className="about-page-testimonial-card__quote" />
                  <p>{item.quote}</p>
                  <div className="about-page-testimonial-card__author">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInUp>
      </div>
    </section>
  );
}
