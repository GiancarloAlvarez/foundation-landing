'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { adminNavGroups } from '@/lib/admin-nav';

export function AdminSidebarNav() {
  const pathname = usePathname() ?? '/admin';

  return (
    <nav className="flex flex-col gap-6">
      <Link href="/admin" className="font-display text-lg font-semibold px-2">
        FUMABLAC <span className="text-muted-foreground font-normal">admin</span>
      </Link>
      {adminNavGroups.map((group) => (
        <div key={group.label}>
          <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-2 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
