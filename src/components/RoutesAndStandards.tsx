import { AlertCircle, Building2, Check, ChevronDown, ChevronUp, ExternalLink, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { COMPETENCE_STANDARDS, ROUTES_DATA } from '../data/landingContent';

interface RoutesAndStandardsProps {
  onSelectRouteForDiagnostic: (projectOption: 'Acreditarme como Evaluador Independiente' | 'Crear un Centro de Evaluación') => void;
}

export function RoutesAndStandards({ onSelectRouteForDiagnostic }: RoutesAndStandardsProps) {
  const [activeRouteTab, setActiveRouteTab] = useState<'all' | 'ei' | 'ce'>('all');
  const [expandedStandard, setExpandedStandard] = useState<string>('EC0076');

  const visibleRoutes =
    activeRouteTab === 'all'
      ? ROUTES_DATA
      : ROUTES_DATA.filter((r) => r.id === activeRouteTab);

  return (
    <>
      {/* SECCIÓN 3. ¿QUÉ PUEDES DESARROLLAR? */}
      <section id="rutas" className="border-b border-[#1B2E2A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
                Rutas de desarrollo
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
                ¿Qué puedes desarrollar?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
                La metodología contempla orientación estructurada para dos rutas principales dentro
                del ecosistema de competencias laborales.
              </p>
            </div>

            {/* Interactive Segmented Filter */}
            <div
              role="group"
              aria-label="Filtrar rutas"
              className="inline-flex w-fit items-center gap-1 rounded-lg border border-[#1B2E2A]/12 bg-[#F6F8F7] p-1"
            >
              <button
                type="button"
                onClick={() => setActiveRouteTab('all')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeRouteTab === 'all'
                    ? 'bg-white text-[#1B2E2A] shadow-xs'
                    : 'text-[#1B2E2A]/70 hover:text-[#1B2E2A]'
                }`}
              >
                Comparar ambas
              </button>
              <button
                type="button"
                onClick={() => setActiveRouteTab('ei')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeRouteTab === 'ei'
                    ? 'bg-white text-[#1B2E2A] shadow-xs'
                    : 'text-[#1B2E2A]/70 hover:text-[#1B2E2A]'
                }`}
              >
                Evaluador Independiente
              </button>
              <button
                type="button"
                onClick={() => setActiveRouteTab('ce')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeRouteTab === 'ce'
                    ? 'bg-white text-[#1B2E2A] shadow-xs'
                    : 'text-[#1B2E2A]/70 hover:text-[#1B2E2A]'
                }`}
              >
                Centro de Evaluación
              </button>
            </div>
          </div>

          <div
            className={`mt-10 grid gap-6 ${
              visibleRoutes.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl'
            }`}
          >
            {visibleRoutes.map((route) => {
              const Icon = route.id === 'ei' ? UserCheck : Building2;
              return (
                <article
                  key={route.id}
                  className="flex flex-col justify-between rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7]/60 p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 border-b border-[#1B2E2A]/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1B2E2A] text-white">
                          <Icon className="h-5 w-5 text-[#79C42B]" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#1B2E2A]/60 uppercase">
                            {route.code}
                          </span>
                          <h3 className="text-xl font-bold text-[#1B2E2A]">{route.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#1B2E2A]/80 sm:text-base">
                      {route.subtitle}
                    </p>

                    <p className="mt-5 text-xs font-bold tracking-wider text-[#1B2E2A] uppercase">
                      {route.focusLabel}
                    </p>

                    <ul className="mt-3 space-y-2.5">
                      {route.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#1B2E2A]/85">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#79C42B]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 border-t border-[#1B2E2A]/10 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectRouteForDiagnostic(
                          route.id === 'ei'
                            ? 'Acreditarme como Evaluador Independiente'
                            : 'Crear un Centro de Evaluación'
                        )
                      }
                      className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#1B2E2A] px-4 py-2.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#26413b] whitespace-nowrap"
                    >
                      Evaluar esta ruta en el diagnóstico
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7] p-4 sm:p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#A6192E]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-[#1B2E2A]/85">
              <strong className="font-semibold text-[#1B2E2A]">Aclaración normativa:</strong> Las
              rutas y los requisitos deben validarse conforme a la normativa y los procedimientos
              oficiales vigentes. No todos los estándares son requisitos universales para cualquier
              persona o proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4. LOS ESTÁNDARES DE COMPETENCIA */}
      <section id="estandares" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Referentes en el Registro Nacional (RENEC)
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              Conoce algunos estándares relacionados con la evaluación y el desarrollo de competencias
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Información verificada en el Registro Nacional de Estándares de Competencia (RENEC)
              del CONOCER. Selecciona cada estándar para consultar su ficha informativa.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {COMPETENCE_STANDARDS.map((std) => {
              const isExpanded = expandedStandard === std.code;
              return (
                <article
                  key={std.code}
                  className="flex flex-col justify-between rounded-xl border border-[#1B2E2A]/12 bg-white p-6"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#1B2E2A]/65">
                          <span className="font-mono font-bold text-[#1B2E2A] tabular-nums">
                            {std.code}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{std.sncLevel}</span>
                        </div>
                        <h3 className="mt-1.5 text-lg leading-snug font-bold text-[#1B2E2A]">
                          {std.officialName}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedStandard(isExpanded ? '' : std.code)
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/15 text-[#1B2E2A] transition-colors hover:bg-[#F6F8F7]"
                        aria-label={
                          isExpanded
                            ? `Contraer detalle de ${std.code}`
                            : `Consultar detalle de ${std.code}`
                        }
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#1B2E2A]/80">
                      <span className="font-semibold text-[#1B2E2A]">Propósito: </span>
                      {std.purpose}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 space-y-3 border-t border-[#1B2E2A]/10 pt-4 text-sm leading-relaxed text-[#1B2E2A]/80">
                        <div>
                          <span className="font-semibold text-[#1B2E2A]">
                            Función relacionada con el proyecto:{' '}
                          </span>
                          {std.projectRole}
                        </div>
                        <div>
                          <span className="font-semibold text-[#1B2E2A]">
                            Situación de vigencia:{' '}
                          </span>
                          {std.validityStatus}
                        </div>
                        <div className="pt-1">
                          <a
                            href={std.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-semibold text-[#1B2E2A] underline decoration-[#79C42B] decoration-2 underline-offset-4 hover:text-[#2c4a43]"
                          >
                            <span>Consultar fuente oficial ({std.officialSourceLabel})</span>
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isExpanded && (
                    <div className="mt-4 border-t border-[#1B2E2A]/10 pt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedStandard(std.code)}
                        className="cursor-pointer text-xs font-bold text-[#1B2E2A] underline decoration-[#79C42B] decoration-2 underline-offset-4 hover:text-[#2c4a43]"
                      >
                        Ver función, vigencia y fuente oficial
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-[#A6192E]/25 bg-white p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#A6192E]" aria-hidden="true" />
              <p className="text-sm leading-relaxed font-medium text-[#1B2E2A]">
                Contar con una certificación de competencia no equivale automáticamente a obtener una
                acreditación como Evaluador Independiente o Centro de Evaluación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
