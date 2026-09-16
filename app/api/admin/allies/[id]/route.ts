import { prisma } from '@/lib/db';
import { allySchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.ally, allySchema, ['/', '/aliados']);
