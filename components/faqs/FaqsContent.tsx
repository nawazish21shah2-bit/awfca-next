import { ArrowUpRight, Headphones } from "lucide-react";
import { faqPage } from "@/data/faqs";
import { getRequestSite } from "@/lib/cms/site";
import {
  getPublishedFaqCategories,
  getPublishedFaqItems,
} from "@/lib/cms/content";
import { Accordion } from "@/components/ui/Accordion";
import { FadeInUp } from "@/components/effects/FadeInUp";

export async function FaqsContent() {
  const site = await getRequestSite();
  const categories = await getPublishedFaqCategories(site.id);
  const items = await getPublishedFaqItems(site.id);

  const grouped = categories.map((category) => ({
    id: category.code,
    label: category.label,
    items: items
      .filter(
        (item) =>
          item.category_id === category.id &&
          (item.placement === "page" || item.placement === "both"),
      )
      .map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
  }));

  return (
    <section className="faqs-page">
      <div className="container-site faqs-page__grid">
        <aside className="faqs-page__sidebar">
          <FadeInUp>
            <nav className="faqs-page__nav" aria-label="FAQ categories">
              <ul>
                {grouped.map((item) => (
                  <li key={item.id}>
                    <a href={`#faq-${item.id}`}>
                      <ArrowUpRight aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeInUp>

          <FadeInUp delay={100}>
            <div className="faqs-page__contact">
              <div className="faqs-page__contact-copy">
                <span className="faqs-page__contact-icon" aria-hidden="true">
                  <Headphones />
                </span>
                <h3>{faqPage.contact.title}</h3>
                <p>{faqPage.contact.text}</p>
              </div>
              <p className="faqs-page__contact-email">
                Email Us:{" "}
                <a href={`mailto:${faqPage.contact.email}`}>
                  {faqPage.contact.email}
                </a>
              </p>
            </div>
          </FadeInUp>
        </aside>

        <div className="faqs-page__main">
          {grouped.map((category) => (
            <section
              id={`faq-${category.id}`}
              className="faqs-page__group"
              key={category.id}
            >
              <h2 className="faqs-page__heading">{category.label}</h2>
              <FadeInUp>
                <Accordion
                  items={category.items}
                  defaultOpen={0}
                  className="faqs-page__accordion"
                />
              </FadeInUp>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
