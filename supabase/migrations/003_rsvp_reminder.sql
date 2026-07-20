-- Tracks whether a guest has already been sent the pre-wedding reminder email,
-- so the daily cron job never double-sends.
alter table public.rsvps
  add column if not exists reminder_sent_at timestamptz;
