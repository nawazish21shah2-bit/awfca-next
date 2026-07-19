import { site } from "@/data/site";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";

export default function DonateCancelPage() {
  return (
    <PageShell
      eyebrow="Donation cancelled"
      title="No charge was made"
      text="You can return to the donation portal whenever you are ready, or contact AWFCA for e-transfer and other giving options."
    >
      <div className="flex flex-wrap gap-3">
        <Button href={site.donateUrl}>Try again</Button>
        <Button href="/donate" variant="secondary">
          Donation options
        </Button>
      </div>
    </PageShell>
  );
}
