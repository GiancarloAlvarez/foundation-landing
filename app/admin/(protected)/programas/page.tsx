import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

interface ProgramRow {
  id: string;
  slug: string;
  icon: string;
  image: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  beneficiaries: string;
  category: string;
  order: number;
}

const columns: CrudColumn<ProgramRow>[] = [
  { key: 'title', label: 'Título' },
  { key: 'category', label: 'Categoría' },
  { key: 'beneficiaries', label: 'Beneficiarios' },
  { key: 'order', label: 'Orden' },
];

const fields: CrudField[] = [
  { type: 'text', name: 'title', label: 'Título', required: true },
  { type: 'text', name: 'slug', label: 'Slug (URL, minúsculas y guiones)', required: true },
  { type: 'text', name: 'category', label: 'Categoría', required: true },
  { type: 'text', name: 'icon', label: 'Icono (nombre lucide-react)', required: true },
  { type: 'image', name: 'image', label: 'Imagen', category: 'programs' },
  { type: 'textarea', name: 'shortDesc', label: 'Descripción corta', required: true },
  { type: 'textarea', name: 'fullDesc', label: 'Descripción completa', required: true },
  { type: 'text', name: 'beneficiaries', label: 'Beneficiarios (texto)', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminProgramasPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Programas" description="Gestiona los programas que se muestran en el sitio público" />
      <CrudManager
        apiPath="/api/admin/programs"
        entityLabel="Programa"
        columns={columns}
        fields={fields}
        initialData={programs}
        defaultValues={{ title: '', slug: '', category: '', icon: '', image: '', shortDesc: '', fullDesc: '', beneficiaries: '', order: 0 }}
      />
    </div>
  );
}
