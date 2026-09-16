import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo' },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre', required: true },
  { type: 'text', name: 'email', label: 'Correo electrónico', required: true },
];

export default async function AdminDestinatariosPage() {
  const recipients = await prisma.emailRecipient.findMany({ orderBy: { createdAt: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Destinatarios de correo"
        description="Cada vez que alguien envía el formulario de contacto, se avisa por correo a todas las personas de esta lista"
      />
      <CrudManager
        apiPath="/api/admin/recipients"
        entityLabel="Destinatario"
        columns={columns}
        fields={fields}
        initialData={recipients}
        defaultValues={{ name: '', email: '' }}
      />
    </div>
  );
}
