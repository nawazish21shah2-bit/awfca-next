"use client";

import Image from "next/image";
import { Maximize2, MessageCircle, Users } from "lucide-react";
import { programsPage } from "@/data/programs";
import { type ProgramCardModel } from "@/lib/cms/view-models";
import { DetailSidebar } from "@/components/ui/DetailSidebar";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { ProgramGallery } from "@/components/programs/ProgramGallery";
import { ImageModal } from "@/components/ui/ImageModal";
import type { ProgramBody } from "@/lib/cms/types";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface ProgramDetailClientProps {
  program: ProgramCardModel;
  allPrograms: ProgramCardModel[];
  expectSection: ProgramBody["expect"];
  howSection: ProgramBody["how"];
  fullContent: string[];
  faqSection: ProgramBody["faq"];
  programFaqs: { question: string; answer: string }[];
  galleryImages: string[];
}

export function ProgramDetailClient({
  program,
  allPrograms,
  expectSection,
  howSection,
  fullContent,
  faqSection,
  programFaqs,
  galleryImages,
}: ProgramDetailClientProps) {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const expectIcons = [MessageCircle, Users];

  return (
    <section className="program-detail">
      <div className="container-site program-detail__grid">
        <DetailSidebar
          navTitle="Explore Our Programs"
          items={allPrograms.slice(0, 8).map((item) => ({
            href: `/programs/${item.slug}`,
            label: item.navLabel,
            current: item.slug === program.slug,
          }))}
          contact={programsPage.contact}
        />

        <div className="program-detail__main">
          <div className="program-detail__intro">
            <FadeInUp>
              <div className="program-detail__image image-shine relative group">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="cursor-pointer"
                  onClick={() => setModalImage({ src: program.image, alt: program.title })}
                />
                <button
                  type="button"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setModalImage({ src: program.image, alt: program.title })}
                  aria-label="View full-size image"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </FadeInUp>

            {galleryImages.length ? (
              <FadeInUp delay={60}>
                <ProgramGallery title={program.title} images={galleryImages} />
              </FadeInUp>
            ) : null}

            <FadeInUp delay={80} className="program-detail__copy">
              {fullContent.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </FadeInUp>
          </div>

          {expectSection && (
            <div className="program-expect">
              <div className="program-expect__content">
                <AnimatedHeading
                  text={expectSection.title || "What to expect"}
                  className="program-expect__title"
                />
                <FadeInUp>
                  <p>{expectSection.text}</p>
                </FadeInUp>
                {expectSection.items && expectSection.items.length > 0 && (
                  <div className="program-expect__blocks">
                    {expectSection.items.map((item, index) => {
                      const Icon = expectIcons[index % expectIcons.length];
                      return (
                        <FadeInUp key={item.title} delay={100 + index * 60}>
                          <article>
                            <span aria-hidden="true">
                              <Icon />
                            </span>
                            <div>
                              <h3>{item.title}</h3>
                              <p>{item.text}</p>
                            </div>
                          </article>
                        </FadeInUp>
                      );
                    })}
                  </div>
                )}
              </div>
              <FadeInUp delay={120} className="program-expect__image">
                <Image
                  src={programsPage.expectImage}
                  alt=""
                  width={413}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </FadeInUp>
            </div>
          )}

          {howSection && (
            <div className="program-how">
              <AnimatedHeading
                text={howSection.title || "How we work"}
                className="program-how__title"
              />
              <FadeInUp>
                <p className="program-how__text">{howSection.text}</p>
              </FadeInUp>
              {howSection.items && howSection.items.length > 0 && (
                <FadeInUp delay={100}>
                  <Accordion
                    defaultOpen={0}
                    items={howSection.items}
                    className="program-how__accordion"
                  />
                </FadeInUp>
              )}
            </div>
          )}

          {faqSection && (
            <div className="program-faq">
              <AnimatedHeading
                text={faqSection.title || "Frequently asked questions"}
                className="program-faq__title"
              />
              <FadeInUp>
                <p className="program-faq__text">{faqSection.text}</p>
              </FadeInUp>
              {programFaqs.length > 0 && (
                <FadeInUp delay={100}>
                  <Accordion
                    items={programFaqs}
                    defaultOpen={0}
                    className="program-faq__accordion"
                  />
                </FadeInUp>
              )}
            </div>
          )}
        </div>
      </div>
      
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </section>
  );
}