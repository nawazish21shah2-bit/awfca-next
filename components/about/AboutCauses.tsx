import Image from "next/image";
import Link from "next/link";
import { aboutPage } from "@/data/about";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function AboutCauses() {
  const { causes } = aboutPage;

  return (
    <section className="about-page-causes">
      <Image
        src="/images/section-bg-shape-1.png"
        alt=""
        width={221}
        height={242}
        className="about-page-causes__shape"
      />

      <div className="container-site about-page-causes__inner">
        <div className="about-page-causes__header">
          <div>
            <FadeInUp>
              <SectionEyebrow className="about-page-causes__eyebrow">
                {causes.eyebrow}
              </SectionEyebrow>
            </FadeInUp>
            <AnimatedHeading
              text={causes.title}
              className="about-page-causes__title"
            />
          </div>
          <FadeInUp delay={100} className="about-page-causes__intro">
            <p>{causes.text}</p>
            <Button href={causes.cta.href}>{causes.cta.label}</Button>
          </FadeInUp>
        </div>

        <div className="about-page-causes__grid">
          {causes.items.map((item, index) => (
            <FadeInUp key={item.title} delay={index * 100}>
              <article
                className="about-page-causes__card"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="about-page-causes__card-overlay" />
                <span className="about-page-causes__tag">{item.tag}</span>
                <div className="about-page-causes__card-body">
                  <h3>{item.title}</h3>
                  <Link href={item.href} className="about-page-causes__link">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M13.4442 1.43172C13.4442 0.948461 13.0523 0.556709 12.5692 0.556705L4.69414 0.556641C4.21089 0.556636 3.81914 0.948382 3.81914 1.43164C3.81914 1.91489 4.21089 2.30664 4.69414 2.30664H10.5312L1.06918 11.7687C0.727547 12.1103 0.727547 12.6643 1.06918 13.0059C1.41081 13.3475 1.96477 13.3475 2.3064 13.0059L11.7684 3.54387V9.38096C11.7684 9.86421 12.1602 10.256 12.6434 10.256C13.1267 10.256 13.5184 9.86421 13.5184 9.38096L13.4442 1.43172Z" />
                    </svg>
                  </Link>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={200} className="about-page-causes__note">
          <Image
            src={causes.contactImage}
            alt=""
            width={50}
            height={50}
          />
          <p>
            {causes.contactNote}{" "}
            <Link href={causes.contactCta.href}>
              {causes.contactCta.label}
            </Link>
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
