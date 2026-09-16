import { prisma } from '@/lib/db';
import { testimonialSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.testimonial, testimonialSchema, ['/evidencias']);
