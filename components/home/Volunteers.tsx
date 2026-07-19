import { getRequestSite } from "@/lib/cms/site";
import { getPublishedTeam } from "@/lib/cms/content";
import { VolunteersClient } from "@/components/home/VolunteersClient";

export async function Volunteers() {
  const site = await getRequestSite();
  const members = (await getPublishedTeam(site.id)).slice(0, 3).map((m) => ({
    slug: m.slug,
    name: m.name,
    role: m.role,
    image: m.image_url || "/images/awfca/page-title.jpg",
  }));

  return <VolunteersClient members={members} />;
}
