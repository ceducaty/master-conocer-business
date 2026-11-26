import { ArrowUpRight } from 'lucide-react';
import { BRAND_ASSETS } from '../data/landingContent';

export type LegalModalType = 'about' | 'contact' | 'privacy' | 'terms';

interface FooterProps {
  onOpenLegalModal: (type: LegalModalType) => void;
  onOpenAdminPreview: () => void;
  leadsCount: number;
}

export function Footer({ onOpenLegalModal, onOpenAdminPreview, leadsCount }: FooterProps) {
  return (
    <footer className="border-t border-[#1B2E2A]/12 bg-white py-12 text-[#1B2E2A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Column with official unedited CEDUCATY logo */}
          <div className="md:col-span-5">
            <div className="inline-block bg-white">
              <img
                src={BRAND_ASSETS.ceducatyLogo}
                alt="CEDUCATY Centro Evaluador"
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#1B2E2A]/80">
              <strong className="font-semibold text-[#1B2E2A]">CEDUCATY</strong> · Proyecto
              MASTER CONOCER BUSINESS. Orientación empresarial y tecnológica para estructurar
              proyectos vinculados al Sistema Nacional de Competencias.
            </p>
          </div>

          {/* Institutional Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold tracking-wider text-[#1B2E2A] uppercase">
              Información del proyecto
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#1B2E2A]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('about')}
                  className="cursor-pointer hover:text-[#1B2E2A] hover:underline"
                >
                  Acerca del proyecto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('contact')}
                  className="cursor-pointer hover:text-[#1B2E2A] hover:underline"
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('privacy')}
                  className="cursor-pointer hover:text-[#1B2E2A] hover:underline"
                >
                  Aviso de privacidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="cursor-pointer hover:text-[#1B2E2A] hover:underline"
                >
                  Términos y condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* External Ecosystem Links & Admin Architecture Preview */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold tracking-wider text-[#1B2E2A] uppercase">
              Ecosistema CEDUCATY
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#1B2E2A]/80">
              <li>
                <a
                  href="https://certificadosconocer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#1B2E2A] hover:underline"
                >
                  <span>certificadosconocer.com</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://ceducaty.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#1B2E2A] hover:underline"
                >
                  <span>ceducaty.com</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAdminPreview}
                  className="cursor-pointer text-xs font-semibold text-[#1B2E2A]/70 underline decoration-[#1B2E2A]/30 underline-offset-4 hover:text-[#1B2E2A]"
                >
                  Arquitectura de administración de prospectos ({leadsCount})
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Institutional Disclaimer */}
        <div className="mt-10 border-t border-[#1B2E2A]/12 pt-6">
          <p className="text-xs leading-relaxed text-[#1B2E2A]/75">
            CEDUCATY es una empresa independiente que ofrece servicios de orientación, capacitación,
            acompañamiento y soluciones tecnológicas relacionadas con el desarrollo de proyectos
            empresariales. La acreditación y certificación están sujetas a los procedimientos y
            decisiones de las instancias competentes del Sistema Nacional de Competencias.
          </p>
          <p className="mt-3 text-xs text-[#1B2E2A]/55">
            © {new Date().getFullYear()} CEDUCATY · MASTER CONOCER BUSINESS. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
