/**
 * Standalone SMTP diagnostic.
 *
 * It deliberately does NOT import `@/lib/mail`: that module is marked with
 * `server-only`, which only resolves inside Next.js. This script reproduces
 * the same transport settings to check credentials and connectivity without
 * touching the database or the application code.
 *
 * Usage: npx tsx --require dotenv/config scripts/test-mail.ts
 */
import nodemailer from 'nodemailer';

function redact(text: string): string {
  let output = text;
  const secret = process.env.SMTP_PASS;
  if (secret) output = output.split(secret).join('***');
  return output.replace(/xsmtpsib-[A-Za-z0-9_-]+/gi, '***');
}

async function main() {
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

  console.log('1/2 Comprobando la configuración SMTP...');
  const transporter = nodemailer.createTransport({
    host: host!,
    port,
    secure,
    requireTLS: !secure,
    auth: { user: user!, pass: pass! },
    tls: { rejectUnauthorized: true },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.verify();
  } catch (err) {
    const error = err as { code?: string; response?: string };
    console.error('   ❌', redact(`${error.code ?? ''} ${error.response ?? (err as Error).message}`));
    if (String(error.response).includes('5.7.8') || String(error.response).includes('5.7.139')) {
      console.error(
        '   → Revisa que SMTP_USER sea el login del panel de Brevo y SMTP_PASS la SMTP key\n' +
          '     (no la contraseña de la cuenta ni la API key).'
      );
    }
    if (String(error.response).includes('550')) {
      console.error('   → El remitente no está verificado en Brevo (Senders & IP → Senders).');
    }
    throw err;
  }
  console.log(`   ✅ ${host}:${port} acepta las credenciales — remitente ${from}`);

  console.log('2/2 Enviando un correo de prueba...');
  const to = process.env.TEST_RECIPIENT || process.env.SMTP_REPLY_TO || from!;
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM_NAME
      ? { name: process.env.SMTP_FROM_NAME, address: from! }
      : from!,
    to,
    subject: 'Prueba de correo — FUMABLAC',
    html: '<p>Si recibes este mensaje, el envío de correo del sitio funciona.</p>',
  });
  console.log(`   ✅ enviado a ${to} — ${info.messageId}`);
}

main().catch((err) => {
  console.error('\n❌', redact(err instanceof Error ? err.message : String(err)));
  process.exit(1);
});
