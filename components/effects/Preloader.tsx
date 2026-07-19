"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startFade = () => setFading(true);
    let loadTimer = 0;
    const fallbackTimer = window.setTimeout(startFade, 900);
    const onLoad = () => {
      window.clearTimeout(fallbackTimer);
      loadTimer = window.setTimeout(startFade, 350);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(() => setHidden(true), 450);
    return () => window.clearTimeout(timer);
  }, [fading]);

  if (hidden) return null;

  return (
    <div
      className={`theme-preloader${fading ? " is-hidden" : ""}`}
      aria-hidden
    >
      <div className="theme-preloader__mark">
        <Image
          src="/images/loader.png"
          alt=""
          width={96}
          height={96}
          priority
          className="theme-preloader__logo"
        />
      </div>
    </div>
  );
}
