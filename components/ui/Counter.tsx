"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  valueClassName?: string;
};

export function Counter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
  decimals = 0,
  className,
  valueClassName,
}: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animationFrame = 0;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setDisplay(value);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  const finalValue = `${prefix}${value.toFixed(decimals)}${suffix}`;
  const accessibleLabel = label ? `${label}: ${finalValue}` : finalValue;

  return (
    <div ref={ref} className={cn(className)}>
      {label ? (
        <div className="mb-1 text-sm font-medium text-muted">{label}</div>
      ) : null}
      <div
        className={cn("text-3xl font-bold text-primary", valueClassName)}
        aria-live="polite"
        aria-atomic="true"
        aria-label={accessibleLabel}
      >
        <span aria-hidden="true">
          {prefix}
          {display.toFixed(decimals)}
          {suffix}
        </span>
      </div>
    </div>
  );
}
