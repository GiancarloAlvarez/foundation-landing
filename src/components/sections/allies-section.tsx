'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Hospital, HeartHandshake, Building, Globe } from 'lucide-react';

const allyIcons = [Building2, Hospital, HeartHandshake, Building, Globe];

export function AlliesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-fumablac-gray py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl font-bold text-fumablac-blue mb-3">Nos apoyan</h2>
        <p className="text-fumablac-text-muted mb-12">Instituciones y empresas que hacen posible nuestra labor.</p>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {allyIcons?.map((IconComp: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="h-20 rounded-xl border border-fumablac-border bg-white flex items-center justify-center text-fumablac-text-muted/40 hover:text-fumablac-blue hover:border-fumablac-blue/30 transition"
            >
              <IconComp className="w-8 h-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
