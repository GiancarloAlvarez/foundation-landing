import { prisma } from '@/lib/db';
import { emailRecipientSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.emailRecipient, emailRecipientSchema, { orderBy: { createdAt: 'asc' } });
