import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { createSessionCookie, verifyPassword } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(200),
});

// Precomputed dummy hash so a lookup miss still pays the bcrypt cost — avoids
// a timing side-channel that would otherwise let an attacker distinguish
// "email not found" (fast) from "wrong password" (slow) and enumerate admins.
const DUMMY_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8Nf3XR8Tqz5C1e5jknz.jP0K6z0oT6';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, retryAfterMs } = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email } });
  const valid = await verifyPassword(parsed.data.password, admin?.passwordHash ?? DUMMY_HASH);

  if (!admin || !valid) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  await createSessionCookie(admin.id);
  return NextResponse.json({ ok: true });
}
