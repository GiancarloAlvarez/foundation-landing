import { prisma } from '@/lib/db';
import { allySchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.ally, allySchema, { orderBy: { order: 'asc' } }, ['/', '/aliados']);
