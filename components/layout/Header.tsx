"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AtSign,
  ChevronDown,
  Globe,
  Mail,
  Menu,
  Phone,
  Share2,
  Users,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, site, socialLinks, type NavItem } from "@/data/site";
import {
  getProgramsForCategory,
  programCategories,
} from "@/data/program-categories";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const socialIcons = {
  pinterest: Share2,
  facebook: Users,
  instagram: Globe,
  youtube: Video,
  tiktok: AtSign,
};

const programsMegaNav = programCategories.map((category) => ({
  label: category.shortLabel,
  href: category.href,
  children: getProgramsForCategory(category).map((program) => ({
    label: program.navLabel,
    href: `/programs/${program.slug}`,
  })),
}));

function isProgramsItem(item: NavItem) {
  return item.label === "Programs";
}

function pathMatches(pathname: string, href: string) {
  if (href === "#") return false;
  if (href === "/") return pathname === "/";
  const base = href.split("?")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const compact = scrolled || open;

  return (
    <header
      className={cn("site-header fixed inset-x-0 top-0 z-[100]", compact && "is-compact")}
    >
      <div className="site-header__top">
        <div className="container-site site-header__top-inner">
          <div className="site-header__top-contacts">
            <a href={site.phoneHref} className="site-header__top-link">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="site-header__top-link">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              <span>{site.email}</span>
            </a>
          </div>
          <ul className="site-header__top-socials">
            {socialLinks.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-header__top-social"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={cn(
          "site-header__bar transition-colors duration-300",
          compact
            ? "is-solid bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="container-site site-header__inner flex items-center justify-between gap-4">
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/images/logo-awfca.png"
              alt={site.name}
              width={56}
              height={56}
              priority
              className="h-12 w-12 object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) => {
              const mega = isProgramsItem(item);
              return (
                <div
                  key={item.label}
                  className={cn("group relative", mega && "site-header__mega-wrap")}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "site-header__link inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition",
                      pathMatches(pathname, item.href) ? "is-active" : "text-white/90 hover:text-white",
                    )}
                  >
                    {item.label}
                    {item.children || mega ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : null}
                  </Link>

                  {mega ? (
                    <div className="site-header__mega invisible absolute left-1/2 top-full z-20 w-[min(920px,90vw)] -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-accent p-5 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="site-header__mega-grid">
                        {programsMegaNav.map((category) => (
                          <div key={category.href + category.label} className="site-header__mega-col">
                            <Link
                              href={category.href}
                              className="site-header__mega-title"
                            >
                              {category.label}
                            </Link>
                            <ul>
                              {category.children.map((program) => (
                                <li key={program.href}>
                                  <Link href={program.href}>{program.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="site-header__mega-footer">
                        <Link href="/programs">View all programs</Link>
                      </div>
                    </div>
                  ) : item.children ? (
                    <div className="invisible absolute left-0 top-full min-w-56 translate-y-2 rounded-2xl border border-white/10 bg-accent py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-white/90 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/donate"
              variant="primary"
              className="site-header__donate"
            >
              Donate Now
            </Button>
          </div>

          <button
            type="button"
            className="relative z-[110] grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "site-header__mobile fixed inset-x-0 bottom-0 z-[105] bg-primary transition lg:hidden",
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none",
        )}
      >
        <nav
          className="container-site flex h-full flex-col gap-2 overflow-y-auto py-6"
          aria-label="Mobile"
        >
          {mainNav.map((item) => {
            const mega = isProgramsItem(item);
            const expanded = mobileOpen === item.label;
            return (
              <div key={item.label} className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={item.href}
                    className="block py-2 text-lg font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children || mega ? (
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white"
                      aria-expanded={expanded}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() =>
                        setMobileOpen((current) =>
                          current === item.label ? null : item.label,
                        )
                      }
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  ) : null}
                </div>

                {expanded ? (
                  mega ? (
                    <div className="mt-1 space-y-3 pl-1">
                      {programsMegaNav.map((category) => (
                        <div key={category.href + category.label}>
                          <Link
                            href={category.href}
                            className="block py-1.5 text-sm font-semibold text-white"
                            onClick={() => setOpen(false)}
                          >
                            {category.label}
                          </Link>
                          {category.children.map((program) => (
                            <Link
                              key={program.href}
                              href={program.href}
                              className="block py-1 pl-3 text-sm text-white/70"
                              onClick={() => setOpen(false)}
                            >
                              {program.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : item.children ? (
                    item.children.map((child) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className="block py-1.5 pl-3 text-white/75"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))
                  ) : null
                ) : null}
              </div>
            );
          })}
          <div onClick={() => setOpen(false)}>
            <Button href="/donate" className="mt-4 w-full">
              Donate Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
