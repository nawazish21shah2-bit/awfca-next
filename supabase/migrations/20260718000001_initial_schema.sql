-- AWFCA Multisite Content Management Portal
-- Sites: Canada (active), UK, Pakistan (preconfigured)

create extension if not exists "pgcrypto";

create type public.app_role as enum ('super_admin', 'site_editor');
create type public.publish_status as enum ('draft', 'published');
create type public.submission_status as enum (
  'new', 'in_progress', 'resolved', 'spam', 'archived'
);
create type public.submission_type as enum ('contact', 'volunteer');
create type public.media_kind as enum ('image', 'pdf', 'other');

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  country_code text not null,
  hostname text not null unique,
  locale text not null default 'en',
  is_active boolean not null default true,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  is_super_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  site_id uuid not null references public.sites (id) on delete cascade,
  role public.app_role not null default 'site_editor',
  created_at timestamptz not null default now(),
  unique (user_id, site_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete set null,
  kind public.media_kind not null default 'image',
  bucket text not null default 'media',
  path text not null,
  public_url text,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null default 0,
  alt_text text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index media_assets_bucket_path_idx
  on public.media_assets (bucket, path)
  where deleted_at is null;

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.posts (id) on delete cascade,
  slug text not null,
  title text not null,
  excerpt text not null default '',
  published_at date,
  image_url text,
  image_asset_id uuid references public.media_assets (id) on delete set null,
  body jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  tags text[] not null default '{}',
  status public.publish_status not null default 'draft',
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint posts_site_slug_unique unique nulls not distinct (site_id, slug)
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.programs (id) on delete cascade,
  slug text not null,
  nav_label text not null,
  category text not null default '',
  title text not null,
  image_url text,
  image_asset_id uuid references public.media_assets (id) on delete set null,
  summary text[] not null default '{}',
  body jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  status public.publish_status not null default 'draft',
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint programs_site_slug_unique unique nulls not distinct (site_id, slug)
);

create table public.faq_categories (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.faq_categories (id) on delete cascade,
  code text not null,
  label text not null,
  sort_order int not null default 0,
  status public.publish_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint faq_categories_site_code_unique unique nulls not distinct (site_id, code)
);

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.faq_items (id) on delete cascade,
  category_id uuid references public.faq_categories (id) on delete set null,
  question text not null,
  answer text not null,
  placement text not null default 'page',
  status public.publish_status not null default 'published',
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.team_members (id) on delete cascade,
  slug text not null,
  name text not null,
  role text not null default '',
  bio text not null default '',
  image_url text,
  image_asset_id uuid references public.media_assets (id) on delete set null,
  status public.publish_status not null default 'published',
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint team_members_site_slug_unique unique nulls not distinct (site_id, slug)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.reports (id) on delete cascade,
  year text not null,
  report_type text not null,
  title text not null,
  cover_image_url text,
  cover_asset_id uuid references public.media_assets (id) on delete set null,
  pdf_url text,
  pdf_asset_id uuid references public.media_assets (id) on delete set null,
  external_url text,
  description text,
  status public.publish_status not null default 'published',
  sort_order int not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.achievement_counters (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.sites (id) on delete cascade,
  override_of_id uuid references public.achievement_counters (id) on delete cascade,
  key text not null,
  label text not null,
  value numeric not null default 0,
  prefix text not null default '',
  suffix text not null default '',
  decimals int not null default 0,
  placement text not null default 'home',
  image_url text,
  description text,
  status public.publish_status not null default 'published',
  sort_order int not null default 0,
  as_of_date date,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint achievement_counters_site_key_placement_unique
    unique nulls not distinct (site_id, key, placement)
);

create table public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites (id) on delete cascade,
  type public.submission_type not null,
  status public.submission_status not null default 'new',
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text,
  availability text,
  skills text,
  preferred_roles text,
  city text,
  country text,
  consent_version text,
  consent_at timestamptz,
  source_url text,
  source_hostname text,
  ip_hash text,
  user_agent text,
  honeypot_triggered boolean not null default false,
  assigned_to uuid references public.profiles (id) on delete set null,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index form_submissions_site_type_status_idx
  on public.form_submissions (site_id, type, status, created_at desc);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  site_id uuid references public.sites (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    (select p.is_super_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

create or replace function public.has_site_access(target_site_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_super_admin()
    or exists (
      select 1 from public.site_memberships m
      where m.user_id = auth.uid() and m.site_id = target_site_id
    );
$$;

create or replace function public.can_read_content(target_site_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select case
    when target_site_id is null then auth.uid() is not null
    else public.has_site_access(target_site_id)
  end;
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

do $$
declare t text;
begin
  foreach t in array array[
    'sites','profiles','media_assets','posts','programs',
    'faq_categories','faq_items','team_members','reports',
    'achievement_counters','form_submissions'
  ]
  loop
    execute format(
      'create trigger set_%s_updated_at before update on public.%I
       for each row execute function public.set_updated_at()', t, t
    );
  end loop;
end $$;

alter table public.sites enable row level security;
alter table public.profiles enable row level security;
alter table public.site_memberships enable row level security;
alter table public.media_assets enable row level security;
alter table public.posts enable row level security;
alter table public.programs enable row level security;
alter table public.faq_categories enable row level security;
alter table public.faq_items enable row level security;
alter table public.team_members enable row level security;
alter table public.reports enable row level security;
alter table public.achievement_counters enable row level security;
alter table public.form_submissions enable row level security;
alter table public.audit_events enable row level security;

create policy sites_select on public.sites for select to authenticated
  using (public.is_super_admin() or public.has_site_access(id));
create policy sites_write on public.sites for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_super_admin());
create policy profiles_update_self on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_super_admin())
  with check (id = auth.uid() or public.is_super_admin());

create policy memberships_select on public.site_memberships for select to authenticated
  using (user_id = auth.uid() or public.is_super_admin());
create policy memberships_write on public.site_memberships for all to authenticated
  using (public.is_super_admin()) with check (public.is_super_admin());

create policy media_select on public.media_assets for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy media_write on public.media_assets for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy posts_select on public.posts for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy posts_write on public.posts for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy programs_select on public.programs for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy programs_write on public.programs for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy faq_categories_select on public.faq_categories for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy faq_categories_write on public.faq_categories for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy faq_items_select on public.faq_items for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy faq_items_write on public.faq_items for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy team_select on public.team_members for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy team_write on public.team_members for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy reports_select on public.reports for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy reports_write on public.reports for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy counters_select on public.achievement_counters for select to authenticated
  using (deleted_at is null and public.can_read_content(site_id));
create policy counters_write on public.achievement_counters for all to authenticated
  using (public.can_read_content(site_id)) with check (public.can_read_content(site_id));

create policy submissions_select on public.form_submissions for select to authenticated
  using (deleted_at is null and public.has_site_access(site_id));
create policy submissions_update on public.form_submissions for update to authenticated
  using (public.has_site_access(site_id)) with check (public.has_site_access(site_id));
create policy submissions_insert_service on public.form_submissions for insert to authenticated
  with check (public.has_site_access(site_id));

create policy audit_select on public.audit_events for select to authenticated
  using (public.is_super_admin() or (site_id is not null and public.has_site_access(site_id)));
create policy audit_insert on public.audit_events for insert to authenticated
  with check (actor_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 5242880,
    array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']),
  ('reports', 'reports', true, 20971520, array['application/pdf'])
on conflict (id) do nothing;

create policy storage_media_public_read on storage.objects for select
  using (bucket_id in ('media', 'reports'));
create policy storage_media_staff_write on storage.objects for insert to authenticated
  with check (bucket_id in ('media', 'reports'));
create policy storage_media_staff_update on storage.objects for update to authenticated
  using (bucket_id in ('media', 'reports'));
create policy storage_media_staff_delete on storage.objects for delete to authenticated
  using (bucket_id in ('media', 'reports'));
