import { site } from "@/data/site";

import { pageHeroImages } from "@/data/page-heroes";

export type ServiceItem = {
  slug: string;
  title: string;
  image: string;
  intro: readonly [string, string];
  contribute: {
    title: string;
    paragraphs: readonly [string, string];
    cards: readonly {
      title: string;
      text: string;
    }[];
  };
  impact: {
    title: string;
    paragraphs: readonly [string, string];
    stats: readonly {
      value: number;
      suffix: string;
      label: string;
      text: string;
    }[];
  };
  faq: {
    title: string;
    text: string;
    items: readonly { question: string; answer: string }[];
  };
};

export const servicesPage = {
  hero: {
    title: "Care that meets real community needs",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
    ],
    background: pageHeroImages.services,
  },
  contact: {
    title: "Contact Us",
    text: "Join our community of supporters and explore ways to help AWFCA fight poverty.",
    email: site.email,
  },
} as const;

const sharedFaq = {
  title: "Frequently asked questions",
  text: "Find clear answers about AWFCA programs, donations, volunteering, and how your support creates impact.",
  items: [
    {
      question: "How can I support these programs?",
      answer:
        "You can donate online, send an e-transfer to donate@awfca.ca, or contact us about volunteering and partnership opportunities.",
    },
    {
      question: "Are AWFCA projects Zakat-eligible?",
      answer:
        "Yes. AWFCA designs its projects to be Zakat-eligible so supporters can fulfill their charitable obligations with confidence.",
    },
    {
      question: "Will I receive a tax receipt?",
      answer:
        "Eligible donations receive tax receipts. Online gifts generate instant confirmation, and official tax receipts are typically issued by mid-February.",
    },
  ],
} as const;

export const serviceItems: ServiceItem[] = [
  {
    slug: "humanitarian-aid-programs",
    title: "Humanitarian Aid Programs",
    image: "/images/awfca/services/humanitarian.jpg",
    intro: [
      "Our Humanitarian Aid Programs deliver essential support to families facing poverty, crisis, and limited access to basic services. Through clean water, food relief, healthcare, and emergency response, we help communities meet urgent needs with dignity.",
      "These programs focus on practical relief that saves lives today while strengthening community resilience for tomorrow.",
    ],
    contribute: {
      title: "How You Can Contribute",
      paragraphs: [
        "Your support helps expand clean water access, food distribution, medical outreach, and emergency relief for families in crisis.",
        "Donate, volunteer, or share our campaigns to help AWFCA reach more communities with timely humanitarian support.",
      ],
      cards: [
        {
          title: "Emergency Relief Fund",
          text: "Rapid response support during disasters, conflict, and humanitarian emergencies.",
        },
        {
          title: "Clean Water & Healthcare",
          text: "Help deliver clean water, medical care, and essential supplies to underserved communities.",
        },
      ],
    },
    impact: {
      title: "Our Impact So Far",
      paragraphs: [
        "Through food packages, medical support, water projects, and emergency aid, AWFCA continues reaching families who need help most.",
        "With donor and volunteer support, we remain focused on delivering compassionate, accountable humanitarian relief.",
      ],
      stats: [
        {
          value: 200,
          suffix: "K+",
          label: "Patients Supported",
          text: "Individuals reached through medical and healthcare outreach initiatives.",
        },
        {
          value: 200,
          suffix: "+",
          label: "Families Monthly",
          text: "Households supported through ongoing food package distribution.",
        },
      ],
    },
    faq: sharedFaq,
  },
  {
    slug: "educational-skills-development-programs",
    title: "Educational & Skills Development",
    image: "/images/awfca/services/education.jpg",
    intro: [
      "Our Educational & Skills Development Programs help students and youth overcome financial barriers and build practical skills for the future. From scholarships to computer training, we invest in opportunity and long-term empowerment.",
      "Education is one of the strongest tools for breaking the cycle of poverty, and our programs focus on access, confidence, and lasting growth.",
    ],
    contribute: {
      title: "How You Can Contribute",
      paragraphs: [
        "Your gift can cover tuition, books, uniforms, supplies, or computer training for students who need support.",
        "Sponsor a student, donate to skills training, or help raise awareness so more young people can pursue education with dignity.",
      ],
      cards: [
        {
          title: "Student Scholarships",
          text: "Support tuition, books, uniforms, and school supplies for deserving students.",
        },
        {
          title: "Computer Training",
          text: "Help youth gain digital skills in basics, MS Office, and graphic design.",
        },
      ],
    },
    impact: {
      title: "Our Impact So Far",
      paragraphs: [
        "AWFCA supports students each year with scholarships and practical training that open doors to better opportunities.",
        "We remain committed to helping learners focus on their studies without the constant stress of financial barriers.",
      ],
      stats: [
        {
          value: 100,
          suffix: "+",
          label: "Scholarships Yearly",
          text: "Students supported through annual education assistance.",
        },
        {
          value: 2,
          suffix: "",
          label: "Core Education Programs",
          text: "Scholarship and computer training pathways for youth development.",
        },
      ],
    },
    faq: sharedFaq,
  },
  {
    slug: "social-welfare-and-community-support-programs",
    title: "Social Welfare & Community Support",
    image: "/images/awfca/services/community.jpg",
    intro: [
      "Our Social Welfare & Community Support Programs strengthen families through orphan care, New Beginnings support for newlyweds, and general community campaigns that restore hope and dignity.",
      "These initiatives focus on practical household needs, emotional support, and community solidarity for people facing hardship.",
    ],
    contribute: {
      title: "How You Can Contribute",
      paragraphs: [
        "Your support helps orphans, newlywed couples, and vulnerable families access essential resources and community care.",
        "Give through the Helping Hands Campaign or support specific welfare programs that uplift households with compassion.",
      ],
      cards: [
        {
          title: "Orphan Support",
          text: "Provide meals, education, shelter, and mentorship for orphaned children.",
        },
        {
          title: "New Beginnings",
          text: "Help deserving couples start married life with essential household support.",
        },
      ],
    },
    impact: {
      title: "Our Impact So Far",
      paragraphs: [
        "From orphan support in Chitral to New Beginnings events across Pakistan, AWFCA continues helping families begin stronger chapters.",
        "Community campaigns amplify generosity so more households receive timely, dignified support.",
      ],
      stats: [
        {
          value: 120,
          suffix: "+",
          label: "Orphans Supported",
          text: "Children supported through care, education, and shelter initiatives.",
        },
        {
          value: 1000,
          suffix: "+",
          label: "Couples Supported",
          text: "Adult girls and couples helped through marriage and household support efforts.",
        },
      ],
    },
    faq: sharedFaq,
  },
  {
    slug: "religious-and-charitable-giving-programs",
    title: "Religious & Charitable Giving",
    image: "/images/awfca/services/religious.jpg",
    intro: [
      "Our Religious & Charitable Giving Programs help supporters fulfill Zakat, Sadaqah, Fidyaa, Qurbani, and seasonal giving in a trustworthy way. These funds reach families through carefully managed community programs.",
      "Whether during Ramadan, Eid, or throughout the year, AWFCA helps turn faith-inspired generosity into practical relief for people in need.",
    ],
    contribute: {
      title: "How You Can Contribute",
      paragraphs: [
        "Contribute Zakat, Sadaqah, Fidyaa, Ramadan hampers, Eid gifts, or Collective Qurbani through AWFCA’s trusted channels.",
        "Your giving helps purify wealth while delivering food, festive support, and essential aid to struggling families.",
      ],
      cards: [
        {
          title: "Zakat & Fidyaa",
          text: "Channel obligatory and compensatory charity to verified community needs.",
        },
        {
          title: "Ramadan & Eid Support",
          text: "Provide seasonal food hampers, Qurbani, and Eid gifts for families in hardship.",
        },
      ],
    },
    impact: {
      title: "Our Impact So Far",
      paragraphs: [
        "Seasonal campaigns and ongoing religious giving help AWFCA deliver food, festive support, and essential aid when families need it most.",
        "We remain committed to trustworthy stewardship of Zakat and Sadaqah on behalf of our donors.",
      ],
      stats: [
        {
          value: 200,
          suffix: "+",
          label: "Ramadan Packages",
          text: "Families supported through annual Ramadan food assistance.",
        },
        {
          value: 6,
          suffix: "",
          label: "Faith-Based Programs",
          text: "Zakat, Fidyaa, Sadaqah, Qurbani, Ramadan, and Eid giving pathways.",
        },
      ],
    },
    faq: sharedFaq,
  },
];

export function getService(slug: string) {
  return serviceItems.find((item) => item.slug === slug);
}
