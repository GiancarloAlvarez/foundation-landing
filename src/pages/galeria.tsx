'use client';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/sections/page-hero';
import { galleryImages } from '../lib/data';

const categories = ['Todas', 'Salud', 'Educación', 'Solidaridad', 'Niñez', 'Voluntariado'];

export function GaleriaClient() {
  const [filter, setFilter] = useState('Todas');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'Todas' ? galleryImages : galleryImages?.filter((img: any) => img?.category === filter) ?? [];

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const currentIndex = filtered?.findIndex((img: any) => img?.id === lightbox) ?? -1;
  const goNext = () => {
    if (currentIndex < (filtered?.length ?? 0) - 1) {
      setLightbox(filtered?.[currentIndex + 1]?.id ?? null);
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) {
      setLightbox(filtered?.[currentIndex - 1]?.id ?? null);
    }
  };

  return (
    <>
      <PageHero
        image="/assets/activity-2.jpg"
        imageAlt="Galería de FUMABLAC"
        subtitle="Nuestras imágenes"
        title="Galería"
        breadcrumb="Galería"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Filters */}
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

          {/* Masonry-like grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered?.map((img: any, i: number) => (
              <motion.div
                key={img?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(img?.id)}
              >
                <div className={`relative overflow-hidden rounded-2xl ${
                  i % 3 === 0 ? 'aspect-[4/3]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'
                }`}>
                  
                  <img
                    src={img?.src ?? ''}
                    alt={img?.alt ?? 'Imagen'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    />
                  <div className="absolute inset-0 bg-fumablac-blue-dark/0 group-hover:bg-fumablac-blue-dark/40 transition-all duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {img?.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
              aria-label="Cerrar"
            >
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

            {currentIndex < (filtered?.length ?? 0) - 1 && (
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
            <img
                src={filtered?.[currentIndex]?.src ?? ''}
                alt={filtered?.[currentIndex]?.alt ?? 'Imagen'}
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
                loading="lazy"
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
