import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowVariant = "accent" | "about" | "muted" | "blog";

type Props = {
  children: ReactNode;
  className?: string;
  withDot?: boolean;
  variant?: EyebrowVariant;
};

export function SectionEyebrow({
  children,
  className,
  withDot = true,
  variant = "accent",
}: Props) {
  return (
    <p className={cn("eyebrow-pill", `eyebrow-pill--${variant}`, className)}>
      {withDot ? <span aria-hidden /> : null}
      {children}
    </p>
  );
}
