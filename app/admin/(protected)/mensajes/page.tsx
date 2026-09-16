import { PageHeader } from '@/components/layouts/page-header';
import { MessagesTable } from './messages-table';
import { prisma } from '@/lib/db';

export default async function AdminMensajesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Mensajes" description="Mensajes recibidos a través del formulario de contacto" />
      <MessagesTable initialData={messages} />
    </div>
  );
}
