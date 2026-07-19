import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { pageHeroImages } from "@/data/page-heroes";

export default function NotFound() {
  return (
    <>
      <PageHero
        title="This page could not be found"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "404", href: "/404" },
        ]}
        background={pageHeroImages.default}
      />
      <section className="error-page">
        <div className="container-site error-page__inner">
          <FadeInUp className="error-page__image">
            <Image
              src="/images/logo-awfca.png"
              alt="Arrahman Welfare Foundation Canada"
              width={280}
              height={280}
              priority
            />
          </FadeInUp>
          <FadeInUp delay={100} className="error-page__content">
            <h2>Let’s get you back on track</h2>
            <p>
              The page you requested may have moved or no longer exists. Return
              home to continue supporting AWFCA’s mission.
            </p>
            <div className="error-page__actions">
              <Button href="/">Back to homepage</Button>
              <Button href="/donate" variant="secondary">
                Donate now
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
