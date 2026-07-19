import Image from "next/image";
import Link from "next/link";
import {
  footerQuickLinks,
  footerServices,
  footerSupport,
  site,
  socialLinks,
} from "@/data/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AtSign, Globe, Share2, Users, Video } from "lucide-react";

const icons = {
  pinterest: Share2,
  facebook: Users,
  instagram: Globe,
  youtube: Video,
  tiktok: AtSign,
};

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="site-footer__top">
          <Image
            src="/images/logo-awfca.png"
            alt={site.name}
            width={72}
            height={72}
            className="site-footer__logo"
          />
          <p className="site-footer__about">{site.description}</p>
          <ul className="site-footer__socials">
            {socialLinks.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="site-footer__main">
          <div className="site-footer__newsletter">
            <h2>Subscribe for Updates</h2>
            <p>
              Subscribe to receive updates about our latest campaigns, success
              stories, and ways you can help AWFCA fight poverty.
            </p>
            <NewsletterForm />
          </div>
          <FooterCol title="Quick Links" links={footerQuickLinks} />
          <FooterCol title="Our Services" links={footerServices} />
          <FooterCol title="Support" links={footerSupport} />
        </div>
      </div>

      <div className="container-site site-footer__copyright">
        <p>{site.copyright}</p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="site-footer__column">
      <h3>{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
