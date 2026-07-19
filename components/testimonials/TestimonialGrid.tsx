import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonialsPage } from "@/data/testimonials-page";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function TestimonialGrid() {
  return (
    <section className="testimonials-page">
      <div className="container-site testimonials-page__grid">
        {testimonialsPage.items.map((testimonial, index) => (
          <FadeInUp key={testimonial.name} delay={(index % 3) * 100}>
            <article className="testimonials-page__card">
              <div className="testimonials-page__card-body">
                <div className="testimonials-page__card-top">
                  <div className="testimonials-page__stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} />
                    ))}
                  </div>
                  <Quote className="testimonials-page__quote" aria-hidden="true" />
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
              </div>
              <div className="testimonials-page__author">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </article>
          </FadeInUp>
        ))}
      </div>
    </section>
  );
}
