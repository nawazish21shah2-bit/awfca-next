import { getRequestSite } from "@/lib/cms/site";
import { getPublishedCounters } from "@/lib/cms/content";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";

export async function HeroSection() {
  const site = await getRequestSite();
  const counters = await getPublishedCounters(site.id, "hero");
  const counter = counters[0]
    ? {
        value: Number(counters[0].value),
        suffix: counters[0].suffix,
        label: counters[0].label,
      }
    : undefined;

  return (
    <>
      <Hero />
      <TrustStrip counter={counter} />
    </>
  );
}
