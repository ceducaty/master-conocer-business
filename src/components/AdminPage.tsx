import type { Session } from '@supabase/supabase-js';
import {
  AlertCircle,
  Download,
  Lock,
  LogOut,
  MessageCircle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { BRAND_ASSETS } from '../data/landingContent';
import {
  ADMIN_STATUS_OPTIONS,
  buildWhatsAppUrl,
  exportFilteredAdminLeadsToCsv,
  formatLeadDate,
  matchesPriorityFilter,
  matchesSearchQuery,
  type AdminPriorityFilter,
} from '../lib/adminHelpers';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import type { LeadRecord, LeadStatus } from '../types/lead';

function PriorityText({ value }: { value: string }) {
  const lower = (value || '').toLowerCase();
  let accentClass = 'text-[#1B2E2A]/75';
  if (lower.includes('muy alta')) {
    accentClass = 'text-[#A6192E] font-bold';
  } else if (lower.includes('alta')) {
    accentClass = 'text-[#1B2E2A] font-bold';
  } else if (lower.includes('activo') || lower.includes('media')) {
    accentClass = 'text-[#5b981b] font-semibold';
  }
  return <span className={accentClass}>{value || '—'}</span>;
}

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Leads state (only populated when session exists)
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<AdminPriorityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setAuthReady(true);
      })
      .catch(() => {
        if (!mounted) return;
        setSession(null);
        setAuthReady(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession ?? null);
      if (!nextSession) {
        setLeads([]);
        setLeadsError('');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchLeads = useCallback(async () => {
    if (!supabase || !session) return;

    setLeadsLoading(true);
    setLeadsError('');

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    setLeadsLoading(false);

    if (error) {
      setLeads([]);
      setLeadsError(
        'No fue posible consultar los leads. Verifica que tu cuenta tenga permisos de administrador y conexión con Supabase.'
      );
      return;
    }

    setLeads((data as LeadRecord[]) || []);
  }, [session]);

  useEffect(() => {
    if (session) {
      void fetchLeads();
    } else {
      setLeads([]);
    }
  }, [session, fetchLeads]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');

    if (!supabase) {
      setAuthError(
        'Supabase no está configurado en el entorno (faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY).'
      );
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setAuthError('Ingresa tu correo electrónico y contraseña.');
      return;
    }

    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    setAuthLoading(false);

    if (error) {
      setAuthError('Credenciales inválidas o usuario sin acceso. Verifica tu correo y contraseña.');
      return;
    }

    setPassword('');
  };

  const handleLogout = async () => {
    if (!supabase) return;
    setLeadsError('');
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
  };

  const handleStatusChange = async (leadId: string, nextStatus: LeadStatus) => {
    if (!supabase || !session) return;

    const previousLeads = leads;
    setLeadsError('');
    setUpdatingId(leadId);
    setLeads((prev) =>
      prev.map((item) => (item.id === leadId ? { ...item, status: nextStatus } : item))
    );

    const { data, error } = await supabase
      .from('leads')
      .update({ status: nextStatus })
      .eq('id', leadId)
      .select('id, status');

    setUpdatingId(null);

    if (error || !data || data.length === 0) {
      setLeads(previousLeads);
      setLeadsError(
        'No se pudo actualizar el estado del lead. Verifica los permisos de actualización en Supabase o intenta de nuevo.'
      );
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (!matchesPriorityFilter(lead.commercial_priority, priorityFilter)) return false;
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (!matchesSearchQuery(lead, searchQuery)) return false;
      return true;
    });
  }, [leads, priorityFilter, statusFilter, searchQuery]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F7] px-4">
        <p className="text-sm font-medium text-[#1B2E2A]/75">Verificando sesión...</p>
      </div>
    );
  }

  // Vista sin sesión iniciada: SOLO formulario de acceso
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F6F8F7] px-4 py-12 text-[#1B2E2A]">
        <div className="w-full max-w-md rounded-xl border border-[#1B2E2A]/12 bg-white p-7 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white">
              <img
                src={BRAND_ASSETS.ceducatyLogo}
                alt="CEDUCATY Centro Evaluador"
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#1B2E2A]">
              Acceso administrativo
            </h1>
            <p className="mt-1.5 text-sm text-[#1B2E2A]/70">
              Inicia sesión con tu cuenta autorizada de Supabase Auth para consultar los leads.
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 rounded-lg border border-[#A6192E]/35 bg-[#A6192E]/5 p-3.5 text-xs leading-relaxed text-[#A6192E]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Faltan las variables <strong>VITE_SUPABASE_URL</strong> y{' '}
                <strong>VITE_SUPABASE_ANON_KEY</strong> en la configuración de entorno.
              </span>
            </div>
          )}

          {authError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 rounded-lg border border-[#A6192E]/35 bg-[#A6192E]/5 p-3.5 text-xs leading-relaxed text-[#A6192E]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-[#1B2E2A]">
                Correo electrónico
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ceducaty.com"
                className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-2.5 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-semibold text-[#1B2E2A]"
              >
                Contraseña
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-2.5 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading || !isSupabaseConfigured}
              className="mt-2 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1B2E2A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#26413b] disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Lock className="h-4 w-4 text-[#FFDF00]" aria-hidden="true" />
              <span>{authLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Vista autenticada: Panel de administración de leads reales de Supabase
  const highPriorityCount = leads.filter((l) =>
    matchesPriorityFilter(l.commercial_priority, 'muy_alta') ||
    matchesPriorityFilter(l.commercial_priority, 'alta')
  ).length;

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-[#1B2E2A]">
      {/* Top Bar */}
      <header className="border-b border-[#1B2E2A]/12 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <img
              src={BRAND_ASSETS.ceducatyLogo}
              alt="CEDUCATY Centro Evaluador"
              referrerPolicy="no-referrer"
              className="h-11 w-auto object-contain"
            />
            <div className="hidden border-l border-[#1B2E2A]/15 pl-4 sm:block">
              <h1 className="text-base font-bold text-[#1B2E2A]">
                Panel de Administración de Leads
              </h1>
              <p className="text-xs text-[#1B2E2A]/65">
                {session.user.email || 'Sesión activa'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void fetchLeads()}
              disabled={leadsLoading}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-[#1B2E2A]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#1B2E2A] transition-colors hover:bg-[#F6F8F7] disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${leadsLoading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>Actualizar</span>
            </button>

            <button
              type="button"
              onClick={() => exportFilteredAdminLeadsToCsv(filteredLeads)}
              disabled={filteredLeads.length === 0}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg bg-[#1B2E2A] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#26413b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5 text-[#FFDF00]" aria-hidden="true" />
              <span>Descargar CSV ({filteredLeads.length})</span>
            </button>

            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-[#A6192E]/30 bg-white px-3.5 py-2 text-xs font-semibold text-[#A6192E] transition-colors hover:bg-[#A6192E]/5"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Resumen numérico */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#1B2E2A]/10 bg-white p-4">
            <p className="text-xs font-semibold text-[#1B2E2A]/65">Total de leads registrados</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#1B2E2A] tabular-nums">
              {leads.length}
            </p>
          </div>
          <div className="rounded-xl border border-[#1B2E2A]/10 bg-white p-4">
            <p className="text-xs font-semibold text-[#1B2E2A]/65">Mostrando con filtros</p>
            <p className="mt-1 font-display text-2xl font-bold text-[#1B2E2A] tabular-nums">
              {filteredLeads.length}
            </p>
          </div>
          <div className="rounded-xl border border-[#1B2E2A]/10 bg-white p-4">
            <p className="text-xs font-semibold text-[#1B2E2A]/65">
              Prioridad alta / muy alta
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-[#79C42B] tabular-nums">
              {highPriorityCount}
            </p>
          </div>
        </div>

        {/* Filtros y buscador */}
        <div className="mt-6 grid gap-3 rounded-xl border border-[#1B2E2A]/10 bg-white p-4 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <label htmlFor="admin-search" className="block text-xs font-semibold text-[#1B2E2A]/75">
              Buscar por nombre o WhatsApp
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#1B2E2A]/45"
                aria-hidden="true"
              />
              <input
                id="admin-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej. Laura Pérez o 55 1234 5678"
                className="w-full rounded-lg border border-[#1B2E2A]/20 bg-white py-2 pr-3 pl-9 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="admin-priority-filter"
              className="block text-xs font-semibold text-[#1B2E2A]/75"
            >
              Prioridad comercial
            </label>
            <select
              id="admin-priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as AdminPriorityFilter)}
              className="mt-1 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-3 py-2 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
            >
              <option value="all">Todas</option>
              <option value="muy_alta">Muy alta</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="admin-status-filter"
              className="block text-xs font-semibold text-[#1B2E2A]/75"
            >
              Estado
            </label>
            <select
              id="admin-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-3 py-2 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
            >
              <option value="all">Todos</option>
              {ADMIN_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Errores de lectura / actualización */}
        {leadsError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#A6192E]/35 bg-white p-4 text-sm text-[#A6192E]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{leadsError}</span>
          </div>
        )}

        {/* Contenido principal: Loading / Empty / Tabla & Tarjetas */}
        <div className="mt-6">
          {leadsLoading ? (
            <div className="rounded-xl border border-[#1B2E2A]/10 bg-white p-10 text-center text-sm text-[#1B2E2A]/75">
              Cargando leads desde Supabase...
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#1B2E2A]/20 bg-white p-10 text-center">
              <p className="text-base font-bold text-[#1B2E2A]">No hay leads registrados todavía</p>
              <p className="mt-1 text-sm text-[#1B2E2A]/70">
                Cuando un visitante envíe el formulario de diagnóstico en la landing, aparecerá aquí
                ordenado del más reciente al más antiguo.
              </p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#1B2E2A]/20 bg-white p-10 text-center">
              <p className="text-base font-bold text-[#1B2E2A]">
                No se encontraron leads con los filtros actuales
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setPriorityFilter('all');
                  setStatusFilter('all');
                }}
                className="mt-4 cursor-pointer rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-2 text-xs font-semibold text-[#1B2E2A] hover:bg-[#F6F8F7]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto rounded-xl border border-[#1B2E2A]/12 bg-white lg:block">
                <table className="w-full min-w-[1160px] border-collapse text-left text-xs">
                  <thead className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] text-[#1B2E2A]/80">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nombre completo</th>
                      <th className="px-4 py-3 font-semibold">WhatsApp</th>
                      <th className="px-4 py-3 font-semibold">Correo</th>
                      <th className="px-4 py-3 font-semibold">Tipo de proyecto</th>
                      <th className="px-4 py-3 font-semibold">Plazo</th>
                      <th className="px-4 py-3 font-semibold">Experiencia</th>
                      <th className="px-4 py-3 font-semibold">Presupuesto</th>
                      <th className="px-4 py-3 font-semibold">Prioridad comercial</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Fecha de registro</th>
                      <th className="px-4 py-3 font-semibold">Origen</th>
                      <th className="px-4 py-3 font-semibold">Marketing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1B2E2A]/10">
                    {filteredLeads.map((lead) => {
                      const waUrl = buildWhatsAppUrl(lead.whatsapp);
                      return (
                        <tr key={lead.id} className="align-top hover:bg-[#F6F8F7]/45">
                          <td className="px-4 py-3.5 font-semibold text-[#1B2E2A]">
                            {lead.full_name}
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="font-mono text-[#1B2E2A] tabular-nums">{lead.whatsapp}</p>
                            {waUrl && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-[#79C42B] px-2.5 py-1 text-[11px] font-bold text-[#1B2E2A] transition-colors hover:bg-[#8ad43c]"
                              >
                                <MessageCircle className="h-3 w-3" aria-hidden="true" />
                                <span>WhatsApp</span>
                              </a>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/85">{lead.email}</td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/85">{lead.project_type}</td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/85">
                            {lead.development_timeline}
                          </td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/85">{lead.experience_level}</td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/80">
                            {lead.estimated_budget || 'No especificado'}
                          </td>
                          <td className="px-4 py-3.5">
                            <PriorityText value={lead.commercial_priority} />
                          </td>
                          <td className="px-4 py-3.5">
                            <select
                              aria-label={`Cambiar estado de ${lead.full_name}`}
                              value={lead.status}
                              disabled={updatingId === lead.id}
                              onChange={(e) =>
                                void handleStatusChange(lead.id, e.target.value as LeadStatus)
                              }
                              className="rounded-md border border-[#1B2E2A]/25 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none disabled:opacity-50"
                            >
                              {!ADMIN_STATUS_OPTIONS.includes(
                                lead.status as (typeof ADMIN_STATUS_OPTIONS)[number]
                              ) && <option value={lead.status}>{lead.status}</option>}
                              {ADMIN_STATUS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-[#1B2E2A]/75 tabular-nums whitespace-nowrap">
                            {formatLeadDate(lead.created_at)}
                          </td>
                          <td className="px-4 py-3.5 text-[#1B2E2A]/80">
                            {lead.acquisition_source}
                          </td>
                          <td className="px-4 py-3.5 font-medium text-[#1B2E2A]">
                            {lead.marketing_consent ? 'Sí' : 'No'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {filteredLeads.map((lead) => {
                  const waUrl = buildWhatsAppUrl(lead.whatsapp);
                  return (
                    <article
                      key={lead.id}
                      className="rounded-xl border border-[#1B2E2A]/12 bg-white p-4 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3 border-b border-[#1B2E2A]/10 pb-3">
                        <div>
                          <h2 className="text-base font-bold text-[#1B2E2A]">{lead.full_name}</h2>
                          <p className="mt-0.5 text-xs text-[#1B2E2A]/75">{lead.email}</p>
                        </div>
                        <div className="text-right text-xs">
                          <PriorityText value={lead.commercial_priority} />
                          <p className="mt-0.5 font-mono text-[11px] text-[#1B2E2A]/60 tabular-nums">
                            {formatLeadDate(lead.created_at)}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">WhatsApp</dt>
                          <dd className="font-mono text-[#1B2E2A] tabular-nums">{lead.whatsapp}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">Tipo de proyecto</dt>
                          <dd className="text-[#1B2E2A]">{lead.project_type}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">Plazo</dt>
                          <dd className="text-[#1B2E2A]">{lead.development_timeline}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">Experiencia</dt>
                          <dd className="text-[#1B2E2A]">{lead.experience_level}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">Presupuesto</dt>
                          <dd className="text-[#1B2E2A]">
                            {lead.estimated_budget || 'No especificado'}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-[#1B2E2A]/60">Origen · Marketing</dt>
                          <dd className="text-[#1B2E2A]">
                            {lead.acquisition_source} · {lead.marketing_consent ? 'Sí' : 'No'}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#1B2E2A]/10 pt-3">
                        <div className="flex-1 min-w-[160px]">
                          <label
                            htmlFor={`mobile-status-${lead.id}`}
                            className="block text-[11px] font-semibold text-[#1B2E2A]/65"
                          >
                            Estado
                          </label>
                          <select
                            id={`mobile-status-${lead.id}`}
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) =>
                              void handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            className="mt-1 min-h-10 w-full rounded-lg border border-[#1B2E2A]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#1B2E2A]"
                          >
                            {!ADMIN_STATUS_OPTIONS.includes(
                              lead.status as (typeof ADMIN_STATUS_OPTIONS)[number]
                            ) && <option value={lead.status}>{lead.status}</option>}
                            {ADMIN_STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center justify-center gap-1.5 self-end rounded-lg bg-[#79C42B] px-4 py-2 text-xs font-bold text-[#1B2E2A] transition-colors hover:bg-[#8ad43c]"
                          >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
