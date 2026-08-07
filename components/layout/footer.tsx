import Link from 'next/link';
import { Heart, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-fumablac-blue-dark text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-fumablac-gold flex items-center justify-center text-white">
                <Heart className="w-5 h-5" fill="white" />
              </span>
              <span className="font-heading text-xl font-bold">FUMABLAC</span>
            </div>
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
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-fumablac-gold shrink-0" />
                <span>Av. Independencia #245, Santo Domingo, R.D.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-fumablac-gold shrink-0" />
                <span suppressHydrationWarning>+1 (809) 555-0148</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-fumablac-gold shrink-0" />
                <span suppressHydrationWarning>contacto@fumablac.org</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-base mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2026 Fundación Mamá Blanca (FUMABLAC) — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
