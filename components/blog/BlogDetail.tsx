import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MessageCircle, Quote, Tag } from "lucide-react";
import type { BlogDetailModel } from "@/lib/cms/view-models";
import { site } from "@/data/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { FadeInUp } from "@/components/effects/FadeInUp";

type Props = {
  post: BlogDetailModel;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-9h3l.45-3.5H13.5V7.26c0-1.01.28-1.7 1.74-1.7H17V2.43c-.77-.1-1.55-.15-2.33-.14-2.31 0-3.89 1.41-3.89 4v2.23H8v3.5h2.78v9h2.72Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.25 6.92 1.96 1.96 0 0 0 5.25 3ZM19.5 12.98c0-3.17-1.69-4.64-3.95-4.64-1.82 0-2.63 1-3.08 1.7V8.5H9.1V19h3.37v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.79V19h3.37v-6.02Z" />
    </svg>
  );
}

export function BlogDetail({ post }: Props) {
  const article = post.body;

  return (
    <>
      <section
        className="blog-detail-hero"
        style={{ backgroundImage: `url(${post.image || "/images/awfca/home/testimonials.jpg"})` }}
      >
        <div className="blog-detail-hero__overlay" />
        <div className="container-site blog-detail-hero__inner">
          <FadeInUp>
            <p className="blog-detail-hero__brand">{site.shortName}</p>
          </FadeInUp>
          <AnimatedHeading
            as="h1"
            text={post.title}
            className="blog-detail-hero__title"
          />
          <FadeInUp delay={180}>
            <ul className="blog-detail-hero__meta">
              <li>
                <CalendarDays aria-hidden="true" />
                <time>{post.date}</time>
              </li>
              <li>
                <Tag aria-hidden="true" />
                <span>News</span>
              </li>
            </ul>
          </FadeInUp>
        </div>
      </section>

      <article className="blog-detail">
        <div className="container-site">
          <FadeInUp className="blog-detail__featured image-shine">
            <Image
              src={post.image}
              alt={post.title}
              width={1366}
              height={768}
              sizes="(max-width: 1280px) 100vw, 1216px"
              priority
            />
          </FadeInUp>

          <div className="blog-detail__content">
            <div className="blog-detail__entry">
              {article.opening.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}

              {article.quote ? (
                <blockquote>
                  <Quote aria-hidden="true" />
                  <p>{article.quote}</p>
                </blockquote>
              ) : null}

              {article.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}

              {article.heading ? <h2>{article.heading}</h2> : null}
              {article.headingText ? <p>{article.headingText}</p> : null}

              {article.bullets.length ? (
                <ul>
                  {article.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="blog-detail__footer">
              <div className="blog-detail__tags">
                <strong>Tags:</strong>
                {article.tags.map((tag) => (
                  <Link key={tag} href="/blog">
                    {tag}
                  </Link>
                ))}
              </div>
              <ul className="blog-detail__share" aria-label="Share this article">
                <li>
                  <a href="#" aria-label="Share on Facebook">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Share on WhatsApp">
                    <MessageCircle />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Share on LinkedIn">
                    <LinkedinIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <section className="blog-reply" id="respond">
            <h2>Have a question about this story?</h2>
            <p>
              Reach our team through the{" "}
              <Link href="/contact">contact form</Link>. Comments are moderated
              through staff — email {site.email}.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
