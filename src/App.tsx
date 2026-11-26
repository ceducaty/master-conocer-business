/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AdminPreviewDrawer } from './components/AdminPreviewDrawer';
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
import { getStoredLeads, updateLocalLeadStatus } from './lib/leadService';
import type {
  ExperienceLevelOption,
  LeadRecord,
  LeadStatus,
  ProjectTypeOption,
} from './types/lead';

export default function App() {
  const [presetProjectType, setPresetProjectType] = useState<ProjectTypeOption | undefined>(
    undefined
  );
  const [presetExperienceLevel, setPresetExperienceLevel] = useState<
    ExperienceLevelOption | undefined
  >(undefined);
  const [legalModal, setLegalModal] = useState<LegalModalType | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>(() => getStoredLeads());

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
    setLeads(getStoredLeads());
  };

  const handleUpdateLeadStatus = (id: string, status: LeadStatus) => {
    const updated = updateLocalLeadStatus(id, status);
    setLeads(updated);
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

      <Footer
        onOpenLegalModal={setLegalModal}
        onOpenAdminPreview={() => setAdminOpen(true)}
        leadsCount={leads.length}
      />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
        onGoToDiagnostic={() => scrollToSection('diagnostico')}
      />

      <AdminPreviewDrawer
        open={adminOpen}
        leads={leads}
        onClose={() => setAdminOpen(false)}
        onUpdateStatus={handleUpdateLeadStatus}
      />
    </div>
  );
}
