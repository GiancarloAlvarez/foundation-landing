import { prisma } from '@/lib/db';
import { statSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.stat, statSchema, { orderBy: { order: 'asc' } }, ['/']);
