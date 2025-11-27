create table if not exists public.api_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  direction text not null check (direction in ('request','response')),
  endpoint text not null,
  status_code int,
  latency_ms int,
  error text,
  payload jsonb,
  client_ip text,
  user_email text
);

alter table public.api_logs enable row level security;

create policy "logs insert anon" on public.api_logs
  for insert to anon
  with check (true);

create policy "logs insert auth" on public.api_logs
  for insert to authenticated
  with check (true);

create policy "logs select auth" on public.api_logs
  for select to authenticated
  using (true);

create index if not exists api_logs_created_at_idx on public.api_logs(created_at desc);
