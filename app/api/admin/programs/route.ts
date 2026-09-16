import { prisma } from '@/lib/db';
import { programSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.program, programSchema, { orderBy: { order: 'asc' } }, ['/', '/programas']);
