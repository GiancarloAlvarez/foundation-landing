'use client';

import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';

const columns: CrudColumn<any>[] = [
  { key: 'title', label: 'Título' },
  { key: 'type', label: 'Tipo' },
  { key: 'date', label: 'Fecha', render: (r) => new Date(r.date).toLocaleDateString('es-DO') },
  { key: 'order', label: 'Orden' },
];

export function EvidenciasClient({ evidences, programs }: { evidences: any[]; programs: { id: string; title: string }[] }) {
  const fields: CrudField[] = [
    { type: 'text', name: 'title', label: 'Título', required: true },
    { type: 'date', name: 'date', label: 'Fecha', required: true },
    {
      type: 'select',
      name: 'programId',
      label: 'Programa relacionado',
      options: [{ value: '', label: 'General (ningún programa)' }, ...programs.map((p) => ({ value: p.id, label: p.title }))],
    },
    {
      type: 'select',
      name: 'type',
      label: 'Tipo de documento',
      options: [
        { value: 'report', label: 'Informe' },
        { value: 'case-study', label: 'Estudio de caso' },
      ],
      required: true,
    },
    { type: 'textarea', name: 'description', label: 'Descripción', required: true },
    { type: 'image', name: 'fileUrl', label: 'Archivo (PDF)', category: 'evidences', accept: 'application/pdf' },
    { type: 'number', name: 'order', label: 'Orden' },
  ];

  return (
    <CrudManager
      apiPath="/api/admin/evidences"
      entityLabel="Evidencia"
      columns={columns}
      fields={fields}
      initialData={evidences}
      defaultValues={{ title: '', date: '', programId: '', type: 'report', description: '', fileUrl: '', order: 0 }}
    />
  );
}
