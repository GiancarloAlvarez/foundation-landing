import { prisma } from '@/lib/db';
import { evidenceSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.evidence, evidenceSchema, { orderBy: { order: 'asc' } }, ['/evidencias']);
