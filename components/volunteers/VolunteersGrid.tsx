import { getRequestSite } from "@/lib/cms/site";
import { getPublishedTeam } from "@/lib/cms/content";
import { volunteersPage } from "@/data/volunteers";
import { VolunteerCard } from "@/components/volunteers/VolunteerCard";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { Button } from "@/components/ui/Button";

export async function VolunteersGrid() {
  const site = await getRequestSite();
  const volunteers = await getPublishedTeam(site.id);

  return (
    <section className="volunteers-page">
      <div className="container-site volunteers-page__inner">
        <FadeInUp className="volunteers-page__intro">
          <p>{volunteersPage.intro}</p>
          <Button href="/volunteers/apply">Apply to volunteer</Button>
        </FadeInUp>
        <div className="volunteers-page__grid">
          {volunteers.map((volunteer, index) => (
            <FadeInUp key={volunteer.slug} delay={index * 80}>
              <VolunteerCard
                slug={volunteer.slug}
                name={volunteer.name}
                role={volunteer.role}
                image={volunteer.image_url || "/images/awfca/page-title.jpg"}
              />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
