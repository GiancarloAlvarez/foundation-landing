import { prisma } from '@/lib/db';
import { teamMemberSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.teamMember, teamMemberSchema, { orderBy: { order: 'asc' } }, ['/nosotros']);
