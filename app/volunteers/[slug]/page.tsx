import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedTeam, getPublishedTeamMember } from "@/lib/cms/content";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const site = await getRequestSite();
    const team = await getPublishedTeam(site.id);
    return team.map((v) => ({ slug: v.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getRequestSite();
  const v = await getPublishedTeamMember(site.id, slug);
  return { title: v?.name || "Team member" };
}

export default async function VolunteerDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = await getRequestSite();
  const volunteer = await getPublishedTeamMember(site.id, slug);
  if (!volunteer) notFound();

  return (
    <PageShell
      eyebrow={volunteer.role}
      title={volunteer.name}
      text={volunteer.bio}
    >
      <Image
        src={volunteer.image_url || "/images/awfca/page-title.jpg"}
        alt={volunteer.name}
        width={400}
        height={459}
        className="mb-8 max-w-sm rounded-3xl object-cover"
      />
      <div className="flex flex-wrap gap-3">
        <Button href="/volunteers/apply">Apply to volunteer</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </PageShell>
  );
}
