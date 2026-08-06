'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, ClipboardList, HeartPulse, Handshake } from 'lucide-react';
import { stats } from '@/lib/data';

const iconMap: Record<string, any> = {
  Users,
  ClipboardList,
  HeartPulse,
  Handshake,
};

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="impacto" className="bg-white py-20 lg:py-24">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat: any, i: number) => {
            const IconComp = iconMap?.[stat?.icon] ?? HeartPulse;
            return (
              <motion.div
                key={stat?.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <IconComp className="w-10 h-10 text-fumablac-gold mx-auto mb-4" />
                <div className="font-heading text-4xl lg:text-5xl font-bold text-fumablac-blue">
                  {inView ? (
                    <>
                      {stat?.prefix}
                      <CountUp end={stat?.value ?? 0} duration={2.5} separator="," />
                      {stat?.suffix}
                    </>
                  ) : (
                    `${stat?.prefix ?? ''}0${stat?.suffix ?? ''}`
                  )}
                </div>
                <p className="text-fumablac-text-muted mt-2 text-base">{stat?.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
