import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendContactNotifications } from '@/lib/contact-notifications';

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional(),
  reason: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, retryAfterMs } = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados mensajes enviados. Intenta de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const message = await prisma.contactMessage.create({ data: parsed.data });

  // Not awaited: an SMTP hiccup must never delay or fail the visitor's
  // submission, which is already safely saved above.
  sendContactNotifications(message).catch((err) => console.error('Error enviando correos de contacto:', err));

  return NextResponse.json({ ok: true });
}
