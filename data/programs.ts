import { site } from "@/data/site";
import { pageHeroImages } from "@/data/page-heroes";

export const programsPage = {
  hero: {
    title: "Programs that restore dignity and hope",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Our Programs", href: "/programs" },
    ],
    background: pageHeroImages.programs,
  },
  intro:
    "From food relief and education to healthcare and religious giving — every AWFCA program is designed for measurable, Zakat-eligible impact.",
  contact: {
    title: "Contact Us",
    text: "Join our growing community of supporters and explore ways to help AWFCA.",
    email: site.email,
  },
  expectImage: "/images/awfca/programs/expect.jpg",
  items: [
    {
      slug: "orphan-support-program",
      navLabel: "Orphan Support",
      category: "Social Welfare",
      title: "Orphan Support Program",
      image: "/images/awfca/programs/orphan-support.jpg",
      summary: [
        "Every child deserves a safe environment and the chance to thrive. AWFCA’s Orphan Support Program provides meals, education, shelter, and mentorship for orphaned children, including support for around 120 orphans in Chitral’s Kalash Valley.",
        "Beyond basic needs, the program nurtures character, confidence, and long-term opportunity so children can grow with dignity and care.",
      ],
    },
    {
      slug: "student-scholarship-breaking-barriers-building-futures",
      navLabel: "Student Scholarship",
      category: "Education",
      title: "Student Scholarship: Breaking Barriers, Building Futures",
      image: "/images/awfca/programs/student-scholarship.jpg",
      summary: [
        "At AWFCA, we believe that every child deserves access to quality education, regardless of financial background. Our Student Scholarship program provides deserving students with essential support, covering tuition fees, books, school uniforms, and academic supplies, ensuring they can pursue their education without financial stress.",
        "This initiative not only helps children stay in school but also encourages them to achieve their full potential without worrying about basic necessities. In addition to academics, we also support extracurricular sports activities, promoting physical and mental well-being for a well-rounded learning experience.",
        "By removing financial barriers and nurturing talent and confidence, we empower students to focus on their dreams, excel in their studies, and build a brighter future for themselves and their communities.",
      ],
    },
    {
      slug: "computer-training-institute",
      navLabel: "Computer Training",
      category: "Education",
      title: "Computer Training Institute",
      image: "/images/awfca/programs/computer-training.jpg",
      summary: [
        "AWFCA’s Computer Training Institute provides free IT training to help youth build practical digital skills for education and employment.",
        "Courses include computer basics, MS Office, and graphic design so learners can gain confidence and opportunity in a digital world.",
      ],
    },
    {
      slug: "mobile-health-unit",
      navLabel: "Mobile Health Unit",
      category: "Healthcare",
      title: "Mobile Health Unit",
      image: "/images/awfca/programs/mobile-health.jpg",
      summary: [
        "Through our Mobile Health Unit, we bring hope and healing to the underserved communities of South Punjab, ensuring that no one is deprived of essential healthcare due to financial or geographical barriers.",
        "Our mission goes beyond just providing free medical check-ups, consultations, and treatments—we strive to educate individuals about preventive care, empowering them to take charge of their health. Our dedicated team of doctors and healthcare professionals works tirelessly to diagnose illnesses, distribute medicines, and offer compassionate care, treating each patient with dignity and respect.",
        "By reaching the most vulnerable, we are not just offering medical aid—we are building healthier, stronger communities for a better tomorrow.",
      ],
    },
    {
      slug: "new-beginnings-program",
      navLabel: "New Beginnings",
      category: "Social Welfare",
      title: "New Beginnings Program",
      image: "/images/awfca/programs/new-beginnings.jpg",
      summary: [
        "The New Beginnings Program helps financially challenged newlyweds start married life with dignity by providing essential household support.",
        "Through events across Pakistan, AWFCA works with local teams to help deserving couples begin a stronger chapter together.",
      ],
    },
    {
      slug: "collective-qurbani-project",
      navLabel: "Collective Qurbani",
      category: "Religious Giving",
      title: "Collective Qurbani Project",
      image: "/images/awfca/programs/qurbani.jpg",
      summary: [
        "AWFCA’s Collective Qurbani Project helps supporters fulfill Qurbani while distributing meat and seasonal support to families in need.",
        "Where funds allow, related Eid support can also include festive food and essential gifts that help struggling households celebrate with dignity.",
      ],
    },
    {
      slug: "emergency-relief-fund",
      navLabel: "Emergency Relief",
      category: "Humanitarian Aid",
      title: "Emergency Relief Fund",
      image: "/images/awfca/programs/emergency-relief.jpg",
      summary: [
        "In times of disaster, conflict, or humanitarian crisis, AWFCA’s Emergency Relief Fund delivers rapid, compassionate aid to people who need it most.",
        "From past Palestine response efforts to current flood relief in Pakistan, this fund helps families access life-saving support when every second counts.",
      ],
    },
    {
      slug: "zakaat-fund",
      navLabel: "Zakaat Fund",
      category: "Religious Giving",
      title: "Zakaat Fund",
      image: "/images/awfca/programs/zakaat.jpg",
      summary: [
        "AWFCA’s Zakaat Fund helps supporters fulfill the obligation of Zakat by channeling 2.5% wealth purification toward verified community needs.",
        "Donations are stewarded carefully so Zakat reaches eligible recipients through trusted poverty-relief programs.",
      ],
    },
    {
      slug: "sadaqah-tul-fitr",
      navLabel: "Sadaqah tul Fitr",
      category: "Religious Giving",
      title: "Sadaqah tul Fitr",
      image: "/images/awfca/programs/sadaqah-fitr.jpg",
      summary: [
        "Sadaqah-tul-Fitr is a mandatory charity given before Eid al-Fitr to help those in need and purify the fast of those who observed Ramadan.",
        "AWFCA helps supporters fulfill this obligation by delivering food charity to families facing hardship.",
      ],
    },
    {
      slug: "fidyaa",
      navLabel: "Fidyaa",
      category: "Religious Giving",
      title: "Fidyaa",
      image: "/images/awfca/programs/fidyaa.webp",
      summary: [
        "Fidyaa provides compensation for those unable to fast during Ramadan, turning that obligation into practical support for people in need.",
        "Through AWFCA, Fidyaa contributions help deliver food and essential aid with care and accountability.",
      ],
    },
    {
      slug: "clean-water-project",
      navLabel: "Clean Water",
      category: "Humanitarian Aid",
      title: "Clean Water Project",
      image: "/images/awfca/programs/clean-water.webp",
      summary: [
        "Access to clean water is a basic human right, yet many communities still struggle to find it. AWFCA’s Clean Water Project helps families secure safe drinking water.",
        "Through water treatment plants, hand pumps, and related infrastructure, we support healthier communities and long-term dignity.",
      ],
    },
    {
      slug: "food-bank",
      navLabel: "Food Bank",
      category: "Humanitarian Aid",
      title: "Food Bank",
      image: "/images/awfca/programs/food-bank.jpg",
      summary: [
        "AWFCA’s Food Bank strengthens food security for households struggling to afford nutritious meals.",
        "Regular food support helps families meet immediate needs while restoring stability and hope.",
      ],
    },
    {
      slug: "free-medical-dispensary",
      navLabel: "Medical Dispensary",
      category: "Healthcare",
      title: "Free Medical Dispensary",
      image: "/images/awfca/programs/medical-dispensary.jpg",
      summary: [
        "Our Free Medical Dispensary brings accessible care to underserved communities, including support in Tehsil Sadiqabad, Rahim Yar Khan.",
        "The dispensary helps patients receive essential treatment and medicines with compassion and dignity.",
      ],
    },
    {
      slug: "ramadan-hamper",
      navLabel: "Ramadan Hamper",
      category: "Religious Giving",
      title: "Ramadan Hamper",
      image: "/images/awfca/programs/ramadan-hamper.jpg",
      summary: [
        "Each year, AWFCA’s Ramadan Hamper program delivers food support to families so they can observe the blessed month with greater ease and dignity.",
        "These packages help households meet essential nutritional needs during a time of reflection, generosity, and community care.",
      ],
    },
    {
      slug: "eid-gift-hampers",
      navLabel: "Eid Gift Hampers",
      category: "Religious Giving",
      title: "Eid Gift Hampers",
      image: "/images/awfca/programs/eid-gifts.jpg",
      summary: [
        "Eid Gift Hampers help struggling families share in the joy of Eid with groceries, festive food, and essential support.",
        "Where resources allow, additional gifts such as clothes or shoes help children and families celebrate with dignity.",
      ],
    },
    {
      slug: "helping-hands-campaign",
      navLabel: "Helping Hands",
      category: "Social Welfare",
      title: "Helping Hands Campaign",
      image: "/images/awfca/programs/helping-hands.jpg",
      summary: [
        "The Helping Hands Campaign is AWFCA’s general donations initiative for supporters who want to fund urgent community needs.",
        "Flexible giving through this campaign helps us respond quickly where families need food, relief, education, or welfare support most.",
      ],
    },
    {
      slug: "gaza-dignity-kits",
      navLabel: "Gaza Dignity Kits",
      category: "Humanitarian Aid",
      title: "Gaza Dignity Kits",
      image: "/images/awfca/programs/gaza-dignity-kits.jpg",
      summary: [
        "In partnership with Penny Appeal Canada, AWFCA helped deliver more than 5,000 dignity kits to sisters in Gaza.",
        "This emergency solidarity effort reflects our commitment to standing with communities facing crisis and profound hardship.",
      ],
    },
  ],
  detail: {
    expect: {
      title: "What to expect",
      text: "Supporters can expect compassionate delivery, transparent updates, and programs designed to restore dignity for families in need.",
      items: [
        {
          title: "Community-Centered Delivery",
          text: "Programs are guided by real community needs and delivered with local partners and volunteers.",
        },
        {
          title: "Accountable Stewardship",
          text: "We focus on clear reporting, responsible fund use, and measurable impact for every campaign.",
        },
      ],
    },
    how: {
      title: "How we work",
      text: "We follow a structured approach: understand community needs, deliver practical solutions, and report impact with transparency.",
      items: [
        {
          question: "01. Identify Community Needs",
          answer:
            "We begin by understanding the real challenges faced by communities through field insight, local partners, and direct engagement so solutions stay relevant and impactful.",
        },
        {
          question: "02. Plan & Implement Programs",
          answer:
            "We design practical programs across humanitarian aid, education, social welfare, and religious giving, then deliver them with volunteers and trusted partners.",
        },
        {
          question: "03. Monitor & Share Impact",
          answer:
            "We track outcomes, publish updates and reports, and keep supporters informed so generosity remains connected to measurable change.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      text: "Learn how AWFCA programs work, how donations are used, and how you can support verified community projects with confidence.",
    },
  },
} as const;

export type ProgramItem = (typeof programsPage.items)[number];

export function getProgram(slug: string) {
  return programsPage.items.find((item) => item.slug === slug);
}
