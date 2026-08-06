'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Download, Calendar, Tag, Quote } from 'lucide-react';
import { PageHero } from '../components/sections/page-hero';
import { CtaSection } from '../components/sections/cta-section';
import { evidences, testimonials } from '../lib/data';

export function EvidenciasClient() {
  const { ref: evRef, inView: evInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: testRef, inView: testInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        image="/assets/activity-1.jpg"
        imageAlt="Evidencias de impacto de FUMABLAC"
        subtitle="Resultados medibles"
        title="Evidencias de Impacto"
        breadcrumb="Evidencias"
      />

      {/* Evidence cards */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Impacto documentado</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Informes y Evaluaciones</h2>
            <p className="text-fumablac-text-muted text-lg">Documentamos nuestro impacto con transparencia y rigor para rendir cuentas a la comunidad.</p>
          </div>

          <div ref={evRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {evidences?.map((ev: any, i: number) => (
              <motion.article
                key={ev?.id}
                initial={{ opacity: 0, y: 25 }}
                animate={evInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-white rounded-2xl p-7 border border-fumablac-border hover:shadow-lg transition-shadow"
              >
                <span className="w-12 h-12 rounded-xl bg-fumablac-gold/15 text-fumablac-gold flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </span>
                <h3 className="font-heading text-xl font-bold text-fumablac-blue mb-2">{ev?.title}</h3>
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="text-xs text-fumablac-text-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev?.date}</span>
                  <span className="text-xs text-fumablac-text-muted flex items-center gap-1"><Tag className="w-3 h-3" /> {ev?.program}</span>
                </div>
                <p className="text-fumablac-text-muted text-sm leading-relaxed mb-4">{ev?.description}</p>
                <button
                  onClick={() => alert('Este es un prototipo. El archivo PDF estará disponible próximamente.')}
                  className="text-fumablac-blue font-semibold text-sm hover:text-fumablac-gold transition inline-flex items-center gap-1"
                >
                  <Download className="w-4 h-4" /> Descargar PDF
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-fumablac-gray py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Voces del impacto</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Testimonios</h2>
          </div>

          <div ref={testRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((t: any, i: number) => (
              <motion.blockquote
                key={t?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={testInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-sm relative"
              >
                <Quote className="w-8 h-8 text-fumablac-gold/30 absolute top-6 right-6" />
                <p className="text-fumablac-text-muted leading-relaxed mb-6 italic">&ldquo;{t?.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fumablac-blue text-white font-heading font-bold flex items-center justify-center text-sm">
                    {t?.name?.charAt?.(0) ?? 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-fumablac-text text-sm">{t?.name}</p>
                    <p className="text-xs text-fumablac-text-muted">{t?.role}</p>
                  </div>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
