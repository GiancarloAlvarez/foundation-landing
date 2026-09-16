'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Ally } from '@prisma/client';
import { resolveIcon } from '@/lib/lucide-icon';
import { Container } from '@/components/layouts/container';

export function AlliesSection({ allies }: { allies: Ally[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (allies.length === 0) return null;

  return (
    <section className="bg-fumablac-gray dark:bg-gray-950 py-14 sm:py-16 lg:py-20">
      <Container className="text-center">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-fumablac-blue dark:text-blue-400 mb-3">Nos apoyan</h2>
        <p className="text-fumablac-text-muted dark:text-gray-400 mb-10 sm:mb-12">Instituciones y empresas que hacen posible nuestra labor.</p>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {allies.map((ally, i) => {
            const Icon = resolveIcon(ally.icon);
            return (
              <motion.div
                key={ally.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                title={ally.name}
                className="h-24 rounded-xl border border-fumablac-border dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col items-center justify-center gap-1.5 px-3 text-fumablac-text-muted/50 dark:text-gray-400 hover:text-fumablac-blue dark:hover:text-blue-400 hover:border-fumablac-blue/30 dark:hover:border-blue-400/40 hover:shadow-md transition"
              >
                {ally.logo ? (
                  <div className="relative w-full h-10">
                    <Image src={ally.logo} alt={ally.name} fill unoptimized={ally.logo.startsWith('/uploads/')} className="object-contain" sizes="120px" />
                  </div>
                ) : (
                  <>
                    <Icon className="w-7 h-7" />
                    <span className="text-[11px] font-medium text-center leading-tight line-clamp-2">{ally.name}</span>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
