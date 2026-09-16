import { PageHeader } from '@/components/layouts/page-header';
import { CrudManager, type CrudColumn, type CrudField } from '@/components/admin/crud-manager';
import { prisma } from '@/lib/db';

const columns: CrudColumn<any>[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'role', label: 'Rol' },
  { key: 'order', label: 'Orden' },
];

const fields: CrudField[] = [
  { type: 'text', name: 'name', label: 'Nombre', required: true },
  { type: 'text', name: 'role', label: 'Rol / relación con FUMABLAC', required: true },
  { type: 'textarea', name: 'text', label: 'Testimonio', required: true },
  { type: 'number', name: 'order', label: 'Orden' },
];

export default async function AdminTestimoniosPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="space-y-6">
      <PageHeader title="Testimonios" description="Testimonios mostrados en la página de Evidencias" />
      <CrudManager
        apiPath="/api/admin/testimonials"
        entityLabel="Testimonio"
        columns={columns}
        fields={fields}
        initialData={testimonials}
        defaultValues={{ name: '', role: '', text: '', order: 0 }}
      />
    </div>
  );
}
