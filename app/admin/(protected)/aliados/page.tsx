import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'category', label: 'Categoría' },
  { key: 'url', label: 'Sitio web' },
  { key: 'order', label: 'Orden' },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre', required: true },
  { type: 'text', name: 'category', label: 'Categoría', required: true },
  { type: 'text', name: 'icon', label: 'Icono (nombre lucide-react, si no hay logo)' },
  { type: 'image', name: 'logo', label: 'Logo (opcional)', category: 'allies' },
  { type: 'text', name: 'url', label: 'Sitio web (opcional)' },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminAliadosPage() {
  const allies = await prisma.ally.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Aliados" description="Instituciones y empresas aliadas de FUMABLAC" />
      <CrudManager
        apiPath="/api/admin/allies"
        entityLabel="Aliado"
        columns={columns}
        fields={fields}
        initialData={allies}
        defaultValues={{ name: '', category: '', icon: '', logo: '', url: '', order: 0 }}
      />
    </div>
  );
}
