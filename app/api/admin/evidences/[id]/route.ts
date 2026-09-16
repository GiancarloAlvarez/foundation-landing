import { prisma } from '@/lib/db';
import { evidenceSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.evidence, evidenceSchema, ['/evidencias']);
