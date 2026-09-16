import { prisma } from '@/lib/db';
import { programSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.program, programSchema, ['/', '/programas', '/evidencias']);
