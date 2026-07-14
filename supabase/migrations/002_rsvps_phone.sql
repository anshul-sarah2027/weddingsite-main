-- Add phone for RSVP contact details (existing environments that already ran 001)
alter table public.rsvps
  add column if not exists phone text;

update public.rsvps
set phone = ''
where phone is null;

alter table public.rsvps
  alter column phone set default '',
  alter column phone set not null;
