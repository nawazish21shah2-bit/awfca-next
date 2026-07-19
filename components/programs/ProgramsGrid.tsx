import Image from "next/image";
import Link from "next/link";
import { Folder } from "lucide-react";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedPrograms } from "@/lib/cms/content";
import { toProgramCard, type ProgramCardModel } from "@/lib/cms/view-models";
import {
  getProgramCategory,
  programCategories,
  type ProgramCategory,
} from "@/data/program-categories";
import { programsPage } from "@/data/programs";
import { FadeInUp } from "@/components/effects/FadeInUp";

type Props = {
  categoryId?: string | null;
};

function ProgramCard({
  item,
  index,
}: {
  item: ProgramCardModel;
  index: number;
}) {
  return (
    <FadeInUp delay={index * 80}>
      <article className="program-item">
        <div className="program-item__image image-shine">
          <Link href={`/programs/${item.slug}`}>
            <Image
              src={item.image}
              alt={item.title}
              width={640}
              height={468}
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="program-item__media"
            />
          </Link>
        </div>

        <div className="program-item__body">
          <div className="program-item__meta">
            <ul>
              <li>
                <span>
                  <Folder aria-hidden />
                  {item.category}
                </span>
              </li>
            </ul>
          </div>

          <div className="program-item__content">
            <h2>
              <Link href={`/programs/${item.slug}`}>{item.title}</Link>
            </h2>
          </div>

          <div className="program-item__btn">
            <Link href={`/programs/${item.slug}`}>
              Read More
              <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                <path d="M13.4442 1.43172C13.4442 0.948461 13.0523 0.556709 12.5692 0.556705L4.69414 0.556641C4.21089 0.556636 3.81914 0.948382 3.81914 1.43164C3.81913 1.91488 4.21088 2.30664 4.69413 2.30664L11.6941 2.3067V9.30669C11.6941 9.78995 12.0858 10.1817 12.5691 10.1817C13.0523 10.1817 13.4441 9.78995 13.4441 9.30669L13.4442 1.43172ZM2.0509 13.1872L13.1879 2.05043L11.9505 0.812981L0.813477 11.9497L2.0509 13.1872Z" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </FadeInUp>
  );
}

function groupPrograms(
  items: ProgramCardModel[],
  categories: readonly ProgramCategory[],
) {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return categories
    .map((category) => ({
      category,
      items: category.programSlugs
        .map((slug) => bySlug.get(slug))
        .filter((item): item is ProgramCardModel => Boolean(item)),
    }))
    .filter((group) => group.items.length > 0);
}

export async function ProgramsGrid({ categoryId = null }: Props) {
  const site = await getRequestSite();
  const items = (await getPublishedPrograms(site.id)).map(toProgramCard);
  const activeCategory = getProgramCategory(categoryId);
  const groups = activeCategory
    ? groupPrograms(items, [activeCategory])
    : groupPrograms(items, programCategories);

  return (
    <section className="programs-section">
      <div className="container-site programs-section__inner">
        <FadeInUp className="programs-section__intro">
          <p>
            {activeCategory
              ? `Explore AWFCA’s ${activeCategory.shortLabel.toLowerCase()} initiatives — practical support delivered with compassion and accountability.`
              : programsPage.intro}
          </p>
        </FadeInUp>

        <div className="programs-category-nav" aria-label="Program categories">
          <Link
            href="/programs"
            className={!activeCategory ? "is-active" : undefined}
          >
            All Programs
          </Link>
          {programCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={activeCategory?.id === category.id ? "is-active" : undefined}
            >
              {category.shortLabel}
            </Link>
          ))}
        </div>

        {groups.map(({ category, items: groupItems }) => (
          <div key={category.id} className="programs-category-block">
            {!activeCategory ? (
              <div className="programs-category-block__head">
                <h2>{category.label}</h2>
                <Link href={category.href}>View category</Link>
              </div>
            ) : null}
            <div className="programs-grid">
              {groupItems.map((item, index) => (
                <ProgramCard key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
