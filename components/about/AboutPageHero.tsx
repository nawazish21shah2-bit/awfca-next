import { aboutPage } from "@/data/about";
import { PageHero } from "@/components/ui/PageHero";

export function AboutPageHero() {
  const { hero } = aboutPage;

  return (
    <PageHero
      title={hero.title}
      breadcrumbs={hero.breadcrumbs}
      background={hero.background}
    />
  );
}
