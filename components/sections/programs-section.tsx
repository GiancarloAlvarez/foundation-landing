'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import type { Program } from '@prisma/client';
import { resolveIcon } from '@/lib/lucide-icon';
import { Container } from '@/components/layouts/container';

export function ProgramsSection({ programs }: { programs: Program[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="text-center max-w-[640px] mx-auto mb-10 sm:mb-14">
          <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Lo que hacemos</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Nuestros Programas</h2>
          <p className="text-fumablac-text-muted dark:text-gray-400 text-base sm:text-lg">Trabajamos en varios frentes para acompañar de forma integral a las comunidades.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => {
            const Icon = resolveIcon(prog.icon);
            return (
              <motion.article
                key={prog.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden h-[340px] sm:h-[400px] lg:h-[440px] shadow-sm hover:shadow-2xl transition-shadow duration-500"
              >
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  unoptimized={prog.image.startsWith('/uploads/')}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fumablac-blue-dark/95 via-fumablac-blue-dark/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <span className="w-12 h-12 rounded-xl bg-white/[15%] backdrop-blur-sm text-fumablac-gold flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">{prog.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-2">{prog.shortDesc}</p>
                  <Link
                    href={`/programas#${prog.slug}`}
                    className="text-fumablac-gold font-semibold hover:text-fumablac-gold-light transition inline-flex items-center gap-1 w-fit"
                  >
                    Conocer más <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
