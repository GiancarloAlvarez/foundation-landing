'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import type { Program } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/layouts/container';
import { resolveIcon } from '@/lib/lucide-icon';

export function ProgramasClient({ programs }: { programs: Program[] }) {
  const categories = ['Todos', ...Array.from(new Set(programs.map((p) => p.category)))];
  const [filter, setFilter] = useState('Todos');
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = filter === 'Todos' ? programs : programs.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        image="/assets/actividades/apoyo-emprendedores.jpg"
        imageAlt="Programas de FUMABLAC"
        subtitle="Lo que hacemos"
        title="Nuestros Programas"
        breadcrumb="Programas"
      />

      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition min-h-[44px] ${
                  filter === cat
                    ? 'bg-fumablac-blue text-white'
                    : 'bg-fumablac-gray dark:bg-gray-800 text-fumablac-text-muted dark:text-gray-400 hover:bg-fumablac-blue/10 dark:hover:bg-fumablac-blue/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((prog, i) => {
                const Icon = resolveIcon(prog.icon);
                const isExpanded = expanded === prog.id;
                return (
                  <motion.article
                    key={prog.id}
                    id={prog.slug}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="scroll-mt-32 rounded-2xl overflow-hidden border border-fumablac-border dark:border-gray-700 hover:shadow-xl hover:border-fumablac-blue/20 transition-shadow duration-500"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        unoptimized={prog.image.startsWith('/uploads/')}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-fumablac-blue text-xs font-semibold">
                          {prog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-7">
                      <span className="w-12 h-12 rounded-xl bg-fumablac-blue/10 dark:bg-fumablac-blue/20 text-fumablac-blue dark:text-blue-400 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-fumablac-blue dark:text-blue-400 mb-2 leading-tight">{prog.title}</h3>
                      <p className="text-fumablac-text-muted dark:text-gray-400 leading-relaxed mb-4">{prog.shortDesc}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-fumablac-text-muted dark:text-gray-400 leading-relaxed mb-3">{prog.fullDesc}</p>
                            <div className="flex items-center gap-2 text-fumablac-gold font-semibold text-sm mb-4">
                              <Users className="w-4 h-4" /> {prog.beneficiaries}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => setExpanded(isExpanded ? null : prog.id)}
                        className="text-fumablac-gold font-semibold text-sm hover:text-fumablac-gold-light transition inline-flex items-center gap-1 min-h-[44px]"
                      >
                        {isExpanded ? 'Ver menos' : 'Ver más'}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
