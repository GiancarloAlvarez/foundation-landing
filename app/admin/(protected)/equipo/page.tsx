import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'role', label: 'Cargo' },
  { key: 'initials', label: 'Iniciales' },
  { key: 'order', label: 'Orden' },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre completo', required: true },
  { type: 'text', name: 'role', label: 'Cargo', required: true },
  { type: 'text', name: 'initials', label: 'Iniciales (si no hay foto)', required: true },
  {
    type: 'select',
    name: 'color',
    label: 'Color de avatar',
    options: [
      { value: 'blue', label: 'Azul' },
      { value: 'gold', label: 'Dorado' },
    ],
    required: true,
  },
  { type: 'image', name: 'photo', label: 'Foto (opcional)', category: 'team' },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminEquipoPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Equipo directivo" description="Personas que aparecen en la página Nosotros" />
      <CrudManager
        apiPath="/api/admin/team"
        entityLabel="Miembro del equipo"
        columns={columns}
        fields={fields}
        initialData={team}
        defaultValues={{ name: '', role: '', initials: '', color: 'blue', photo: '', order: 0 }}
      />
    </div>
  );
}
