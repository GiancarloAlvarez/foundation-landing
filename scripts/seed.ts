import bcrypt from 'bcryptjs';
import { prisma } from '../lib/db';

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD no están configurados en .env');
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: 'Administrador FUMABLAC' },
  });
}

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      address: 'Av. Independencia #245, Santo Domingo, República Dominicana',
      phone: '+1 (849) 750-4155',
      whatsappNumber: '18497504155',
      email: 'fundacionmamablanca@hotmail.com',
      hoursWeekdays: 'Lunes a viernes, 8:00 a.m. – 5:00 p.m.',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      youtubeUrl: '',
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      historyParagraph1:
        'La Fundación Mamá Blanca nació en 2015 del sueño de Doña Blanca, una mujer que dedicó su vida a cuidar de los más necesitados de su barrio en Santo Domingo.',
      historyParagraph2:
        'Lo que comenzó como pequeñas jornadas de ayuda hoy es una organización que impacta a miles de familias cada año a través de programas de salud, educación y apoyo a la niñez en todo el país.',
      heroImage: '/assets/actividades/actividad-madres-2.jpg',
      historyImage: '/assets/actividades/entrega-envejecientes.jpg',
    },
  });
}

async function seedStats() {
  const stats = [
    { id: 'stat-1', icon: 'Users', value: 5200, prefix: '+', suffix: '', label: 'Personas beneficiadas', order: 0 },
    { id: 'stat-2', icon: 'ClipboardList', value: 120, prefix: '+', suffix: '', label: 'Actividades realizadas', order: 1 },
    { id: 'stat-3', icon: 'HeartPulse', value: 48, prefix: '+', suffix: '', label: 'Jornadas de salud', order: 2 },
    { id: 'stat-4', icon: 'Handshake', value: 30, prefix: '+', suffix: '', label: 'Aliados institucionales', order: 3 },
  ];
  for (const s of stats) {
    await prisma.stat.upsert({ where: { id: s.id }, update: s, create: s });
  }
}

async function seedActivities() {
  const activities = [
    {
      id: 'activity-1',
      image: '/assets/actividades/actividad-madres-1.jpg',
      category: 'Mujer',
      categoryColor: 'gold',
      title: 'Celebración Día de las Madres',
      date: new Date('2026-05-10'),
      description: 'Cientos de madres de nuestras comunidades disfrutaron de una jornada de reconocimiento, regalos y amor.',
      order: 0,
    },
    {
      id: 'activity-2',
      image: '/assets/actividades/actividad-reyes-1.jpg',
      category: 'Niñez',
      categoryColor: 'blue',
      title: 'Día de Reyes con Mamá Blanca',
      date: new Date('2026-01-06'),
      description: 'Niños y niñas recibieron regalos, bicicletas y una tarde llena de alegría junto a Mickey y Minnie.',
      order: 1,
    },
    {
      id: 'activity-3',
      image: '/assets/actividades/entrega-canastilla.jpg',
      category: 'Solidaridad',
      categoryColor: 'gold',
      title: 'Entrega de canastillas a familias',
      date: new Date('2026-06-28'),
      description: 'Entregamos canastillas con artículos esenciales a familias en situación de vulnerabilidad.',
      order: 2,
    },
  ];
  for (const a of activities) {
    await prisma.activity.upsert({ where: { id: a.id }, update: a, create: a });
  }
}

async function seedPrograms() {
  const programs = [
    {
      slug: 'salud',
      icon: 'HeartPulse',
      image: '/assets/actividades/entrega-muletas.jpg',
      title: 'Salud Comunitaria',
      shortDesc: 'Jornadas médicas, entrega de medicamentos y campañas de prevención para quienes más lo necesitan.',
      fullDesc:
        'A través de nuestro programa de Salud Comunitaria, realizamos jornadas médicas en comunidades vulnerables, ofreciendo consultas gratuitas, entrega de medicamentos, exámenes de laboratorio y campañas de prevención de enfermedades. Trabajamos con médicos voluntarios y aliados del sector salud para llevar atención de calidad a quienes más lo necesitan.',
      beneficiaries: '+2,500 personas atendidas',
      category: 'Salud',
      order: 0,
    },
    {
      slug: 'educacion',
      icon: 'GraduationCap',
      image: '/assets/actividades/apoyo-emprendedores.jpg',
      title: 'Educación y Formación',
      shortDesc: 'Refuerzo escolar, talleres y formación técnica que abren nuevas oportunidades de futuro.',
      fullDesc:
        'Nuestro programa educativo ofrece refuerzo escolar, talleres de habilidades blandas y formación técnica para jóvenes y adultos. Creemos que la educación es la herramienta más poderosa para romper el ciclo de la pobreza y abrir nuevas oportunidades de futuro.',
      beneficiaries: '+1,800 estudiantes apoyados',
      category: 'Educación',
      order: 1,
    },
    {
      slug: 'ninez',
      icon: 'Baby',
      image: '/assets/actividades/actividad-reyes-3.jpg',
      title: 'Apoyo a la Niñez',
      shortDesc: 'Acompañamiento, nutrición y actividades recreativas que protegen la infancia de nuestras comunidades.',
      fullDesc:
        'Protegemos a la niñez más vulnerable mediante programas de nutrición, acompañamiento psicosocial y actividades recreativas. Trabajamos para que cada niño y niña crezca en un entorno seguro, con acceso a alimentación adecuada y oportunidades de desarrollo integral.',
      beneficiaries: '+900 niños y niñas acompañados',
      category: 'Niñez',
      order: 2,
    },
  ];
  for (const p of programs) {
    await prisma.program.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
}

async function seedTeamMembers() {
  const team = [
    { id: 'team-1', initials: 'BM', name: 'Blanca Martínez', role: 'Fundadora y Presidenta', color: 'blue', order: 0 },
    { id: 'team-2', initials: 'JR', name: 'José Ramírez', role: 'Director Ejecutivo', color: 'gold', order: 1 },
    { id: 'team-3', initials: 'CP', name: 'Carmen Peña', role: 'Coordinadora de Programas', color: 'blue', order: 2 },
    { id: 'team-4', initials: 'LG', name: 'Luis Guzmán', role: 'Responsable de Voluntariado', color: 'gold', order: 3 },
  ];
  for (const t of team) {
    await prisma.teamMember.upsert({ where: { id: t.id }, update: t, create: t });
  }
}

async function seedAllies() {
  // No placeholder allies — real ones are added from the admin panel
  // (Aliados) with their actual logo, so this list starts empty.
}

async function seedGallery() {
  // Existing gallery-1..9 ids are reused (upsert-updated in place) so this
  // never needs a delete of the old AI-generated rows; gallery-10..15 are
  // simply new additions to round out the curated real-photo set.
  const images = [
    { id: 'gallery-1', src: '/assets/actividades/actividad-madres-1.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 0 },
    { id: 'gallery-2', src: '/assets/actividades/actividad-madres-2.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 1 },
    { id: 'gallery-3', src: '/assets/actividades/actividad-madres-3.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 2 },
    { id: 'gallery-4', src: '/assets/actividades/actividad-reyes-1.jpg', alt: 'Actividad de Reyes', category: 'Niñez', order: 3 },
    { id: 'gallery-5', src: '/assets/actividades/actividad-reyes-2.jpg', alt: 'Actividad de Reyes', category: 'Niñez', order: 4 },
    { id: 'gallery-6', src: '/assets/actividades/actividad-reyes-3.jpg', alt: 'Actividad de Reyes', category: 'Niñez', order: 5 },
    { id: 'gallery-7', src: '/assets/actividades/entrega-envejecientes.jpg', alt: 'Entrega de insumos a envejecientes', category: 'Adulto Mayor', order: 6 },
    { id: 'gallery-8', src: '/assets/actividades/entrega-muletas.jpg', alt: 'Entrega de muletas', category: 'Salud', order: 7 },
    { id: 'gallery-9', src: '/assets/actividades/apoyo-emprendedores.jpg', alt: 'Apoyando a los emprendedores', category: 'Educación', order: 8 },
    { id: 'gallery-10', src: '/assets/actividades/entrega-canastilla.jpg', alt: 'Entrega de canastilla', category: 'Solidaridad', order: 9 },
    { id: 'gallery-11', src: '/assets/actividades/actividad-madres-4.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 10 },
    { id: 'gallery-12', src: '/assets/actividades/actividad-madres-5.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 11 },
    { id: 'gallery-13', src: '/assets/actividades/actividad-madres-6.jpg', alt: 'Actividad de madres', category: 'Mujer', order: 12 },
    { id: 'gallery-14', src: '/assets/actividades/actividad-reyes-4.jpg', alt: 'Actividad de Reyes', category: 'Niñez', order: 13 },
    { id: 'gallery-15', src: '/assets/actividades/actividad-reyes-5.jpg', alt: 'Actividad de Reyes', category: 'Niñez', order: 14 },
  ];
  for (const g of images) {
    await prisma.galleryImage.upsert({ where: { id: g.id }, update: g, create: g });
  }
}

async function seedEvidences() {
  const salud = await prisma.program.findUnique({ where: { slug: 'salud' } });
  const educacion = await prisma.program.findUnique({ where: { slug: 'educacion' } });

  const evidences = [
    {
      id: 'evidence-1',
      title: 'Informe de Impacto 2025',
      date: new Date('2026-01-01'),
      programId: null as string | null,
      description:
        'Resumen ejecutivo del impacto social logrado por FUMABLAC durante el año 2025, con cifras de beneficiarios y resultados por programa.',
      type: 'report',
      order: 0,
    },
    {
      id: 'evidence-2',
      title: 'Evaluación Programa de Salud',
      date: new Date('2026-03-01'),
      programId: salud?.id ?? null,
      description: 'Resultados de la evaluación externa del programa de Salud Comunitaria con indicadores de impacto y recomendaciones.',
      type: 'report',
      order: 1,
    },
    {
      id: 'evidence-3',
      title: 'Estudio de Caso: Barrio Nuevo',
      date: new Date('2026-06-01'),
      programId: educacion?.id ?? null,
      description: 'Documentación del proceso de intervención educativa en la comunidad de Barrio Nuevo y sus resultados medibles.',
      type: 'case-study',
      order: 2,
    },
  ];
  for (const e of evidences) {
    await prisma.evidence.upsert({ where: { id: e.id }, update: e, create: e });
  }
}

async function seedTestimonials() {
  const testimonials = [
    {
      id: 'testimonial-1',
      name: 'María del Carmen',
      role: 'Beneficiaria del programa de salud',
      text: 'Gracias a FUMABLAC pude recibir atención médica gratuita cuando más lo necesitaba. Son personas increíbles que de verdad se preocupan por la comunidad.',
      order: 0,
    },
    {
      id: 'testimonial-2',
      name: 'Pedro Sánchez',
      role: 'Padre de familia, programa educativo',
      text: 'Mi hijo mejoró muchísimo en la escuela gracias al refuerzo escolar. Los voluntarios son dedicados y pacientes con los niños.',
      order: 1,
    },
    {
      id: 'testimonial-3',
      name: 'Ana Lucía Torres',
      role: 'Voluntaria desde 2020',
      text: 'Ser parte de FUMABLAC cambió mi vida. Ver la sonrisa de las familias cuando reciben ayuda no tiene precio.',
      order: 2,
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.id }, update: t, create: t });
  }
}

async function seedTransparencyDocuments() {
  const docs = [
    { id: 'transparency-1', name: 'Informe Financiero Q1 2026', category: 'Estados financieros', date: new Date('2026-04-01'), year: 2026, order: 0 },
    { id: 'transparency-2', name: 'Plan Operativo Anual 2026', category: 'Documentos legales', date: new Date('2026-01-01'), year: 2026, order: 1 },
    { id: 'transparency-3', name: 'Informe Anual 2025', category: 'Informes anuales', date: new Date('2026-02-01'), year: 2025, order: 2 },
    { id: 'transparency-4', name: 'Estados Financieros Auditados 2025', category: 'Estados financieros', date: new Date('2026-03-01'), year: 2025, order: 3 },
    { id: 'transparency-5', name: 'Memoria de Actividades 2025', category: 'Informes anuales', date: new Date('2026-01-01'), year: 2025, order: 4 },
    { id: 'transparency-6', name: 'Certificación Legal Vigente', category: 'Documentos legales', date: new Date('2025-12-01'), year: 2025, order: 5 },
    { id: 'transparency-7', name: 'Informe Anual 2024', category: 'Informes anuales', date: new Date('2025-02-01'), year: 2024, order: 6 },
    { id: 'transparency-8', name: 'Estados Financieros Auditados 2024', category: 'Estados financieros', date: new Date('2025-03-01'), year: 2024, order: 7 },
  ];
  for (const d of docs) {
    await prisma.transparencyDocument.upsert({ where: { id: d.id }, update: d, create: d });
  }
}

async function seedMissionValues() {
  const values = [
    {
      id: 'mission-1',
      icon: 'Target',
      title: 'Misión',
      text: 'Mejorar la calidad de vida de las comunidades vulnerables de República Dominicana mediante programas de salud, educación y protección a la niñez.',
      order: 0,
    },
    {
      id: 'mission-2',
      icon: 'Eye',
      title: 'Visión',
      text: 'Ser la fundación de referencia en el país por su impacto social, transparencia y capacidad de transformar realidades con amor y compromiso.',
      order: 1,
    },
    {
      id: 'mission-3',
      icon: 'HeartHandshake',
      title: 'Valores',
      text: 'Solidaridad, transparencia, respeto por la dignidad humana, compromiso comunitario y trabajo en equipo guían cada una de nuestras acciones.',
      order: 2,
    },
  ];
  for (const v of values) {
    await prisma.missionValue.upsert({ where: { id: v.id }, update: v, create: v });
  }
}

async function seedHistoryStats() {
  const stats = [
    { id: 'history-1', value: '2015', label: 'Año de fundación', order: 0 },
    { id: 'history-2', value: '+11', label: 'Años de servicio', order: 1 },
    { id: 'history-3', value: '+150', label: 'Voluntarios activos', order: 2 },
  ];
  for (const s of stats) {
    await prisma.historyStat.upsert({ where: { id: s.id }, update: s, create: s });
  }
}

async function main() {
  await seedAdmin();
  await seedSettings();
  await seedStats();
  await seedActivities();
  await seedPrograms();
  await seedTeamMembers();
  await seedAllies();
  await seedGallery();
  await seedEvidences();
  await seedTestimonials();
  await seedTransparencyDocuments();
  await seedMissionValues();
  await seedHistoryStats();
  console.log('✅ Seed completado');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
