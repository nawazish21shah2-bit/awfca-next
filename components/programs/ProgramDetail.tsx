import Image from "next/image";
import { MessageCircle, Users } from "lucide-react";
import { programsPage } from "@/data/programs";
import { getRequestSite } from "@/lib/cms/site";
import {
  getPublishedProgram,
  getPublishedPrograms,
  getPublishedFaqItems,
} from "@/lib/cms/content";
import { toProgramCard } from "@/lib/cms/view-models";
import { DetailSidebar } from "@/components/ui/DetailSidebar";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { ProgramGallery } from "@/components/programs/ProgramGallery";

type Props = {
  slug: string;
};

const expectIcons = [MessageCircle, Users];

export async function ProgramDetail({ slug }: Props) {
  const site = await getRequestSite();
  const programRow = await getPublishedProgram(site.id, slug);
  if (!programRow) return null;

  const program = toProgramCard(programRow);
  const allPrograms = (await getPublishedPrograms(site.id)).map(toProgramCard);
  const homeFaqs = (await getPublishedFaqItems(site.id))
    .filter((f) => f.placement === "home" || f.placement === "both")
    .map((f) => ({ question: f.question, answer: f.answer }));

  const { detail } = programsPage;
  const galleryImages = program.gallery.filter((src) => src !== program.image);

  return (
    <section className="program-detail">
      <div className="container-site program-detail__grid">
        <DetailSidebar
          navTitle="Explore Our Programs"
          items={allPrograms.slice(0, 8).map((item) => ({
            href: `/programs/${item.slug}`,
            label: item.navLabel,
            current: item.slug === slug,
          }))}
          contact={programsPage.contact}
        />

        <div className="program-detail__main">
          <div className="program-detail__intro">
            <FadeInUp>
              <div className="program-detail__image image-shine">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            </FadeInUp>

            {galleryImages.length ? (
              <FadeInUp delay={60}>
                <ProgramGallery title={program.title} images={galleryImages} />
              </FadeInUp>
            ) : null}

            <FadeInUp delay={80} className="program-detail__copy">
              {program.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </FadeInUp>
          </div>

          <div className="program-expect">
            <div className="program-expect__content">
              <AnimatedHeading
                text={detail.expect.title}
                className="program-expect__title"
              />
              <FadeInUp>
                <p>{detail.expect.text}</p>
              </FadeInUp>
              <div className="program-expect__blocks">
                {detail.expect.items.map((item, index) => {
                  const Icon = expectIcons[index] ?? MessageCircle;
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

          <div className="program-how">
            <AnimatedHeading
              text={detail.how.title}
              className="program-how__title"
            />
            <FadeInUp>
              <p className="program-how__text">{detail.how.text}</p>
            </FadeInUp>
            <FadeInUp delay={100}>
              <Accordion
                defaultOpen={0}
                items={[...detail.how.items]}
                className="program-how__accordion"
              />
            </FadeInUp>
          </div>

          <div className="program-faq">
            <AnimatedHeading
              text={detail.faq.title}
              className="program-faq__title"
            />
            <FadeInUp>
              <p className="program-faq__text">{detail.faq.text}</p>
            </FadeInUp>
            <FadeInUp delay={100}>
              <Accordion
                items={homeFaqs}
                defaultOpen={0}
                className="program-faq__accordion"
              />
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
