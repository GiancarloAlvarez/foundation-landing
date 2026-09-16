'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { SiteSettings } from '@prisma/client';
import { PageHero } from '@/components/sections/page-hero';
import { Container } from '@/components/layouts/container';
import { contactReasons } from '@/lib/data';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  privacy: boolean;
}

export function ContactoClient({ settings }: { settings: SiteSettings | null }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    defaultValues: { name: '', email: '', phone: '', reason: 'Información general', message: '', privacy: false },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('idle');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        reason: data.reason,
        message: data.message,
      }),
    });
    if (!res.ok) {
      setStatus('error');
      return;
    }
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  const infoItems = [
    settings?.address && { icon: MapPin, title: 'Dirección', text: settings.address, href: undefined },
    settings?.phone && {
      icon: Phone,
      title: 'Teléfono',
      text: settings.phone,
      href: `https://wa.me/${settings.whatsappNumber || settings.phone.replace(/\D/g, '')}`,
    },
    settings?.email && { icon: Mail, title: 'Correo', text: settings.email, href: `mailto:${settings.email}` },
    settings?.hoursWeekdays && { icon: Clock, title: 'Horario', text: settings.hoursWeekdays, href: undefined },
  ].filter(Boolean) as { icon: typeof MapPin; title: string; text: string; href?: string }[];

  const socialLinks = [
    { icon: Facebook, url: settings?.facebookUrl },
    { icon: Instagram, url: settings?.instagramUrl },
    { icon: Twitter, url: settings?.twitterUrl },
    { icon: Youtube, url: settings?.youtubeUrl },
  ].filter((s) => s.url);

  return (
    <>
      <PageHero
        image="/assets/actividades/actividad-madres-5.jpg"
        imageAlt="Comunidad acompañada por FUMABLAC"
        subtitle="Estamos para ti"
        title="Contáctanos"
        breadcrumb="Contáctanos"
      />

      <section className="bg-white dark:bg-gray-900 py-20 lg:py-28">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div>
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Escríbenos</p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-fumablac-blue dark:text-blue-400 mb-4 text-balance">Envíanos un mensaje</h2>
            <p className="text-fumablac-text-muted dark:text-gray-400 text-lg mb-8">Completa el formulario y nuestro equipo te responderá lo antes posible.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text dark:text-gray-100 mb-2">Nombre completo *</label>
                  <input
                    {...register('name', { required: 'Campo obligatorio' })}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                  {errors?.name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors?.name?.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text dark:text-gray-100 mb-2">Correo electrónico *</label>
                  <input
                    {...register('email', {
                      required: 'Campo obligatorio',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
                    })}
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                  {errors?.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors?.email?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text dark:text-gray-100 mb-2">Teléfono</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (809) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text dark:text-gray-100 mb-2">Motivo</label>
                  <select
                    {...register('reason')}
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border dark:border-gray-700 dark:bg-gray-800 focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base text-fumablac-text-muted dark:text-gray-300"
                  >
                    {contactReasons?.map((r: string) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-fumablac-text dark:text-gray-100 mb-2">Mensaje *</label>
                <textarea
                  {...register('message', { required: 'Campo obligatorio' })}
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full px-4 py-3 rounded-xl border border-fumablac-border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base resize-none"
                />
                {errors?.message && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors?.message?.message}</p>}
              </div>

              <label className="flex items-start gap-3 text-sm text-fumablac-text-muted dark:text-gray-400 cursor-pointer py-1">
                <input
                  type="checkbox"
                  {...register('privacy', { required: 'Debes aceptar la política de privacidad' })}
                  className="mt-1 w-5 h-5 accent-fumablac-blue shrink-0"
                />
                <span>He leído y acepto el aviso de privacidad y el tratamiento de mis datos.</span>
              </label>
              {errors?.privacy && <p className="text-red-500 dark:text-red-400 text-xs">{errors?.privacy?.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 rounded-full bg-fumablac-gold text-white font-semibold text-base hover:bg-fumablac-gold-light transition shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Send className="w-4 h-4" /> Enviar mensaje</>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">¡Mensaje enviado exitosamente! Pronto te contactaremos.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-4 py-3 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">No pudimos enviar tu mensaje. Intenta de nuevo.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-fumablac-text-muted/60 dark:text-gray-500 leading-relaxed">Tus datos son confidenciales y se utilizarán únicamente para responder a tu solicitud. FUMABLAC no comparte información personal con terceros.</p>
            </form>
          </div>

          {/* Info + Map */}
          <div>
            {infoItems.length > 0 && (
              <div className="bg-fumablac-blue rounded-2xl p-8 text-white mb-6">
                <h3 className="font-heading text-2xl font-bold mb-6">Información de contacto</h3>
                <ul className="space-y-5">
                  {infoItems.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-fumablac-gold shrink-0">
                        <item.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-white/70 text-sm hover:text-fumablac-gold transition"
                            suppressHydrationWarning
                          >
                            {item.text}
                          </a>
                        ) : (
                          <p className="text-white/70 text-sm" suppressHydrationWarning>{item.text}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {socialLinks.length > 0 && (
                  <div className="flex gap-3 mt-8">
                    {socialLinks.map(({ icon: Icon, url }, i) => (
                      <a key={i} href={url!} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {settings?.address ? (
              <div className="rounded-2xl overflow-hidden border border-fumablac-border dark:border-gray-700 h-[300px]">
                <iframe
                  title="Ubicación de FUMABLAC"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-fumablac-border dark:border-gray-700 h-[260px] bg-fumablac-gray dark:bg-gray-800 flex items-center justify-center">
                <p className="text-fumablac-text-muted/60 dark:text-gray-500 text-sm">Configura una dirección para mostrar el mapa</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
