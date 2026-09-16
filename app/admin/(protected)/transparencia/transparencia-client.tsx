'use client';

import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'category', label: 'Categoría' },
  { key: 'year', label: 'Año' },
  { key: 'date', label: 'Fecha', render: (r) => new Date(r.date).toLocaleDateString('es-DO') },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre del documento', required: true },
  {
    type: 'select',
    name: 'category',
    label: 'Categoría',
    options: [
      { value: 'Estados financieros', label: 'Estados financieros' },
      { value: 'Informes anuales', label: 'Informes anuales' },
      { value: 'Documentos legales', label: 'Documentos legales' },
    ],
    required: true,
  },
  { type: 'number', name: 'year', label: 'Año (para agrupar)', required: true },
  { type: 'date', name: 'date', label: 'Fecha de publicación', required: true },
  { type: 'image', name: 'fileUrl', label: 'Archivo (PDF)', category: 'transparency', accept: 'application/pdf' },
  { type: 'number', name: 'order', label: 'Orden' },
];

export function TransparenciaClient({ documents }: { documents: any[] }) {
  return (
    <CrudManager
      apiPath="/api/admin/transparency"
      entityLabel="Documento"
      columns={columns}
      fields={fields}
      initialData={documents}
      defaultValues={{ name: '', category: '', year: new Date().getFullYear(), date: '', fileUrl: '', order: 0 }}
    />
  );
}
