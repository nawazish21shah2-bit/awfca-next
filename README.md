# Giveon — Next.js (AWFCA)

Full React/Next.js site for Arrahman Welfare Foundation Canada, with a multisite Content Management Portal.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- GSAP-ready motion utilities, Swiper testimonials
- Stripe Checkout for donations
- Supabase Auth / Postgres / Storage for the admin portal
- Newsletter Route Handler

## Develop

```bash
cd awfca-next
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin portal: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Environment

See `.env.example` for Stripe and Supabase keys.

Without Supabase keys, the public site continues to use typed content in `data/` and forms return a soft success response. Without Stripe keys, donation checkout returns a clear configuration error.

## Content portal

Staff documentation, migrations, seeding, roles, and UK/Pakistan activation steps:

- [docs/ADMIN_PORTAL.md](docs/ADMIN_PORTAL.md)

```bash
npm run seed:canada
npm test
```

## Content sources

- Managed (when Supabase is configured): posts, programs, FAQs, team, reports, counters, submissions
- Still in `data/` for page chrome / marketing copy: home sections, about, services detail, legal pages, navigation
