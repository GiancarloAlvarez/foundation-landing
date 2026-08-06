export const stats = [
  { icon: 'Users', value: 5200, prefix: '+', suffix: '', label: 'Personas beneficiadas' },
  { icon: 'ClipboardList', value: 120, prefix: '+', suffix: '', label: 'Actividades realizadas' },
  { icon: 'HeartPulse', value: 48, prefix: '+', suffix: '', label: 'Jornadas de salud' },
  { icon: 'Handshake', value: 30, prefix: '+', suffix: '', label: 'Aliados institucionales' },
];

export const activities = [
  {
    id: 1,
    image: '/assets/activity-1.jpg',
    category: 'Salud',
    categoryColor: 'gold' as const,
    title: 'Jornada médica en Barrio Nuevo',
    date: '18 de julio, 2026',
    description: 'Más de 300 familias recibieron atención médica gratuita, medicamentos y orientación preventiva.',
  },
  {
    id: 2,
    image: '/assets/activity-2.jpg',
    category: 'Educación',
    categoryColor: 'blue' as const,
    title: 'Refuerzo escolar de verano',
    date: '5 de julio, 2026',
    description: 'Niños y niñas fortalecieron sus habilidades de lectura y matemáticas junto a nuestros voluntarios.',
  },
  {
    id: 3,
    image: '/assets/activity-3.jpg',
    category: 'Solidaridad',
    categoryColor: 'gold' as const,
    title: 'Entrega de alimentos solidarios',
    date: '28 de junio, 2026',
    description: 'Distribuimos raciones alimentarias a 450 familias en situación de vulnerabilidad.',
  },
];

export const programs = [
  {
    id: 'salud',
    icon: 'HeartPulse',
    image: '/assets/program-salud.jpg',
    title: 'Salud Comunitaria',
    shortDesc: 'Jornadas médicas, entrega de medicamentos y campañas de prevención para quienes más lo necesitan.',
    fullDesc: 'A través de nuestro programa de Salud Comunitaria, realizamos jornadas médicas en comunidades vulnerables, ofreciendo consultas gratuitas, entrega de medicamentos, exámenes de laboratorio y campañas de prevención de enfermedades. Trabajamos con médicos voluntarios y aliados del sector salud para llevar atención de calidad a quienes más lo necesitan.',
    beneficiaries: '+2,500 personas atendidas',
    category: 'Salud',
  },
  {
    id: 'educacion',
    icon: 'GraduationCap',
    image: '/assets/program-educacion.jpg',
    title: 'Educación y Formación',
    shortDesc: 'Refuerzo escolar, talleres y formación técnica que abren nuevas oportunidades de futuro.',
    fullDesc: 'Nuestro programa educativo ofrece refuerzo escolar, talleres de habilidades blandas y formación técnica para jóvenes y adultos. Creemos que la educación es la herramienta más poderosa para romper el ciclo de la pobreza y abrir nuevas oportunidades de futuro.',
    beneficiaries: '+1,800 estudiantes apoyados',
    category: 'Educación',
  },
  {
    id: 'ninez',
    icon: 'Baby',
    image: '/assets/program-ninez.jpg',
    title: 'Apoyo a la Niñez',
    shortDesc: 'Acompañamiento, nutrición y actividades recreativas que protegen la infancia de nuestras comunidades.',
    fullDesc: 'Protegemos a la niñez más vulnerable mediante programas de nutrición, acompañamiento psicosocial y actividades recreativas. Trabajamos para que cada niño y niña crezca en un entorno seguro, con acceso a alimentación adecuada y oportunidades de desarrollo integral.',
    beneficiaries: '+900 niños y niñas acompañados',
    category: 'Niñez',
  },
];

export const teamMembers = [
  { initials: 'BM', name: 'Blanca Martínez', role: 'Fundadora y Presidenta', color: 'blue' as const },
  { initials: 'JR', name: 'José Ramírez', role: 'Director Ejecutivo', color: 'gold' as const },
  { initials: 'CP', name: 'Carmen Peña', role: 'Coordinadora de Programas', color: 'blue' as const },
  { initials: 'LG', name: 'Luis Guzmán', role: 'Responsable de Voluntariado', color: 'gold' as const },
];

export const allies = [
  { id: 1, name: 'Gobierno Municipal', category: 'Institucionales', icon: 'Building2' },
  { id: 2, name: 'Hospital Regional', category: 'Institucionales', icon: 'Hospital' },
  { id: 3, name: 'ONG Internacional', category: 'Internacionales', icon: 'HeartHandshake' },
  { id: 4, name: 'Empresa Constructora', category: 'Corporativos', icon: 'Building' },
  { id: 5, name: 'Fundación Global', category: 'Internacionales', icon: 'Globe' },
  { id: 6, name: 'Banco Nacional', category: 'Corporativos', icon: 'Landmark' },
  { id: 7, name: 'Ministerio de Salud', category: 'Institucionales', icon: 'ShieldCheck' },
  { id: 8, name: 'Universidad Autónoma', category: 'Institucionales', icon: 'GraduationCap' },
  { id: 9, name: 'Cruz Roja', category: 'Internacionales', icon: 'Cross' },
  { id: 10, name: 'Empresa Alimentaria', category: 'Corporativos', icon: 'Wheat' },
];

export const galleryImages = [
  { id: 1, src: '/assets/activity-1.jpg', alt: 'Jornada de salud comunitaria', category: 'Salud' },
  { id: 2, src: '/assets/activity-2.jpg', alt: 'Taller educativo con niños', category: 'Educación' },
  { id: 3, src: '/assets/activity-3.jpg', alt: 'Entrega de alimentos solidarios', category: 'Solidaridad' },
  { id: 4, src: '/assets/program-salud.jpg', alt: 'Programa de salud comunitaria', category: 'Salud' },
  { id: 5, src: '/assets/program-educacion.jpg', alt: 'Programa educativo', category: 'Educación' },
  { id: 6, src: '/assets/program-ninez.jpg', alt: 'Apoyo a la niñez', category: 'Niñez' },
  { id: 7, src: '/assets/nosotros-hero.jpg', alt: 'Equipo de voluntarios', category: 'Voluntariado' },
  { id: 8, src: '/assets/nosotros-history.jpg', alt: 'Historia de FUMABLAC', category: 'Solidaridad' },
  { id: 9, src: '/assets/cta-bg.jpg', alt: 'Manos unidas en solidaridad', category: 'Voluntariado' },
];

export const evidences = [
  {
    id: 1,
    title: 'Informe de Impacto 2025',
    date: 'Enero 2026',
    program: 'General',
    description: 'Resumen ejecutivo del impacto social logrado por FUMABLAC durante el año 2025, con cifras de beneficiarios y resultados por programa.',
    type: 'report',
  },
  {
    id: 2,
    title: 'Evaluación Programa de Salud',
    date: 'Marzo 2026',
    program: 'Salud',
    description: 'Resultados de la evaluación externa del programa de Salud Comunitaria con indicadores de impacto y recomendaciones.',
    type: 'report',
  },
  {
    id: 3,
    title: 'Estudio de Caso: Barrio Nuevo',
    date: 'Junio 2026',
    program: 'Educación',
    description: 'Documentación del proceso de intervención educativa en la comunidad de Barrio Nuevo y sus resultados medibles.',
    type: 'case-study',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'María del Carmen',
    role: 'Beneficiaria del programa de salud',
    text: 'Gracias a FUMABLAC pude recibir atención médica gratuita cuando más lo necesitaba. Son personas increíbles que de verdad se preocupan por la comunidad.',
  },
  {
    id: 2,
    name: 'Pedro Sánchez',
    role: 'Padre de familia, programa educativo',
    text: 'Mi hijo mejoró muchísimo en la escuela gracias al refuerzo escolar. Los voluntarios son dedicados y pacientes con los niños.',
  },
  {
    id: 3,
    name: 'Ana Lucía Torres',
    role: 'Voluntaria desde 2020',
    text: 'Ser parte de FUMABLAC cambió mi vida. Ver la sonrisa de las familias cuando reciben ayuda no tiene precio.',
  },
];

export const transparencyDocs = [
  {
    year: '2026',
    documents: [
      { name: 'Informe Financiero Q1 2026', category: 'Estados financieros', date: 'Abril 2026' },
      { name: 'Plan Operativo Anual 2026', category: 'Documentos legales', date: 'Enero 2026' },
    ],
  },
  {
    year: '2025',
    documents: [
      { name: 'Informe Anual 2025', category: 'Informes anuales', date: 'Febrero 2026' },
      { name: 'Estados Financieros Auditados 2025', category: 'Estados financieros', date: 'Marzo 2026' },
      { name: 'Memoria de Actividades 2025', category: 'Informes anuales', date: 'Enero 2026' },
      { name: 'Certificación Legal Vigente', category: 'Documentos legales', date: 'Diciembre 2025' },
    ],
  },
  {
    year: '2024',
    documents: [
      { name: 'Informe Anual 2024', category: 'Informes anuales', date: 'Febrero 2025' },
      { name: 'Estados Financieros Auditados 2024', category: 'Estados financieros', date: 'Marzo 2025' },
    ],
  },
];

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/programas', label: 'Programas' },
  { href: '/galeria', label: 'Galería' },
  { href: '/evidencias', label: 'Evidencias' },
  { href: '/transparencia', label: 'Transparencia' },
  { href: '/aliados', label: 'Aliados' },
];

export const contactReasons = [
  'Información general',
  'Quiero ser voluntario',
  'Alianza institucional',
  'Deseo hacer un aporte',
  'Prensa y comunicaciones',
  'Otro',
];
