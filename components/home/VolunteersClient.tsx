"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, Globe, Heart, Link as LinkIcon, Share2 } from "lucide-react";
import { volunteersSection } from "@/data/home";
import { socialLinks } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

const socialIcons = [AtSign, Globe, Heart, LinkIcon];

async function shareVolunteer(name: string, slug: string) {
  const url = `${window.location.origin}/volunteers/${slug}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: name, url });
      return;
    }
    await navigator.clipboard.writeText(url);
  } catch {
    /* user dismissed share sheet */
  }
}

type Member = {
  slug: string;
  name: string;
  role: string;
  image: string;
};

export function VolunteersClient({ members }: { members: Member[] }) {
  return (
    <section className="volunteers-section">
      <div className="container-site volunteers-section__inner">
        <div className="volunteers-heading">
          <FadeInUp>
            <SectionEyebrow className="volunteers-eyebrow">
              {volunteersSection.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={volunteersSection.title}
            className="volunteers-title"
          />
        </div>

        <div className="volunteers-grid">
          {members.map((v, i) => (
            <FadeInUp key={v.slug} delay={i * 100}>
              <article className="group volunteer-card">
                <div className="image-shine volunteer-card__image volunteer-image">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="volunteer-card__media"
                  />
                </div>

                <div className="volunteer-card__body">
                  <div className="volunteer-card__info">
                    <Link href={`/volunteers/${v.slug}`}>{v.name}</Link>
                    <p>{v.role}</p>
                  </div>

                  <div className="volunteer-card__share">
                    <button
                      type="button"
                      aria-label={`Share ${v.name}`}
                      onClick={() => shareVolunteer(v.name, v.slug)}
                    >
                      <Share2 />
                    </button>
                    <div className="volunteer-socials">
                      {socialLinks.map((link, idx) => {
                        const Icon = socialIcons[idx] ?? LinkIcon;
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("#") ? undefined : "_blank"}
                            rel={
                              link.href.startsWith("#")
                                ? undefined
                                : "noreferrer"
                            }
                            aria-label={`${v.name} on ${link.label}`}
                          >
                            <Icon />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
