import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

// next start snapshots the public/ directory listing once at boot, so files
// the admin uploads at runtime 404 (both raw and through /_next/image) until
// the process restarts. This route reads straight from disk on every
// request instead, so freshly uploaded files are served immediately.

const EXTENSION_TO_CONTENT_TYPE: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
};

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const segments = (await params).path ?? [];
  if (segments.length === 0 || segments.some((s) => s.includes('..') || s.includes('/') || s.includes('\\'))) {
    return new NextResponse('Not found', { status: 404 });
  }

  const extension = path.extname(segments[segments.length - 1]).toLowerCase();
  const contentType = EXTENSION_TO_CONTENT_TYPE[extension];
  if (!contentType) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', ...segments);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse('Not found', { status: 404 });
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(info.size),
        // Each upload gets a random UUID filename, so a given URL's content never changes.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
