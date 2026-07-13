-- RSVP responses (overall wedding attendance only)
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  attending boolean not null,
  party_size integer,
  guest_names text[],
  allergies text,
  notes text,
  created_at timestamptz not null default now(),
  constraint rsvps_party_size_range check (
    party_size is null or (party_size >= 1 and party_size <= 10)
  )
);

create index if not exists rsvps_email_idx on public.rsvps (email);
create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

alter table public.rsvps enable row level security;

-- Public guests can submit an RSVP; reads stay private (dashboard later).
create policy "Allow public RSVP inserts"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);
