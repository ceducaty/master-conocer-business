import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BRAND_ASSETS } from '../data/landingContent';

interface NavbarProps {
  onNavigateToSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Rutas', href: '#rutas' },
  { label: 'Estándares', href: '#estandares' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Preguntas', href: '#preguntas' },
] as const;

export function Navbar({ onNavigateToSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigateToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#1B2E2A]/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official CEDUCATY logo (unedited, un-recolored) */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="flex shrink-0 items-center bg-white py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2E2A]"
          aria-label="CEDUCATY – MASTER CONOCER BUSINESS Inicio"
        >
          <img
            src={BRAND_ASSETS.ceducatyLogo}
            alt="CEDUCATY Centro Evaluador"
            referrerPolicy="no-referrer"
            className="h-11 w-auto object-contain"
          />
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href.slice(1));
              }}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-[#1B2E2A]/80 underline-offset-4 transition-colors duration-150 hover:text-[#1B2E2A] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B2E2A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA action */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick('diagnostico')}
            className="hidden whitespace-nowrap shrink-0 cursor-pointer rounded-lg bg-[#1B2E2A] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#243d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2E2A] sm:inline-flex"
          >
            Diagnóstico gratuito
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/15 text-[#1B2E2A] transition-colors hover:bg-[#F6F8F7] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#1B2E2A]/10 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href.slice(1));
                }}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1B2E2A] transition-colors hover:bg-[#F6F8F7]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleLinkClick('diagnostico')}
              className="mt-2 w-full cursor-pointer rounded-lg bg-[#1B2E2A] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#243d38]"
            >
              QUIERO DESARROLLAR MI PROYECTO
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
