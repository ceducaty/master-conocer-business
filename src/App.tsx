/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AdminPage } from './components/AdminPage';
import { AiAndChecklist } from './components/AiAndChecklist';
import { AudienceAndSolutions } from './components/AudienceAndSolutions';
import { DiagnosticFormSection } from './components/DiagnosticFormSection';
import { FaqAndFinalCta } from './components/FaqAndFinalCta';
import { Footer, type LegalModalType } from './components/Footer';
import { HeroAndProblem } from './components/HeroAndProblem';
import { LegalModal } from './components/LegalModal';
import { MethodologyAndModules } from './components/MethodologyAndModules';
import { Navbar } from './components/Navbar';
import { RoutesAndStandards } from './components/RoutesAndStandards';
import type {
  ExperienceLevelOption,
  LeadRecord,
  ProjectTypeOption,
} from './types/lead';

function isAdminPath(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '') === '/admin';
}

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => isAdminPath());
  const [presetProjectType, setPresetProjectType] = useState<ProjectTypeOption | undefined>(
    undefined
  );
  const [presetExperienceLevel, setPresetExperienceLevel] = useState<
    ExperienceLevelOption | undefined
  >(undefined);
  const [legalModal, setLegalModal] = useState<LegalModalType | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(isAdminPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (isAdminRoute) {
      document.title = 'Administración | MASTER CONOCER BUSINESS – CEDUCATY';
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'noindex, nofollow');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    } else {
      document.title = 'MASTER CONOCER BUSINESS | CEDUCATY – Proyecto Empresarial CONOCER';
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    }
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return <AdminPage />;
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectRouteForDiagnostic = (
    projectType: 'Acreditarme como Evaluador Independiente' | 'Crear un Centro de Evaluación'
  ) => {
    setPresetProjectType(projectType);
    scrollToSection('diagnostico');
  };

  const handleSelectProfile = (experience: ExperienceLevelOption) => {
    setPresetExperienceLevel(experience);
    scrollToSection('diagnostico');
  };

  const handleLeadSubmitted = (_newLead: LeadRecord) => {
    // El envío queda gestionado en DiagnosticFormSection y leadService
  };

  return (
    <div className="min-h-screen bg-white text-[#1B2E2A]">
      <Navbar onNavigateToSection={scrollToSection} />

      <main>
        <HeroAndProblem
          onGoToDiagnostic={() => scrollToSection('diagnostico')}
          onGoToMethodology={() => scrollToSection('metodologia')}
        />

        <RoutesAndStandards
          onSelectRouteForDiagnostic={handleSelectRouteForDiagnostic}
        />

        <MethodologyAndModules />

        <AiAndChecklist onGoToDiagnostic={() => scrollToSection('diagnostico')} />

        <AudienceAndSolutions
          onSelectProfile={handleSelectProfile}
          onNavigateToSection={scrollToSection}
        />

        <DiagnosticFormSection
          presetProjectType={presetProjectType}
          presetExperienceLevel={presetExperienceLevel}
          onOpenPrivacy={() => setLegalModal('privacy')}
          onLeadSubmitted={handleLeadSubmitted}
        />

        <FaqAndFinalCta onGoToDiagnostic={() => scrollToSection('diagnostico')} />
      </main>

      <Footer onOpenLegalModal={setLegalModal} />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
        onGoToDiagnostic={() => scrollToSection('diagnostico')}
      />
    </div>
  );
}
