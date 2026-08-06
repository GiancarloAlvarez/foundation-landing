'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartPulse, GraduationCap, Baby, ArrowRight } from 'lucide-react';
import { programs } from '@/lib/data';

const iconMap: Record<string, any> = {
  HeartPulse,
  GraduationCap,
  Baby,
};

export function ProgramsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Lo que hacemos</p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Nuestros Programas</h2>
          <p className="text-fumablac-text-muted text-lg">Trabajamos en tres frentes para acompañar de forma integral a las comunidades.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs?.map((prog: any, i: number) => {
            const IconComp = iconMap?.[prog?.icon] ?? HeartPulse;
            return (
              <motion.article
                key={prog?.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden border border-fumablac-border hover:border-fumablac-blue/30 hover:shadow-lg transition"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={prog?.image ?? ''}
                    alt={prog?.title ?? 'Programa'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <span className="w-12 h-12 rounded-xl bg-fumablac-blue/10 text-fumablac-blue flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-fumablac-blue mb-2">{prog?.title}</h3>
                  <p className="text-fumablac-text-muted leading-relaxed mb-5">{prog?.shortDesc}</p>
                  <Link
                    href="/programas"
                    className="text-fumablac-gold font-semibold hover:text-fumablac-gold-light transition inline-flex items-center gap-1"
                  >
                    Conocer más <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
