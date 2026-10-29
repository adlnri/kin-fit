-- Kin Fit social: the friends' weekly leaderboard.
-- Run once in Supabase › SQL Editor, after schema.sql. Safe to run again.
-- Each member sees only their own line and their accepted friends': pseudo and points of the week, nothing else.
create or replace function public.friends_board() returns table (pseudo text, pts int, week text, me boolean)
language sql stable security definer set search_path = public as $$
  select p.pseudo::text,
         coalesce((p.state -> 'weekPts' ->> 'pts')::int, 0),
         coalesce(p.state -> 'weekPts' ->> 'id', ''),
         p.id = auth.uid()
  from profiles p
  where p.id = auth.uid() or public.are_friends(auth.uid(), p.id);
$$;
revoke execute on function public.friends_board() from public, anon;
grant execute on function public.friends_board() to authenticated;
