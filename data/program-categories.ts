import { programsPage } from "@/data/programs";

export type ProgramCategoryId =
  | "humanitarian-aid"
  | "educational-skills"
  | "social-welfare"
  | "religious-giving";

export type ProgramCategory = {
  id: ProgramCategoryId;
  label: string;
  shortLabel: string;
  serviceSlug: string;
  href: string;
  programSlugs: readonly string[];
};

/** Four AWFCA program groups — matches awfca.ca Programs submenu. */
export const programCategories: readonly ProgramCategory[] = [
  {
    id: "humanitarian-aid",
    label: "Humanitarian Aid Programs",
    shortLabel: "Humanitarian Aid",
    serviceSlug: "humanitarian-aid-programs",
    href: "/programs?category=humanitarian-aid",
    programSlugs: [
      "clean-water-project",
      "emergency-relief-fund",
      "food-bank",
      "free-medical-dispensary",
      "mobile-health-unit",
      "gaza-dignity-kits",
    ],
  },
  {
    id: "educational-skills",
    label: "Educational & Skills Development Programs",
    shortLabel: "Education & Skills",
    serviceSlug: "educational-skills-development-programs",
    href: "/programs?category=educational-skills",
    programSlugs: [
      "computer-training-institute",
      "student-scholarship-breaking-barriers-building-futures",
    ],
  },
  {
    id: "social-welfare",
    label: "Social Welfare and Community Support Programs",
    shortLabel: "Social Welfare",
    serviceSlug: "social-welfare-and-community-support-programs",
    href: "/programs?category=social-welfare",
    programSlugs: [
      "helping-hands-campaign",
      "new-beginnings-program",
      "orphan-support-program",
    ],
  },
  {
    id: "religious-giving",
    label: "Religious and Charitable Giving Programs",
    shortLabel: "Religious Giving",
    serviceSlug: "religious-and-charitable-giving-programs",
    href: "/programs?category=religious-giving",
    programSlugs: [
      "collective-qurbani-project",
      "eid-gift-hampers",
      "fidyaa",
      "ramadan-hamper",
      "sadaqah-tul-fitr",
      "zakaat-fund",
    ],
  },
] as const;

export function getProgramCategory(id: string | null | undefined) {
  if (!id) return null;
  return programCategories.find((category) => category.id === id) ?? null;
}

export function getProgramsForCategory(category: ProgramCategory) {
  const bySlug = new Map<string, (typeof programsPage.items)[number]>(
    programsPage.items.map((item) => [item.slug, item]),
  );
  return category.programSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is (typeof programsPage.items)[number] => Boolean(item));
}

export function buildProgramsNavChildren() {
  return programCategories.map((category) => ({
    label: category.shortLabel,
    href: category.href,
    children: getProgramsForCategory(category).map((program) => ({
      label: program.navLabel,
      href: `/programs/${program.slug}`,
    })),
  }));
}
