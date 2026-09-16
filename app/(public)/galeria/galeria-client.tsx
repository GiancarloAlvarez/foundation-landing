'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layouts/container';

export function GaleriaClient({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(() => ['Todas', ...Array.from(new Set(images.map((img) => img.category)))], [images]);
  const [filter, setFilter] = useState('Todas');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === 'Todas' ? images : images.filter((img) => img.category === filter);

  const openLightbox = (id: string) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const currentIndex = filtered.findIndex((img) => img.id === lightbox);
  const goNext = () => {
    if (currentIndex < filtered.length - 1) {
      setLightbox(filtered[currentIndex + 1]?.id ?? null);
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) {
      setLightbox(filtered[currentIndex - 1]?.id ?? null);
    }
  };

  return (
    <>
      <PageHero
        image="/assets/actividades/actividad-reyes-2.jpg"
        imageAlt="Galería de FUMABLAC"
        subtitle="Nuestras imágenes"
        title="Galería"
        breadcrumb="Galería"
      />

      <section className="bg-white dark:bg-gray-900 py-20 lg:py-28">
        <Container>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition min-h-[44px] ${
                  filter === cat
                    ? 'bg-fumablac-blue text-white'
                    : 'bg-fumablac-gray text-fumablac-text-muted hover:bg-fumablac-blue/10 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-500/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-fumablac-text-muted dark:text-gray-400 py-16">No hay imágenes en esta categoría todavía.</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 8) * 0.08, duration: 0.4 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => openLightbox(img.id)}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-500 ${
                      i % 3 === 0 ? 'aspect-[4/3]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized={img.src.startsWith('/uploads/')}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fumablac-blue-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <span className="text-white font-medium text-sm">{img.alt}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/80 hover:text-white z-10" aria-label="Cerrar">
              <X className="w-8 h-8" />
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 lg:left-8 text-white/80 hover:text-white z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            {currentIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 lg:right-8 text-white/80 hover:text-white z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[900px] max-h-[80vh] w-full aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[currentIndex]?.src ?? ''}
                alt={filtered[currentIndex]?.alt ?? 'Imagen'}
                fill
                unoptimized={!!filtered[currentIndex]?.src.startsWith('/uploads/')}
                className="object-contain rounded-lg"
                sizes="900px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
