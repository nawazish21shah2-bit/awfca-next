import { pageHeroImages } from "@/data/page-heroes";

export const testimonialsPage = {
  hero: {
    title: "Voices from our community",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Testimonials", href: "/testimonials" },
    ],
    background: pageHeroImages.testimonials,
  },
  items: [
    {
      quote:
        "Supporting AWFCA gives me confidence that my donation reaches real families through food packages, education support, and emergency relief.",
      name: "Community Supporter",
      role: "Monthly Donor",
      avatar: "/images/awfca/team/abdul-hafeez-khan.png",
    },
    {
      quote:
        "Their reports and campaign updates make it clear how generosity is turned into practical help for people facing poverty.",
      name: "Program Partner",
      role: "Community Partner",
      avatar: "/images/awfca/team/awais-riaz.png",
    },
    {
      quote:
        "Volunteering with AWFCA has been meaningful. Every effort feels connected to real community needs and compassionate delivery.",
      name: "Field Volunteer",
      role: "Volunteer",
      avatar: "/images/awfca/team/imam-humza-khan.png",
    },
    {
      quote:
        "From scholarships to Ramadan support, AWFCA’s programs show care, accountability, and a strong focus on dignity.",
      name: "Education Supporter",
      role: "Donor",
      avatar: "/images/awfca/team/abdul-majid-sukhaira.png",
    },
    {
      quote:
        "I appreciate that AWFCA offers clear giving options, including online donations and e-transfer, with transparent updates.",
      name: "Local Supporter",
      role: "Donor",
      avatar: "/images/awfca/team/ali-raza.png",
    },
    {
      quote:
        "Seeing emergency relief and community welfare programs in action reminds me why this charity’s mission matters.",
      name: "Outreach Volunteer",
      role: "Volunteer",
      avatar: "/images/awfca/team/zian-ahmad.png",
    },
  ],
} as const;
