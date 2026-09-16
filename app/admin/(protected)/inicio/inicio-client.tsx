'use client';

import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';

const statColumns: CrudColumn<any>[] = [
  { key: 'label', label: 'Etiqueta' },
  { key: 'value', label: 'Valor', render: (r) => `${r.prefix}${r.value}${r.suffix}` },
  { key: 'icon', label: 'Icono' },
  { key: 'order', label: 'Orden' },
];

const statFields: CrudField[] = [
  { type: 'text', name: 'label', label: 'Etiqueta', required: true },
  { type: 'number', name: 'value', label: 'Valor numérico', required: true },
  { type: 'text', name: 'prefix', label: 'Prefijo (ej. +)' },
  { type: 'text', name: 'suffix', label: 'Sufijo' },
  { type: 'text', name: 'icon', label: 'Icono (nombre lucide-react)', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

const activityColumns: CrudColumn<any>[] = [
  { key: 'title', label: 'Título' },
  { key: 'category', label: 'Categoría' },
  { key: 'date', label: 'Fecha', render: (r) => new Date(r.date).toLocaleDateString('es-DO') },
  { key: 'order', label: 'Orden' },
];

const activityFields: CrudField[] = [
  { type: 'text', name: 'title', label: 'Título', required: true },
  { type: 'text', name: 'category', label: 'Categoría', required: true },
  {
    type: 'select',
    name: 'categoryColor',
    label: 'Color de categoría',
    options: [
      { value: 'blue', label: 'Azul' },
      { value: 'gold', label: 'Dorado' },
    ],
    required: true,
  },
  { type: 'date', name: 'date', label: 'Fecha', required: true },
  { type: 'image', name: 'image', label: 'Imagen', category: 'activities' },
  { type: 'textarea', name: 'description', label: 'Descripción', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

export function StatsManager({ stats }: { stats: any[] }) {
  return (
    <CrudManager
      apiPath="/api/admin/stats"
      entityLabel="Estadística"
      columns={statColumns}
      fields={statFields}
      initialData={stats}
      defaultValues={{ label: '', value: 0, prefix: '+', suffix: '', icon: '', order: 0 }}
    />
  );
}

export function ActivitiesManager({ activities }: { activities: any[] }) {
  return (
    <CrudManager
      apiPath="/api/admin/activities"
      entityLabel="Actividad"
      columns={activityColumns}
      fields={activityFields}
      initialData={activities}
      defaultValues={{ title: '', category: '', categoryColor: 'blue', date: '', image: '', description: '', order: 0 }}
    />
  );
}
