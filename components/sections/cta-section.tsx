'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-28 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/assets/actividades/actividad-madres-6.jpg"
          alt="Voluntarios y beneficiarios de FUMABLAC compartiendo en comunidad"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-fumablac-blue-dark/[85%]" />

      <div className="relative z-10 max-w-[760px] mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance"
        >
          Súmate a nuestra labor
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-white/[85%] text-lg leading-relaxed mb-9"
        >
          Tu colaboración nos permite continuar desarrollando iniciativas en beneficio de nuestras comunidades.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full bg-fumablac-gold text-white font-semibold hover:bg-fumablac-gold-light transition shadow-lg"
          >
            Colaborar
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-fumablac-blue transition"
          >
            Donar
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-fumablac-blue transition"
          >
            Ser voluntario
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-fumablac-blue transition"
          >
            Alianza institucional
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
