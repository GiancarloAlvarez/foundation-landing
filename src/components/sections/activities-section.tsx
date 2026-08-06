'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ArrowRight } from 'lucide-react';
import { activities } from '@/lib/data';

export function ActivitiesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-fumablac-gray py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestro día a día</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Actividades Recientes</h2>
          <p className="text-fumablac-text-muted text-lg">Conoce las acciones que llevamos a las comunidades para generar un impacto real y sostenible.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((act: any, i: number) => (
            <motion.article
              key={act?.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={act?.image ?? ''}
                  alt={act?.title ?? 'Actividad'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    act?.categoryColor === 'gold'
                      ? 'bg-fumablac-gold/15 text-fumablac-gold'
                      : 'bg-fumablac-blue/10 text-fumablac-blue'
                  }`}
                >
                  {act?.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-fumablac-blue mb-2">{act?.title}</h3>
                <p className="text-sm text-fumablac-text-muted/60 mb-3 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {act?.date}
                </p>
                <p className="text-fumablac-text-muted text-sm leading-relaxed mb-4">{act?.description}</p>
                <span className="text-fumablac-blue font-semibold text-sm hover:text-fumablac-gold transition inline-flex items-center gap-1 cursor-pointer">
                  Leer más <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/galeria"
            className="inline-block px-8 py-3.5 rounded-full border-2 border-fumablac-blue text-fumablac-blue font-semibold hover:bg-fumablac-blue hover:text-white transition"
          >
            Ver todas las actividades
          </Link>
        </div>
      </div>
    </section>
  );
}
