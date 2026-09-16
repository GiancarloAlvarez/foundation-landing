import { TransparenciaClient } from './transparencia-client';
import { prisma } from '@/lib/db';

export default async function TransparenciaPage() {
  const docs = await prisma.transparencyDocument.findMany({ orderBy: [{ year: 'desc' }, { order: 'asc' }] });

  const yearGroups = Object.values(
    docs.reduce<Record<number, { year: number; documents: typeof docs }>>((acc, doc) => {
      if (!acc[doc.year]) acc[doc.year] = { year: doc.year, documents: [] };
      acc[doc.year].documents.push(doc);
      return acc;
    }, {})
  ).sort((a, b) => b.year - a.year);

  return <TransparenciaClient yearGroups={yearGroups} />;
}
