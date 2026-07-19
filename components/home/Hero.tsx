"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { hero } from "@/data/home";
import { Button } from "@/components/ui/Button";

function AnimatedHeadingLine({
  text,
  startIndex,
}: {
  text: string;
  startIndex: number;
}) {
  let characterIndex = startIndex;

  return (
    <span className="hero-heading__line" aria-hidden="true">
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="hero-heading__word" key={`${word}-${wordIndex}`}>
          {word.split("").map((character, index) => {
            const indexForDelay = characterIndex++;
            return (
              <span
                className="hero-heading__char"
                key={`${character}-${index}`}
                style={
                  { "--char-index": indexForDelay } as CSSProperties
                }
              >
                {character}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? (
            <span className="hero-heading__space">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const section = media.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      media.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) scale(1.06)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const titleWords = hero.title.split(" ");
  const mid = Math.ceil(titleWords.length / 2);
  const titleLine1 = titleWords.slice(0, mid).join(" ");
  const titleLine2 = titleWords.slice(mid).join(" ");

  return (
    <section className="hero-section">
      <div ref={mediaRef} className="hero-section__media">
        <Image
          src={hero.bg}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-section__overlay" aria-hidden />
      <div className="hero-section__glow" aria-hidden />
      <div className="container-site hero-section__content">
        <div className="hero-section__intro">
          <p className="hero-brand hero-reveal hero-reveal--brand">
            <span className="hero-brand__mark">{hero.brand}</span>
            <span className="hero-brand__full">{hero.brandFull}</span>
          </p>

          <h1 className="hero-heading" aria-label={hero.title}>
            <AnimatedHeadingLine text={titleLine1} startIndex={0} />
            {titleLine2 ? (
              <AnimatedHeadingLine
                text={titleLine2}
                startIndex={titleLine1.replace(/\s/g, "").length}
              />
            ) : null}
          </h1>

          <div className="hero-reveal hero-reveal--copy">
            <p className="hero-copy">{hero.text}</p>
          </div>

          <div className="hero-actions hero-reveal hero-reveal--actions">
            <Button href={hero.cta.href} variant="primary" className="hero-donate-button">
              {hero.cta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="ghost"
              className="hero-secondary-button"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
