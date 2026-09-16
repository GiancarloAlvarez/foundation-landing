import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { emailTemplateSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth';

// Only these two fixed templates exist — one per place the contact flow
// sends mail from (see lib/contact-notifications.ts).
const ALLOWED_IDS = new Set(['confirmation', 'notification']);

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { id } = await params;
  if (!ALLOWED_IDS.has(id)) {
    return NextResponse.json({ error: 'Plantilla inválida' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = emailTemplateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const template = await prisma.emailTemplate.upsert({
    where: { id },
    update: parsed.data,
    create: { id, ...parsed.data },
  });
  return NextResponse.json(template);
}
