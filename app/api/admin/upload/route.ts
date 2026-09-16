import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { requireAdmin } from '@/lib/auth';

const ALLOWED_CATEGORIES = new Set([
  'programs',
  'gallery',
  'activities',
  'allies',
  'evidences',
  'transparency',
  'team',
  'about',
]);

// Extension is derived from this map, never from the client-supplied
// filename or its Content-Type header — both are attacker-controlled and
// trusting either one allows extension smuggling (e.g. uploading a
// server-executable or script-bearing file disguised as an image).
const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
};

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'El archivo excede 10MB' }, { status: 413 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'Formulario inválido' }, { status: 400 });
  }

  const file = formData.get('file');
  const category = String(formData.get('category') ?? '');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });
  }
  if (!ALLOWED_CATEGORIES.has(category)) {
    return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
  }
  const extension = MIME_TO_EXTENSION[file.type];
  if (!extension) {
    return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'El archivo excede 10MB' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Verify actual file content matches the declared type (magic-byte check)
  // rather than trusting the browser-supplied Content-Type outright.
  if (!matchesSignature(buffer, file.type)) {
    return NextResponse.json({ error: 'El contenido del archivo no coincide con su tipo' }, { status: 400 });
  }

  const filename = `${randomUUID()}${extension}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${category}/${filename}` });
}

function matchesSignature(buffer: Buffer, mimeType: string): boolean {
  const bytes = buffer.subarray(0, 8);
  switch (mimeType) {
    case 'image/jpeg':
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case 'image/png':
      return bytes.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    case 'image/gif':
      return bytes.subarray(0, 6).toString('ascii') === 'GIF87a' || bytes.subarray(0, 6).toString('ascii') === 'GIF89a';
    case 'image/webp':
      return bytes.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
    case 'application/pdf':
      return bytes.subarray(0, 4).toString('ascii') === '%PDF';
    default:
      return false;
  }
}
