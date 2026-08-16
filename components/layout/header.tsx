'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white shadow-[0_2px_12px_rgba(16,35,63,0.08)]'
            : 'bg-gradient-to-b from-[#003D73]/75 via-[#003D73]/35 to-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-[88px] sm:h-[104px] lg:h-[128px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={solid ? '/assets/logo-fumablac-trim.png' : '/assets/logo-fumablac-white.png'}
              alt="Logo Fundación Mamá Blanca"
              width={913}
              height={561}
              className={`h-[60px] sm:h-[76px] lg:h-[100px] w-auto object-contain transition-all duration-300 ${
                solid ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
            {navLinks?.map((link: any) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={link?.href}
                  href={link?.href ?? '/'}
                  className={`relative py-1 transition ${
                    isActive
                      ? scrolled || !isHome
                        ? 'text-fumablac-blue font-semibold'
                        : 'text-white font-semibold'
                      : scrolled || !isHome
                      ? 'text-fumablac-text-muted hover:text-fumablac-blue'
                      : 'text-white hover:text-white'
                  }`}
                >
                  {link?.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-fumablac-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contacto"
              className="ml-2 px-5 py-2.5 rounded-full bg-fumablac-gold text-white font-semibold hover:bg-fumablac-gold-light transition"
            >
              Contáctanos
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition ${
              scrolled || !isHome ? 'text-fumablac-blue' : 'text-white'
            }`}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-[88px] sm:pt-[104px]"
          >
            <nav className="flex flex-col items-center gap-6 py-12 text-lg font-medium">
              {navLinks?.map((link: any) => (
                <Link
                  key={link?.href}
                  href={link?.href ?? '/'}
                  className={`transition ${
                    pathname === link?.href
                      ? 'text-fumablac-blue font-semibold'
                      : 'text-fumablac-text-muted hover:text-fumablac-blue'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link?.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                className="px-8 py-3 rounded-full bg-fumablac-gold text-white font-semibold hover:bg-fumablac-gold-light transition mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Contáctanos
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
