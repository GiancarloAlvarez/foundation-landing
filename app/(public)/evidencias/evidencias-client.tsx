'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Download, Calendar, Tag, Quote } from 'lucide-react';
import type { Evidence, Program, Testimonial } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { CtaSection } from '@/components/sections/cta-section';
import { Container } from '@/components/layouts/container';

type EvidenceWithProgram = Evidence & { program: Program | null };

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function EvidenciasClient({
  evidences,
  testimonials,
}: {
  evidences: EvidenceWithProgram[];
  testimonials: Testimonial[];
}) {
  const { ref: evRef, inView: evInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: testRef, inView: testInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <PageHero
        image="/assets/actividades/entrega-muletas.jpg"
        imageAlt="Evidencias de impacto de FUMABLAC"
        subtitle="Resultados medibles"
        title="Evidencias de Impacto"
        breadcrumb="Evidencias"
      />

      <section className="bg-white dark:bg-gray-900 py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Impacto documentado</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Informes y Evaluaciones</h2>
            <p className="text-fumablac-text-muted dark:text-gray-400 text-lg">Documentamos nuestro impacto con transparencia y rigor para rendir cuentas a la comunidad.</p>
          </div>

          {evidences.length === 0 ? (
            <p className="text-center text-fumablac-text-muted dark:text-gray-400 py-12">Aún no hay informes publicados.</p>
          ) : (
            <div ref={evRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {evidences.map((ev, i) => (
                <motion.article
                  key={ev.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={evInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-fumablac-border dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <span className="w-12 h-12 rounded-xl bg-fumablac-gold/[15%] dark:bg-fumablac-gold/20 text-fumablac-gold flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-fumablac-blue dark:text-blue-400 mb-2">{ev.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-xs text-fumablac-text-muted dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(ev.date)}
                    </span>
                    <span className="text-xs text-fumablac-text-muted dark:text-gray-400 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {ev.program?.title ?? 'General'}
                    </span>
                  </div>
                  <p className="text-fumablac-text-muted dark:text-gray-400 text-sm leading-relaxed mb-4">{ev.description}</p>
                  {ev.fileUrl ? (
                    <a
                      href={ev.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-fumablac-blue dark:text-blue-400 font-semibold text-sm hover:text-fumablac-gold dark:hover:text-fumablac-gold-light transition inline-flex items-center gap-1 min-h-[44px] py-2 -my-2"
                    >
                      <Download className="w-4 h-4" /> Descargar PDF
                    </a>
                  ) : (
                    <span
                      className="text-fumablac-text-muted/50 dark:text-gray-500 font-semibold text-sm inline-flex items-center gap-1 cursor-not-allowed min-h-[44px] py-2 -my-2"
                      title="Archivo aún no disponible"
                    >
                      <Download className="w-4 h-4" /> Próximamente
                    </span>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-fumablac-gray dark:bg-gray-950 py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Voces del impacto</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Testimonios</h2>
          </div>

          {testimonials.length === 0 ? (
            <p className="text-center text-fumablac-text-muted dark:text-gray-400 py-12">Aún no hay testimonios publicados.</p>
          ) : (
            <div ref={testRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={testInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm relative"
                >
                  <Quote className="w-8 h-8 text-fumablac-gold/30 absolute top-6 right-6" />
                  <p className="text-fumablac-text-muted dark:text-gray-400 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-fumablac-blue text-white font-heading font-bold flex items-center justify-center text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-fumablac-text dark:text-gray-100 text-sm">{t.name}</p>
                      <p className="text-xs text-fumablac-text-muted dark:text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </motion.blockquote>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
