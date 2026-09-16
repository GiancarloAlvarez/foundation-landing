import { prisma } from '@/lib/db';
import { galleryImageSchema } from '@/lib/validators';
import { createItemHandlers } from '@/lib/crud-handlers';

export const { PATCH, DELETE } = createItemHandlers(prisma.galleryImage, galleryImageSchema, ['/galeria']);
