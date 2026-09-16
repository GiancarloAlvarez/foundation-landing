'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2, Mail, MailOpen, Loader2 } from 'lucide-react';
import type { ContactMessage } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function MessagesTable({ initialData }: { initialData: ContactMessage[] }) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const toggleRead = async (message: ContactMessage) => {
    setBusyId(message.id);
    const res = await fetch(`/api/admin/messages/${message.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !message.read }),
    });
    setBusyId(null);
    if (!res.ok) {
      toast.error('No se pudo actualizar el mensaje');
      return;
    }
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    const res = await fetch(`/api/admin/messages/${deleteTarget.id}`, { method: 'DELETE' });
    setBusyId(null);
    if (!res.ok) {
      toast.error('No se pudo eliminar');
      return;
    }
    toast.success('Mensaje eliminado');
    setDeleteTarget(null);
    router.refresh();
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estado</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden sm:table-cell">Correo</TableHead>
              <TableHead className="hidden md:table-cell">Motivo</TableHead>
              <TableHead className="hidden lg:table-cell">Mensaje</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8 whitespace-normal">
                  No hay mensajes todavía
                </TableCell>
              </TableRow>
            )}
            {initialData.map((message) => (
              <TableRow key={message.id} className={message.read ? '' : 'bg-primary/5'}>
                <TableCell>
                  <Badge variant={message.read ? 'secondary' : 'default'}>
                    {message.read ? 'Leído' : 'Nuevo'}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {message.name}
                  <p className="sm:hidden text-xs text-muted-foreground font-normal truncate max-w-[140px]">{message.email}</p>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{message.email}</TableCell>
                <TableCell className="hidden md:table-cell">{message.reason}</TableCell>
                <TableCell className="hidden lg:table-cell max-w-xs truncate">{message.message}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(message.createdAt).toLocaleString('es-DO')}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={busyId === message.id}
                    onClick={() => toggleRead(message)}
                    title={message.read ? 'Marcar como no leído' : 'Marcar como leído'}
                  >
                    {busyId === message.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : message.read ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <MailOpen className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(message)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar mensaje?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
