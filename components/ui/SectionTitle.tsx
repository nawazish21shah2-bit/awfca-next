import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  className?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  text,
  light,
  className,
  align = "left",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "section-eyebrow",
            light && "text-white/80",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("section-title", light && "text-white")}>{title}</h2>
      {text ? (
        <p className={cn("section-text mt-4", light && "text-white/80")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
