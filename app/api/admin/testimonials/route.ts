import { prisma } from '@/lib/db';
import { testimonialSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.testimonial, testimonialSchema, { orderBy: { order: 'asc' } }, ['/evidencias']);
