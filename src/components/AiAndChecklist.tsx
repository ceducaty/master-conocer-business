import { Bot, Check, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';
import { AI_CAPABILITIES, BRAND_ASSETS, CHECKLIST_ITEMS } from '../data/landingContent';

interface AiAndChecklistProps {
  onGoToDiagnostic: () => void;
}

export function AiAndChecklist({ onGoToDiagnostic }: AiAndChecklistProps) {
  const [aiImgError, setAiImgError] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;

  return (
    <>
      {/* SECCIÓN 7. INTELIGENCIA ARTIFICIAL COMO ASISTENTE DE IMPLEMENTACIÓN */}
      <section id="asistente-ia" className="border-b border-[#1B2E2A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Visual Concept */}
            <div className="lg:col-span-6">
              <div className="h-full overflow-hidden rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7]">
                {!aiImgError ? (
                  <img
                    src={BRAND_ASSETS.aiWorkspaceIllustration}
                    alt="Asistente digital de inteligencia artificial colaborando con el emprendedor sobre un tablero de actividades, requisitos y progreso"
                    referrerPolicy="no-referrer"
                    onError={() => setAiImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-8 text-center">
                    <Bot className="h-12 w-12 text-[#1B2E2A]" aria-hidden="true" />
                    <p className="mt-4 font-display text-lg font-bold text-[#1B2E2A]">
                      Asistencia Digital de Implementación
                    </p>
                    <p className="mt-1 max-w-sm text-sm text-[#1B2E2A]/70">
                      Tablero conceptual de actividades, requisitos y seguimiento por fase.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Explanatory Copy */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
                Asistencia de inteligencia artificial
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
                No necesitas resolver todo por tu cuenta
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
                El proyecto MASTER CONOCER BUSINESS contempla asistencia guiada con inteligencia
                artificial para acompañarte en la organización operativa y documental de tu negocio:
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {AI_CAPABILITIES.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 rounded-lg border border-[#1B2E2A]/10 bg-[#F6F8F7]/65 p-3 text-sm leading-snug text-[#1B2E2A]/85"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#79C42B]"
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-lg border border-[#1B2E2A]/12 bg-[#F6F8F7] p-4 text-xs leading-relaxed text-[#1B2E2A]/75">
                <strong className="font-semibold text-[#1B2E2A]">Alcance tecnológico:</strong> La
                metodología establece la estructura de trabajo asistida por inteligencia artificial;
                la infraestructura digital privada y los entornos automatizados de CEDUCATY se
                integrarán en etapas posteriores del desarrollo del proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8. CHECKLIST DE REQUISITOS */}
      <section id="checklist" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
                Autoevaluación preliminar
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
                Descubre qué tienes y qué necesitas para comenzar
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
                Marca los elementos con los que ya cuentas hoy. Estos son ejemplos de aspectos que se
                revisan durante tu diagnóstico inicial.
              </p>
            </div>

            <div className="rounded-lg border border-[#1B2E2A]/12 bg-white px-4 py-3 text-sm font-semibold text-[#1B2E2A] tabular-nums">
              Seleccionados: {completedCount} de {CHECKLIST_ITEMS.length}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = Boolean(checkedIds[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggleItem(item.id)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors duration-150 ${
                    checked
                      ? 'border-[#79C42B] bg-white text-[#1B2E2A]'
                      : 'border-[#1B2E2A]/12 bg-white text-[#1B2E2A]/85 hover:border-[#1B2E2A]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {checked ? (
                      <CheckSquare className="h-5 w-5 shrink-0 text-[#79C42B]" aria-hidden="true" />
                    ) : (
                      <Square className="h-5 w-5 shrink-0 text-[#1B2E2A]/35" aria-hidden="true" />
                    )}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <span className="text-xs text-[#1B2E2A]/55">{item.category}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-[#1B2E2A]/12 bg-white p-6 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-relaxed text-[#1B2E2A]/80">
              <strong className="font-semibold text-[#1B2E2A]">Importante:</strong> El checklist
              definitivo se personalizará según la ruta que elijas (Evaluador Independiente o Centro
              de Evaluación) y los requisitos oficiales vigentes aplicables.
            </p>
            <button
              type="button"
              onClick={onGoToDiagnostic}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#1B2E2A] px-5 py-3 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#26413b] whitespace-nowrap"
            >
              REALIZAR MI DIAGNÓSTICO GRATUITO
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
