'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ArrowUpRight } from 'lucide-react';
import type { Activity } from '@prisma/client';
import { Container } from '@/components/layouts/container';

export function ActivitiesSection({ activities }: { activities: Activity[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="bg-fumablac-gray dark:bg-gray-950 py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-[560px]">
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Nuestro día a día</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 leading-tight text-balance">
              Actividades recientes
            </h2>
          </div>
          <p className="text-fumablac-text-muted dark:text-gray-400 text-base sm:text-lg max-w-[380px]">
            Conoce las acciones que llevamos a las comunidades para generar un impacto real y sostenible.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <motion.article
              key={act.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden h-[320px] sm:h-[380px] lg:h-[420px] shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
              <Image
                src={act.image}
                alt={act.title}
                fill
                unoptimized={act.image.startsWith('/uploads/')}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/[85%] via-black/30 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7">
                <span
                  className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold mb-3 backdrop-blur-sm ${
                    act.categoryColor === 'gold' ? 'bg-fumablac-gold/90 text-white' : 'bg-white/90 text-fumablac-blue'
                  }`}
                >
                  {act.category}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">{act.title}</h3>
                <p className="text-xs text-white/70 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(act.date).toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{act.description}</p>
              </div>
              <ArrowUpRight className="absolute top-5 right-5 w-5 h-5 text-white/0 group-hover:text-white/90 transition-colors duration-300" />
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <Link
            href="/galeria"
            className="inline-block px-8 py-3.5 rounded-full border-2 border-fumablac-blue dark:border-blue-400 text-fumablac-blue dark:text-blue-400 font-semibold hover:bg-fumablac-blue dark:hover:bg-blue-400 hover:text-white dark:hover:text-gray-900 transition"
          >
            Ver todas las actividades
          </Link>
        </div>
      </Container>
    </section>
  );
}
