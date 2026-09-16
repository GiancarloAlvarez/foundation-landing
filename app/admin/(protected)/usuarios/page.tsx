import { PageHeader } from '@/components/layouts/page-header';
import { UsuariosClient } from './usuarios-client';
import { prisma } from '@/lib/db';

export default async function AdminUsuariosPage() {
  const users = await prisma.admin.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        description="Personas que pueden acceder al panel administrativo. Debe existir al menos un usuario en todo momento."
      />
      <UsuariosClient users={users} />
    </div>
  );
}
