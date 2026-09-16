import { PageHeader } from '@/components/layouts/page-header';
import { TransparenciaClient } from './transparencia-client';
import { prisma } from '@/lib/db';

export default async function AdminTransparenciaPage() {
  const documents = await prisma.transparencyDocument.findMany({ orderBy: [{ year: 'desc' }, { order: 'asc' }] });

  return (
    <div className="space-y-6">
      <PageHeader title="Transparencia" description="Documentos financieros y legales publicados" />
      <TransparenciaClient documents={documents} />
    </div>
  );
}
