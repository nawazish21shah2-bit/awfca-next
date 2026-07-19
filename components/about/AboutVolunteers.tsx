"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { aboutPage } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { VolunteerCard } from "@/components/volunteers/VolunteerCard";

export function AboutVolunteers() {
  const { volunteers } = aboutPage;

  return (
    <section className="about-page-volunteers">
      <div className="container-site about-page-volunteers__inner">
        <div className="about-page-volunteers__header">
          <div>
            <FadeInUp>
              <SectionEyebrow className="about-page-volunteers__eyebrow">
                {volunteers.eyebrow}
              </SectionEyebrow>
            </FadeInUp>
            <AnimatedHeading
              text={volunteers.title}
              className="about-page-volunteers__title"
            />
          </div>
          <FadeInUp delay={100} className="about-page-volunteers__intro">
            <p>{volunteers.text}</p>
            <Button href={volunteers.cta.href}>{volunteers.cta.label}</Button>
          </FadeInUp>
        </div>

        <FadeInUp delay={120} className="about-page-volunteers__slider">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            speed={2500}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1025: { slidesPerView: 3 },
            }}
          >
            {volunteers.items.map((volunteer) => (
              <SwiperSlide key={volunteer.slug}>
                <VolunteerCard
                  slug={volunteer.slug}
                  name={volunteer.name}
                  role={volunteer.role}
                  image={volunteer.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInUp>

        <FadeInUp delay={200} className="about-page-volunteers__note">
          <Image src={volunteers.contactImage} alt="" width={50} height={50} />
          <span className="about-page-volunteers__note-icon" aria-hidden>
            <Phone />
          </span>
          <p>
            {volunteers.contactNote}{" "}
            <Link href={volunteers.contactCta.href}>
              {volunteers.contactCta.label}
            </Link>
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
