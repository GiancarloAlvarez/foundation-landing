import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { adminUserCreateSchema } from '@/lib/validators';
import { requireAdmin, hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// passwordHash must never leave the server — select explicitly rather than
// relying on callers to strip it from a full-model fetch.
const SAFE_SELECT = { id: true, name: true, email: true, createdAt: true, updatedAt: true };

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const users = await prisma.admin.findMany({ select: SAFE_SELECT, orderBy: { createdAt: 'asc' } });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = adminUserCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  try {
    const user = await prisma.admin.create({
      data: { name: parsed.data.name, email: parsed.data.email, passwordHash },
      select: SAFE_SELECT,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe un usuario con ese correo' }, { status: 409 });
    }
    throw err;
  }
}
