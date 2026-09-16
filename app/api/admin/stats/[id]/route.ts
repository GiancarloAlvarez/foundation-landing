import { prisma } from '@/lib/db';
import { statSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.stat, statSchema, ['/']);
