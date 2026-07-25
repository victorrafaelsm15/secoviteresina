-- Schema do portal SECOVI-THE.
-- Rode este arquivo inteiro no SQL Editor do seu projeto Supabase
-- (https://app.supabase.com/project/_/sql/new).

-- ==========================================================
-- Tabelas
-- ==========================================================

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  excerpt text,
  content text,
  image_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  file_url text,
  created_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists board_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  description text,
  photo_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ==========================================================
-- Row Level Security: leitura pública, escrita só para admin logado
-- ==========================================================

do $$
declare
  t text;
begin
  foreach t in array array['news', 'events', 'documents', 'partners', 'board_members']
  loop
    execute format('alter table %I enable row level security;', t);

    execute format('drop policy if exists "%I_public_read" on %I;', t, t);
    execute format(
      'create policy "%I_public_read" on %I for select using (true);',
      t, t
    );

    execute format('drop policy if exists "%I_admin_insert" on %I;', t, t);
    execute format(
      'create policy "%I_admin_insert" on %I for insert with check (auth.role() = ''authenticated'');',
      t, t
    );

    execute format('drop policy if exists "%I_admin_update" on %I;', t, t);
    execute format(
      'create policy "%I_admin_update" on %I for update using (auth.role() = ''authenticated'');',
      t, t
    );

    execute format('drop policy if exists "%I_admin_delete" on %I;', t, t);
    execute format(
      'create policy "%I_admin_delete" on %I for delete using (auth.role() = ''authenticated'');',
      t, t
    );
  end loop;
end $$;

-- ==========================================================
-- Storage: bucket único para imagens e documentos do painel admin
-- ==========================================================

insert into storage.buckets (id, name, public)
values ('portal-media', 'portal-media', true)
on conflict (id) do nothing;

drop policy if exists "portal_media_public_read" on storage.objects;
create policy "portal_media_public_read"
  on storage.objects for select
  using (bucket_id = 'portal-media');

drop policy if exists "portal_media_admin_insert" on storage.objects;
create policy "portal_media_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'portal-media' and auth.role() = 'authenticated');

drop policy if exists "portal_media_admin_update" on storage.objects;
create policy "portal_media_admin_update"
  on storage.objects for update
  using (bucket_id = 'portal-media' and auth.role() = 'authenticated');

drop policy if exists "portal_media_admin_delete" on storage.objects;
create policy "portal_media_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'portal-media' and auth.role() = 'authenticated');

-- ==========================================================
-- Usuário admin: crie manualmente em
-- Authentication > Users > Add user (com e-mail/senha),
-- não há cadastro público no painel do portal.
-- ==========================================================
