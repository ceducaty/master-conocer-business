import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data/landingContent';

interface FaqAndFinalCtaProps {
  onGoToDiagnostic: () => void;
}

export function FaqAndFinalCta({ onGoToDiagnostic }: FaqAndFinalCtaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* SECCIÓN 12. PREGUNTAS FRECUENTES */}
      <section id="preguntas" className="border-b border-[#1B2E2A]/10 bg-[#F6F8F7] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#1B2E2A]/65 uppercase">
              Claridad operativa y normativa
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1B2E2A] sm:text-3xl lg:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="mt-8 divide-y divide-[#1B2E2A]/10 rounded-xl border border-[#1B2E2A]/12 bg-white">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F6F8F7]/60 sm:px-6 sm:py-5"
                  >
                    <span className="text-sm font-bold text-[#1B2E2A] sm:text-base">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-[#1B2E2A]" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-[#1B2E2A]/65" aria-hidden="true" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-[#1B2E2A]/80 sm:px-6">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 13. CTA FINAL */}
      <section className="bg-[#1B2E2A] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Tu proyecto puede comenzar con un diagnóstico
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            Identifica qué tienes, qué necesitas y cuál podría ser tu siguiente paso para
            desarrollar tu proyecto empresarial relacionado con CONOCER.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={onGoToDiagnostic}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#79C42B] px-7 py-3.5 text-sm font-bold tracking-wide text-[#1B2E2A] transition-colors hover:bg-[#8ad43c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFDF00] whitespace-nowrap"
            >
              <span>QUIERO COMENZAR</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
