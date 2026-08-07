'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Download, Calendar, FolderOpen } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { transparencyDocs } from '@/lib/data';

export function TransparenciaClient() {
  const [openYear, setOpenYear] = useState<string | null>(transparencyDocs?.[0]?.year ?? null);

  return (
    <>
      <PageHero
        image="/assets/cta-bg.jpg"
        imageAlt="Transparencia de FUMABLAC"
        subtitle="Rendición de cuentas"
        title="Transparencia"
        breadcrumb="Transparencia"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Documentos institucionales</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Acceso Público</h2>
            <p className="text-fumablac-text-muted text-lg">Ponemos a disposición nuestros documentos financieros, legales e informes anuales como muestra de nuestro compromiso con la transparencia.</p>
          </div>

          <div className="space-y-4">
            {transparencyDocs?.map((yearGroup: any) => {
              const isOpen = openYear === yearGroup?.year;
              return (
                <div key={yearGroup?.year} className="border border-fumablac-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenYear(isOpen ? null : yearGroup?.year)}
                    className="w-full flex items-center justify-between p-6 bg-fumablac-gray hover:bg-fumablac-gray/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-fumablac-blue" />
                      <span className="font-heading text-xl font-bold text-fumablac-blue">{yearGroup?.year}</span>
                      <span className="text-sm text-fumablac-text-muted">({yearGroup?.documents?.length ?? 0} documentos)</span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-fumablac-text-muted" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 space-y-4">
                          {yearGroup?.documents?.map((doc: any, i: number) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-center justify-between p-4 bg-white rounded-xl border border-fumablac-border hover:shadow-md transition"
                            >
                              <div className="flex items-center gap-4">
                                <span className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                  <FileText className="w-5 h-5" />
                                </span>
                                <div>
                                  <p className="font-semibold text-fumablac-text text-sm">{doc?.name}</p>
                                  <div className="flex gap-3 mt-1">
                                    <span className="text-xs text-fumablac-text-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> {doc?.date}</span>
                                    <span className="text-xs text-fumablac-gold font-medium">{doc?.category}</span>
                                  </div>
                                </div>
                              </div>
                              <button className="w-9 h-9 rounded-lg bg-fumablac-blue/10 text-fumablac-blue flex items-center justify-center hover:bg-fumablac-blue hover:text-white transition" aria-label="Descargar">
                                <Download className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
