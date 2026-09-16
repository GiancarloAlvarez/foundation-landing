import { prisma } from '@/lib/db';
import { missionValueSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.missionValue, missionValueSchema, ['/nosotros']);
