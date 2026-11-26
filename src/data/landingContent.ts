import type {
  DevelopmentTimelineOption,
  EstimatedBudgetOption,
  ExperienceLevelOption,
  ProjectTypeOption,
} from '../types/lead';

export const BRAND_ASSETS = {
  ceducatyLogo: '/assets/aistudio/logo-ceducaty-centro-evaluador_e06f6f3f.jpg',
  heroIllustration: '/src/assets/images/hero_business_builder_1795715544243.jpg',
  aiWorkspaceIllustration: '/src/assets/images/ai_assistant_workspace_1795715544346.jpg',
} as const;

export const PROBLEM_POINTS = [
  {
    index: '01',
    title: 'Sin ruta definida',
    description: 'No sabe qué ruta debe seguir según su perfil, recursos y objetivos.',
  },
  {
    index: '02',
    title: 'Incertidumbre sobre certificaciones',
    description: 'Desconoce qué certificaciones necesita realmente y cuáles aplican a su caso.',
  },
  {
    index: '03',
    title: 'Requisitos poco claros',
    description: 'No identifica los requisitos normativos, documentales y operativos aplicables a su proyecto.',
  },
  {
    index: '04',
    title: 'Falta de estructura legal y fiscal',
    description: 'No sabe cómo formalizar su actividad empresarial de forma ordenada.',
  },
  {
    index: '05',
    title: 'Ausencia de marca y presencia digital',
    description: 'No tiene identidad comercial ni presencia digital profesional que genere confianza.',
  },
  {
    index: '06',
    title: 'Dificultad para atraer prospectos',
    description: 'No sabe cómo conseguir clientes ni cómo comunicar su oferta de valor.',
  },
  {
    index: '07',
    title: 'Sin proceso comercial organizado',
    description: 'Carece de un flujo claro para atender solicitudes, cotizar y dar seguimiento.',
  },
  {
    index: '08',
    title: 'Desconocimiento tecnológico',
    description: 'Desconoce qué herramientas tecnológicas utilizar para operar y ahorrar tiempo.',
  },
] as const;

export const ROUTES_DATA = [
  {
    id: 'ei',
    code: 'Ruta A',
    title: 'Evaluador Independiente (EI)',
    subtitle:
      'Para personas interesadas en desarrollar un proyecto profesional como Evaluador Independiente dentro del Sistema Nacional de Competencias.',
    focusLabel: 'Aspectos a investigar y preparar',
    items: [
      'Certificaciones de competencia aplicables a su perfil y área técnica',
      'Requisitos vigentes establecidos en la normativa aplicable',
      'Ruta de acreditación correspondiente ante instancias competentes',
      'Integración de documentación personal y portafolio requerido',
      'Organización de actividades de evaluación y atención a candidatos',
      'Estrategia comercial para ofrecer servicios profesionales',
      'Presencia digital básica e identidad profesional confiable',
    ],
  },
  {
    id: 'ce',
    code: 'Ruta B',
    title: 'Centro de Evaluación (CE)',
    subtitle:
      'Para personas o equipos interesados en desarrollar un proyecto empresarial estructurado como Centro de Evaluación.',
    focusLabel: 'Elementos estratégicos y operativos',
    items: [
      'Identificación de requisitos de infraestructura, gestión y operación',
      'Certificaciones y perfiles necesarios para responsables y evaluadores',
      'Ruta de acreditación y vinculación institucional aplicable',
      'Estructura empresarial, legal y fiscal para operar formalmente',
      'Organización operativa, controles de calidad y procesos internos',
      'Estrategia de marketing y posicionamiento comercial',
      'Captación de candidatos, administración de clientes y seguimiento',
    ],
  },
] as const;

export interface CompetenceStandard {
  code: 'EC0076' | 'EC0091' | 'EC1355' | 'EC1440';
  officialName: string;
  sncLevel: string;
  purpose: string;
  projectRole: string;
  validityStatus: string;
  officialSourceLabel: string;
  officialSourceUrl: string;
}

export const COMPETENCE_STANDARDS: CompetenceStandard[] = [
  {
    code: 'EC0076',
    officialName: 'Evaluación de la competencia de candidatos con base en Estándares de Competencia',
    sncLevel: 'Nivel 4 en el SNC',
    purpose:
      'Referente oficial para la capacitación, evaluación y certificación de personas que preparan la evaluación, recopilan evidencias, emiten el juicio de competencia y presentan los resultados conforme a Estándares de Competencia.',
    projectRole:
      'Permite comprender y respaldar la competencia técnica para evaluar candidatos dentro de un Centro de Evaluación o como Evaluador Independiente.',
    validityStatus:
      'Vigente en el RENEC (los certificados suelen contar con vigencia determinada; validar ficha técnica y criterios de renovación vigentes en el portal oficial del CONOCER).',
    officialSourceLabel: 'RENEC / CONOCER — Catálogo Oficial',
    officialSourceUrl: 'https://conocer.gob.mx/renec-registro-nacional-estandares-competencia/',
  },
  {
    code: 'EC0091',
    officialName:
      'Verificación externa de la operación de los Centros de Evaluación y Evaluadores Independientes',
    sncLevel: 'Nivel 3 en el SNC',
    purpose:
      'Referente para evaluar y certificar a quienes preparan, ejecutan y concluyen la verificación externa de la operación de Centros de Evaluación y Evaluadores Independientes bajo criterios de calidad y normatividad.',
    projectRole:
      'Ayuda a conocer los criterios de supervisión, auditoría documental y cumplimiento operativo que aplican dentro de la Red de Prestadores de Servicios.',
    validityStatus:
      'Vigente en el RENEC (sujeto a revisión periódica; verificar estatus y ficha técnica actualizada directamente en el portal del CONOCER).',
    officialSourceLabel: 'RENEC / CONOCER — Catálogo Oficial',
    officialSourceUrl: 'https://conocer.gob.mx/renec-registro-nacional-estandares-competencia/',
  },
  {
    code: 'EC1355',
    officialName: 'Administración de un centro de evaluación de competencia laboral',
    sncLevel: 'Referente publicado en DOF (2021)',
    purpose:
      'Describe las competencias del responsable de administrar un Centro de Evaluación: gestión y contratación de evaluadores, trámites de acreditación ante ECE/OC, verificación de infraestructura, transparencia y control de calidad.',
    projectRole:
      'Referente histórico clave para entender la estructura administrativa, documental y operativa que exige la gestión de un Centro de Evaluación.',
    validityStatus:
      'Actualizado y sustituido por el estándar EC1440 conforme a publicación en el Diario Oficial de la Federación (DOF). Validar transitorios o vigencia específica en RENEC.',
    officialSourceLabel: 'RENEC / Diario Oficial de la Federación',
    officialSourceUrl: 'https://conocer.gob.mx/renec-registro-nacional-estandares-competencia/',
  },
  {
    code: 'EC1440',
    officialName: 'Administración de un Centro de Evaluación de competencia laboral',
    sncLevel: 'Nivel 4 en el SNC',
    purpose:
      'Estándar actualizado que sirve como referente para quienes coordinan, administran y gestionan la acreditación, infraestructura física y tecnológica, personal evaluador y control de calidad de un Centro de Evaluación.',
    projectRole:
      'Marco de referencia actualizado para estructurar la administración operativa y normativa de un proyecto empresarial de Centro de Evaluación (sustituye al EC1355).',
    validityStatus:
      'Vigente en el RENEC como actualización del EC1355. Consultar la ficha técnica vigente en el portal oficial del CONOCER.',
    officialSourceLabel: 'RENEC / CONOCER — Catálogo Oficial',
    officialSourceUrl: 'https://conocer.gob.mx/renec-registro-nacional-estandares-competencia/',
  },
];

export const METHODOLOGY_PHASES = [
  {
    phase: 1,
    title: 'Diagnóstico de tu situación actual',
    detail: 'Evaluación inicial de tu experiencia, certificaciones previas, recursos disponibles y punto de partida.',
  },
  {
    phase: 2,
    title: 'Identificación de la ruta EI o CE',
    detail: 'Definición clara sobre si te conviene preparar una ruta de Evaluador Independiente o de Centro de Evaluación.',
  },
  {
    phase: 3,
    title: 'Revisión de certificaciones y requisitos',
    detail: 'Mapeo de estándares de competencia, requisitos normativos y documentación aplicable según la ruta.',
  },
  {
    phase: 4,
    title: 'Planeación del proyecto',
    detail: 'Estructuración de etapas, cronograma realista, prioridades operativas y presupuesto base.',
  },
  {
    phase: 5,
    title: 'Formalización empresarial',
    detail: 'Organización fiscal, administrativa y legal necesaria para respaldar la actividad del proyecto.',
  },
  {
    phase: 6,
    title: 'Creación de identidad de marca',
    detail: 'Definición de nombre comercial, propuesta de valor, lineamientos visuales y comunicación profesional.',
  },
  {
    phase: 7,
    title: 'Presencia digital',
    detail: 'Configuración estratégica de canales de contacto y visibilidad en redes y buscadores.',
  },
  {
    phase: 8,
    title: 'Desarrollo de página web',
    detail: 'Arquitectura de un sitio web claro, informativo y orientado a captar prospectos interesados.',
  },
  {
    phase: 9,
    title: 'Configuración de herramientas tecnológicas',
    detail: 'Selección e implementación de herramientas digitales para agenda, formularios, documentos y operación.',
  },
  {
    phase: 10,
    title: 'Estrategia de marketing y publicidad',
    detail: 'Diseño de mensajes, contenidos y campañas responsables para dar a conocer tus servicios.',
  },
  {
    phase: 11,
    title: 'Captación y atención de clientes',
    detail: 'Estandarización del proceso comercial para responder solicitudes, orientar candidatos y dar seguimiento.',
  },
  {
    phase: 12,
    title: 'Lanzamiento y mejora del negocio',
    detail: 'Puesta en marcha ordenada, revisión de indicadores básicos y optimización continua del proyecto.',
  },
] as const;

export const IMPLEMENTATION_MODULES = [
  {
    number: '01',
    title: 'Conoce el Sistema Nacional de Competencias',
    area: 'Fundamentos del ecosistema SEP-CONOCER, actores participantes y marco normativo.',
  },
  {
    number: '02',
    title: 'Identifica los estándares EC0076, EC0091, EC1355 y EC1440',
    area: 'Lectura de fichas técnicas en RENEC, alcance de cada estándar y su relación con tu proyecto.',
  },
  {
    number: '03',
    title: 'Prepara tu ruta como Evaluador Independiente',
    area: 'Análisis de viabilidad, requisitos aplicables, vinculación y preparación de expediente.',
  },
  {
    number: '04',
    title: 'Desarrolla un proyecto de Centro de Evaluación',
    area: 'Requerimientos de infraestructura, perfiles clave, responsabilidades y modelo operativo.',
  },
  {
    number: '05',
    title: 'Comprende la operación y evaluación de candidatos',
    area: 'Flujo de atención, planeación de evaluación, integración de evidencias y entrega de resultados.',
  },
  {
    number: '06',
    title: 'Construye la estructura de tu empresa',
    area: 'Orden fiscal, administrativo y documental acorde con el alcance de tu proyecto.',
  },
  {
    number: '07',
    title: 'Desarrolla tu identidad empresarial',
    area: 'Posicionamiento, discurso comercial ético y coherencia visual para generar confianza.',
  },
  {
    number: '08',
    title: 'Crea tu presencia digital y página web',
    area: 'Estructura de landing informativa, canales de WhatsApp Business y visibilidad orgánica.',
  },
  {
    number: '09',
    title: 'Diseña estrategias para conseguir clientes',
    area: 'Segmentación de público objetivo, contenidos educativos y campañas de captación.',
  },
  {
    number: '10',
    title: 'Organiza tus procesos comerciales y atención al cliente',
    area: 'Guiones de atención ética, calificación de prospectos y seguimiento ordenado.',
  },
  {
    number: '11',
    title: 'Utiliza herramientas de inteligencia artificial para implementar tu proyecto',
    area: 'Aplicación práctica de asistencia digital para redactar, estructurar documentos y planear.',
  },
  {
    number: '12',
    title: 'Planea tu lanzamiento empresarial',
    area: 'Lista de verificación previa, métricas iniciales de control y hoja de ruta de mejora.',
  },
] as const;

export const AI_CAPABILITIES = [
  'Organizar actividades por etapa según tu disponibilidad y punto de partida',
  'Investigar requisitos aplicables y rutas normativas vigentes para validar en fuentes oficiales',
  'Preparar borradores de documentos operativos, listas de verificación y guías internas',
  'Crear materiales comerciales claros, éticos y alineados con tu oferta de valor',
  'Diseñar estrategias de posicionamiento y difusión para tus servicios',
  'Estructurar requerimientos para desarrollar herramientas y activos digitales',
  'Dar seguimiento al avance de implementación de cada fase del proyecto',
  'Identificar pendientes críticos antes de iniciar trámites o lanzamientos',
] as const;

export const CHECKLIST_ITEMS = [
  { id: 'certificados', label: 'Certificados de competencia', category: 'Competencias' },
  { id: 'experiencia', label: 'Experiencia en evaluación', category: 'Competencias' },
  { id: 'documentacion', label: 'Documentación personal', category: 'Normativo' },
  { id: 'rfc', label: 'RFC', category: 'Fiscal' },
  { id: 'constitucion', label: 'Constitución empresarial', category: 'Legal' },
  { id: 'acreditacion', label: 'Acreditación existente', category: 'Normativo' },
  { id: 'identidad', label: 'Identidad comercial', category: 'Marca' },
  { id: 'facebook', label: 'Página de Facebook', category: 'Digital' },
  { id: 'whatsapp', label: 'WhatsApp Business', category: 'Digital' },
  { id: 'dominio', label: 'Dominio', category: 'Digital' },
  { id: 'web', label: 'Página web', category: 'Digital' },
  { id: 'presupuesto', label: 'Presupuesto inicial', category: 'Planeación' },
  { id: 'herramientas', label: 'Herramientas digitales', category: 'Operación' },
] as const;

export const TARGET_PROFILES: Array<{
  id: string;
  title: string;
  situation: string;
  orientation: string;
  presetExperience: ExperienceLevelOption;
}> = [
  {
    id: 'desde-cero',
    title: 'Emprendedor desde cero',
    situation: 'No cuenta con certificaciones ni estructura empresarial y quiere conocer cómo comenzar.',
    orientation:
      'Recibe orientación para entender cómo funciona el sistema, identificar qué ruta se adapta a su perfil, qué certificaciones investigar primero y cómo preparar sus bases empresariales.',
    presetExperience: 'No tengo certificaciones; comienzo desde cero',
  },
  {
    id: 'profesional-preparado',
    title: 'Profesional preparado',
    situation: 'Cuenta con certificados de competencia o experiencia previa y desea desarrollar una ruta de acreditación.',
    orientation:
      'Recibe orientación para validar requisitos aplicables, ordenar su documentación, elegir entre Evaluador Independiente o Centro de Evaluación y preparar su estructura operativa.',
    presetExperience: 'Ya tengo certificados de competencia',
  },
  {
    id: 'centro-acreditado',
    title: 'Centro o evaluador acreditado',
    situation: 'Ya cuenta con acreditación y busca fortalecer su negocio, presencia digital y captación de clientes.',
    orientation:
      'Recibe orientación enfocada en consolidar su identidad comercial, sitio web, estrategia de marketing, proceso de atención comercial y herramientas de seguimiento.',
    presetExperience: 'Ya cuento con acreditación CE/EI',
  },
];

export const CEDUCATY_SOLUTIONS = [
  {
    letter: 'A',
    title: 'Certificaciones de competencia',
    description:
      'Para personas interesadas en desarrollar sus competencias y obtener una certificación conforme al proceso de evaluación aplicable.',
    ctaLabel: 'CONOCE LAS CERTIFICACIONES',
    type: 'external' as const,
    href: 'https://certificadosconocer.com',
    note: 'Sitio informativo de certificaciones',
  },
  {
    letter: 'B',
    title: 'Desarrollo de proyecto EI o CE',
    description:
      'Para personas interesadas en analizar su situación actual y estructurar su propio proyecto empresarial como Evaluador Independiente o Centro de Evaluación.',
    ctaLabel: 'SOLICITAR DIAGNÓSTICO',
    type: 'scroll' as const,
    href: '#diagnostico',
    note: 'Diagnóstico gratuito inicial',
  },
  {
    letter: 'C',
    title: 'Sistema de implementación asistido por IA',
    description:
      'MASTER CONOCER BUSINESS es nuestra metodología digital de implementación empresarial asistida por inteligencia artificial para organizar paso a paso cada fase del proyecto.',
    ctaLabel: 'CONOCE EL PROYECTO',
    type: 'scroll' as const,
    href: '#metodologia',
    note: 'Infraestructura tecnológica en desarrollo por etapas',
  },
  {
    letter: 'D',
    title: 'CEDUCATY CRM',
    description:
      'Solución independiente orientada a quienes ya operan y necesitan administrar la atención de clientes y candidatos después de captarlos.',
    ctaLabel: 'CONOCER CEDUCATY CRM',
    type: 'external' as const,
    href: 'https://ceducaty.com',
    note: 'Atención y seguimiento postcliente',
  },
];

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  'Acreditarme como Evaluador Independiente',
  'Crear un Centro de Evaluación',
  'Conocer ambas opciones',
  'Obtener primero mis certificaciones',
  'Ya cuento con acreditación y quiero desarrollar mi negocio',
];

export const TIMELINE_OPTIONS: DevelopmentTimelineOption[] = [
  'Lo antes posible',
  'Próximos 30 días',
  'Próximos 60 días',
  'Próximos 90 días',
  'Más de 90 días',
  'Solo estoy investigando',
];

export const EXPERIENCE_OPTIONS: ExperienceLevelOption[] = [
  'No tengo certificaciones; comienzo desde cero',
  'Ya tengo certificados de competencia',
  'Tengo experiencia evaluando',
  'Ya cuento con acreditación CE/EI',
];

export const BUDGET_OPTIONS: Exclude<EstimatedBudgetOption, ''>[] = [
  'Aún no tengo presupuesto',
  'Menos de $5,000 MXN',
  'De $5,000 a $10,000 MXN',
  'De $10,000 a $20,000 MXN',
  'Más de $20,000 MXN',
  'Prefiero conversarlo',
];

export const FAQ_ITEMS = [
  {
    question: '1. ¿Necesito tener certificaciones para comenzar?',
    answer:
      'No necesariamente para iniciar el diagnóstico y la planeación de tu proyecto. Sin embargo, dependiendo de la ruta que elijas (Evaluador Independiente o Centro de Evaluación), deberás investigar y acreditar los estándares y requisitos que exija la normativa vigente ante la instancia correspondiente.',
  },
  {
    question: '2. ¿Cuál es la diferencia entre un Evaluador Independiente y un Centro de Evaluación?',
    answer:
      'Un Evaluador Independiente es una persona física acreditada para realizar procesos de evaluación de competencias en estándares específicos bajo los lineamientos de la entidad o organismo correspondiente. Un Centro de Evaluación es una estructura organizacional y operativa con infraestructura, gestión administrativa y capacidad para coordinar evaluadores y atender candidatos.',
  },
  {
    question: '3. ¿EC0076 por sí solo me permite acreditarme como Evaluador Independiente?',
    answer:
      'No. Contar con el certificado del estándar EC0076 por sí solo no convierte automáticamente a una persona en Evaluador Independiente ni le concede facultades para emitir certificados oficiales. La acreditación requiere cumplir íntegramente con los requisitos, lineamientos y procedimientos vigentes ante las instancias competentes.',
  },
  {
    question: '4. ¿Puedo desarrollar el proyecto si comienzo desde cero?',
    answer:
      'Sí. El propósito del diagnóstico y de la metodología es ayudarte a ubicar tu punto de partida real, identificar qué necesitas preparar primero (certificaciones, requisitos, formalización o presencia digital) y trazar un orden de implementación realista sin improvisar.',
  },
  {
    question: '5. ¿Necesito constituir una empresa?',
    answer:
      'Depende de la ruta y del esquema fiscal o jurídico que requiera tu proyecto. Mientras algunas personas inician con su registro fiscal como persona física según la ruta elegida, operar un Centro de Evaluación suele requerir estructura empresarial formal conforme a los lineamientos de la entidad acreditadora.',
  },
  {
    question: '6. ¿Cuánto tiempo puede tomar desarrollar mi proyecto?',
    answer:
      'El tiempo varía según tu punto de partida: si ya cuentas con certificaciones y estructura fiscal, el avance puede concentrarse en planeación, requisitos y presencia digital; si comienzas desde cero, el proceso tomará el tiempo necesario para cubrir primero competencias, documentación y trámites ante terceros.',
  },
  {
    question: '7. ¿La acreditación está garantizada?',
    answer:
      'No. Ninguna metodología ni asesoría puede garantizar acreditaciones, autorizaciones o emisión de certificados. La obtención de cualquier acreditación depende exclusivamente del cumplimiento objetivo de los requisitos aplicables y de las resoluciones de las instancias competentes del Sistema Nacional de Competencias.',
  },
  {
    question: '8. ¿Puedo desarrollar el proyecto con inteligencia artificial?',
    answer:
      'La metodología contempla el uso estructurado de herramientas de inteligencia artificial como asistente de organización, investigación preliminar, redacción de materiales comerciales y seguimiento de avances. La infraestructura tecnológica dedicada de CEDUCATY se desarrollará en una etapa posterior.',
  },
  {
    question: '9. ¿CEDUCATY realiza trámites de acreditación?',
    answer:
      'CEDUCATY ofrece orientación, acompañamiento empresarial y apoyo en procesos de gestoría cuando corresponda, pero no concede acreditaciones ni sustituye en ningún caso las atribuciones, evaluaciones ni decisiones de las instancias competentes.',
  },
  {
    question: '10. ¿Puedo utilizar CEDUCATY CRM para administrar mis clientes?',
    answer:
      'Sí, de manera independiente una vez que operes y necesites gestionar la atención y el seguimiento postcliente de tus candidatos o prospectos. Puedes conocer esa solución en ceducaty.com. Los registros captados en esta landing de diagnóstico se resguardan por separado para fines exclusivos de orientación inicial.',
  },
] as const;
