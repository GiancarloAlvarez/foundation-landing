import { AliadosClient } from './aliados-client';
import { prisma } from '@/lib/db';

export default async function AliadosPage() {
  const allies = await prisma.ally.findMany({ orderBy: { order: 'asc' } });

  return <AliadosClient allies={allies} />;
}
