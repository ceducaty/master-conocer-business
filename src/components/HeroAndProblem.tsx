import { ArrowRight, Compass, Cpu, FileCheck2, Globe } from 'lucide-react';
import { useState } from 'react';
import { BRAND_ASSETS, PROBLEM_POINTS } from '../data/landingContent';

interface HeroAndProblemProps {
  onGoToDiagnostic: () => void;
  onGoToMethodology: () => void;
}

const HERO_PILLARS = [
  {
    icon: Compass,
    title: 'Ruta EI o CE',
    detail: 'Evaluador Independiente o Centro de Evaluación según tu punto de partida',
  },
  {
    icon: FileCheck2,
    title: 'Requisitos y orden',
    detail: 'Identificación de estándares y estructura empresarial paso a paso',
  },
  {
    icon: Globe,
    title: 'Marca y captación',
    detail: 'Identidad comercial, sitio web, marketing y atención organizada',
  },
  {
    icon: Cpu,
    title: 'Asistencia con IA',
    detail: 'Metodología digital para estructurar documentos, planes y seguimiento',
  },
] as const;

export function HeroAndProblem({ onGoToDiagnostic, onGoToMethodology }: HeroAndProblemProps) {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <>
      {/* SECCIÓN 1. HERO PRINCIPAL */}
      <section id="inicio" className="border-b border-[#1B2E2A]/10 bg-white pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Copy Column */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/70 uppercase">
                CEDUCATY · MASTER CONOCER BUSINESS
              </p>

              <h1 className="mt-4 text-[clamp(2.1rem,3.6vw,3.35rem)] leading-[1.1] font-extrabold tracking-tight text-[#1B2E2A]">
                Construye tu propio proyecto empresarial dentro del Sistema CONOCER
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1B2E2A]/85 sm:text-lg">
                Desarrolla una ruta empresarial como Evaluador Independiente o Centro de Evaluación,
                con una metodología estructurada y asistencia de inteligencia artificial.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#1B2E2A]/70 sm:text-base">
                Desde el diagnóstico inicial hasta la formalización, presencia digital, marketing y
                captación de clientes.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onGoToDiagnostic}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1B2E2A] px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-colors duration-150 hover:bg-[#26413b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2E2A] whitespace-nowrap shrink-0"
                >
                  <span>QUIERO DESARROLLAR MI PROYECTO</span>
                  <ArrowRight className="h-4 w-4 text-[#FFDF00]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onGoToMethodology}
                  className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/25 bg-white px-5 py-3.5 text-sm font-semibold text-[#1B2E2A] transition-colors duration-150 hover:border-[#1B2E2A] hover:bg-[#F6F8F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2E2A] whitespace-nowrap shrink-0"
                >
                  CONOCE CÓMO FUNCIONA
                </button>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl border border-[#1B2E2A]/12 bg-[#F6F8F7]">
                {!heroImgError ? (
                  <img
                    src={BRAND_ASSETS.heroIllustration}
                    alt="Emprendedor diseñando la estructura de su proyecto empresarial con herramientas digitales y planificación asistida por inteligencia artificial"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center bg-[#F6F8F7] p-8 text-center">
                    <Cpu className="h-12 w-12 text-[#1B2E2A]" aria-hidden="true" />
                    <p className="mt-4 font-display text-lg font-bold text-[#1B2E2A]">
                      Arquitectura Empresarial &amp; Asistencia Digital
                    </p>
                    <p className="mt-1 max-w-sm text-sm text-[#1B2E2A]/70">
                      Planeación de ruta Evaluador Independiente o Centro de Evaluación paso a paso.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full-width 4-column summary strip below split */}
          <div className="mt-10 grid gap-4 border-t border-[#1B2E2A]/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1B2E2A]/12 bg-[#F6F8F7] text-[#1B2E2A]">
                    <Icon className="h-4 w-4 text-[#79C42B]" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#1B2E2A]">{pillar.title}</h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#1B2E2A]/70">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2. EL PROBLEMA */}
      <section id="problema" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              El problema real al emprender
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              Tener conocimientos sobre CONOCER no significa tener un negocio preparado para operar
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B2E2A]/75">
              Muchas personas conocen el valor de las certificaciones de competencia, pero al intentar
              estructurar un proyecto propio se detienen ante la falta de orden operativo y comercial.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEM_POINTS.map((item) => (
              <article
                key={item.index}
                className="flex flex-col justify-between rounded-xl border border-[#1B2E2A]/10 bg-white p-5"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#79C42B] tabular-nums">
                    {item.index}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-[#1B2E2A]">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1B2E2A]/75">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#1B2E2A] px-6 py-6 text-white sm:px-8 sm:py-7">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <p className="max-w-3xl text-base leading-relaxed font-medium text-white/95 sm:text-lg">
                No se trata solamente de conocer el sistema CONOCER. Se trata de organizar los
                elementos necesarios para desarrollar un proyecto empresarial.
              </p>
              <button
                type="button"
                onClick={onGoToDiagnostic}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#79C42B] px-5 py-2.5 text-sm font-bold text-[#1B2E2A] transition-colors hover:bg-[#8ad43c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFDF00] whitespace-nowrap"
              >
                Evaluar mi situación
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
