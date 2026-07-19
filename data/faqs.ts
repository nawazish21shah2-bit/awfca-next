import { site } from "@/data/site";
import { pageHeroImages } from "@/data/page-heroes";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  label: string;
  items: FaqItem[];
};

/** Home / shared FAQ teaser list */
export const faqs: FaqItem[] = [
  {
    question: "What is the mission of AWFCA?",
    answer:
      "Arrahman Welfare Foundation Canada fights poverty by providing food support, education, healthcare, emergency relief, and community programs for people in need.",
  },
  {
    question: "How do I make a donation?",
    answer:
      `You can give securely online through our donation portal, send an e-transfer to ${site.donateEmail}, or contact us about cash and cheque options.`,
  },
  {
    question: "Can I volunteer with AWFCA?",
    answer:
      "Yes. Contact us to learn about volunteer opportunities supporting campaigns, events, outreach, and community programs.",
  },
  {
    question: "Are donations tax-deductible?",
    answer:
      "Eligible donations receive tax receipts. Online gifts generate instant confirmation, and official tax receipts are typically issued by mid-February.",
  },
];

export const faqPage = {
  hero: {
    title: "Answers before you give",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "FAQs", href: "/faqs" },
    ],
    background: pageHeroImages.faqs,
  },
  contact: {
    title: "Contact Us",
    text: "Join our growing community of supporters and explore ways to help AWFCA.",
    email: site.email,
  },
  categories: [
    {
      id: "general",
      label: "General Questions",
      items: [
        {
          question: "Can I make a recurring monthly donation?",
          answer:
            "Yes. AWFCA accepts monthly donations through our online giving portal so you can continuously support the causes that matter most.",
        },
        {
          question: "How do I know my donation is being used effectively?",
          answer:
            "We publish reports and project updates, and we focus on directing the majority of funds toward direct aid for families in need.",
        },
        {
          question: "Can I volunteer with your organization?",
          answer:
            "Yes. Contact us to learn about volunteer opportunities supporting campaigns, events, and community outreach.",
        },
        {
          question: "How can I make a donation?",
          answer:
            `You can donate online at our IRM portal, send an e-transfer to ${site.donateEmail}, or contact us for cash and cheque options.`,
        },
        {
          question: "How do I get updates about the causes I support?",
          answer:
            "Subscribe to our newsletter, follow AWFCA on social media, and check our blog and reports pages for the latest updates.",
        },
      ],
    },
    {
      id: "donations",
      label: "Donations & Contributions",
      items: [
        {
          question: "Are AWFCA projects Zakat-eligible?",
          answer:
            "Yes. AWFCA designs its projects to be Zakat-eligible so supporters can fulfill their charitable obligations with confidence.",
        },
        {
          question: "Can I donate by e-transfer?",
          answer:
            `Yes. Send your e-transfer to ${site.donateEmail}. For questions about designation or receipts, contact ${site.email}.`,
        },
        {
          question: "Will I receive a tax receipt?",
          answer:
            "Eligible donations receive tax receipts. Online gifts generate instant confirmation, and official tax receipts are typically issued by mid-February.",
        },
        {
          question: "Can corporations or organizations donate?",
          answer:
            "Yes. Organizations can donate online or contact us directly to discuss partnerships, sponsorships, and campaign support.",
        },
        {
          question: "Are in-kind donations accepted?",
          answer:
            "In some cases, yes. Please contact our team to confirm current needs and how in-kind contributions can best support our programs.",
        },
      ],
    },
    {
      id: "volunteering",
      label: "Volunteering & Events",
      items: [
        {
          question: "Do I need prior experience to volunteer?",
          answer:
            "No prior experience is required for many roles. We provide guidance so volunteers can contribute effectively and safely.",
        },
        {
          question: "What types of volunteer opportunities are available?",
          answer:
            "Opportunities may include campaign support, event assistance, outreach, packing and distribution help, and community engagement.",
        },
        {
          question: "Can I volunteer for a single event or on a regular basis?",
          answer:
            "Yes. You can support one-time campaigns or join ongoing volunteer efforts, depending on availability and program needs.",
        },
        {
          question: "Are there age restrictions for volunteering?",
          answer:
            "Some activities may have age or supervision requirements. Contact us and we will guide you toward suitable opportunities.",
        },
        {
          question: "How do I get started as a volunteer?",
          answer:
            `Reach out through our contact form or email ${site.email} with your interests and availability.`,
        },
      ],
    },
    {
      id: "support",
      label: "Support & Communication",
      items: [
        {
          question: "How can I get updates on your programs?",
          answer:
            "Subscribe to our newsletter, follow us on social media, and visit our blog, programs, and reports pages regularly.",
        },
        {
          question: "How quickly will I receive a response to my inquiry?",
          answer:
            "We aim to respond as promptly as possible during regular business hours. Urgent donation questions can also be directed by phone.",
        },
        {
          question: "Can I provide feedback or suggestions about your programs?",
          answer:
            "Yes. We welcome feedback. Share your thoughts through our contact form or email and our team will review them carefully.",
        },
        {
          question: "Do you provide acknowledgment for donations?",
          answer:
            "Yes. Online gifts generate instant confirmation, and eligible donations receive official tax receipts according to our receipting process.",
        },
        {
          question: "How can I get in touch with AWFCA?",
          answer:
            `Call ${site.phone}, email ${site.email}, or visit us at ${site.address}.`,
        },
      ],
    },
  ] as const satisfies readonly FaqCategory[],
} as const;
