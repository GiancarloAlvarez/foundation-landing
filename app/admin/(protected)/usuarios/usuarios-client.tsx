'use client';

import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo' },
  { key: 'createdAt', label: 'Creado', render: (r) => new Date(r.createdAt).toLocaleDateString('es-DO') },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre completo', required: true },
  { type: 'text', name: 'email', label: 'Correo electrónico', required: true },
  { type: 'password', name: 'password', label: 'Contraseña', required: true, editHint: 'Deja este campo vacío para mantener la contraseña actual.' },
];

export function UsuariosClient({ users }: { users: any[] }) {
  return (
    <CrudManager
      apiPath="/api/admin/users"
      entityLabel="Usuario"
      columns={columns}
      fields={fields}
      initialData={users}
      defaultValues={{ name: '', email: '', password: '' }}
    />
  );
}
