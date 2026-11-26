import { Download, ShieldCheck, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PROJECT_TYPE_OPTIONS, TIMELINE_OPTIONS } from '../data/landingContent';
import { exportConsentedLeadsToCsv } from '../lib/leadService';
import type { CommercialPriority, LeadRecord, LeadStatus } from '../types/lead';

interface AdminPreviewDrawerProps {
  open: boolean;
  leads: LeadRecord[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
}

const PRIORITY_OPTIONS: CommercialPriority[] = [
  'Prioridad muy alta',
  'Prioridad alta',
  'Interés activo',
  'Interés futuro',
  'Exploración',
  'Informativo',
];

const STATUS_OPTIONS: LeadStatus[] = [
  'Nuevo',
  'En revisión',
  'Contactado',
  'En seguimiento',
  'Descartado',
];

export function AdminPreviewDrawer({
  open,
  leads,
  onClose,
  onUpdateStatus,
}: AdminPreviewDrawerProps) {
  const [routeFilter, setRouteFilter] = useState<string>('all');
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (routeFilter !== 'all' && lead.project_type !== routeFilter) return false;
      if (timelineFilter !== 'all' && lead.development_timeline !== timelineFilter) return false;
      if (priorityFilter !== 'all' && lead.commercial_priority !== priorityFilter) return false;
      return true;
    });
  }, [leads, routeFilter, timelineFilter, priorityFilter]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-preview-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#1B2E2A]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-5xl flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#1B2E2A]/12 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#79C42B]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Arquitectura preparada · Fases 1–3 (Vista local previa a Fase 4 Supabase)</span>
            </div>
            <h2 id="admin-preview-title" className="mt-1 text-xl font-bold text-[#1B2E2A]">
              Administración de prospectos de la landing
            </h2>
            <p className="mt-1 text-xs text-[#1B2E2A]/70">
              Clasificación comercial automática por intención temporal. Separado de CEDUCATY CRM;
              en Fase 4 se protege con Supabase Auth + Row Level Security.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel administrativo"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/15 text-[#1B2E2A] hover:bg-[#F6F8F7]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filters & Export */}
        <div className="grid gap-3 border-b border-[#1B2E2A]/10 bg-[#F6F8F7] px-6 py-4 sm:grid-cols-4">
          <div>
            <label htmlFor="admin-filter-route" className="block text-xs font-semibold text-[#1B2E2A]/75">
              Ruta / Proyecto
            </label>
            <select
              id="admin-filter-route"
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#1B2E2A]/15 bg-white px-3 py-2 text-xs text-[#1B2E2A]"
            >
              <option value="all">Todas las rutas</option>
              {PROJECT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="admin-filter-timeline" className="block text-xs font-semibold text-[#1B2E2A]/75">
              Plazo de implementación
            </label>
            <select
              id="admin-filter-timeline"
              value={timelineFilter}
              onChange={(e) => setTimelineFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#1B2E2A]/15 bg-white px-3 py-2 text-xs text-[#1B2E2A]"
            >
              <option value="all">Todos los plazos</option>
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="admin-filter-priority" className="block text-xs font-semibold text-[#1B2E2A]/75">
              Clasificación comercial
            </label>
            <select
              id="admin-filter-priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#1B2E2A]/15 bg-white px-3 py-2 text-xs text-[#1B2E2A]"
            >
              <option value="all">Todas las prioridades</option>
              {PRIORITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => exportConsentedLeadsToCsv(filteredLeads)}
              disabled={filteredLeads.length === 0}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1B2E2A] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#26413b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5 text-[#FFDF00]" aria-hidden="true" />
              <span>Exportar CSV ({filteredLeads.length})</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-auto p-6">
          {filteredLeads.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#1B2E2A]/20 bg-[#F6F8F7]/60 p-10 text-center">
              <p className="text-sm font-semibold text-[#1B2E2A]">
                Aún no hay prospectos registrados en esta sesión con los filtros actuales.
              </p>
              <p className="mt-1 text-xs text-[#1B2E2A]/70">
                Completa y envía el formulario de diagnóstico en la landing para verificar la
                captura, validación y clasificación comercial automática.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#1B2E2A]/12">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-[#F6F8F7] text-[#1B2E2A]/75">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Prospecto y contacto</th>
                    <th className="px-4 py-3 font-semibold">Proyecto y situación</th>
                    <th className="px-4 py-3 font-semibold">Plazo / Prioridad</th>
                    <th className="px-4 py-3 font-semibold">Origen y consentimientos</th>
                    <th className="px-4 py-3 font-semibold">Estado comercial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B2E2A]/10">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="bg-white align-top">
                      <td className="px-4 py-3">
                        <p className="font-bold text-[#1B2E2A]">{lead.full_name}</p>
                        <p className="mt-0.5 text-[#1B2E2A]/75">{lead.email}</p>
                        <p className="mt-0.5 font-mono text-[#1B2E2A]/85 tabular-nums">
                          {lead.whatsapp}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1B2E2A]">{lead.project_type}</p>
                        <p className="mt-0.5 text-[#1B2E2A]/70">{lead.experience_level}</p>
                        {lead.estimated_budget && (
                          <p className="mt-0.5 text-[#1B2E2A]/60">
                            Presupuesto: {lead.estimated_budget}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1B2E2A]">{lead.commercial_priority}</p>
                        <p className="mt-0.5 text-[#1B2E2A]/70">{lead.development_timeline}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1B2E2A]">{lead.acquisition_source}</p>
                        <p className="mt-0.5 text-[#1B2E2A]/70">
                          Privacidad: Aceptada · Marketing:{' '}
                          {lead.marketing_consent ? 'Autorizado' : 'No autorizado'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          aria-label={`Estado comercial de ${lead.full_name}`}
                          value={lead.status}
                          onChange={(e) =>
                            onUpdateStatus(lead.id, e.target.value as LeadStatus)
                          }
                          className="rounded-md border border-[#1B2E2A]/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1B2E2A]"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
