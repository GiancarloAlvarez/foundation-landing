'use client';


import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, HeartHandshake } from 'lucide-react';
import { PageHero } from '../components/sections/page-hero';
import { CtaSection } from '../components/sections/cta-section';
import { teamMembers } from '../lib/data';

export function NosotrosClient() {
  const { ref: histRef, inView: histInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: mvvRef, inView: mvvInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <PageHero
        image="/assets/nosotros-hero.jpg"
        imageAlt="Equipo de voluntarios de FUMABLAC"
        subtitle="Conócenos"
        title="Quiénes Somos"
        breadcrumb="Nosotros"
      />

      {/* Historia */}
      <section className="bg-white py-20 lg:py-24">
        <div ref={histRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={histInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-[320px] lg:h-[420px]">
             <img
                src="/assets/nosotros-history.jpg"
                alt="Los inicios de la Fundación Mamá Blanca"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={histInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestra historia</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-6 leading-tight">
              Un legado de amor que sigue creciendo
            </h2>
            <p className="text-fumablac-text-muted text-lg leading-relaxed mb-4">
              La Fundación Mamá Blanca nació en 2015 del sueño de Doña Blanca, una mujer que dedicó su vida a cuidar de los más necesitados de su barrio en Santo Domingo.
            </p>
            <p className="text-fumablac-text-muted text-lg leading-relaxed mb-6">
              Lo que comenzó como pequeñas jornadas de ayuda hoy es una organización que impacta a miles de familias cada año a través de programas de salud, educación y apoyo a la niñez en todo el país.
            </p>
            <div className="flex gap-10">
              {[
                { val: '2015', label: 'Año de fundación' },
                { val: '+11', label: 'Años de servicio' },
                { val: '+150', label: 'Voluntarios activos' },
              ]?.map((s: any) => (
                <div key={s?.label}>
                  <div className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue">{s?.val}</div>
                  <p className="text-fumablac-text-muted text-sm mt-1">{s?.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="bg-fumablac-gray py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestra esencia</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue">Misión, Visión y Valores</h2>
          </div>
          <div ref={mvvRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Misión',
                text: 'Mejorar la calidad de vida de las comunidades vulnerables de República Dominicana mediante programas de salud, educación y protección a la niñez.',
                borderColor: 'border-fumablac-blue',
                iconBg: 'bg-fumablac-blue/10 text-fumablac-blue',
              },
              {
                icon: Eye,
                title: 'Visión',
                text: 'Ser la fundación de referencia en el país por su impacto social, transparencia y capacidad de transformar realidades con amor y compromiso.',
                borderColor: 'border-fumablac-gold',
                iconBg: 'bg-fumablac-gold/15 text-fumablac-gold',
              },
              {
                icon: HeartHandshake,
                title: 'Valores',
                text: 'Solidaridad, transparencia, respeto por la dignidad humana, compromiso comunitario y trabajo en equipo guían cada una de nuestras acciones.',
                borderColor: 'border-fumablac-blue',
                iconBg: 'bg-fumablac-blue/10 text-fumablac-blue',
              },
            ]?.map((card: any, i: number) => (
              <motion.article
                key={card?.title}
                initial={{ opacity: 0, y: 25 }}
                animate={mvvInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`bg-white rounded-2xl p-8 shadow-sm border-t-4 ${card?.borderColor}`}
              >
                <span className={`w-14 h-14 rounded-xl ${card?.iconBg} flex items-center justify-center text-2xl mb-5`}>
                  <card.icon className="w-7 h-7" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-fumablac-blue mb-3">{card?.title}</h3>
                <p className="text-fumablac-text-muted leading-relaxed">{card?.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestro equipo</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Equipo Directivo</h2>
            <p className="text-fumablac-text-muted text-lg">Personas comprometidas que lideran la misión de FUMABLAC.</p>
          </div>
          <div ref={teamRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers?.map((member: any, i: number) => (
              <motion.article
                key={member?.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className={`w-28 h-28 lg:w-32 lg:h-32 mx-auto rounded-full flex items-center justify-center text-white font-heading text-3xl font-bold mb-4 ${
                    member?.color === 'gold' ? 'bg-fumablac-gold' : 'bg-fumablac-blue'
                  }`}
                >
                  {member?.initials}
                </div>
                <h3 className="font-semibold text-lg text-fumablac-text">{member?.name}</h3>
                <p className="text-fumablac-gold text-sm font-medium">{member?.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
