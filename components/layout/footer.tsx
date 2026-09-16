import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import type { SiteSettings } from '@prisma/client';
import { Container } from '@/components/layouts/container';

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const socialLinks = [
    { icon: Facebook, url: settings?.facebookUrl, label: 'Facebook' },
    { icon: Instagram, url: settings?.instagramUrl, label: 'Instagram' },
    { icon: Twitter, url: settings?.twitterUrl, label: 'X' },
    { icon: Youtube, url: settings?.youtubeUrl, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-fumablac-blue-dark text-white pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14">
          {/* Brand */}
          <div>
            <Image
              src="/assets/logo-fumablac-white.png"
              alt="Logo Fundación Mamá Blanca"
              width={913}
              height={561}
              className="h-[72px] sm:h-[88px] lg:h-[100px] w-auto object-contain mb-5"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Fundación Mamá Blanca. Trabajamos por el bienestar de las comunidades más vulnerables de República Dominicana con amor y compromiso.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-base mb-4">Menú rápido</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-fumablac-gold transition">Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-fumablac-gold transition">Nosotros</Link></li>
              <li><Link href="/programas" className="hover:text-fumablac-gold transition">Programas</Link></li>
              <li><Link href="/galeria" className="hover:text-fumablac-gold transition">Galería</Link></li>
              <li><Link href="/transparencia" className="hover:text-fumablac-gold transition">Transparencia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-fumablac-gold shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-fumablac-gold shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsappNumber || settings.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-fumablac-gold transition"
                    suppressHydrationWarning
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-fumablac-gold shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-fumablac-gold transition" suppressHydrationWarning>
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-4">Síguenos</h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a key={label} href={url!} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/50 space-y-1">
          <p>© 2026 Fundación Mamá Blanca (FUMABLAC) — Todos los derechos reservados</p>
          <p>RNC: 430-43421-3</p>
        </div>
      </Container>
    </footer>
  );
}
