'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import type { SiteSettings } from '@prisma/client';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection({ settings }: { settings: SiteSettings | null }) {
  const socialLinks = [
    { icon: Facebook, url: settings?.facebookUrl, label: 'Facebook' },
    { icon: Instagram, url: settings?.instagramUrl, label: 'Instagram' },
    { icon: Twitter, url: settings?.twitterUrl, label: 'X' },
    { icon: Youtube, url: settings?.youtubeUrl, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/actividades/actividad-madres-2.jpg"
          alt="Comunidad reunida en una actividad de la Fundación Mamá Blanca"
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        {/* Base gradient plus a dedicated dark vignette centered on the text
            block: a gradient alone leaves its lightest stop exactly where
            the title sits, which is what made it unreadable before. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B33]/80 via-[#001B33]/[55%] to-[#001B33]/[88%]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_48%,rgba(0,14,28,0.72),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,151,61,0.16),transparent_60%)]" />
      </div>

      {socialLinks.length > 0 && (
        <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-fumablac-blue hover:border-white transition"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 lg:px-8 max-w-[900px]"
      >
        <motion.div variants={item} className="mb-7 flex justify-center">
          <Image
            src="/assets/logo-fumablac-white.png"
            alt="Logo Fundación Mamá Blanca"
            width={913}
            height={561}
            className="h-[96px] sm:h-[124px] lg:h-[148px] w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            priority
          />
        </motion.div>

        <motion.p variants={item} className="text-white/75 tracking-[0.35em] text-xs sm:text-sm font-semibold uppercase mb-5">
          Fundación Mamá Blanca
        </motion.p>

        <motion.h1 variants={item} className="font-heading text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-10 lg:mb-12 text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
          Transformando vidas con amor y compromiso
        </motion.h1>

        <motion.p variants={item} className="text-white/90 text-lg lg:text-xl leading-relaxed mb-10 max-w-[620px] mx-auto text-balance [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
          Somos FUMABLAC, una fundación comprometida con el bienestar y desarrollo de familias y comunidades en situación de vulnerabilidad en la República Dominicana.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/programas"
            className="px-9 py-4 rounded-full bg-fumablac-gold text-white font-semibold text-base hover:bg-fumablac-gold-light transition shadow-lg shadow-black/20 hover:-translate-y-0.5"
          >
            Conoce nuestros programas
          </Link>
          <Link
            href="/contacto"
            className="px-9 py-4 rounded-full border-2 border-white/70 text-white font-semibold text-base hover:bg-white hover:text-fumablac-blue hover:border-white transition"
          >
            Contáctanos
          </Link>
        </motion.div>
      </motion.div>

      <a
        href="#impacto"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition animate-bounce-arrow"
        aria-label="Desplázate hacia abajo"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
