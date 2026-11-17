-- Didactiq schema (rebuild of Raeda Didactique core)
-- Postgres + Supabase RLS ready

create extension if not exists "pgcrypto";

create type education_level as enum ('1AEF', '2AEF', '3AEF', '4AEF', '5AEF', '6AEF');
create type subject_pole as enum ('francais', 'arabe');
create type subject as enum ('francais', 'maths', 'sciences', 'arabe');
create type mindmap_engine as enum ('gabarit', 'gemini');
create type ui_lang as enum ('fr', 'ar');
create type ui_theme as enum ('dark', 'light');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  level education_level,
  pole subject_pole,
  focus_active boolean not null default true,
  ui_lang ui_lang not null default 'fr',
  theme ui_theme not null default 'dark',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on profiles (level, pole);

create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  level education_level not null,
  subject subject not null,
  week smallint not null check (week between 1 and 40),
  day smallint not null check (day between 1 and 7),
  title_fr text not null,
  title_ar text,
  topic text,
  slides_count integer not null default 0,
  is_multilevel boolean not null default false,
  multilevel_group text,
  is_published boolean not null default true,
  is_locked boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on courses (level, subject, week, day);
create index on courses (is_published, week, day);

create table slides (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  position smallint not null,
  image_path text,
  title text,
  notes text,
  created_at timestamptz not null default now(),
  unique (course_id, position)
);
create index on slides (course_id, position);

create table mind_maps (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  engine mindmap_engine not null,
  image_path text,
  stages jsonb not null default '[]',
  objectives text[] not null default '{}',
  generated_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (course_id, engine)
);
create index on mind_maps (course_id);

create table offline_caches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  size_bytes bigint,
  cached_at timestamptz not null default now(),
  unique (user_id, course_id)
);
create index on offline_caches (user_id);

create table course_uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  original_filename text not null,
  storage_path text not null,
  level education_level,
  subject subject,
  week smallint,
  day smallint,
  status text not null default 'pending' check (status in ('pending', 'processing', 'approved', 'rejected')),
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on course_uploads (user_id, status);

create table remote_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  host_user_id uuid not null references profiles(id) on delete cascade,
  code text not null unique,
  current_slide smallint not null default 0,
  is_active boolean not null default true,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index on remote_sessions (code) where is_active;

-- RLS
alter table profiles enable row level security;
alter table courses enable row level security;
alter table slides enable row level security;
alter table mind_maps enable row level security;
alter table offline_caches enable row level security;
alter table course_uploads enable row level security;
alter table remote_sessions enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Published courses are public" on courses for select using (is_published = true);
create policy "Slides of published courses are public" on slides for select using (exists (select 1 from courses c where c.id = slides.course_id and c.is_published = true));
create policy "Mind maps of published courses are public" on mind_maps for select using (exists (select 1 from courses c where c.id = mind_maps.course_id and c.is_published = true));

create policy "Users manage own offline cache" on offline_caches for all using (auth.uid() = user_id);
create policy "Users manage own uploads" on course_uploads for all using (auth.uid() = user_id);
create policy "Host manages own remote sessions" on remote_sessions for all using (auth.uid() = host_user_id);
create policy "Anyone can read active remote session by code" on remote_sessions for select using (is_active = true and expires_at > now());
