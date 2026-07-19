"use client";

import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/data/faqs";

type Props = {
  items: FaqItem[];
  defaultOpen?: number;
  className?: string;
};

export function Accordion({ items, defaultOpen = 1, className }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const accordionId = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `${accordionId}-trigger-${i}`;
        const panelId = `${accordionId}-panel-${i}`;
        return (
          <div
            key={item.question}
            className="accordion-item overflow-hidden rounded-2xl border border-[var(--color-divider)] bg-white"
          >
            <button
              type="button"
              id={triggerId}
              className="accordion-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="accordion-question font-semibold text-primary">
                {item.question}
              </span>
              <span
                className={cn(
                  "accordion-icon grid h-8 w-8 shrink-0 place-items-center rounded-full",
                  isOpen ? "bg-accent text-white" : "bg-surface text-primary",
                )}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="accordion-answer section-text px-5 pb-5">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
