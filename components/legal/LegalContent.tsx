import { PageHero } from "@/components/ui/PageHero";
import { FadeInUp } from "@/components/effects/FadeInUp";
import type { LegalPage } from "@/data/legal";
import { legalPages } from "@/data/legal";
import { pageHeroImages } from "@/data/page-heroes";
import Link from "next/link";

type Props = {
  page: LegalPage;
};

export function LegalContent({ page }: Props) {
  return (
    <>
      <PageHero
        title={page.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: page.title, href: `/${page.slug}` },
        ]}
        background={pageHeroImages.legal}
      />

      <section className="legal-page">
        <div className="container-site legal-page__inner">
          <FadeInUp className="legal-page__intro">
            <p className="legal-page__updated">Last updated: {page.updated}</p>
            <p className="legal-page__lead">{page.intro}</p>
          </FadeInUp>

          <div className="legal-page__sections">
            {page.sections.map((section, index) => (
              <FadeInUp
                key={section.heading}
                delay={index * 60}
                className="legal-page__section"
              >
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={`${section.heading}-${paragraphIndex}`}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </FadeInUp>
            ))}
          </div>

          <FadeInUp delay={120} className="legal-page__nav">
            <h3>Related policies</h3>
            <ul>
              {legalPages
                .filter((item) => item.slug !== page.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              <li>
                <Link href="/faqs">Help Center / FAQs</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
