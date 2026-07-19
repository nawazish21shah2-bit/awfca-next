export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

export const posts: Post[] = [
  {
    "slug": "the-last-ten-days-of-ramadan-a-time-for-reflection-renewal-and-impact",
    "title": "The Last Ten Days of Ramadan: A Time for Reflection, Renewal and Impact",
    "excerpt": "As the blessed month of Ramadan enters its final ten days, we step into a period of extraordinary mercy, reflection, and spiritual opportunity. These nights may include Laylat al-Q...",
    "date": "March 9, 2026",
    "image": "/images/blog/the-last-ten-days-of-ramadan-a-time-for-reflection-renewal-and-impact.jpg"
  },
  {
    "slug": "supporting-new-beginnings-awfcas-initiative-for-deserving-couples-across-pakistan",
    "title": "Supporting New Beginnings: AWFCA’s Initiative for Deserving Couples Across Pakistan",
    "excerpt": "Arrahman Welfare Foundation Canada (AWFCA) recently completed a series of events across Pakistan designed to help deserving couples begin their new chapter in life with dignity, co...",
    "date": "December 2, 2025",
    "image": "/images/blog/supporting-new-beginnings-awfcas-initiative-for-deserving-couples-across-pakistan.jpg"
  },
  {
    "slug": "standing-together-with-pakistan-responding-to-the-devastating-floods",
    "title": "Standing Together with Pakistan: Responding to the Devastating Floods",
    "excerpt": "Pakistan is facing one of the most devastating flood disasters in recent history. Weeks of relentless monsoon rains have washed away homes, schools, and entire villages. Families i...",
    "date": "August 30, 2025",
    "image": "/images/blog/standing-together-with-pakistan-responding-to-the-devastating-floods.jpg"
  },
  {
    "slug": "emergency-relief-showing-up-when-it-matters-most",
    "title": "Emergency Relief: Showing Up When It Matters Most",
    "excerpt": "In times of crisis—whether it’s a natural disaster, conflict, or humanitarian emergency—every second counts. At AWFCA, we respond quickly and compassionately to bring life-saving a...",
    "date": "April 13, 2025",
    "image": "/images/blog/emergency-relief-showing-up-when-it-matters-most.jpg"
  },
  {
    "slug": "empowering-orphans-with-love-care-and-opportunity",
    "title": "Empowering Orphans with Love, Care, and Opportunity",
    "excerpt": "Every child deserves a safe, loving environment and the opportunity to thrive. At AWFCA, we stand by this belief through our Orphan Support Program, which provides food, education,...",
    "date": "April 13, 2025",
    "image": "/images/blog/empowering-orphans-with-love-care-and-opportunity.jpg"
  },
  {
    "slug": "the-power-of-clean-water-changing-lives-drop-by-drop",
    "title": "The Power of Clean Water: Changing Lives Drop by Drop",
    "excerpt": "Access to clean water is a basic human right, yet millions around the world still struggle daily to find it. At Arrahman Welfare Foundation Canada (AWFCA), we believe clean water i...",
    "date": "April 13, 2025",
    "image": "/images/blog/the-power-of-clean-water-changing-lives-drop-by-drop.jpg"
  }
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
