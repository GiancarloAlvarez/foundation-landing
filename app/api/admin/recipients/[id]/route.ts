import { prisma } from '@/lib/db';
import { emailRecipientSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.emailRecipient, emailRecipientSchema);
