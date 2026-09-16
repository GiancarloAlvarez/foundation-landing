'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-auto">
      <LogOut className="w-4 h-4" />
      Cerrar sesión
    </Button>
  );
}
