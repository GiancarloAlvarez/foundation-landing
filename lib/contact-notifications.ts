import type { ContactMessage } from '@prisma/client';
import { prisma } from '@/lib/db';
import { sendMail, renderTemplate } from '@/lib/mail';

// Fired without being awaited by the contact route so a slow or failing
// SMTP call never delays or breaks the visitor's form submission — errors
// are only logged server-side.
export async function sendContactNotifications(message: ContactMessage) {
  const vars = {
    name: message.name,
    email: message.email,
    phone: message.phone ?? '',
    reason: message.reason,
    message: message.message,
    date: message.createdAt.toLocaleString('es-DO'),
  };

  const [confirmationTemplate, notificationTemplate, recipients] = await Promise.all([
    prisma.emailTemplate.findUnique({ where: { id: 'confirmation' } }),
    prisma.emailTemplate.findUnique({ where: { id: 'notification' } }),
    prisma.emailRecipient.findMany(),
  ]);

  const sends: Promise<void>[] = [];

  if (confirmationTemplate) {
    sends.push(
      sendMail({
        to: message.email,
        subject: renderTemplate(confirmationTemplate.subject, vars),
        html: renderTemplate(confirmationTemplate.body, vars),
      })
    );
  }

  if (notificationTemplate) {
    for (const recipient of recipients) {
      sends.push(
        sendMail({
          to: recipient.email,
          subject: renderTemplate(notificationTemplate.subject, vars),
          html: renderTemplate(notificationTemplate.body, vars),
        })
      );
    }
  }

  const results = await Promise.allSettled(sends);
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('Error enviando correo de contacto:', result.reason);
    }
  }
}
