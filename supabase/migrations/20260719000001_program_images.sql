-- Program gallery images (cover stays on programs.image_url)

create table public.program_images (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  media_asset_id uuid references public.media_assets (id) on delete set null,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index program_images_program_sort_idx
  on public.program_images (program_id, sort_order)
  where deleted_at is null;

create trigger set_program_images_updated_at
  before update on public.program_images
  for each row execute function public.set_updated_at();

alter table public.program_images enable row level security;

create policy program_images_select on public.program_images for select to authenticated
  using (
    deleted_at is null
    and exists (
      select 1 from public.programs p
      where p.id = program_id
        and p.deleted_at is null
        and public.can_read_content(p.site_id)
    )
  );

create policy program_images_write on public.program_images for all to authenticated
  using (
    exists (
      select 1 from public.programs p
      where p.id = program_id
        and public.can_read_content(p.site_id)
    )
  )
  with check (
    exists (
      select 1 from public.programs p
      where p.id = program_id
        and public.can_read_content(p.site_id)
    )
  );
