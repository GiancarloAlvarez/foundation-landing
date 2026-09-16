'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, Download, Calendar, FolderOpen } from 'lucide-react';
import type { TransparencyDocument } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layouts/container';

interface YearGroup {
  year: number;
  documents: TransparencyDocument[];
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('es-DO', { month: 'long', year: 'numeric' });
}

export function TransparenciaClient({ yearGroups }: { yearGroups: YearGroup[] }) {
  const [openYear, setOpenYear] = useState<number | null>(yearGroups[0]?.year ?? null);

  return (
    <>
      <PageHero
        image="/assets/actividades/entrega-envejecientes.jpg"
        imageAlt="Transparencia de FUMABLAC"
        subtitle="Rendición de cuentas"
        title="Transparencia"
        breadcrumb="Transparencia"
      />

      <section className="bg-white dark:bg-gray-900 py-20 lg:py-28">
        <Container size="md">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Documentos institucionales</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Acceso Público</h2>
            <p className="text-fumablac-text-muted dark:text-gray-400 text-lg">
              Ponemos a disposición nuestros documentos financieros, legales e informes anuales como muestra de nuestro compromiso con la transparencia.
            </p>
          </div>

          {yearGroups.length === 0 ? (
            <p className="text-center text-fumablac-text-muted dark:text-gray-400 py-12">Aún no hay documentos publicados.</p>
          ) : (
            <div className="space-y-4">
              {yearGroups.map((yearGroup) => {
                const isOpen = openYear === yearGroup.year;
                return (
                  <div key={yearGroup.year} className="border border-fumablac-border dark:border-gray-700 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenYear(isOpen ? null : yearGroup.year)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 bg-fumablac-gray dark:bg-gray-800 hover:bg-fumablac-gray/80 dark:hover:bg-gray-700 transition min-h-[44px]"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <FolderOpen className="w-5 h-5 text-fumablac-blue dark:text-blue-400" />
                        <span className="font-heading text-lg sm:text-xl font-bold text-fumablac-blue dark:text-blue-400">{yearGroup.year}</span>
                        <span className="text-xs sm:text-sm text-fumablac-text-muted dark:text-gray-400">({yearGroup.documents.length} documentos)</span>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-5 h-5 text-fumablac-text-muted dark:text-gray-400" />
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
                          <div className="p-4 sm:p-6 space-y-4">
                            {yearGroup.documents.map((doc, i) => (
                              <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-fumablac-border dark:border-gray-700 hover:shadow-md transition"
                              >
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                  <span className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-500/[15%] text-red-500 dark:text-red-400 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </span>
                                  <div className="min-w-0">
                                    <p className="font-semibold text-fumablac-text dark:text-gray-100 text-sm">{doc.name}</p>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                      <span className="text-xs text-fumablac-text-muted dark:text-gray-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {formatDate(doc.date)}
                                      </span>
                                      <span className="text-xs text-fumablac-gold font-medium">{doc.category}</span>
                                    </div>
                                  </div>
                                </div>
                                {doc.fileUrl ? (
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-lg bg-fumablac-blue/10 dark:bg-blue-400/[15%] text-fumablac-blue dark:text-blue-400 flex items-center justify-center hover:bg-fumablac-blue hover:text-white dark:hover:bg-blue-500 transition shrink-0"
                                    aria-label="Descargar"
                                  >
                                    <Download className="w-4 h-4" />
                                  </a>
                                ) : (
                                  <span
                                    className="w-11 h-11 rounded-lg bg-fumablac-gray dark:bg-gray-700 text-fumablac-text-muted/40 dark:text-gray-500 flex items-center justify-center cursor-not-allowed shrink-0"
                                    title="Archivo aún no disponible"
                                  >
                                    <Download className="w-4 h-4" />
                                  </span>
                                )}
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
          )}
        </Container>
      </section>
    </>
  );
}
