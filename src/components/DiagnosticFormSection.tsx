import { AlertCircle, CheckCircle2, Lock, Send } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import {
  BUDGET_OPTIONS,
  EXPERIENCE_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../data/landingContent';
import {
  submitDiagnosticLead,
  validateDiagnosticInput,
  type ValidationErrors,
} from '../lib/leadService';
import type {
  DiagnosticFormInput,
  ExperienceLevelOption,
  LeadRecord,
  ProjectTypeOption,
} from '../types/lead';

interface DiagnosticFormSectionProps {
  presetProjectType?: ProjectTypeOption;
  presetExperienceLevel?: ExperienceLevelOption;
  onOpenPrivacy: () => void;
  onLeadSubmitted: (lead: LeadRecord) => void;
}

const INITIAL_FORM: DiagnosticFormInput = {
  full_name: '',
  email: '',
  whatsapp: '',
  project_type: '',
  development_timeline: '',
  experience_level: '',
  estimated_budget: '',
  privacy_accepted: false,
  marketing_consent: false,
  honeypot: '',
};

export function DiagnosticFormSection({
  presetProjectType,
  presetExperienceLevel,
  onOpenPrivacy,
  onLeadSubmitted,
}: DiagnosticFormSectionProps) {
  const [form, setForm] = useState<DiagnosticFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadRecord | null>(null);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (presetProjectType) {
      setForm((prev) => ({ ...prev, project_type: presetProjectType }));
    }
  }, [presetProjectType]);

  useEffect(() => {
    if (presetExperienceLevel) {
      setForm((prev) => ({ ...prev, experience_level: presetExperienceLevel }));
    }
  }, [presetExperienceLevel]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    const validation = validateDiagnosticInput(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const result = await submitDiagnosticLead(form);
    setIsSubmitting(false);

    if (!result.ok || result.mode !== 'supabase' || !result.lead) {
      setSubmitError(
        result.errorMessage ||
          'No fue posible guardar tu diagnóstico en el servidor. Verifica tu conexión e intenta de nuevo.'
      );
      return;
    }

    setSubmittedLead(result.lead);
    onLeadSubmitted(result.lead);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError('');
    setSubmittedLead(null);
  };

  return (
    <section id="diagnostico" className="border-b border-[#1B2E2A]/10 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
            Diagnóstico gratuito inicial
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
            Cuéntanos qué proyecto deseas desarrollar
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#1B2E2A]/75">
            Responde algunas preguntas para identificar tu situación y orientarte sobre los
            siguientes pasos.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-[#1B2E2A]/15 bg-[#F6F8F7]/65 p-6 sm:p-8 lg:p-10">
          {submittedLead ? (
            <div role="status" className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#79C42B]/15 text-[#1B2E2A]">
                <CheckCircle2 className="h-8 w-8 text-[#79C42B]" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-[#1B2E2A]">
                ¡Gracias por compartir tu proyecto!
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#1B2E2A]/85">
                Hemos recibido tu información. El equipo de CEDUCATY podrá revisar tus respuestas y
                orientarte sobre los siguientes pasos.
              </p>

              <div className="mx-auto mt-6 max-w-lg rounded-lg border border-[#1B2E2A]/12 bg-white p-4 text-left text-xs leading-relaxed text-[#1B2E2A]/75">
                <p>
                  <strong className="font-semibold text-[#1B2E2A]">Resumen registrado:</strong>{' '}
                  {submittedLead.project_type} · {submittedLead.experience_level}
                </p>
                <p className="mt-2">
                  Nota: El envío del diagnóstico tiene fines informativos y de orientación inicial; no
                  constituye ni garantiza una acreditación, autorización o aprobación oficial.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/25 bg-white px-5 py-2.5 text-xs font-bold text-[#1B2E2A] transition-colors hover:bg-[#F6F8F7]"
              >
                Enviar otro diagnóstico
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot anti-spam (oculto a usuarios reales) */}
              <div aria-hidden="true" className="hidden">
                <label htmlFor="website_url">Sitio web</label>
                <input
                  id="website_url"
                  name="website_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={(e) => setForm((prev) => ({ ...prev, honeypot: e.target.value }))}
                />
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-[#A6192E]/35 bg-white p-4 text-sm text-[#A6192E]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              {errors.general && (
                <div
                  role="alert"
                  className="rounded-lg border border-[#A6192E]/35 bg-white p-4 text-sm text-[#A6192E]"
                >
                  {errors.general}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* 1. Nombre completo */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-semibold text-[#1B2E2A]"
                  >
                    1. Nombre completo <span className="text-[#A6192E]">*</span>
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ej. María Fernanda López Hernández"
                    value={form.full_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
                  />
                  {errors.full_name && (
                    <p className="mt-1.5 text-xs font-medium text-[#A6192E]">{errors.full_name}</p>
                  )}
                </div>

                {/* 2. Correo electrónico */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1B2E2A]">
                    2. Correo electrónico <span className="text-[#A6192E]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nombre@empresa.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-[#A6192E]">{errors.email}</p>
                  )}
                </div>

                {/* 3. WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-semibold text-[#1B2E2A]">
                    3. WhatsApp <span className="text-[#A6192E]">*</span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+52 55 1234 5678"
                    value={form.whatsapp}
                    onChange={(e) => setForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] placeholder:text-[#1B2E2A]/40 focus:border-[#1B2E2A] focus:outline-none"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-xs font-medium text-[#A6192E]">{errors.whatsapp}</p>
                  )}
                </div>
              </div>

              {/* 4. ¿Qué proyecto deseas desarrollar? */}
              <div>
                <label
                  htmlFor="project_type"
                  className="block text-sm font-semibold text-[#1B2E2A]"
                >
                  4. ¿Qué proyecto deseas desarrollar? <span className="text-[#A6192E]">*</span>
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={form.project_type}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      project_type: e.target.value as DiagnosticFormInput['project_type'],
                    }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  {PROJECT_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.project_type && (
                  <p className="mt-1.5 text-xs font-medium text-[#A6192E]">{errors.project_type}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* 5. ¿En cuánto tiempo deseas desarrollar tu proyecto? */}
                <div>
                  <label
                    htmlFor="development_timeline"
                    className="block text-sm font-semibold text-[#1B2E2A]"
                  >
                    5. ¿En cuánto tiempo deseas desarrollar tu proyecto?{' '}
                    <span className="text-[#A6192E]">*</span>
                  </label>
                  <select
                    id="development_timeline"
                    name="development_timeline"
                    required
                    value={form.development_timeline}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        development_timeline: e.target
                          .value as DiagnosticFormInput['development_timeline'],
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
                  >
                    <option value="">Selecciona un plazo</option>
                    {TIMELINE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.development_timeline && (
                    <p className="mt-1.5 text-xs font-medium text-[#A6192E]">
                      {errors.development_timeline}
                    </p>
                  )}
                </div>

                {/* 6. ¿Cuál es tu situación actual? */}
                <div>
                  <label
                    htmlFor="experience_level"
                    className="block text-sm font-semibold text-[#1B2E2A]"
                  >
                    6. ¿Cuál es tu situación actual? <span className="text-[#A6192E]">*</span>
                  </label>
                  <select
                    id="experience_level"
                    name="experience_level"
                    required
                    value={form.experience_level}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        experience_level: e.target
                          .value as DiagnosticFormInput['experience_level'],
                      }))
                    }
                    className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
                  >
                    <option value="">Selecciona tu situación</option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.experience_level && (
                    <p className="mt-1.5 text-xs font-medium text-[#A6192E]">
                      {errors.experience_level}
                    </p>
                  )}
                </div>
              </div>

              {/* 7. Campo opcional: Presupuesto aproximado */}
              <div>
                <label
                  htmlFor="estimated_budget"
                  className="block text-sm font-semibold text-[#1B2E2A]"
                >
                  7. ¿Qué presupuesto aproximado tienes contemplado?{' '}
                  <span className="font-normal text-[#1B2E2A]/60">(Opcional)</span>
                </label>
                <select
                  id="estimated_budget"
                  name="estimated_budget"
                  value={form.estimated_budget}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      estimated_budget: e.target.value as DiagnosticFormInput['estimated_budget'],
                    }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-[#1B2E2A]/20 bg-white px-4 py-3 text-sm text-[#1B2E2A] focus:border-[#1B2E2A] focus:outline-none"
                >
                  <option value="">Prefiero no responder por ahora</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consentimientos */}
              <div className="space-y-3 border-t border-[#1B2E2A]/12 pt-5">
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#1B2E2A]">
                    <input
                      type="checkbox"
                      checked={form.privacy_accepted}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, privacy_accepted: e.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#1B2E2A]/30 accent-[#1B2E2A]"
                    />
                    <span>
                      He leído y acepto el{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="cursor-pointer font-semibold underline decoration-[#79C42B] decoration-2 underline-offset-2 hover:text-[#2a4741]"
                      >
                        Aviso de Privacidad
                      </button>{' '}
                      para el tratamiento de mis datos de diagnóstico.{' '}
                      <span className="text-[#A6192E]">*</span>
                    </span>
                  </label>
                  {errors.privacy_accepted && (
                    <p className="mt-1 pl-7 text-xs font-medium text-[#A6192E]">
                      {errors.privacy_accepted}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#1B2E2A]/85">
                    <input
                      type="checkbox"
                      checked={form.marketing_consent}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, marketing_consent: e.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#1B2E2A]/30 accent-[#1B2E2A]"
                    />
                    <span>
                      Autorizo recibir comunicaciones comerciales e informativas de CEDUCATY sobre
                      este proyecto (opcional).
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-[#1B2E2A]/65">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-[#79C42B]" aria-hidden="true" />
                  <span>Tus datos no garantizan ni sustituyen procesos de acreditación oficial.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1B2E2A] px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#26413b] disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4 text-[#FFDF00]" aria-hidden="true" />
                  <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR MI DIAGNÓSTICO'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
