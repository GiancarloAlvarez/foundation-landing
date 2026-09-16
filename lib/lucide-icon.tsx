import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function resolveIcon(name: string | null | undefined, fallback: LucideIcon = Icons.Sparkles): LucideIcon {
  if (!name) return fallback;
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? fallback;
}
