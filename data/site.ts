export const site = {
  name: "Arrahman Welfare Foundation Canada",
  shortName: "AWFCA",
  tagline: "Building a Brighter Future for Those in Need",
  phone: "416-471-9636",
  phoneHref: "tel:4164719636",
  email: "info@awfca.ca",
  donateEmail: "donate@awfca.ca",
  address: "1515-70 Mornelle Court, Scarborough, ON M1E 4S8",
  donateUrl: "https://app.irm.io/awfca.ca",
  description:
    "AWFCA is a Canadian charity helping the needy by providing essential support to fight poverty. Together, we build hope.",
  copyright: `© ${new Date().getFullYear()} Arrahman Welfare Foundation Canada — All rights reserved.`,
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/volunteers" },
      { label: "FAQs", href: "/faqs" },
      { label: "Reports", href: "/reports" },
    ],
  },
  { label: "Services", href: "/services" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Humanitarian Aid",
        href: "/programs?category=humanitarian-aid",
      },
      {
        label: "Education & Skills",
        href: "/programs?category=educational-skills",
      },
      {
        label: "Social Welfare",
        href: "/programs?category=social-welfare",
      },
      {
        label: "Religious Giving",
        href: "/programs?category=religious-giving",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];
export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs & Services", href: "/programs" },
  { label: "Blog & Updates", href: "/blog" },
  { label: "Donate", href: "/donate" },
  { label: "Contact Us", href: "/contact" },
];

export const footerServices = [
  {
    label: "Humanitarian Aid",
    href: "/services/humanitarian-aid-programs",
  },
  {
    label: "Educational & Skills Development",
    href: "/services/educational-skills-development-programs",
  },
  {
    label: "Social Welfare & Community Support",
    href: "/services/social-welfare-and-community-support-programs",
  },
  {
    label: "Religious & Charitable Giving",
    href: "/services/religious-and-charitable-giving-programs",
  },
];

export const footerSupport = [
  { label: "Help Center", href: "/faqs" },
  { label: "Reports", href: "/reports" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Donation Policy", href: "/donation-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18oiZKSqE1/",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_awfca_/",
    icon: "instagram" as const,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ArrahmanWelfareFoundation",
    icon: "youtube" as const,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@awfca.ca",
    icon: "tiktok" as const,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/AWFCanadaOfficial/",
    icon: "pinterest" as const,
  },
];
