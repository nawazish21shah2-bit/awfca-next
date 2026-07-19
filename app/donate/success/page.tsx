import Link from "next/link";
import { site } from "@/data/site";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function DonateSuccessPage() {
  return (
    <PageShell
      eyebrow="Thank you"
      title="Your generosity makes a difference"
      text="Thank you for supporting Arrahman Welfare Foundation Canada. Your gift helps deliver food, education, healthcare, and emergency relief."
    >
      <Button href="/">Back to Home</Button>
      <p className="mt-4 text-sm text-muted">
        Need a receipt or have a question?{" "}
        <Link href="/contact" className="text-accent underline">
          Contact us
        </Link>{" "}
        or email{" "}
        <a href={`mailto:${site.email}`} className="text-accent underline">
          {site.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
