import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { adminUserUpdateSchema } from '@/lib/validators';
import { requireAdmin, hashPassword } from '@/lib/auth';

const SAFE_SELECT = { id: true, name: true, email: true, createdAt: true, updatedAt: true };

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = adminUserUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { password, ...rest } = parsed.data;
  const data: Prisma.AdminUpdateInput = { ...rest };
  if (password) {
    data.passwordHash = await hashPassword(password);
  }

  try {
    const user = await prisma.admin.update({ where: { id }, data, select: SAFE_SELECT });
    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Ya existe un usuario con ese correo' }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const { id } = await params;
  const totalAdmins = await prisma.admin.count();
  if (totalAdmins <= 1) {
    return NextResponse.json(
      { error: 'No puedes eliminar el único usuario administrador' },
      { status: 400 }
    );
  }

  await prisma.admin.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
