import { PageHeader } from '@/components/layouts/page-header';
import { SingletonForm, type SingletonField } from '@/components/admin/singleton-form';
import { prisma } from '@/lib/db';

const fields: SingletonField[] = [
  { type: 'text', name: 'address', label: 'Dirección' },
  { type: 'text', name: 'phone', label: 'Teléfono' },
  { type: 'text', name: 'whatsappNumber', label: 'Número de WhatsApp (solo dígitos, con código de país)' },
  { type: 'text', name: 'email', label: 'Correo de contacto' },
  { type: 'text', name: 'hoursWeekdays', label: 'Horario de atención' },
  { type: 'text', name: 'facebookUrl', label: 'URL de Facebook' },
  { type: 'text', name: 'instagramUrl', label: 'URL de Instagram' },
  { type: 'text', name: 'twitterUrl', label: 'URL de X / Twitter' },
  { type: 'text', name: 'youtubeUrl', label: 'URL de YouTube' },
];

export default async function AdminConfiguracionPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main' },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        description="Información de contacto y redes sociales, usada en todo el sitio (footer, WhatsApp, contacto)"
      />
      <SingletonForm apiPath="/api/admin/settings" fields={fields} initialData={settings} />
    </div>
  );
}
