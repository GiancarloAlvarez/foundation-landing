import { PageHeader } from '@/components/layouts/page-header';
import { StatsManager, ActivitiesManager } from './inicio-client';
import { prisma } from '@/lib/db';

export default async function AdminInicioPage() {
  const [stats, activities] = await Promise.all([
    prisma.stat.findMany({ orderBy: { order: 'asc' } }),
    prisma.activity.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <PageHeader title="Inicio — Estadísticas" description="Contadores que se muestran en la página principal" />
        <div className="mt-4">
          <StatsManager stats={stats} />
        </div>
      </div>
      <div>
        <PageHeader title="Inicio — Actividades recientes" description="Actividades destacadas en la página principal" />
        <div className="mt-4">
          <ActivitiesManager activities={activities} />
        </div>
      </div>
    </div>
  );
}
