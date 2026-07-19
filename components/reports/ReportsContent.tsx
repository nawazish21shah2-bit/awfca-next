import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { FadeInUp } from "@/components/effects/FadeInUp";
import { reportsPage } from "@/data/reports";
import { getRequestSite } from "@/lib/cms/site";
import { getPublishedReports } from "@/lib/cms/content";

export async function ReportsContent() {
  const { intro } = reportsPage;
  const site = await getRequestSite();
  const items = await getPublishedReports(site.id);

  return (
    <section className="reports-section">
      <div className="container-site">
        <FadeInUp className="reports-intro">
          <div>
            <p className="section-eyebrow">{intro.eyebrow}</p>
            <h2 className="section-title">{intro.title}</h2>
          </div>
          <p className="section-text">{intro.text}</p>
        </FadeInUp>

        <div className="reports-grid">
          {items.map((report, index) => {
            const href = report.pdf_url || report.external_url || "#";
            const image =
              report.cover_image_url || "/images/awfca/page-title.jpg";
            return (
              <FadeInUp key={report.id} delay={index * 90}>
                <article className="report-card">
                  <a
                    className="report-card__cover"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${report.title} ${report.year}`}
                  >
                    <Image
                      src={image}
                      alt={`${report.title} ${report.year} cover`}
                      width={526}
                      height={728}
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="report-card__image"
                    />
                    <span className="report-card__year">{report.year}</span>
                  </a>

                  <div className="report-card__body">
                    <div className="report-card__type">
                      <FileText aria-hidden />
                      {report.report_type}
                    </div>
                    <h3>{report.title}</h3>
                    <a
                      className="report-card__link"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Report
                      <ArrowUpRight aria-hidden />
                    </a>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
