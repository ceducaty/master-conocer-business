import type { LeadRecord } from '../types/lead';

export type AdminPriorityFilter = 'all' | 'muy_alta' | 'alta' | 'media' | 'baja';

export const ADMIN_STATUS_OPTIONS = [
  'Nuevo',
  'Contactado',
  'En seguimiento',
  'Cerrado',
  'Descartado',
] as const;

export function normalizeWhatsAppDigits(rawPhone: string | null | undefined): string {
  const digits = (rawPhone || '').replace(/[\s\-()+]/g, '').replace(/\D/g, '');
  if (digits.length === 10) {
    return `52${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('52')) {
    return digits;
  }
  return digits;
}

export function buildWhatsAppUrl(rawPhone: string | null | undefined): string | null {
  const normalized = normalizeWhatsAppDigits(rawPhone);
  if (!normalized) return null;
  return `https://wa.me/${normalized}`;
}

export function matchesPriorityFilter(
  commercialPriority: string | null | undefined,
  filter: AdminPriorityFilter
): boolean {
  if (filter === 'all') return true;
  const val = (commercialPriority || '').toLowerCase().trim();

  if (filter === 'muy_alta') {
    return val.includes('muy alta');
  }
  if (filter === 'alta') {
    return val.includes('alta') && !val.includes('muy alta');
  }
  if (filter === 'media') {
    return (
      val.includes('media') ||
      val.includes('interés activo') ||
      val.includes('interes activo') ||
      val.includes('interés futuro') ||
      val.includes('interes futuro')
    );
  }
  if (filter === 'baja') {
    return (
      val.includes('baja') ||
      val.includes('exploración') ||
      val.includes('exploracion') ||
      val.includes('informativo')
    );
  }
  return true;
}

export function matchesSearchQuery(lead: LeadRecord, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;

  const nameMatch = (lead.full_name || '').toLowerCase().includes(trimmed);
  const queryDigits = trimmed.replace(/[\s\-()+]/g, '').replace(/\D/g, '');
  const phoneDigits = (lead.whatsapp || '').replace(/[\s\-()+]/g, '').replace(/\D/g, '');
  const phoneText = (lead.whatsapp || '').replace(/[\s\-]/g, '').toLowerCase();

  const phoneMatch =
    (queryDigits.length > 0 && phoneDigits.includes(queryDigits)) ||
    phoneText.includes(trimmed.replace(/[\s\-]/g, ''));

  return nameMatch || phoneMatch;
}

export function formatLeadDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '—';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return '—';
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed);
}

export function exportFilteredAdminLeadsToCsv(leads: LeadRecord[]): void {
  const headers = [
    'Nombre completo',
    'WhatsApp',
    'Correo',
    'Tipo de proyecto',
    'Plazo',
    'Experiencia',
    'Presupuesto',
    'Prioridad comercial',
    'Estado',
    'Fecha de registro',
    'Origen',
    'Aceptó marketing',
  ];

  const escapeCell = (val: string | boolean | null | undefined) => {
    const raw = val == null ? '' : String(val);
    const safe = /^[=+\t\r@]/.test(raw) ? `'${raw}` : raw;
    return `"${safe.replace(/"/g, '""')}"`;
  };

  const rows = leads.map((lead) =>
    [
      lead.full_name,
      lead.whatsapp,
      lead.email,
      lead.project_type,
      lead.development_timeline,
      lead.experience_level,
      lead.estimated_budget || 'No especificado',
      lead.commercial_priority,
      lead.status,
      formatLeadDate(lead.created_at),
      lead.acquisition_source,
      lead.marketing_consent ? 'Sí' : 'No',
    ]
      .map(escapeCell)
      .join(',')
  );

  const csvContent = '\uFEFF' + [headers.map(escapeCell).join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `leads_master_conocer_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
