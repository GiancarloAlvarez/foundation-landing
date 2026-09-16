import { prisma } from '@/lib/db';
import { activitySchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.activity, activitySchema, { orderBy: { order: 'asc' } }, ['/']);
