import { getRequestSite } from "@/lib/cms/site";
import { getPublishedPosts } from "@/lib/cms/content";
import { toBlogCard } from "@/lib/cms/view-models";
import { blogSection } from "@/data/home";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export async function BlogPreview() {
  const site = await getRequestSite();
  const posts = (await getPublishedPosts(site.id)).slice(0, 3).map(toBlogCard);

  return (
    <section className="blog-section">
      <div className="container-site">
        <div className="blog-section__header">
          <div className="blog-section__heading">
            <FadeInUp>
              <SectionEyebrow
                variant="blog"
                className="blog-section__eyebrow"
                withDot={false}
              >
                {blogSection.eyebrow}
              </SectionEyebrow>
            </FadeInUp>
            <AnimatedHeading
              text={blogSection.title}
              className="blog-section__title"
            />
          </div>

          <div className="blog-section__intro">
            <FadeInUp delay={100}>
              <p>{blogSection.text}</p>
            </FadeInUp>
            <FadeInUp delay={200}>
              <Button href={blogSection.cta.href}>
                {blogSection.cta.label}
              </Button>
            </FadeInUp>
          </div>
        </div>

        <div className="blog-section__grid grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <FadeInUp key={post.slug} delay={i * 100}>
              <BlogCard post={post} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
