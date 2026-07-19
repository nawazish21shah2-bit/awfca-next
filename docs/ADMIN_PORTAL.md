# Content Management Portal

Invite-only admin dashboard for 2–3 staff members. One portal manages **Canada** now and is ready for future **UK** and **Pakistan** websites with shared content plus per-site overrides.

## Stack

- Next.js App Router (`/admin`)
- Supabase Auth (email/password, invite-only)
- Supabase Postgres + RLS
- Supabase Storage (`media` images, `reports` PDFs)

## One-time setup

### Project already created

Remote project: `jgglinfqwodsmtodsqus`  
URL: `https://jgglinfqwodsmtodsqus.supabase.co`

1. Ensure `.env.local` has:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret — from **Project Settings → API Keys**)
   - `SITE_HOST_MAP`
2. Apply database schema (pick one):

**Option A — Dashboard (simplest)**  
In Supabase **SQL Editor**, run in order:
   - [`supabase/migrations/20260718000001_initial_schema.sql`](../supabase/migrations/20260718000001_initial_schema.sql)
   - [`supabase/migrations/20260718000002_seed_sites.sql`](../supabase/migrations/20260718000002_seed_sites.sql)
   - [`supabase/migrations/20260719000001_program_images.sql`](../supabase/migrations/20260719000001_program_images.sql)

**Option B — CLI**
```bash
npm run supabase:login
npm run supabase:link
npm run supabase:push
```
(When linking, use the database password you set when creating the project.)

3. Seed Canada content:

```bash
npm run seed:canada
```

4. Invite staff in Supabase Auth (Authentication → Users → Invite / Add user).
5. Promote one super admin:

```sql
update public.profiles
set is_super_admin = true
where email = 'you@awfca.ca';
```

6. Assign site editors:

```sql
insert into public.site_memberships (user_id, site_id, role)
select p.id, s.id, 'site_editor'
from public.profiles p
cross join public.sites s
where p.email = 'editor@awfca.ca'
  and s.code = 'ca';
```

7. Start the app and open `/admin/login`.

## Staff roles

| Role | Access |
|------|--------|
| `super_admin` | All sites (CA / UK / PK), shared content, memberships |
| `site_editor` | Only assigned sites + shared content |

## What staff can manage

- Posts / news
- Programs / projects (cover image + photo gallery)
- FAQ categories & items
- Team members
- Annual / impact report PDFs and cover images
- Achievement counters (meals, communities, funds %, etc.)
- Media library
- Contact + volunteer form submissions (status, notes, CSV export)

## Program galleries

Each program has one **cover** image (`programs.image_url`) for cards/listing, plus a **gallery**.

Gallery storage (in order of preference):

1. `program_images` table (after you apply the migration below)
2. `programs.body.gallery` JSON array (works today without the migration)
3. Local static files from `data/program-galleries.ts`

Apply the gallery table in Supabase **SQL Editor**:

[`supabase/migrations/20260719000001_program_images.sql`](../supabase/migrations/20260719000001_program_images.sql)

Then seed gallery URLs into Canada programs:

```bash
npm run seed:galleries
```

To refresh local gallery files from awfca.ca:

```bash
npm run import:galleries
npm run seed:galleries
```

## Multisite model

- **Shared** records have `site_id = null` and appear on every site.
- **Site-specific** records have a `site_id`.
- **Overrides** set `override_of_id` to a shared parent so one country can customize without duplicating everything.
- Hostname → site resolution uses `SITE_HOST_MAP` and `sites.hostname`.
- Future UK / Pakistan frontends can deploy separately and point at the same Supabase project; only activate those site rows and hostnames when ready.

## Public forms

- Contact: `/contact` → `POST /api/contact`
- Volunteer apply: `/volunteers/apply` → `POST /api/volunteer`
- Protected with Zod validation, honeypot field, rate limiting, consent versioning, and hashed IP storage.

## Publishing & cache

Server actions call `revalidatePath` for public routes after content changes. Public pages fall back to the existing `data/*` TypeScript content when Supabase is not configured, so local development still works.

## Backups

Use Supabase automated backups (Pro) or schedule `pg_dump` / Storage backups. Export submissions regularly from `/admin/submissions`.

## Connecting UK / Pakistan later

1. Set `is_active = true` on the `uk` / `pk` site rows.
2. Update `hostname` and `SITE_HOST_MAP`.
3. Assign memberships for local staff.
4. Publish site-specific overrides or shared content as needed.
5. Point the new domain’s Next.js deployment at the same env vars (or a dedicated frontend with the same backend).
