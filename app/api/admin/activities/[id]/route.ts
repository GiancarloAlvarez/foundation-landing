import { prisma } from '@/lib/db';
import { activitySchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.activity, activitySchema, ['/']);
