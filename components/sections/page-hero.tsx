'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PageHeroProps {
  image: string;
  imageAlt: string;
  subtitle: string;
  title: string;
  breadcrumb: string;
}

export function PageHero({ image, imageAlt, subtitle, title, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative h-[320px] lg:h-[360px] flex items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-fumablac-blue-dark/75" />
      <div className="relative z-10 text-center px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/75 tracking-[0.3em] text-sm font-semibold uppercase mb-3"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-heading text-white text-4xl lg:text-5xl font-bold"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/70 text-sm mt-4"
        >
          <Link href="/" className="hover:text-white transition">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-fumablac-gold">{breadcrumb}</span>
        </motion.p>
      </div>
    </section>
  );
}
