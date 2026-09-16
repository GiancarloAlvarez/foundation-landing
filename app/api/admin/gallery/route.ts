import { prisma } from '@/lib/db';
import { galleryImageSchema } from '@/lib/validators';
import { createCollectionHandlers } from '@/lib/crud-handlers';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createCollectionHandlers(prisma.galleryImage, galleryImageSchema, { orderBy: { order: 'asc' } }, ['/galeria']);
