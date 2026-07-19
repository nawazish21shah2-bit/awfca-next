"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";

type Props = {
  title: string;
  images: string[];
};

export function ProgramGallery({ title, images }: Props) {
  const dialogId = useId();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setActive((current) =>
          current === null ? current : (current + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null
            ? current
            : (current - 1 + images.length) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="program-gallery" aria-label={`${title} photo gallery`}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="program-gallery__item image-shine"
            onClick={() => setActive(index)}
            aria-label={`View photo ${index + 1} of ${images.length}`}
            aria-controls={dialogId}
          >
            <Image
              src={src}
              alt=""
              width={640}
              height={480}
              sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 220px"
            />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          id={dialogId}
          className="program-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${active + 1}`}
          onClick={close}
        >
          <button
            type="button"
            className="program-lightbox__close"
            onClick={close}
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            type="button"
            className="program-lightbox__nav program-lightbox__nav--prev"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              setActive((current) =>
                current === null
                  ? current
                  : (current - 1 + images.length) % images.length,
              );
            }}
          >
            ‹
          </button>
          <div
            className="program-lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt=""
              width={1600}
              height={1200}
              sizes="100vw"
              priority
            />
            <p className="program-lightbox__meta">
              {active + 1} / {images.length}
            </p>
          </div>
          <button
            type="button"
            className="program-lightbox__nav program-lightbox__nav--next"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              setActive((current) =>
                current === null ? current : (current + 1) % images.length,
              );
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
