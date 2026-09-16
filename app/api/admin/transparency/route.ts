import { prisma } from '@/lib/db';
import { transparencyDocumentSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(
  prisma.transparencyDocument,
  transparencyDocumentSchema,
  { orderBy: [{ year: 'desc' }, { order: 'asc' }] },
  ['/transparencia']
);
