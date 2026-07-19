"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/lib/useInViewOnce";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2";
};

export function AnimatedHeading({ text, className, as: Tag = "h2" }: Props) {
  const { ref, visible } = useInViewOnce<HTMLHeadingElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });
  let characterIndex = 0;

  return (
    <Tag
      ref={ref}
      className={cn("section-title split-heading", visible && "is-visible", className)}
      aria-label={text}
    >
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="split-heading__word" key={`${word}-${wordIndex}`} aria-hidden>
          {word.split("").map((character, index) => {
            const delayIndex = characterIndex++;
            return (
              <span
                className="split-heading__char"
                key={`${character}-${index}`}
                style={{ "--split-index": delayIndex } as CSSProperties}
              >
                {character}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? (
            <span className="split-heading__space">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}
