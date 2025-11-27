do $$
begin
  begin
    drop policy "allow select for admin email" on public.contact_messages;
  exception when others then
    null;
  end;

  create policy "allow select for authenticated" on public.contact_messages
    for select to authenticated
    using (true);
end $$;
