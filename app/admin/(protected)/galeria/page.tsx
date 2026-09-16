import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

const columns: CrudColumn<any>[] = [
  { key: 'alt', label: 'Descripción' },
  { key: 'category', label: 'Categoría' },
  { key: 'order', label: 'Orden' },
];

const fields: CrudField[] = [
  { type: 'image', name: 'src', label: 'Imagen', category: 'gallery' },
  { type: 'text', name: 'alt', label: 'Descripción (texto alternativo)', required: true },
  { type: 'text', name: 'category', label: 'Categoría', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminGaleriaPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Galería" description="Imágenes que se muestran en la página de Galería" />
      <CrudManager
        apiPath="/api/admin/gallery"
        entityLabel="Imagen"
        columns={columns}
        fields={fields}
        initialData={images}
        defaultValues={{ src: '', alt: '', category: '', order: 0 }}
      />
    </div>
  );
}
