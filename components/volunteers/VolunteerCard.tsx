import Image from "next/image";
import Link from "next/link";
import { AtSign, Globe, Share2, Users, Video } from "lucide-react";
import { socialLinks } from "@/data/site";

type Props = {
  slug: string;
  name: string;
  role: string;
  image: string;
};

const socialIcons = {
  pinterest: Share2,
  facebook: Users,
  instagram: Globe,
  youtube: Video,
  tiktok: AtSign,
};

export function VolunteerCard({ slug, name, role, image }: Props) {
  return (
    <article className="group about-page-volunteer-card">
      <div className="image-shine about-page-volunteer-card__image">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="about-page-volunteer-card__media"
        />
        <div className="about-page-volunteer-card__overlay">
          <div className="about-page-volunteer-card__info">
            <Link href={`/volunteers/${slug}`}>{name}</Link>
            <p>{role}</p>
          </div>
        </div>
        <div className="about-page-volunteer-card__socials">
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.icon] ?? Share2;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} on ${link.label}`}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
