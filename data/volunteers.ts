import { pageHeroImages } from "@/data/page-heroes";

export type Volunteer = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
};

export const volunteersPage = {
  hero: {
    title: "People behind the mission",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Our Team", href: "/volunteers" },
    ],
    background: pageHeroImages.volunteers,
  },
  intro:
    "Meet the AWFCA directors, coordinators, and volunteers who turn compassion into food, education, healthcare, and emergency relief.",
} as const;

export const volunteers: Volunteer[] = [
  {
    slug: "abdul-hafeez-khan",
    name: "Abdul Hafeez Khan",
    role: "Director",
    image: "/images/awfca/team/abdul-hafeez-khan.png",
    bio: "Provides leadership and strategic direction for AWFCA’s charitable programs and community initiatives.",
  },
  {
    slug: "awais-riaz",
    name: "Awais Riaz",
    role: "Director",
    image: "/images/awfca/team/awais-riaz.png",
    bio: "Supports organizational governance and helps guide AWFCA’s poverty-relief and outreach work.",
  },
  {
    slug: "imam-humza-khan",
    name: "Imam Humza Khan",
    role: "Program Coordinator",
    image: "/images/awfca/team/imam-humza-khan.png",
    bio: "Coordinates program delivery and community engagement across AWFCA initiatives.",
  },
  {
    slug: "abdul-majid-sukhaira",
    name: "Abdul Majid Sukhaira",
    role: "Volunteer",
    image: "/images/awfca/team/abdul-majid-sukhaira.png",
    bio: "Supports field and community activities that help families access essential resources.",
  },
  {
    slug: "ali-raza",
    name: "Ali Raza",
    role: "Volunteer",
    image: "/images/awfca/team/ali-raza.png",
    bio: "Assists with outreach and campaign support to help AWFCA serve communities in need.",
  },
  {
    slug: "zian-ahmad",
    name: "Zian Ahmad",
    role: "Volunteer",
    image: "/images/awfca/team/zian-ahmad.png",
    bio: "Contributes time and effort to AWFCA’s volunteer-led programs and community support work.",
  },
];

export function getVolunteer(slug: string) {
  return volunteers.find((v) => v.slug === slug);
}
