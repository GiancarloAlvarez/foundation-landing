import { redirect } from 'next/navigation';
import { AppShell } from '@/components/layouts/app-shell';
import { AdminSidebarNav } from '@/components/admin/admin-sidebar-nav';
import { LogoutButton } from '@/components/admin/logout-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { getCurrentAdmin } from '@/lib/auth';

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  // Middleware only checks the JWT's signature/expiry (Edge runtime can't
  // query the database) — this re-verifies the admin still exists so a
  // revoked/deleted account is locked out on its very next page load rather
  // than whenever its token happens to expire.
  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <AppShell
      sidebar={<AdminSidebarNav />}
      header={
        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <span className="text-sm text-muted-foreground truncate hidden sm:inline">{admin?.email}</span>
          <ThemeToggle className="text-muted-foreground hover:text-foreground ml-auto sm:ml-0" />
          <LogoutButton />
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
