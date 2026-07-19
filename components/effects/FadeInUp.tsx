"use client";

import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/lib/useInViewOnce";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInUp({ children, className, delay = 0 }: Props) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
