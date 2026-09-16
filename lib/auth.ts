import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE, signSession, verifySessionToken } from '@/lib/session';

// Cost factor 12 (~250ms/hash on modern hardware) — a deliberate step up from
// the common default of 10, raising the cost of offline brute-forcing a
// leaked hash without making interactive login noticeably slower.
const BCRYPT_COST = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionCookie(adminId: string) {
  const token = await signSession(adminId);
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  (await cookies()).set(SESSION_COOKIE_NAME, '', { path: '/', maxAge: 0 });
}

export async function getCurrentAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;
  return prisma.admin.findUnique({ where: { id: session.adminId } });
}

// Edge middleware only verifies the JWT's signature/expiry — it can't check
// the database, so a deleted admin's existing cookie would otherwise stay
// "valid" for up to SESSION_MAX_AGE. Route handlers run in the Node runtime,
// so this re-verifies against the database on every request for immediate
// revocation: deleting an admin (or their session cookie) takes effect on
// their very next request, not after the token happens to expire.
export async function requireAdmin() {
  return getCurrentAdmin();
}
