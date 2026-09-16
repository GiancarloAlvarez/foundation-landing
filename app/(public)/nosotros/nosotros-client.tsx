'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { AboutContent, MissionValue, HistoryStat, TeamMember } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/layouts/container';
import { resolveIcon } from '@/lib/lucide-icon';

const cardStyles = [
  { borderColor: 'border-fumablac-blue', iconBg: 'bg-fumablac-blue/10 text-fumablac-blue dark:bg-fumablac-blue/20 dark:text-blue-400' },
  { borderColor: 'border-fumablac-gold', iconBg: 'bg-fumablac-gold/[15%] text-fumablac-gold dark:bg-fumablac-gold/20 dark:text-fumablac-gold-light' },
  { borderColor: 'border-fumablac-blue', iconBg: 'bg-fumablac-blue/10 text-fumablac-blue dark:bg-fumablac-blue/20 dark:text-blue-400' },
];

interface NosotrosClientProps {
  about: AboutContent;
  missionValues: MissionValue[];
  historyStats: HistoryStat[];
  teamMembers: TeamMember[];
}

export function NosotrosClient({ about, missionValues, historyStats, teamMembers }: NosotrosClientProps) {
  const { ref: histRef, inView: histInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: mvvRef, inView: mvvInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <PageHero
        image={about.heroImage || '/assets/actividades/actividad-madres-2.jpg'}
        imageAlt="Equipo de voluntarios de FUMABLAC"
        subtitle="Conócenos"
        title="Quiénes Somos"
        breadcrumb="Nosotros"
      />

      {/* Historia */}
      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
        <Container>
          <div ref={histRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={histInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">
                <Image
                  src={about.historyImage || '/assets/actividades/entrega-envejecientes.jpg'}
                  alt="Los inicios de la Fundación Mamá Blanca"
                  fill
                  unoptimized={!!about.historyImage?.startsWith('/uploads/')}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={histInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestra historia</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-6 leading-tight text-balance">
                Un legado de amor que sigue creciendo
              </h2>
              {about.historyParagraph1 && (
                <p className="text-fumablac-text-muted dark:text-gray-400 text-lg leading-relaxed mb-4">{about.historyParagraph1}</p>
              )}
              {about.historyParagraph2 && (
                <p className="text-fumablac-text-muted dark:text-gray-400 text-lg leading-relaxed mb-6">{about.historyParagraph2}</p>
              )}
              {historyStats.length > 0 && (
                <div className="flex flex-wrap gap-6 sm:gap-10">
                  {historyStats.map((stat) => (
                    <div key={stat.id}>
                      <div className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue dark:text-blue-400">{stat.value}</div>
                      <p className="text-fumablac-text-muted dark:text-gray-400 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="bg-fumablac-gray dark:bg-gray-950 py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-[640px] mx-auto mb-10 sm:mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestra esencia</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 text-balance">Misión, Visión y Valores</h2>
          </div>
          <div ref={mvvRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {missionValues.map((card, i) => {
              const Icon = resolveIcon(card.icon);
              const style = cardStyles[i % cardStyles.length];
              return (
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={mvvInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 ${style.borderColor}`}
                >
                  <span className={`w-16 h-16 rounded-xl ${style.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className="w-8 h-8" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-fumablac-blue dark:text-blue-400 mb-3">{card.title}</h3>
                  <p className="text-fumablac-text-muted dark:text-gray-400 leading-relaxed">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Equipo */}
      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-[640px] mx-auto mb-10 sm:mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestro equipo</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Equipo Directivo</h2>
            <p className="text-fumablac-text-muted dark:text-gray-400 text-lg">Personas comprometidas que lideran la misión de FUMABLAC.</p>
          </div>
          <div ref={teamRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, i) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                {member.photo ? (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                    <Image src={member.photo} alt={member.name} fill unoptimized={member.photo.startsWith('/uploads/')} className="object-cover" sizes="128px" />
                  </div>
                ) : (
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-full flex items-center justify-center text-white font-heading text-2xl sm:text-3xl font-bold mb-4 ${
                      member.color === 'gold' ? 'bg-fumablac-gold' : 'bg-fumablac-blue'
                    }`}
                  >
                    {member.initials}
                  </div>
                )}
                <h3 className="font-semibold text-base sm:text-lg text-fumablac-text dark:text-gray-100">{member.name}</h3>
                <p className="text-fumablac-gold text-sm font-medium">{member.role}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
