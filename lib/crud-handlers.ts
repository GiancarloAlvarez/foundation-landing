import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import type { AnyZodObject } from 'zod';
import { requireAdmin } from '@/lib/auth';

type Delegate = {
  findMany: (args?: any) => Promise<any[]>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

function revalidate(paths: string[]) {
  for (const path of paths) revalidatePath(path);
}

const UNAUTHORIZED = () => NextResponse.json({ error: 'No autorizado' }, { status: 401 });

export function createCollectionHandlers(
  delegate: Delegate,
  schema: AnyZodObject,
  findManyArgs: any = { orderBy: { order: 'asc' } },
  revalidatePaths: string[] = []
) {
  async function GET() {
    if (!(await requireAdmin())) return UNAUTHORIZED();
    const items = await delegate.findMany(findManyArgs);
    return NextResponse.json(items);
  }

  async function POST(request: NextRequest) {
    if (!(await requireAdmin())) return UNAUTHORIZED();
    const body = await request.json().catch(() => null);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const item = await delegate.create({ data: parsed.data });
    revalidate(revalidatePaths);
    return NextResponse.json(item, { status: 201 });
  }

  return { GET, POST };
}

export function createItemHandlers(delegate: Delegate, schema: AnyZodObject, revalidatePaths: string[] = []) {
  async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin())) return UNAUTHORIZED();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }
    const parsed = schema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    // Only apply keys actually present in the request body — a schema-level
    // .default() must not silently overwrite fields the client omitted.
    const data = Object.fromEntries(
      Object.entries(parsed.data).filter(([key]) => key in body)
    );
    const item = await delegate.update({ where: { id }, data });
    revalidate(revalidatePaths);
    return NextResponse.json(item);
  }

  async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!(await requireAdmin())) return UNAUTHORIZED();
    const { id } = await params;
    await delegate.delete({ where: { id } });
    revalidate(revalidatePaths);
    return NextResponse.json({ ok: true });
  }

  return { PATCH, DELETE };
}
