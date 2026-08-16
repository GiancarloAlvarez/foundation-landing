'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-home.jpg"
          alt="Voluntarios de FUMABLAC acompañando a una comunidad dominicana"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003D73]/80 via-[#003D73]/60 to-[#003D73]/85" />
      </div>

      {/* Social sidebar - desktop only */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {[
          { icon: Facebook, label: 'Facebook' },
          { icon: Instagram, label: 'Instagram' },
          { icon: Twitter, label: 'X' },
          { icon: Youtube, label: 'YouTube' },
        ]?.map((s: any, i: number) => (
          <a
            key={s?.label}
            href="#"
            aria-label={s?.label}
            className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-fumablac-blue transition"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-8 max-w-[860px]">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 flex justify-center"
        >
          <Image
            src="/assets/logo-fumablac-white.png"
            alt="Logo Fundación Mamá Blanca"
            width={913}
            height={561}
            className="h-[104px] sm:h-[132px] lg:h-[160px] w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
            priority
          />
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white/80 tracking-[0.3em] text-sm font-semibold uppercase mb-4"
        >
          Fundación Mamá Blanca
        </motion.p>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
        >
          Transformando vidas con amor y compromiso
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white text-lg leading-relaxed mb-9 max-w-[640px] mx-auto"
        >
          Somos FUMABLAC, una fundación que trabaja cada día por el bienestar de las comunidades más vulnerables de República Dominicana.
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/programas"
            className="px-8 py-4 rounded-full bg-fumablac-blue text-white font-semibold text-base hover:bg-fumablac-blue-dark transition shadow-lg shadow-fumablac-blue-dark/40"
          >
            Conoce nuestros programas
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-base hover:bg-white hover:text-fumablac-blue transition"
          >
            Contáctanos
          </Link>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <a
        href="#impacto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 animate-bounce-arrow"
        aria-label="Desplázate hacia abajo"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
