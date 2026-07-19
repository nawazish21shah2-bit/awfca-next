import { site } from "@/data/site";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "July 18, 2026",
    intro:
      "This Privacy Policy explains how Arrahman Welfare Foundation Canada (AWFCA) collects, uses, and protects personal information when you visit our website, donate, volunteer, or otherwise interact with our organization. This page is provided for general website use and is not a substitute for formal legal advice.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We may collect personal details you provide directly, such as your name, email address, phone number, mailing address, donation details, and messages submitted through our contact or volunteer forms.",
          "We may also collect limited technical information automatically, including browser type, device information, IP address, and pages visited, to improve website performance and security.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "We use the information we collect to process donations, respond to inquiries, manage volunteer participation, send updates you request, improve our programs, and maintain a secure online experience.",
        ],
        bullets: [
          "Process donations and issue acknowledgments or tax receipts where applicable",
          "Respond to questions, partnership requests, and volunteer applications",
          "Share program updates and impact stories when you opt in",
          "Improve website usability, accessibility, and security",
        ],
      },
      {
        heading: "Sharing of information",
        paragraphs: [
          "We do not sell your personal information. We may share limited data with trusted service providers who help us operate payment processing, email delivery, website hosting, and analytics, and only as needed to perform those services.",
          "We may also disclose information when required by law or to protect the rights, safety, and integrity of our organization, donors, volunteers, and beneficiaries.",
        ],
      },
      {
        heading: "Data security and retention",
        paragraphs: [
          "We take reasonable administrative, technical, and physical measures to protect personal information. While no method of transmission over the internet is completely secure, we work to safeguard donation and contact data responsibly.",
          "We retain personal information only as long as needed for the purposes described in this policy, or as required by legal, accounting, and reporting obligations.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You may request access to, correction of, or deletion of your personal information where applicable. You can also unsubscribe from marketing communications at any time using the link included in our emails or by contacting us.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `If you have questions about this Privacy Policy or how your information is handled, please contact us at ${site.email} or ${site.phone}.`,
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    updated: "July 18, 2026",
    intro:
      "These Terms & Conditions govern your use of the Arrahman Welfare Foundation Canada (AWFCA) website and related online services. By accessing or using this website, you agree to these terms.",
    sections: [
      {
        heading: "Use of the website",
        paragraphs: [
          "You agree to use this website only for lawful purposes and in a manner that does not disrupt the experience of other visitors, misuse donation tools, or attempt to interfere with website security.",
        ],
        bullets: [
          "Do not submit false or misleading information",
          "Do not attempt unauthorized access to systems or data",
          "Do not misuse donation forms, volunteer forms, or contact tools",
          "Respect all intellectual property and published content",
        ],
      },
      {
        heading: "Donations and payments",
        paragraphs: [
          "Donations made through this website or linked giving portals are voluntary contributions in support of AWFCA’s charitable programs. Payment processing may be handled by third-party providers, and applicable transaction terms of those providers may also apply.",
          "While we strive for accuracy in campaign descriptions and impact reporting, program delivery may adapt based on community needs, emergency response priorities, and available resources.",
        ],
      },
      {
        heading: "Content and intellectual property",
        paragraphs: [
          "All website content, including text, images, logos, graphics, and design elements, is owned by AWFCA or used with permission. You may not copy, redistribute, or commercially exploit site content without prior written consent.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "Our website may include links to external websites for convenience or additional information. We are not responsible for the content, privacy practices, or availability of third-party sites.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, AWFCA is not liable for any indirect, incidental, or consequential damages arising from your use of the website, temporary service interruptions, or reliance on published content.",
        ],
      },
      {
        heading: "Updates to these terms",
        paragraphs: [
          "We may update these Terms & Conditions from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
        ],
      },
    ],
  },
  {
    slug: "donation-policy",
    title: "Donation Policy",
    updated: "July 18, 2026",
    intro:
      "This Donation Policy outlines how Arrahman Welfare Foundation Canada (AWFCA) receives, manages, and uses contributions so donors can give with transparency and confidence.",
    sections: [
      {
        heading: "How donations are used",
        paragraphs: [
          "Donations support food relief, education, healthcare, orphan care, emergency response, religious giving programs, and related community initiatives. Funds may also support essential operating costs required to deliver programs effectively and responsibly.",
        ],
      },
      {
        heading: "Restricted and unrestricted gifts",
        paragraphs: [
          "Where a campaign or designation is selected, we make every reasonable effort to apply the gift as intended. If a designated program is fully funded, closed, or no longer feasible, we may redirect the contribution to a closely related need that advances the same mission.",
          "Unrestricted donations provide flexibility to respond quickly to urgent community needs and sustain long-term program delivery.",
        ],
      },
      {
        heading: "Acknowledgments and receipts",
        paragraphs: [
          "Donors typically receive an acknowledgment for completed online gifts. Eligible donations receive tax receipts. Online gifts generate instant confirmation, and official tax receipts are typically issued by mid-February.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          `Because donations are charitable contributions, they are generally non-refundable. If a donation was made in error, please contact us promptly at ${site.email} so we can review the request in good faith.`,
        ],
      },
      {
        heading: "Recurring donations",
        paragraphs: [
          "Monthly or recurring gifts can be updated or cancelled at any time by contacting our team or through the relevant donation portal. Changes may take effect on the next scheduled billing cycle depending on processing timelines.",
        ],
      },
      {
        heading: "Transparency",
        paragraphs: [
          "We are committed to responsible stewardship of donor funds and to sharing meaningful updates about program progress, community impact, and how contributions create change through our reports and public communications.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    updated: "July 18, 2026",
    intro:
      "This Disclaimer explains the limits of information published on the Arrahman Welfare Foundation Canada (AWFCA) website and clarifies that website content is provided for general informational purposes.",
    sections: [
      {
        heading: "General information",
        paragraphs: [
          "Content on this website is intended to share information about our mission, programs, campaigns, and opportunities to get involved. While we work to keep information accurate and current, details may change as programs evolve.",
        ],
      },
      {
        heading: "No professional advice",
        paragraphs: [
          "Nothing on this website constitutes legal, tax, financial, medical, or professional advice. Please consult a qualified advisor regarding donation tax treatment or other personal decisions.",
        ],
      },
      {
        heading: "Program outcomes",
        paragraphs: [
          "Stories, statistics, and impact examples illustrate the nature of our work and outcomes we strive to achieve. Individual results may vary based on community context, available resources, and changing needs.",
        ],
      },
      {
        heading: "Website availability",
        paragraphs: [
          "We aim to keep the website available and secure, but we do not guarantee uninterrupted access. Temporary outages, maintenance windows, or technical issues may occur.",
        ],
      },
      {
        heading: "External content",
        paragraphs: [
          "References to partners, platforms, maps, social networks, donation portals, or other third-party services are provided for convenience. AWFCA does not control and is not responsible for third-party content or practices.",
        ],
      },
      {
        heading: "Questions",
        paragraphs: [
          `If you need clarification about any content on this website, contact us at ${site.email} or ${site.phone}.`,
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
