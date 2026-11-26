-- ============================================================================
-- MASTER CONOCER BUSINESS (CEDUCATY) — Esquema SQL para Supabase (PostgreSQL)
-- Alcance: Captación de prospectos de diagnóstico gratuito y clasificación comercial.
-- NOTA: No usar CEDUCATY CRM para almacenar prospectos de esta landing.
-- ============================================================================

create extension if not exists "pgcrypto";

-- 1. Tabla principal de prospectos
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) >= 2 and char_length(full_name) <= 140),
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  whatsapp text not null check (char_length(regexp_replace(whatsapp, '\D', '', 'g')) >= 10),
  project_type text not null check (
    project_type in (
      'Acreditarme como Evaluador Independiente',
      'Crear un Centro de Evaluación',
      'Conocer ambas opciones',
      'Obtener primero mis certificaciones',
      'Ya cuento con acreditación y quiero desarrollar mi negocio'
    )
  ),
  development_timeline text not null check (
    development_timeline in (
      'Lo antes posible',
      'Próximos 30 días',
      'Próximos 60 días',
      'Próximos 90 días',
      'Más de 90 días',
      'Solo estoy investigando'
    )
  ),
  experience_level text not null check (
    experience_level in (
      'No tengo certificaciones; comienzo desde cero',
      'Ya tengo certificados de competencia',
      'Tengo experiencia evaluando',
      'Ya cuento con acreditación CE/EI'
    )
  ),
  estimated_budget text check (
    estimated_budget is null or estimated_budget in (
      'Aún no tengo presupuesto',
      'Menos de $5,000 MXN',
      'De $5,000 a $10,000 MXN',
      'De $10,000 a $20,000 MXN',
      'Más de $20,000 MXN',
      'Prefiero conversarlo'
    )
  ),
  privacy_accepted boolean not null check (privacy_accepted = true),
  privacy_accepted_at timestamptz not null default now(),
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  acquisition_source text not null default 'Tráfico directo' check (
    acquisition_source in ('Facebook', 'TikTok', 'Google', 'Referido', 'Tráfico directo', 'Otro')
  ),
  commercial_priority text not null generated always as (
    case development_timeline
      when 'Lo antes posible' then 'Prioridad muy alta'
      when 'Próximos 30 días' then 'Prioridad alta'
      when 'Próximos 60 días' then 'Interés activo'
      when 'Próximos 90 días' then 'Interés futuro'
      when 'Más de 90 días' then 'Exploración'
      else 'Informativo'
    end
  ) stored,
  status text not null default 'Nuevo' check (
    status in ('Nuevo', 'En revisión', 'Contactado', 'En seguimiento', 'Descartado')
  ),
  created_at timestamptz not null default now()
);

-- Índices para filtrado en el panel administrativo
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_project_type on public.leads (project_type);
create index if not exists idx_leads_timeline on public.leads (development_timeline);
create index if not exists idx_leads_priority on public.leads (commercial_priority);
create index if not exists idx_leads_status on public.leads (status);

-- 2. Seguridad: Row Level Security (RLS)
alter table public.leads enable row level security;

-- Revocar acceso público directo de lectura, actualización y borrado
revoke all on table public.leads from anon;
grant insert on table public.leads to anon;

-- Política de inserción pública controlada (sin lectura pública)
drop policy if exists "public_insert_diagnostic_leads" on public.leads;
create policy "public_insert_diagnostic_leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    privacy_accepted = true
    and status = 'Nuevo'
  );

-- Política de lectura/gestión exclusiva para administradores autenticados
-- En Fase 4, restringir mediante claim de rol (ej. auth.jwt() ->> 'role' = 'admin')
drop policy if exists "admin_read_leads" on public.leads;
create policy "admin_read_leads"
  on public.leads
  for select
  to authenticated
  using (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin');

drop policy if exists "admin_update_leads" on public.leads;
create policy "admin_update_leads"
  on public.leads
  for update
  to authenticated
  using (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin')
  with check (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin');
