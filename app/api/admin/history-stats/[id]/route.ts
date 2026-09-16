import { prisma } from '@/lib/db';
import { historyStatSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.historyStat, historyStatSchema, ['/nosotros']);
