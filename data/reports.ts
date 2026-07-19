import { pageHeroImages } from "@/data/page-heroes";

export const reportsPage = {
  hero: {
    title: "Impact you can verify",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Reports", href: "/reports" },
    ],
    background: pageHeroImages.reports,
  },
  intro: {
    eyebrow: "Accountability",
    title: "Transparency that builds trust",
    text: "See how your support is changing lives through real, measurable impact. Explore our annual reports, financial summaries, and project updates to understand how every donation is used.",
  },
  items: [
    {
      year: "2025",
      type: "Project Report",
      title: "New Beginnings Project Report",
      image: "/images/reports/2025-impact-report.png",
      href: "https://drive.google.com/file/d/1f5fYPxGBvMw-m2EJcoQ6mz83F5zZG4oB/view?usp=sharing",
    },
    {
      year: "2025",
      type: "Impact Report",
      title: "AWFCA Impact Report",
      image: "/images/reports/2025-financial-report.png",
      href: "https://drive.google.com/file/d/1_YtYQmuB0XvRGTTjFx2aQIQ2XiRp_2WS/view?usp=sharing",
    },
    {
      year: "2024",
      type: "Impact Report",
      title: "AWFCA Impact Report",
      image: "/images/reports/2024-impact-report.jpg",
      href: "https://drive.google.com/file/d/1dWXvzcCUeb3YgeGVYRAVOTZGmL-ategk/view?usp=sharing",
    },
  ],
} as const;
