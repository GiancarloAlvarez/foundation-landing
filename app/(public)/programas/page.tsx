import { ProgramasClient } from './programas-client';
import { prisma } from '@/lib/db';

export default async function ProgramasPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: 'asc' } });

  return <ProgramasClient programs={programs} />;
}
