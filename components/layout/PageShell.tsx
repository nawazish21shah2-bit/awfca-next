import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";

type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
};

export function PageShell({ eyebrow, title, text, children }: Props) {
  return (
    <div className="page-shell">
      <section className="page-shell__hero">
        <div className="page-shell__glow" aria-hidden />
        <div className="container-site page-shell__hero-inner">
          <p className="page-shell__brand">{site.shortName}</p>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            text={text}
            light
            className="page-shell__title max-w-3xl"
          />
        </div>
      </section>
      {children ? (
        <section className="page-shell__body">
          <div className="container-site">{children}</div>
        </section>
      ) : null}
    </div>
  );
}
