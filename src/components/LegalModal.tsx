import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { LegalModalType } from './Footer';

interface LegalModalProps {
  type: LegalModalType | null;
  onClose: () => void;
  onGoToDiagnostic: () => void;
}

export function LegalModal({ type, onClose, onGoToDiagnostic }: LegalModalProps) {
  useEffect(() => {
    if (!type) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [type, onClose]);

  if (!type) return null;

  const contentMap: Record<LegalModalType, { title: string; paragraphs: string[] }> = {
    about: {
      title: 'Acerca del proyecto MASTER CONOCER BUSINESS',
      paragraphs: [
        'MASTER CONOCER BUSINESS es una iniciativa de CEDUCATY orientada a proporcionar una metodología estructurada y asistencia guiada por inteligencia artificial para quienes desean organizar un proyecto empresarial vinculado al Sistema Nacional de Competencias.',
        'Este portal tiene fines exclusivamente informativos y de diagnóstico inicial. No constituye un curso grabado ni en vivo, ni sustituye las atribuciones normativas de las instancias competentes.',
      ],
    },
    contact: {
      title: 'Contacto y atención inicial',
      paragraphs: [
        'Para recibir orientación personalizada sobre tu proyecto como Evaluador Independiente o Centro de Evaluación, completa el formulario de diagnóstico gratuito en esta misma página.',
        'También puedes conocer nuestras soluciones complementarias en certificadosconocer.com y ceducaty.com.',
      ],
    },
    privacy: {
      title: 'Aviso de Privacidad',
      paragraphs: [
        'CEDUCATY, como responsable del tratamiento de los datos recabados en esta página de diagnóstico, utilizará la información proporcionada (nombre completo, correo electrónico, WhatsApp y respuestas sobre tu proyecto) exclusivamente para analizar tu situación inicial y brindarte orientación respecto a los siguientes pasos.',
        'Los datos captados en este formulario se resguardan de forma independiente para fines de diagnóstico y no se envían automáticamente a plataformas externas sin autorización. El consentimiento para recibir comunicaciones comerciales es opcional y se recaba por separado.',
        'Puedes solicitar la actualización, rectificación o eliminación de tus datos de diagnóstico contactando a nuestro equipo por los canales oficiales de CEDUCATY.',
      ],
    },
    terms: {
      title: 'Términos y Condiciones de Uso',
      paragraphs: [
        'La información publicada en esta página tiene carácter orientativo y metodológico. CEDUCATY es una empresa independiente; la obtención de acreditaciones, autorizaciones o certificados oficiales ante el Sistema Nacional de Competencias depende íntegramente del cumplimiento de requisitos y de las resoluciones de las instancias competentes.',
        'Contar con un certificado de competencia en estándares como EC0076, EC0091, EC1355 o EC1440 no equivale automáticamente a una acreditación como Evaluador Independiente o Centro de Evaluación ni garantiza ingresos o resultados comerciales.',
      ],
    },
  };

  const current = contentMap[type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2E2A]/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-[#1B2E2A]/15 bg-white p-6 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#1B2E2A]/10 pb-4">
          <h2 id="legal-modal-title" className="text-xl font-bold text-[#1B2E2A]">
            {current.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#1B2E2A]/15 text-[#1B2E2A] hover:bg-[#F6F8F7]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#1B2E2A]/85">
          {current.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#1B2E2A]/10 pt-4">
          {type === 'contact' && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToDiagnostic();
              }}
              className="cursor-pointer rounded-lg bg-[#1B2E2A] px-4 py-2 text-xs font-bold text-white hover:bg-[#26413b]"
            >
              Ir al diagnóstico gratuito
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-[#1B2E2A]/20 px-4 py-2 text-xs font-semibold text-[#1B2E2A] hover:bg-[#F6F8F7]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
