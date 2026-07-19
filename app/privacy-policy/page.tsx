import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getLegalPage } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  const page = getLegalPage("privacy-policy");
  if (!page) notFound();
  return <LegalContent page={page} />;
}
