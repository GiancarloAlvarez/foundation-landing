'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import type { Stat } from '@prisma/client';
import { resolveIcon } from '@/lib/lucide-icon';
import { Container } from '@/components/layouts/container';

export function StatsSection({ stats }: { stats: Stat[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="impacto" className="bg-white dark:bg-gray-900 py-16 sm:py-20 lg:py-28">
      <Container>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-4">
          {stats.map((stat, i) => {
            const Icon = resolveIcon(stat.icon);
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="text-center lg:border-l lg:first:border-l-0 lg:border-fumablac-border dark:lg:border-gray-700 lg:px-4"
              >
                <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-fumablac-gold mx-auto mb-3 sm:mb-4" strokeWidth={1.75} />
                <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 tracking-tight">
                  {inView ? (
                    <>
                      {stat.prefix}
                      <CountUp end={stat.value} duration={2.5} separator="," />
                      {stat.suffix}
                    </>
                  ) : (
                    `${stat.prefix ?? ''}0${stat.suffix ?? ''}`
                  )}
                </div>
                <p className="text-fumablac-text-muted dark:text-gray-400 mt-2 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
