import { getRequestSite } from "@/lib/cms/site";
import { getPublishedPosts } from "@/lib/cms/content";
import { toBlogCard } from "@/lib/cms/view-models";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeInUp } from "@/components/effects/FadeInUp";

export async function BlogGrid() {
  const site = await getRequestSite();
  const posts = (await getPublishedPosts(site.id)).map(toBlogCard);

  return (
    <section className="blog-page">
      <div className="container-site">
        <FadeInUp className="blog-page__intro">
          <p>
            Follow AWFCA campaigns, volunteer moments, and the community stories
            that show how generosity turns into lasting change.
          </p>
        </FadeInUp>
        <div className="blog-page__grid">
          {posts.map((post, index) => (
            <FadeInUp key={post.slug} delay={index * 100}>
              <BlogCard post={post} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
