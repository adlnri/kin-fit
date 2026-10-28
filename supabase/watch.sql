-- Kin Fit watches: the Strava and Whoop links of each member.
-- Run once in Supabase › SQL Editor, after schema.sql. Safe to run again.

-- Access tokens never reach the browser: only the "watch" Edge Function (service role) reads this table.
create table if not exists public.watch_links (
  user_id uuid not null references auth.users (id) on delete cascade,
  provider text not null check (provider in ('strava', 'whoop')),
  access_token text not null,
  refresh_token text not null,
  expires_at timestamptz not null,
  athlete text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, provider)
);
alter table public.watch_links enable row level security;
revoke all on public.watch_links from anon, authenticated;
