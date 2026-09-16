'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import type { Ally } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/layouts/container';
import { resolveIcon } from '@/lib/lucide-icon';

export function AliadosClient({ allies }: { allies: Ally[] }) {
  const tabs = ['Todos', ...Array.from(new Set(allies.map((a) => a.category)))];
  const [filter, setFilter] = useState('Todos');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = filter === 'Todos' ? allies : allies.filter((a) => a.category === filter);

  return (
    <>
      <PageHero
        image="/assets/actividades/actividad-madres-3.jpg"
        imageAlt="Aliados de FUMABLAC"
        subtitle="Juntos somos más"
        title="Nuestros Aliados"
        breadcrumb="Aliados"
      />

      <section className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-[640px] mx-auto mb-8 sm:mb-10">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Alianzas estratégicas</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Quienes Nos Apoyan</h2>
            <p className="text-fumablac-text-muted dark:text-gray-400 text-lg">Empresas, instituciones y organizaciones que hacen posible nuestra misión.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition min-h-[44px] ${
                  filter === tab
                    ? 'bg-fumablac-blue text-white'
                    : 'bg-fumablac-gray dark:bg-gray-800 text-fumablac-text-muted dark:text-gray-400 hover:bg-fumablac-blue/10 dark:hover:bg-fumablac-blue/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((ally, i) => {
                const Icon = resolveIcon(ally.icon);
                return (
                  <motion.div
                    key={ally.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-fumablac-border dark:border-gray-700 hover:shadow-lg hover:border-fumablac-blue/20 transition group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-14 h-14 rounded-xl bg-fumablac-gray dark:bg-gray-900 text-fumablac-text-muted/50 dark:text-gray-500 flex items-center justify-center shrink-0 group-hover:text-fumablac-blue dark:group-hover:text-blue-400 transition overflow-hidden relative">
                        {ally.logo ? (
                          <Image src={ally.logo} alt={ally.name} fill unoptimized={ally.logo.startsWith('/uploads/')} className="object-contain p-1.5" sizes="56px" />
                        ) : (
                          <Icon className="w-7 h-7" />
                        )}
                      </span>
                      <div>
                        <h3 className="font-semibold text-fumablac-text dark:text-gray-100 mb-1">{ally.name}</h3>
                        <span className="text-xs text-fumablac-gold font-medium">{ally.category}</span>
                        {ally.url && (
                          <a
                            href={ally.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-fumablac-blue dark:text-blue-400 text-sm font-medium mt-3 hover:text-fumablac-gold transition w-fit"
                          >
                            Visitar sitio <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
