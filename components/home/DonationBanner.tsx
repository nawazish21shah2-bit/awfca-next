import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function DonationBanner() {
  return (
    <section className="donation-banner">
      <div className="container-site donation-banner__inner">
        <div className="donation-banner__form">
          <div className="donation-banner__card">
            <p className="donation-banner__eyebrow">Donate with AWFCA</p>
            <h2 className="donation-banner__title">
              Your gift creates real community impact
            </h2>
            <p className="donation-banner__text">
              Support AWFCA online through our secure donation portal, or send an
              e-transfer to {site.donateEmail}. All projects are designed to be
              Zakat-eligible.
            </p>
            <div className="donation-banner__actions">
              <Button href={site.donateUrl}>Donate Online</Button>
              <Button href="/donate" variant="secondary">
                Giving Options
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
