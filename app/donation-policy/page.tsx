import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getLegalPage } from "@/data/legal";

export const metadata: Metadata = {
  title: "Donation Policy",
};

export default function DonationPolicyPage() {
  const page = getLegalPage("donation-policy");
  if (!page) notFound();
  return <LegalContent page={page} />;
}
