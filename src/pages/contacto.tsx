'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock,  Send, CheckCircle, MapPinned } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { PageHero } from '../components/sections/page-hero';
import { contactReasons } from '../lib/data';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  privacy: boolean;
}

export function ContactoClient() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    defaultValues: { name: '', email: '', phone: '', reason: 'Información general', message: '', privacy: false },
  });

  const onSubmit = async (_data: FormValues) => {
    // Simulate delay
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <PageHero
        image="/assets/contacto-hero.jpg"
        imageAlt="Comunidad acompañada por FUMABLAC"
        subtitle="Estamos para ti"
        title="Contáctanos"
        breadcrumb="Contáctanos"
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div>
            <p className="text-fumablac-gold font-semibold tracking-widest uppercase text-sm mb-3">Escríbenos</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-fumablac-blue mb-4">Envíanos un mensaje</h2>
            <p className="text-fumablac-text-muted text-lg mb-8">Completa el formulario y nuestro equipo te responderá lo antes posible.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text mb-2">Nombre completo *</label>
                  <input
                    {...register('name', { required: 'Campo obligatorio' })}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                  {errors?.name && <p className="text-red-500 text-xs mt-1">{errors?.name?.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text mb-2">Correo electrónico *</label>
                  <input
                    {...register('email', {
                      required: 'Campo obligatorio',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
                    })}
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                  {errors?.email && <p className="text-red-500 text-xs mt-1">{errors?.email?.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text mb-2">Teléfono</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (809) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-fumablac-text mb-2">Motivo</label>
                  <select
                    {...register('reason')}
                    className="w-full px-4 py-3 rounded-xl border border-fumablac-border focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base text-fumablac-text-muted"
                  >
                    {contactReasons?.map((r: string) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-fumablac-text mb-2">Mensaje *</label>
                <textarea
                  {...register('message', { required: 'Campo obligatorio' })}
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full px-4 py-3 rounded-xl border border-fumablac-border focus:border-fumablac-blue focus:ring-2 focus:ring-fumablac-blue/20 outline-none text-base resize-none"
                />
                {errors?.message && <p className="text-red-500 text-xs mt-1">{errors?.message?.message}</p>}
              </div>

              <label className="flex items-start gap-3 text-sm text-fumablac-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  {...register('privacy', { required: 'Debes aceptar la política de privacidad' })}
                  className="mt-1 w-4 h-4 accent-fumablac-blue"
                />
                <span>He leído y acepto el aviso de privacidad y el tratamiento de mis datos.</span>
              </label>
              {errors?.privacy && <p className="text-red-500 text-xs">{errors?.privacy?.message}</p>}

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

              {/* Success message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">¡Mensaje enviado exitosamente! Pronto te contactaremos.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-fumablac-text-muted/60 leading-relaxed">Tus datos son confidenciales y se utilizarán únicamente para responder a tu solicitud. FUMABLAC no comparte información personal con terceros.</p>
            </form>
          </div>

          {/* Info + Map */}
          <div>
            <div className="bg-fumablac-blue rounded-2xl p-8 text-white mb-6">
              <h3 className="font-heading text-2xl font-bold mb-6">Información de contacto</h3>
              <ul className="space-y-5">
                {[
                  { icon: MapPin, title: 'Dirección', text: 'Av. Independencia #245, Santo Domingo, República Dominicana' },
                  { icon: Phone, title: 'Teléfono', text: '+1 (809) 555-0148' },
                  { icon: Mail, title: 'Correo', text: 'contacto@fumablac.org' },
                  { icon: Clock, title: 'Horario', text: 'Lunes a viernes, 8:00 a.m. – 5:00 p.m.' },
                ]?.map((item: any) => (
                  <li key={item?.title} className="flex items-start gap-4">
                    <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-fumablac-gold shrink-0">
                      <item.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{item?.title}</p>
                      <p className="text-white/70 text-sm" suppressHydrationWarning>{item?.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-8">
                {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube]?.map((IconComp: any, i: number) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fumablac-gold transition">
                    <IconComp className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-fumablac-border h-[260px] bg-fumablac-gray relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#c9d3e0 1px, transparent 1px), linear-gradient(90deg, #c9d3e0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="relative z-10 text-center">
                <MapPinned className="w-10 h-10 text-fumablac-blue mx-auto mb-3" />
                <p className="text-fumablac-text-muted font-medium">Mapa de ubicación</p>
                <p className="text-fumablac-text-muted/60 text-sm">Santo Domingo, R.D.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
