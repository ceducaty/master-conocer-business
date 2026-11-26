import { useState } from 'react';
import { IMPLEMENTATION_MODULES, METHODOLOGY_PHASES } from '../data/landingContent';

export function MethodologyAndModules() {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const currentPhase =
    METHODOLOGY_PHASES.find((p) => p.phase === selectedPhase) || METHODOLOGY_PHASES[0];
  const progressPercent = Math.round((selectedPhase / METHODOLOGY_PHASES.length) * 100);

  return (
    <>
      {/* SECCIÓN 5. METODOLOGÍA DE IMPLEMENTACIÓN */}
      <section id="metodologia" className="border-b border-[#1B2E2A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Metodología de implementación
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              De una idea a un proyecto empresarial estructurado
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Doce fases secuenciales diseñadas para ordenar cada componente del proyecto. Selecciona
              cualquier fase en la línea de progreso para revisar su enfoque.
            </p>
          </div>

          {/* Interactive Progress Bar */}
          <div className="mt-10 rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#1B2E2A]/75">
              <span className="tabular-nums">
                Fase {currentPhase.phase} de {METHODOLOGY_PHASES.length}
              </span>
              <span className="font-mono tabular-nums">{progressPercent}% del recorrido</span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1B2E2A]/10">
              <div
                className="h-full bg-[#79C42B] transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-5 rounded-lg border border-[#1B2E2A]/10 bg-white p-4 sm:p-5">
              <p className="text-xs font-semibold text-[#79C42B] uppercase">
                Fase {String(currentPhase.phase).padStart(2, '0')}
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#1B2E2A]">{currentPhase.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#1B2E2A]/80">
                {currentPhase.detail}
              </p>
            </div>
          </div>

          {/* 12 Phases Grid */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGY_PHASES.map((item) => {
              const isActive = item.phase === selectedPhase;
              return (
                <button
                  key={item.phase}
                  type="button"
                  onClick={() => setSelectedPhase(item.phase)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-150 ${
                    isActive
                      ? 'border-[#1B2E2A] bg-[#1B2E2A] text-white'
                      : 'border-[#1B2E2A]/12 bg-white text-[#1B2E2A] hover:bg-[#F6F8F7]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold tabular-nums ${
                      isActive ? 'text-[#FFDF00]' : 'text-[#79C42B]'
                    }`}
                  >
                    {String(item.phase).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-snug font-semibold">{item.title}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[#1B2E2A]/75">
            Nota: La secuencia se adapta a la situación particular de cada usuario; algunas
            actividades pueden no aplicar según la ruta elegida y lo que ya hayas avanzado.
          </p>
        </div>
      </section>

      {/* SECCIÓN 6. TEMARIO INFORMATIVO */}
      <section id="temario" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Áreas de implementación del proyecto
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              ¿Qué aprenderás a desarrollar durante el proyecto?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Estos doce módulos describen las áreas prácticas de implementación empresarial que
              abarca la metodología MASTER CONOCER BUSINESS para estructurar tu proyecto de principio
              a fin.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {IMPLEMENTATION_MODULES.map((mod) => (
              <article
                key={mod.number}
                className="rounded-xl border border-[#1B2E2A]/10 bg-white p-5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2E2A]/60">
                  <span className="font-mono font-bold text-[#79C42B] tabular-nums">
                    Módulo {mod.number}
                  </span>
                </div>
                <h3 className="mt-1.5 text-base leading-snug font-bold text-[#1B2E2A]">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1B2E2A]/75">{mod.area}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
