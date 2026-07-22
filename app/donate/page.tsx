import type { Metadata } from "next";
import { ArrowUpRight, HeartHandshake, Mail, ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support AWFCA online, by e-transfer, or through Zakat-eligible giving. Help fight poverty with transparent community impact.",
};

export default function DonatePage() {
  return (
    <div className="donate-page">
      <section className="donate-hero">
        <div className="donate-hero__glow" aria-hidden />
        <div className="container-site donate-hero__inner">
          <p className="donate-hero__brand">{site.shortName}</p>
          <h1 className="donate-hero__title">
            Give hope that reaches families who need it most
          </h1>
          <p className="donate-hero__text">
            Your gift helps AWFCA deliver food packages, scholarships, healthcare,
            and emergency relief — with transparent, Zakat-eligible impact.
          </p>
          <div className="donate-hero__actions">
            <Button href={site.donateUrl}>Donate on IRM</Button>
            <Button href="#other-ways" variant="ghost">
              Other ways to give
            </Button>
          </div>
        </div>
      </section>

      <section className="donate-body">
        <div className="container-site donate-body__grid">
          <div className="donate-panel donate-panel--main">
            <p className="donate-panel__eyebrow">Secure online giving</p>
            <h2>Support verified AWFCA programs</h2>
            <p>
              Donate through AWFCA&apos;s trusted online giving portal. You can make
              a one-time or monthly contribution, and all projects are designed to
              be Zakat-eligible.
            </p>
            <Button href={site.donateUrl} className="donate-panel__cta">
              Continue to donation portal
              <span className="sr-only"> (opens in a new tab)</span>
            </Button>

            <ul className="donate-points">
              <li>
                <ShieldCheck aria-hidden />
                <span>
                  Eligible donations receive tax receipts. Online gifts generate
                  instant confirmation, and official receipts are typically issued
                  by mid-February.
                </span>
              </li>
              <li>
                <HeartHandshake aria-hidden />
                <span>
                  Donations are directed toward direct aid for
                  families and communities in need.
                </span>
              </li>
              <li>
                <Mail aria-hidden />
                <span>
                  Prefer e-transfer? Send your gift to{" "}
                  <a href={`mailto:${site.donateEmail}`}>{site.donateEmail}</a>.
                </span>
              </li>
            </ul>
          </div>

          <aside id="other-ways" className="donate-panel donate-panel--aside">
            <h2>Other ways to give</h2>
            <p>
              AWFCA also accepts cash and cheque donations. Contact our team for
              guidance on Zakat, Sadaqah, Fidyaa, and seasonal campaigns.
            </p>
            <dl className="donate-contact">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{site.address}</dd>
              </div>
            </dl>
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="donate-aside-link"
            >
              Open donation portal
              <ArrowUpRight aria-hidden />
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
