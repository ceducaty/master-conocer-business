export type ProjectTypeOption =
  | 'Acreditarme como Evaluador Independiente'
  | 'Crear un Centro de Evaluación'
  | 'Conocer ambas opciones'
  | 'Obtener primero mis certificaciones'
  | 'Ya cuento con acreditación y quiero desarrollar mi negocio';

export type DevelopmentTimelineOption =
  | 'Lo antes posible'
  | 'Próximos 30 días'
  | 'Próximos 60 días'
  | 'Próximos 90 días'
  | 'Más de 90 días'
  | 'Solo estoy investigando';

export type ExperienceLevelOption =
  | 'No tengo certificaciones; comienzo desde cero'
  | 'Ya tengo certificados de competencia'
  | 'Tengo experiencia evaluando'
  | 'Ya cuento con acreditación CE/EI';

export type EstimatedBudgetOption =
  | ''
  | 'Aún no tengo presupuesto'
  | 'Menos de $5,000 MXN'
  | 'De $5,000 a $10,000 MXN'
  | 'De $10,000 a $20,000 MXN'
  | 'Más de $20,000 MXN'
  | 'Prefiero conversarlo';

export type AcquisitionSource =
  | 'Facebook'
  | 'TikTok'
  | 'Google'
  | 'Referido'
  | 'Tráfico directo'
  | 'Otro';

export type CommercialPriority =
  | 'Prioridad muy alta'
  | 'Prioridad alta'
  | 'Interés activo'
  | 'Interés futuro'
  | 'Exploración'
  | 'Informativo';

export type LeadStatus =
  | 'Nuevo'
  | 'En revisión'
  | 'Contactado'
  | 'En seguimiento'
  | 'Descartado';

export interface DiagnosticFormInput {
  full_name: string;
  email: string;
  whatsapp: string;
  project_type: ProjectTypeOption | '';
  development_timeline: DevelopmentTimelineOption | '';
  experience_level: ExperienceLevelOption | '';
  estimated_budget: EstimatedBudgetOption;
  privacy_accepted: boolean;
  marketing_consent: boolean;
  honeypot: string;
}

export interface LeadRecord {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string;
  project_type: ProjectTypeOption;
  development_timeline: DevelopmentTimelineOption;
  experience_level: ExperienceLevelOption;
  estimated_budget: EstimatedBudgetOption | null;
  privacy_accepted: boolean;
  privacy_accepted_at: string;
  marketing_consent: boolean;
  marketing_consent_at: string | null;
  acquisition_source: AcquisitionSource;
  commercial_priority: CommercialPriority;
  status: LeadStatus;
  created_at: string;
}
