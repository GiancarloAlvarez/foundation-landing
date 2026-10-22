// Default subject/body for the two transactional emails. Shared by the admin
// UI (app/admin/(protected)/plantillas-correo) and by the seed script so the
// defaults live in a single place.
export const EMAIL_TEMPLATE_DEFAULTS = {
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
} as const;
