import nodemailer from 'nodemailer';
import { getOutlookAccessToken } from '@/lib/outlook-oauth';

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const user = process.env.OUTLOOK_SENDER_EMAIL;
  if (!user) throw new Error('Falta OUTLOOK_SENDER_EMAIL en el entorno.');

  const accessToken = await getOutlookAccessToken();
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { type: 'OAuth2', user, accessToken },
  });

  await transporter.sendMail({ from: user, to, subject, html });
}

// Templates use {{variable}} placeholders — anything not passed in `vars` is
// dropped rather than left as a literal "{{...}}" in the sent email.
export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => vars[key] ?? '');
}
