import type {
  AcquisitionSource,
  CommercialPriority,
  DevelopmentTimelineOption,
  DiagnosticFormInput,
  LeadRecord,
  LeadStatus,
} from '../types/lead';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const LOCAL_LEADS_STORAGE_KEY = 'mcb_diagnostic_leads_v1';
const LAST_SUBMIT_TS_KEY = 'mcb_last_submit_ts';
const RATE_LIMIT_WINDOW_MS = 30_000;

export function classifyCommercialPriority(
  timeline: DevelopmentTimelineOption | ''
): CommercialPriority {
  switch (timeline) {
    case 'Lo antes posible':
      return 'Prioridad muy alta';
    case 'Próximos 30 días':
      return 'Prioridad alta';
    case 'Próximos 60 días':
      return 'Interés activo';
    case 'Próximos 90 días':
      return 'Interés futuro';
    case 'Más de 90 días':
      return 'Exploración';
    case 'Solo estoy investigando':
    default:
      return 'Informativo';
  }
}

export function detectAcquisitionSource(): AcquisitionSource {
  if (typeof window === 'undefined') {
    return 'Tráfico directo';
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get('utm_source') || '').toLowerCase();
  const hasFbclid = params.has('fbclid');
  const hasGclid = params.has('gclid');
  const hasTtclid = params.has('ttclid');
  const ref = (document.referrer || '').toLowerCase();

  if (hasFbclid || utmSource.includes('facebook') || utmSource === 'fb' || utmSource === 'ig' || ref.includes('facebook.com') || ref.includes('instagram.com')) {
    return 'Facebook';
  }
  if (hasTtclid || utmSource.includes('tiktok') || ref.includes('tiktok.com')) {
    return 'TikTok';
  }
  if (hasGclid || utmSource.includes('google') || ref.includes('google.')) {
    return 'Google';
  }
  if (utmSource.includes('refer') || params.has('ref')) {
    return 'Referido';
  }
  if (ref && !ref.includes(window.location.hostname)) {
    return 'Otro';
  }
  return 'Tráfico directo';
}

export interface ValidationErrors {
  full_name?: string;
  email?: string;
  whatsapp?: string;
  project_type?: string;
  development_timeline?: string;
  experience_level?: string;
  privacy_accepted?: string;
  general?: string;
}

export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
}

export function validateDiagnosticInput(input: DiagnosticFormInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.honeypot.trim().length > 0) {
    errors.general = 'No pudimos procesar el envío en este momento.';
    return errors;
  }

  const cleanName = sanitizeText(input.full_name);
  if (cleanName.length < 3) {
    errors.full_name = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
  }

  const cleanEmail = input.email.trim();
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  const digits = input.whatsapp.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    errors.whatsapp = 'Ingresa un número de WhatsApp válido de al menos 10 dígitos.';
  }

  if (!input.project_type) {
    errors.project_type = 'Selecciona qué proyecto deseas desarrollar.';
  }

  if (!input.development_timeline) {
    errors.development_timeline = 'Selecciona en cuánto tiempo deseas desarrollarlo.';
  }

  if (!input.experience_level) {
    errors.experience_level = 'Selecciona cuál es tu situación actual.';
  }

  if (!input.privacy_accepted) {
    errors.privacy_accepted = 'Debes aceptar el Aviso de Privacidad para enviar tu diagnóstico.';
  }

  return errors;
}

export function checkClientRateLimit(): boolean {
  try {
    const lastTsRaw = window.sessionStorage.getItem(LAST_SUBMIT_TS_KEY);
    if (!lastTsRaw) return true;
    const elapsed = Date.now() - Number(lastTsRaw);
    return elapsed >= RATE_LIMIT_WINDOW_MS;
  } catch {
    return true;
  }
}

export function markClientSubmitTimestamp(): void {
  try {
    window.sessionStorage.setItem(LAST_SUBMIT_TS_KEY, String(Date.now()));
  } catch {
    // Ignore storage unavailability
  }
}

export function getStoredLeads(): LeadRecord[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_LEADS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalLead(lead: LeadRecord): void {
  try {
    const existing = getStoredLeads();
    const updated = [lead, ...existing].slice(0, 200);
    window.localStorage.setItem(LOCAL_LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
}

export function updateLocalLeadStatus(id: string, status: LeadStatus): LeadRecord[] {
  const existing = getStoredLeads();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  try {
    window.localStorage.setItem(LOCAL_LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
  return updated;
}

export interface SubmitDiagnosticResult {
  ok: boolean;
  mode: 'supabase' | 'error';
  lead?: LeadRecord;
  errorMessage?: string;
}

export async function submitDiagnosticLead(
  input: DiagnosticFormInput
): Promise<SubmitDiagnosticResult> {
  if (!checkClientRateLimit()) {
    return {
      ok: false,
      mode: 'error',
      errorMessage: 'Espera unos segundos antes de enviar una nueva solicitud.',
    };
  }

  if (!isSupabaseConfigured || !supabase) {
    return {
      ok: false,
      mode: 'error',
      errorMessage:
        'El servicio de registro no está disponible en este momento (faltan variables de configuración de Supabase).',
    };
  }

  const nowIso = new Date().toISOString();
  const acquisitionSource = detectAcquisitionSource();
  const timeline = input.development_timeline as DevelopmentTimelineOption;

  const newLead: LeadRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`,
    full_name: sanitizeText(input.full_name),
    email: input.email.trim().toLowerCase(),
    whatsapp: sanitizeText(input.whatsapp),
    project_type: input.project_type as LeadRecord['project_type'],
    development_timeline: timeline,
    experience_level: input.experience_level as LeadRecord['experience_level'],
    estimated_budget: input.estimated_budget || null,
    privacy_accepted: true,
    privacy_accepted_at: nowIso,
    marketing_consent: Boolean(input.marketing_consent),
    marketing_consent_at: input.marketing_consent ? nowIso : null,
    acquisition_source: acquisitionSource,
    commercial_priority: classifyCommercialPriority(timeline),
    status: 'Nuevo',
    created_at: nowIso,
  };

  try {
    // Inserción real en public.leads sin .select() para respetar RLS (anon no tiene SELECT)
    const { error } = await supabase.from('leads').insert([
      {
        full_name: newLead.full_name,
        email: newLead.email,
        whatsapp: newLead.whatsapp,
        project_type: newLead.project_type,
        development_timeline: newLead.development_timeline,
        experience_level: newLead.experience_level,
        estimated_budget: newLead.estimated_budget,
        privacy_accepted: true,
        privacy_accepted_at: newLead.privacy_accepted_at,
        marketing_consent: newLead.marketing_consent,
        marketing_consent_at: newLead.marketing_consent_at,
        acquisition_source: newLead.acquisition_source,
        status: 'Nuevo',
      },
    ]);

    if (error) {
      return {
        ok: false,
        mode: 'error',
        errorMessage:
          'No fue posible registrar tu diagnóstico en la base de datos. Inténtalo nuevamente en unos momentos.',
      };
    }

    markClientSubmitTimestamp();
    return { ok: true, mode: 'supabase', lead: newLead };
  } catch {
    return {
      ok: false,
      mode: 'error',
      errorMessage:
        'Error de conexión al enviar tu diagnóstico. Verifica tu red e intenta nuevamente.',
    };
  }
}

export function exportConsentedLeadsToCsv(leads: LeadRecord[]): void {
  const consented = leads.filter((l) => l.privacy_accepted);
  const headers = [
    'ID',
    'Fecha',
    'Nombre',
    'Correo',
    'WhatsApp',
    'Proyecto',
    'Plazo',
    'Prioridad comercial',
    'Situación actual',
    'Presupuesto',
    'Origen',
    'Consentimiento marketing',
    'Estado',
  ];

  const escapeCell = (val: string | boolean | null | undefined) => {
    const str = val == null ? '' : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = consented.map((lead) =>
    [
      lead.id,
      lead.created_at,
      lead.full_name,
      lead.email,
      lead.whatsapp,
      lead.project_type,
      lead.development_timeline,
      lead.commercial_priority,
      lead.experience_level,
      lead.estimated_budget || 'No especificado',
      lead.acquisition_source,
      lead.marketing_consent ? 'Autorizado' : 'Solo diagnóstico',
      lead.status,
    ]
      .map(escapeCell)
      .join(',')
  );

  const csvContent = '\uFEFF' + [headers.map(escapeCell).join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prospectos_master_conocer_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
