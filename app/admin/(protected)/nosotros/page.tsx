import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { SingletonForm, type SingletonField } from '@/components/admin/singleton-form';
import { prisma } from '@/lib/db';

const aboutFields: SingletonField[] = [
  { type: 'textarea', name: 'historyParagraph1', label: 'Historia — párrafo 1' },
  { type: 'textarea', name: 'historyParagraph2', label: 'Historia — párrafo 2' },
  { type: 'text', name: 'heroImage', label: 'Imagen de portada (ruta)' },
  { type: 'text', name: 'historyImage', label: 'Imagen de historia (ruta)' },
];

const missionColumns: CrudColumn<any>[] = [
  { key: 'title', label: 'Título' },
  { key: 'icon', label: 'Icono' },
  { key: 'order', label: 'Orden' },
];

const missionFields: CrudField[] = [
  { type: 'text', name: 'title', label: 'Título (Misión / Visión / Valores)', required: true },
  { type: 'text', name: 'icon', label: 'Icono (nombre lucide-react)', required: true },
  { type: 'textarea', name: 'text', label: 'Texto', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

const historyColumns: CrudColumn<any>[] = [
  { key: 'value', label: 'Valor' },
  { key: 'label', label: 'Etiqueta' },
  { key: 'order', label: 'Orden' },
];

const historyFields: CrudField[] = [
  { type: 'text', name: 'value', label: 'Valor (ej. +11)', required: true },
  { type: 'text', name: 'label', label: 'Etiqueta', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminNosotrosPage() {
  const [about, missionValues, historyStats] = await Promise.all([
    prisma.aboutContent.upsert({ where: { id: 'main' }, update: {}, create: { id: 'main' } }),
    prisma.missionValue.findMany({ orderBy: { order: 'asc' } }),
    prisma.historyStat.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <PageHeader title="Nosotros — Historia" description="Contenido de la sección de historia" />
        <div className="mt-4">
          <SingletonForm apiPath="/api/admin/about" fields={aboutFields} initialData={about} />
        </div>
      </div>

      <div>
        <PageHeader title="Misión, Visión y Valores" />
        <div className="mt-4">
          <CrudManager
            apiPath="/api/admin/mission-values"
            entityLabel="Tarjeta"
            columns={missionColumns}
            fields={missionFields}
            initialData={missionValues}
            defaultValues={{ title: '', icon: '', text: '', order: 0 }}
          />
        </div>
      </div>

      <div>
        <PageHeader title="Cifras de historia" />
        <div className="mt-4">
          <CrudManager
            apiPath="/api/admin/history-stats"
            entityLabel="Cifra"
            columns={historyColumns}
            fields={historyFields}
            initialData={historyStats}
            defaultValues={{ value: '', label: '', order: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
