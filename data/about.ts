import { pageHeroImages } from "@/data/page-heroes";

export const aboutPage = {
  hero: {
    title: "Compassion in action across communities",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
    ],
    background: pageHeroImages.about,
  },
  intro: {
    eyebrow: "About AWFCA",
    title: "Growing together to create lasting impact",
    text: "Arrahman Welfare Foundation Canada is a CRA-registered non-profit committed to ending poverty and supporting deserving families through education, healthcare, food relief, and community programs.",
    images: [
      "/images/awfca/home/about-2.jpg",
      "/images/awfca/about/intro-2.webp",
      "/images/awfca/home/food-bank.jpg",
    ],
    features: [
      {
        title: "Mission-Driven Charity",
        text: "We focus on practical, compassionate solutions that help individuals and families overcome poverty with dignity.",
      },
      {
        title: "Transparent and Accountable",
        text: "We operate with clear reporting, tax receipts for eligible donations, and open updates on how support is used.",
      },
    ],
    cta: { label: "Contact Us Now", href: "/contact" },
    founder: {
      name: "AWFCA Leadership",
      role: "Board & Directors",
      image: "/images/awfca/team/abdul-hafeez-khan.png",
    },
  },
  approach: {
    eyebrow: "Our Approach",
    title: "Compassionate solutions for real community needs",
    text: "We combine volunteer-led delivery with carefully designed programs so every contribution creates meaningful and lasting change.",
    items: [
      {
        title: "Our Mission",
        text: "Fight poverty and create sustainable solutions that empower people to build better futures for themselves and their families.",
        image: "/images/awfca/about/cause-humanitarian.jpg",
      },
      {
        title: "Our Vision",
        text: "Work toward the betterment of society by helping destitute, deserving, and skilled families with a constructive approach.",
        image: "/images/awfca/about/cause-education.jpg",
      },
      {
        title: "Our Values",
        text: "Compassion, accountability, and community partnership guide every program we deliver in Canada and abroad.",
        image: "/images/awfca/about/cause-community.jpg",
      },
    ],
  },
  trust: {
    quoteNote: "Let’s work together to fight poverty and restore hope.",
    quoteCta: { label: "Get Involved", href: "/contact" },
    trustedText: "Trusted By",
    trustedCount: "250K+",
    trustedSuffix: "Lives Reached",
    rating: "4.9/5",
    authorImage: "/images/awfca/team/awais-riaz.png",
  },
  whyChoose: {
    eyebrow: "Why Choose Us",
    title: "Transforming generosity into meaningful change",
    text: "AWFCA designs and delivers programs in food relief, education, healthcare, orphan support, and emergency response to uplift underserved communities.",
    images: [
      "/images/awfca/home/why-choose.jpg",
      "/images/awfca/about/intro-1.jpg",
    ],
    volunteersStat: {
      value: "340+",
      label: "Active Volunteers",
    },
    avatars: [
      "/images/awfca/team/abdul-hafeez-khan.png",
      "/images/awfca/team/awais-riaz.png",
      "/images/awfca/team/imam-humza-khan.png",
      "/images/awfca/team/abdul-majid-sukhaira.png",
    ],
    tracking: {
      title: "Transparent Impact Reporting",
      bullets: [
        "Annual reports and project updates",
        "Clear donation and tax-receipt guidance",
        "Programs designed to be Zakat-eligible",
      ],
      image: "/images/awfca/home/clean-water.jpg",
      cta: { label: "Contact Us", href: "/contact" },
    },
  },
  coreFeatures: {
    eyebrow: "Our Core Features",
    title: "Highlights of our impactful work",
    text: "From monthly food support to scholarships, medical outreach, and emergency relief, AWFCA connects generosity with measurable community results.",
    features: [
      {
        title: "Secure Online Donations",
        text: "Give securely online through our trusted donation portal and receive confirmation for your gift.",
      },
      {
        title: "Clear Impact Updates",
        text: "Follow campaign stories, project reports, and field updates that show how support is used.",
      },
      {
        title: "Multi-Cause Support",
        text: "Choose from humanitarian aid, education, social welfare, and religious giving programs.",
      },
    ],
    stats: [
      {
        value: 250,
        suffix: "K+",
        prefix: "",
        label: "People Helped",
        text: "Through education, healthcare, food support, and emergency relief.",
        decimals: 0,
      },
      {
        value: 1750,
        suffix: "+",
        prefix: "",
        label: "Families Fed",
        text: "Supported through monthly and seasonal food distribution programs.",
        decimals: 0,
      },
      {
        value: 100,
        suffix: "+",
        prefix: "",
        label: "Scholarships Yearly",
        text: "Students supported with tuition, books, uniforms, and school supplies.",
        decimals: 0,
      },
    ],
  },
  causes: {
    eyebrow: "Our Causes",
    title: "Dedicated to meaningful and lasting change",
    text: "We focus on sustainable programs that address urgent needs while helping families move toward greater stability and dignity.",
    cta: { label: "Contact Us Now", href: "/contact" },
    items: [
      {
        tag: "Education",
        title: "Student Scholarships & Skills Training",
        href: "/programs/student-scholarship-breaking-barriers-building-futures",
        image: "/images/awfca/about/cause-education.jpg",
      },
      {
        tag: "Hunger Relief",
        title: "Food Bank & Nutrition Support",
        href: "/programs/food-bank",
        image: "/images/awfca/home/food-bank.jpg",
      },
      {
        tag: "Healthcare",
        title: "Mobile Health & Medical Aid",
        href: "/programs/mobile-health-unit",
        image: "/images/awfca/services/humanitarian.jpg",
      },
    ],
    contactNote: "Let’s make something great work together.",
    contactCta: { label: "Get Involved", href: "/contact" },
    contactImage: "/images/awfca/team/abdul-hafeez-khan.png",
  },
  story: {
    eyebrow: "Watch Our Story",
    title: "Together we’re changing lives",
    text: "Through the collective support of donors, volunteers, and partners, we provide education, healthcare, food, and emergency relief to communities in need.",
    background: "/images/awfca/about/story-updated.jpg",
    videoUrl: "/videos/our-story.mp4",
    circleText: "Watch Our Story * Watch Our Story * ",
  },
  volunteers: {
    eyebrow: "Meet Our Team",
    title: "Working together to build a better future",
    text: "From directors to program coordinators and volunteers, our team collaborates to design and deliver initiatives that uplift lives.",
    cta: { label: "View All Team Members", href: "/volunteers" },
    contactNote: "Want to volunteer with AWFCA?",
    contactCta: { label: "Contact Us", href: "/contact" },
    contactImage: "/images/awfca/team/abdul-majid-sukhaira.png",
    items: [
      {
        slug: "abdul-hafeez-khan",
        name: "Abdul Hafeez Khan",
        role: "Director",
        image: "/images/awfca/team/abdul-hafeez-khan.png",
      },
      {
        slug: "awais-riaz",
        name: "Awais Riaz",
        role: "Director",
        image: "/images/awfca/team/awais-riaz.png",
      },
      {
        slug: "imam-humza-khan",
        name: "Imam Humza Khan",
        role: "Program Coordinator",
        image: "/images/awfca/team/imam-humza-khan.png",
      },
      {
        slug: "abdul-majid-sukhaira",
        name: "Abdul Majid Sukhaira",
        role: "Volunteer",
        image: "/images/awfca/team/abdul-majid-sukhaira.png",
      },
      {
        slug: "ali-raza",
        name: "Ali Raza",
        role: "Volunteer",
        image: "/images/awfca/team/ali-raza.png",
      },
    ],
  },
  testimonials: {
    eyebrow: "What People Say",
    title: "Building trust through real experiences",
    background: "/images/awfca/about/testimonials-bg.jpg",
    avatars: [
      "/images/awfca/team/abdul-hafeez-khan.png",
      "/images/awfca/team/awais-riaz.png",
      "/images/awfca/team/imam-humza-khan.png",
      "/images/awfca/team/abdul-majid-sukhaira.png",
    ],
    items: [
      {
        quote:
          "I’ve supported AWFCA because of their transparency and dedication. Regular updates and clear reports give me confidence that my contribution is making a real difference.",
        name: "Monthly Donor",
        role: "Supporter",
        avatar: "/images/awfca/team/abdul-majid-sukhaira.png",
      },
      {
        quote:
          "From food packages to education support, AWFCA’s programs show compassion in action. It’s meaningful to partner with a charity that stays focused on community needs.",
        name: "Community Partner",
        role: "Volunteer",
        avatar: "/images/awfca/team/imam-humza-khan.png",
      },
    ],
  },
  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Your questions answered with transparency and care",
    image: "/images/awfca/about/cause-community.jpg",
    rating: 4.9,
    ratingNote: "Trusted by supporters for transparency.",
    avatars: [
      "/images/awfca/team/awais-riaz.png",
      "/images/awfca/team/abdul-hafeez-khan.png",
      "/images/awfca/team/imam-humza-khan.png",
      "/images/awfca/team/abdul-majid-sukhaira.png",
    ],
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
          "You can give online through our donation portal, send an e-transfer to donate@awfca.ca, or contact us about cash and cheque options.",
      },
      {
        question: "Are donations tax-deductible?",
        answer:
          "Eligible donations receive tax receipts. Online gifts generate instant confirmation, and official tax receipts are typically issued by mid-February.",
      },
    ],
  },
} as const;
