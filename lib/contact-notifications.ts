import type { ContactMessage } from '@prisma/client';
import { prisma } from '@/lib/db';
import { sendMail, renderTemplate } from '@/lib/mail';

// Visitor-supplied text is interpolated into the HTML body of the emails, so
// it must be escaped — otherwise anyone could inject markup (links, images,
// fake forms) into a message that appears to come from the foundation.
function escapeHtml(value: string): string {
  return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Strips control characters (including CR/LF) so visitor data can never
// inject extra headers into the message.
function sanitizeText(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/[\u0000-\u001F\u007F]/g, '');
}

// Fired without being awaited by the contact route so a slow or failing
// SMTP call never delays or breaks the visitor's form submission — errors
// are only logged server-side.
export async function sendContactNotifications(message: ContactMessage) {
  // The subject is plain text: it only needs the control characters removed.
  const subjectVars = {
    name: sanitizeText(message.name),
    email: sanitizeText(message.email),
    phone: sanitizeText(message.phone ?? ''),
    reason: sanitizeText(message.reason),
    message: sanitizeText(message.message),
    date: message.createdAt.toLocaleString('es-DO'),
  };

  // The body is HTML: the same values are escaped before being injected.
  const bodyVars = {
    name: escapeHtml(subjectVars.name),
    email: escapeHtml(subjectVars.email),
    phone: escapeHtml(subjectVars.phone),
    reason: escapeHtml(subjectVars.reason),
    message: escapeHtml(subjectVars.message),
    date: subjectVars.date,
  };

  const [confirmationTemplate, notificationTemplate, recipients] = await Promise.all([
    prisma.emailTemplate.findUnique({ where: { id: 'confirmation' } }),
    prisma.emailTemplate.findUnique({ where: { id: 'notification' } }),
    prisma.emailRecipient.findMany(),
  ]);

  const sends: Promise<unknown>[] = [];

  if (confirmationTemplate) {
    sends.push(
      sendMail({
        to: message.email,
        subject: renderTemplate(confirmationTemplate.subject, subjectVars),
        html: renderTemplate(confirmationTemplate.body, bodyVars),
      })
    );
  }

  if (notificationTemplate) {
    for (const recipient of recipients) {
      sends.push(
        sendMail({
          to: recipient.email,
          subject: renderTemplate(notificationTemplate.subject, subjectVars),
          html: renderTemplate(notificationTemplate.body, bodyVars),
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
