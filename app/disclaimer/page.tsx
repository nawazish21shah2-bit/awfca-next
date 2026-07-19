import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalContent } from "@/components/legal/LegalContent";
import { getLegalPage } from "@/data/legal";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  const page = getLegalPage("disclaimer");
  if (!page) notFound();
  return <LegalContent page={page} />;
}
