import type { CSSProperties } from "react";
import { hero } from "@/data/home";
import { Counter } from "@/components/ui/Counter";

type Props = {
  counter?: { value: number; suffix: string; label: string };
};

export function TrustStrip({ counter }: Props) {
  const heroCounter = counter ?? hero.counter;

  return (
    <section className="trust-strip" aria-label="Why give with AWFCA">
      <div className="container-site trust-strip__inner">
        <div className="trust-strip__proof">
          <Counter
            value={heroCounter.value}
            suffix={heroCounter.suffix}
            label={heroCounter.label}
            valueClassName="trust-strip__counter-value"
            className="trust-strip__counter"
          />
        </div>
        <div className="trust-strip__benefits">
          {hero.benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="trust-strip__item"
              style={{ "--trust-index": index } as CSSProperties}
            >
              <h2>{benefit.title}</h2>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
