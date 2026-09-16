import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { siteSettingsSchema } from '@/lib/validators';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Settings feed the shared (public) layout (footer, WhatsApp button) plus
// the Contacto page's info panel/map — every public route needs revalidating.
const PUBLIC_PATHS = ['/', '/nosotros', '/programas', '/aliados', '/galeria', '/evidencias', '/transparencia', '/contacto'];

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: { id: 'main' },
  });
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = siteSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: parsed.data,
    create: { id: 'main', ...parsed.data },
  });
  for (const path of PUBLIC_PATHS) revalidatePath(path);
  return NextResponse.json(settings);
}
