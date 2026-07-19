import Link from "next/link";
import { ArrowUpRight, Headphones } from "lucide-react";
import { site } from "@/data/site";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { cn } from "@/lib/cn";

export type DetailNavItem = {
  href: string;
  label: string;
  current?: boolean;
};

type Props = {
  navTitle: string;
  items: DetailNavItem[];
  contact?: {
    title: string;
    text: string;
    email: string;
  };
};

const defaultContact = {
  title: "Contact Us",
  text: "Join our growing community of supporters and explore ways to help AWFCA.",
  email: site.email,
};

export function DetailSidebar({
  navTitle,
  items,
  contact = defaultContact,
}: Props) {
  return (
    <aside className="detail-sidebar">
      <FadeInUp>
        <nav className="detail-sidebar__nav" aria-label={navTitle}>
          <h3>{navTitle}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(item.current && "is-active")}
                  aria-current={item.current ? "page" : undefined}
                >
                  <ArrowUpRight aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </FadeInUp>

      <FadeInUp delay={100}>
        <div className="detail-sidebar__contact">
          <div className="detail-sidebar__contact-copy">
            <span className="detail-sidebar__contact-icon" aria-hidden="true">
              <Headphones />
            </span>
            <h3>{contact.title}</h3>
            <p>{contact.text}</p>
          </div>
          <p className="detail-sidebar__contact-email">
            Email Us:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </FadeInUp>
    </aside>
  );
}
