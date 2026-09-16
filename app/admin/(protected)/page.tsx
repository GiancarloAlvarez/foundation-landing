import { PageHeader } from '@/components/layouts/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [messagesCount, unreadCount, programsCount, galleryCount, alliesCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.program.count(),
    prisma.galleryImage.count(),
    prisma.ally.count(),
  ]);

  const cards = [
    { label: 'Mensajes sin leer', value: unreadCount, total: messagesCount },
    { label: 'Programas', value: programsCount },
    { label: 'Imágenes en galería', value: galleryCount },
    { label: 'Aliados', value: alliesCount },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Panel" description="Resumen general del contenido de FUMABLAC" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
              {card.total !== undefined && (
                <p className="text-xs text-muted-foreground mt-1">de {card.total} en total</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
