// Only server code can read SMTP credentials — if a client component imports
// this module, the Next.js build fails instead of shipping the secrets to the
// browser.
import 'server-only';
import nodemailer from 'nodemailer';

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

// Keeps the provider credential out of logs and error messages.
function redact(text: string): string {
  let output = text;
  const secret = process.env.SMTP_PASS;
  if (secret) output = output.split(secret).join('***');
  return output.replace(/xsmtpsib-[A-Za-z0-9_-]+/gi, '***');
}

// Provider-agnostic: works with any standard SMTP server (Brevo, Mailgun,
// Resend, Postmark, Amazon SES, a self-hosted relay, ...).
function smtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  const missing = [
    !host && 'SMTP_HOST',
    !user && 'SMTP_USER',
    !pass && 'SMTP_PASS',
    !from && 'SMTP_FROM',
  ].filter((name): name is string => Boolean(name));

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno para el correo: ${missing.join(', ')}`);
  }

  return { host: host!, port, secure, user: user!, pass: pass!, from: from! };
}

function createTransport() {
  const { host, port, secure, user, pass } = smtpConfig();
  return nodemailer.createTransport({
    host,
    port,
    secure,
    // 465 -> implicit TLS. 587 -> STARTTLS is mandatory, so the credentials
    // are never sent in clear text.
    requireTLS: !secure,
    auth: { user, pass },
    // Certificate verification stays on (node's default): never disable it.
    tls: { rejectUnauthorized: true },
    // A stalled SMTP connection must not hang the request.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export async function sendMail({ to, subject, html, replyTo }: MailOptions) {
  const { from } = smtpConfig();
  const fromName = process.env.SMTP_FROM_NAME;

  try {
    return await createTransport().sendMail({
      from: fromName ? { name: fromName, address: from } : from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (err) {
    const error = err as { code?: string; response?: string; responseCode?: number; message?: string };
    throw new Error(
      redact(
        `Fallo al enviar por SMTP (${error.code ?? 'sin código'} ${error.responseCode ?? ''}): ${
          error.response ?? error.message ?? 'error desconocido'
        }`.trim()
      )
    );
  }
}

// Diagnostic: checks that the server accepts our credentials, without
// sending anything.
export async function verifySmtpConnection() {
  await createTransport().verify();
  const { host, port, secure, user, from } = smtpConfig();
  return { host, port, secure, user, from };
}

// Templates use {{variable}} placeholders — anything not passed in `vars` is
// dropped rather than left as a literal "{{...}}" in the sent email.
export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => vars[key] ?? '');
}
