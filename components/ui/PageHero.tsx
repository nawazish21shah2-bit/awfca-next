import Link from "next/link";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FadeInUp } from "@/components/effects/FadeInUp";

type Crumb = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  breadcrumbs: readonly Crumb[];
  background: string;
  brand?: string;
};

export function PageHero({
  title,
  breadcrumbs,
  background,
  brand = site.shortName,
}: Props) {
  return (
    <section
      className="about-page-hero"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="about-page-hero__overlay" />
      <div className="about-page-hero__glow" aria-hidden />
      <div className="container-site about-page-hero__inner">
        <FadeInUp>
          <p className="about-page-hero__brand">{brand}</p>
        </FadeInUp>
        <AnimatedHeading
          as="h1"
          text={title}
          className="about-page-hero__title"
        />
        <FadeInUp delay={180}>
          <nav aria-label="Breadcrumb" className="about-page-hero__breadcrumbs">
            <ol>
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={item.href}>
                    {isLast ? (
                      <span aria-current="page">{item.label}</span>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </FadeInUp>
      </div>
    </section>
  );
}
