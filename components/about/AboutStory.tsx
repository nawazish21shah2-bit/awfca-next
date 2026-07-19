"use client";

import { useEffect, useId, useState } from "react";
import { aboutPage } from "@/data/about";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FadeInUp } from "@/components/effects/FadeInUp";

export function AboutStory() {
  const { story } = aboutPage;
  const [open, setOpen] = useState(false);
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <section
      className="about-page-story"
      style={{ backgroundImage: `url(${story.background})` }}
    >
      <div className="about-page-story__overlay" />
      <div className="container-site about-page-story__inner">
        <div className="about-page-story__copy">
          <FadeInUp>
            <SectionEyebrow
              variant="blog"
              withDot={false}
              className="about-page-story__eyebrow"
            >
              {story.eyebrow}
            </SectionEyebrow>
          </FadeInUp>
          <AnimatedHeading
            text={story.title}
            className="about-page-story__title"
          />
          <FadeInUp delay={100}>
            <p>{story.text}</p>
          </FadeInUp>
        </div>

        <FadeInUp delay={150} className="about-page-story__play">
          <div className="about-page-story__circle" aria-hidden>
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="about-story-circle-path"
                  d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                />
              </defs>
              <text>
                <textPath href="#about-story-circle-path">
                  {story.circleText}
                </textPath>
              </text>
            </svg>
          </div>
          <button
            type="button"
            className="about-page-story__button"
            aria-haspopup="dialog"
            aria-controls={dialogId}
            aria-expanded={open}
            aria-label="Watch our story video"
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </FadeInUp>
      </div>

      {open ? (
        <div
          id={dialogId}
          className="about-page-story__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Our story video"
        >
          <button
            type="button"
            className="about-page-story__backdrop"
            aria-label="Close video"
            onClick={() => setOpen(false)}
          />
          <div className="about-page-story__frame">
            <video
              src={story.videoUrl}
              title="Watch our story"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
