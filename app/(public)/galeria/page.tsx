import { GaleriaClient } from './galeria-client';
import { prisma } from '@/lib/db';

export default async function GaleriaPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });

  return <GaleriaClient images={images} />;
}
