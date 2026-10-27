-- Kin Fit Plus: subscription status and the daily AI quota.
-- Run once in Supabase › SQL Editor, after schema.sql. Safe to run again.

-- Subscription status on the profile. Only the server (Stripe webhook, service role) may change it.
alter table public.profiles add column if not exists plan text not null default 'free' check (plan in ('free', 'plus'));
alter table public.profiles add column if not exists plus_until timestamptz;
alter table public.profiles add column if not exists stripe_customer text;

-- Members may only write their own pseudo, consent and progress: never the plan columns.
revoke insert, update on public.profiles from anon, authenticated;
grant insert (id, pseudo, consent_at, state, updated_at) on public.profiles to authenticated;
grant update (pseudo, consent_at, state, updated_at) on public.profiles to authenticated;

-- AI calls per member and per day; read and written only by the Edge Function (service role).
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  n int not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;

-- Counts one call and returns the new total, or -1 when today's limit is already reached.
create or replace function public.ai_take(p_user uuid, p_limit int) returns int
language plpgsql security definer set search_path = public as $$
declare v int;
begin
  insert into ai_usage (user_id, day, n) values (p_user, current_date, 1)
  on conflict (user_id, day) do update set n = ai_usage.n + 1 where ai_usage.n < p_limit
  returning n into v;
  return coalesce(v, -1);
end $$;
revoke execute on function public.ai_take(uuid, int) from public, anon, authenticated;
grant execute on function public.ai_take(uuid, int) to service_role;
