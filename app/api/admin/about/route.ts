import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { aboutContentSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const about = await prisma.aboutContent.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main' },
  });
  return NextResponse.json(about);
}

export async function PUT(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = aboutContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const about = await prisma.aboutContent.upsert({
    where: { id: 'main' },
    update: parsed.data,
    create: { id: 'main', ...parsed.data },
  });
  revalidatePath('/nosotros');
  return NextResponse.json(about);
}
