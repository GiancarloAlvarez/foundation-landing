import { prisma } from '@/lib/db';
import { teamMemberSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.teamMember, teamMemberSchema, ['/nosotros']);
