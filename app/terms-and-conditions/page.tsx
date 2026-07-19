import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getLegalPage } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsAndConditionsPage() {
  const page = getLegalPage("terms-and-conditions");
  if (!page) notFound();
  return <LegalContent page={page} />;
}
