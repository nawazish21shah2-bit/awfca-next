import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceItems, servicesPage } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceDetail } from "@/components/services/ServiceDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return serviceItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service?.title || "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        background={service.image}
      />
      <ServiceDetail slug={slug} />
    </>
  );
}
