create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "allow insert for anon" on public.contact_messages
  for insert to anon
  with check (true);

create policy "allow insert for authenticated" on public.contact_messages
  for insert to authenticated
  with check (true);

create policy "allow select for admin email" on public.contact_messages
  for select to authenticated
  using ((current_setting('request.jwt.claims', true)::jsonb ->> 'email') = '1420272691@qq.com');

create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);
