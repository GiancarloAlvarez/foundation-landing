'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartPulse, GraduationCap, Baby, Users, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHero } from '../components/sections/page-hero';
import { CtaSection } from '../components/sections/cta-section';
import { programs } from '../lib/data';

const iconMap: Record<string, any> = { HeartPulse, GraduationCap, Baby };
const categories = ['Todos', 'Salud', 'Educación', 'Niñez'];

export function ProgramasClient() {
  const [filter, setFilter] = useState('Todos');
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = filter === 'Todos' ? programs : programs?.filter((p: any) => p?.category === filter) ?? [];

  return (
    <>
      <PageHero
        image="/assets/program-salud.jpg"
        imageAlt="Programas de FUMABLAC"
        subtitle="Lo que hacemos"
        title="Nuestros Programas"
        breadcrumb="Programas"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories?.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  filter === cat
                    ? 'bg-fumablac-blue text-white'
                    : 'bg-fumablac-gray text-fumablac-text-muted hover:bg-fumablac-blue/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filtered?.map((prog: any, i: number) => {
                const IconComp = iconMap?.[prog?.icon] ?? HeartPulse;
                const isExpanded = expanded === prog?.id;
                return (
                  <motion.article
                    key={prog?.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-white rounded-2xl overflow-hidden border border-fumablac-border hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={prog?.image ?? ''}
                        alt={prog?.title ?? 'Programa'}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-fumablac-blue text-xs font-semibold">
                          {prog?.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <span className="w-12 h-12 rounded-xl bg-fumablac-blue/10 text-fumablac-blue flex items-center justify-center mb-4">
                        <IconComp className="w-6 h-6" />
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-fumablac-blue mb-2">{prog?.title}</h3>
                      <p className="text-fumablac-text-muted leading-relaxed mb-4">{prog?.shortDesc}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-fumablac-text-muted leading-relaxed mb-3">{prog?.fullDesc}</p>
                            <div className="flex items-center gap-2 text-fumablac-gold font-semibold text-sm mb-4">
                              <Users className="w-4 h-4" /> {prog?.beneficiaries}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => setExpanded(isExpanded ? null : prog?.id)}
                        className="text-fumablac-gold font-semibold text-sm hover:text-fumablac-gold-light transition inline-flex items-center gap-1"
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
        </div>
      </section>

      <CtaSection />
    </>
  );
}
