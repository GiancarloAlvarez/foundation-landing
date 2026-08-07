'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Building2, Hospital, HeartHandshake, Building, Globe,
  Landmark, ShieldCheck, GraduationCap, Cross, Wheat, ExternalLink,
} from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { allies } from '@/lib/data';

const iconMap: Record<string, any> = {
  Building2, Hospital, HeartHandshake, Building, Globe,
  Landmark, ShieldCheck, GraduationCap, Cross, Wheat,
};

const tabs = ['Todos', 'Corporativos', 'Institucionales', 'Internacionales'];

export function AliadosClient() {
  const [filter, setFilter] = useState('Todos');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = filter === 'Todos' ? allies : allies?.filter((a: any) => a?.category === filter) ?? [];

  return (
    <>
      <PageHero
        image="/assets/cta-bg.jpg"
        imageAlt="Aliados de FUMABLAC"
        subtitle="Juntos somos más"
        title="Nuestros Aliados"
        breadcrumb="Aliados"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-10">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Alianzas estratégicas</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Quienes Nos Apoyan</h2>
            <p className="text-fumablac-text-muted text-lg">Empresas, instituciones y organizaciones que hacen posible nuestra misión.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {tabs?.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                  filter === tab
                    ? 'bg-fumablac-blue text-white'
                    : 'bg-fumablac-gray text-fumablac-text-muted hover:bg-fumablac-blue/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered?.map((ally: any, i: number) => {
                const IconComp = iconMap?.[ally?.icon] ?? Building2;
                return (
                  <motion.div
                    key={ally?.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="bg-white rounded-2xl p-6 border border-fumablac-border hover:shadow-lg hover:border-fumablac-blue/20 transition group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-14 h-14 rounded-xl bg-fumablac-gray text-fumablac-text-muted/50 flex items-center justify-center shrink-0 group-hover:text-fumablac-blue transition">
                        <IconComp className="w-7 h-7" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-fumablac-text mb-1">{ally?.name}</h3>
                        <span className="text-xs text-fumablac-gold font-medium">{ally?.category}</span>
                        <p className="text-fumablac-text-muted text-sm mt-2">Aliado estratégico que contribuye al fortalecimiento de nuestros programas.</p>
                        <span className="inline-flex items-center gap-1 text-fumablac-blue text-sm font-medium mt-3 hover:text-fumablac-gold transition cursor-pointer">
                          Visitar sitio <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
