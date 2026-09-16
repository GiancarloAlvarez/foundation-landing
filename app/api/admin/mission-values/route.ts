import { prisma } from '@/lib/db';
import { missionValueSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.missionValue, missionValueSchema, { orderBy: { order: 'asc' } }, ['/nosotros']);
