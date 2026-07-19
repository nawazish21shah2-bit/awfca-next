import Image from "next/image";
import Link from "next/link";
import type { BlogCardModel } from "@/lib/cms/view-models";

type Props = {
  post: BlogCardModel;
};

export function BlogCard({ post }: Props) {
  return (
    <article className="blog-card">
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card__media image-shine"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={640}
          height={420}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="blog-card__image"
        />
      </Link>
      <div className="blog-card__body">
        <time className="blog-card__date" dateTime={post.date}>
          {post.date}
        </time>
        <h2 className="blog-card__title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="blog-card__link">
          Read More
          <svg viewBox="0 0 14 14" fill="currentColor" aria-hidden>
            <path d="M13.4442 1.43172C13.4442 0.948461 13.0523 0.556709 12.5692 0.556705L4.69414 0.556641C4.21089 0.556636 3.81914 0.948382 3.81914 1.43164C3.81913 1.91488 4.21088 2.30664 4.69413 2.30664L11.6941 2.3067V9.30669C11.6941 9.78995 12.0858 10.1817 12.5691 10.1817C13.0523 10.1817 13.4441 9.78995 13.4441 9.30669L13.4442 1.43172ZM2.0509 13.1872L13.1879 2.05043L11.9505 0.812981L0.813477 11.9497L2.0509 13.1872Z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
