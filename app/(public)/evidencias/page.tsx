import { EvidenciasClient } from './evidencias-client';
import { prisma } from '@/lib/db';

export default async function EvidenciasPage() {
  const [evidences, testimonials] = await Promise.all([
    prisma.evidence.findMany({ orderBy: { order: 'asc' }, include: { program: true } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return <EvidenciasClient evidences={evidences} testimonials={testimonials} />;
}
