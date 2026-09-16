import { PageHeader } from '@/components/layouts/page-header';
import { EvidenciasClient } from './evidencias-client';
import { prisma } from '@/lib/db';

export default async function AdminEvidenciasPage() {
  const [evidences, programs] = await Promise.all([
    prisma.evidence.findMany({ orderBy: { order: 'asc' } }),
    prisma.program.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Evidencias" description="Informes y estudios de caso publicados" />
      <EvidenciasClient evidences={evidences} programs={programs} />
    </div>
  );
}
