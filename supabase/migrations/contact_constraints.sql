do $$
begin
  begin
    alter table public.contact_messages
      add constraint contact_messages_name_len check (char_length(name) between 1 and 100);
  exception when duplicate_object then
    null;
  end;
end $$;

do $$
begin
  begin
    alter table public.contact_messages
      add constraint contact_messages_subject_len check (char_length(subject) between 1 and 200);
  exception when duplicate_object then
    null;
  end;
end $$;

do $$
begin
  begin
    alter table public.contact_messages
      add constraint contact_messages_message_len check (char_length(message) between 1 and 2000);
  exception when duplicate_object then
    null;
  end;
end $$;

do $$
begin
  begin
    alter table public.contact_messages
      add constraint contact_messages_contact_len check (char_length(email) between 1 and 200);
  exception when duplicate_object then
    null;
  end;
end $$;
