import { ContactoClient } from './contacto-client';
import { prisma } from '@/lib/db';

export default async function ContactoPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });

  return <ContactoClient settings={settings} />;
}
