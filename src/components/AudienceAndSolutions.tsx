import { ArrowRight, ArrowUpRight, Briefcase, Compass, Layers } from 'lucide-react';
import { CEDUCATY_SOLUTIONS, TARGET_PROFILES } from '../data/landingContent';
import type { ExperienceLevelOption } from '../types/lead';

interface AudienceAndSolutionsProps {
  onSelectProfile: (experience: ExperienceLevelOption) => void;
  onNavigateToSection: (sectionId: string) => void;
}

const PROFILE_ICONS = [Compass, Briefcase, Layers] as const;

export function AudienceAndSolutions({
  onSelectProfile,
  onNavigateToSection,
}: AudienceAndSolutionsProps) {
  return (
    <>
      {/* SECCIÓN 9. ¿PARA QUIÉN ES? */}
      <section id="para-quien" className="border-b border-[#1B2E2A]/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Perfiles de participantes
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              ¿Para quién es este proyecto?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Identifica el perfil que mejor describe tu situación actual para conocer el tipo de
              orientación que puedes recibir.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TARGET_PROFILES.map((profile, idx) => {
              const Icon = PROFILE_ICONS[idx] || Compass;
              return (
                <article
                  key={profile.id}
                  className="flex flex-col justify-between rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7]/65 p-6 sm:p-7"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1B2E2A] text-white">
                      <Icon className="h-5 w-5 text-[#79C42B]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#1B2E2A]">{profile.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-[#1B2E2A]">
                      {profile.situation}
                    </p>
                    <p className="mt-3 border-t border-[#1B2E2A]/10 pt-3 text-sm leading-relaxed text-[#1B2E2A]/75">
                      {profile.orientation}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectProfile(profile.presetExperience)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-[#1B2E2A] underline decoration-[#79C42B] decoration-2 underline-offset-4 hover:text-[#2a4741]"
                    >
                      <span>Iniciar diagnóstico con este perfil</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 10. SOLUCIONES CEDUCATY */}
      <section id="soluciones" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Alternativas comerciales independientes
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              Soluciones CEDUCATY
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Cuatro alternativas independientes según la etapa en la que se encuentre tu proyecto o
              necesidad profesional.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CEDUCATY_SOLUTIONS.map((sol) => (
              <article
                key={sol.letter}
                className="flex flex-col justify-between rounded-xl border border-[#1B2E2A]/12 bg-white p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-[#1B2E2A]/60">
                    <span className="font-mono font-bold text-[#79C42B]">
                      Opción {sol.letter}
                    </span>
                    <span>{sol.note}</span>
                  </div>

                  <h3 className="mt-2 text-xl font-bold text-[#1B2E2A]">{sol.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#1B2E2A]/80 sm:text-base">
                    {sol.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#1B2E2A]/10 pt-5">
                  {sol.type === 'external' ? (
                    <a
                      href={sol.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#1B2E2A] bg-white px-4 py-2.5 text-xs font-bold tracking-wide text-[#1B2E2A] transition-colors hover:bg-[#1B2E2A] hover:text-white whitespace-nowrap"
                    >
                      <span>{sol.ctaLabel}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigateToSection(sol.href.slice(1))}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#1B2E2A] px-4 py-2.5 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#26413b] whitespace-nowrap"
                    >
                      <span>{sol.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4 text-[#FFDF00]" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
