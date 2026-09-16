import { PageHeader } from '@/components/layouts/page-header';
import { SingletonForm, type SingletonField } from '@/components/admin/singleton-form';
import { prisma } from '@/lib/db';

const templateFields: SingletonField[] = [
  { type: 'text', name: 'subject', label: 'Asunto' },
  { type: 'textarea', name: 'body', label: 'Cuerpo del correo (admite HTML)' },
];

const DEFAULTS = {
  confirmation: {
    subject: 'Hemos recibido tu mensaje — Fundación Mamá Blanca',
    body:
      '<p>Hola {{name}},</p>' +
      '<p>Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>' +
      '<p><strong>Tu mensaje:</strong><br>{{message}}</p>' +
      '<p>— Fundación Mamá Blanca (FUMABLAC)</p>',
  },
  notification: {
    subject: 'Nueva solicitud de contacto: {{name}}',
    body:
      '<p>Se recibió una nueva solicitud a través del formulario de contacto.</p>' +
      '<ul>' +
      '<li><strong>Nombre:</strong> {{name}}</li>' +
      '<li><strong>Correo:</strong> {{email}}</li>' +
      '<li><strong>Teléfono:</strong> {{phone}}</li>' +
      '<li><strong>Motivo:</strong> {{reason}}</li>' +
      '<li><strong>Fecha:</strong> {{date}}</li>' +
      '</ul>' +
      '<p><strong>Mensaje:</strong><br>{{message}}</p>',
  },
};

export default async function AdminPlantillasCorreoPage() {
  const [confirmation, notification] = await Promise.all([
    prisma.emailTemplate.upsert({ where: { id: 'confirmation' }, update: {}, create: { id: 'confirmation', ...DEFAULTS.confirmation } }),
    prisma.emailTemplate.upsert({ where: { id: 'notification' }, update: {}, create: { id: 'notification', ...DEFAULTS.notification } }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Plantillas de correo"
        description="Textos de los correos automáticos que envía el sitio. Usa {{variable}} donde quieras que se inserte un dato — se reemplaza al enviar."
      />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Confirmación al remitente</h2>
        <p className="text-sm text-muted-foreground">
          Se envía a quien llena el formulario de contacto. Variables disponibles: <code>{'{{name}}'}</code>, <code>{'{{email}}'}</code>,{' '}
          <code>{'{{phone}}'}</code>, <code>{'{{reason}}'}</code>, <code>{'{{message}}'}</code>, <code>{'{{date}}'}</code>
        </p>
        <SingletonForm apiPath="/api/admin/email-templates/confirmation" fields={templateFields} initialData={confirmation} />
      </div>

      <div className="space-y-3 border-t pt-8">
        <h2 className="text-lg font-semibold">Aviso a destinatarios</h2>
        <p className="text-sm text-muted-foreground">
          Se envía a cada correo en <strong>Destinatarios de correo</strong> cuando llega una solicitud nueva. Mismas variables disponibles.
        </p>
        <SingletonForm apiPath="/api/admin/email-templates/notification" fields={templateFields} initialData={notification} />
      </div>
    </div>
  );
}
