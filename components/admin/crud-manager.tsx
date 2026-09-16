'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageUploadField } from '@/components/admin/image-upload-field';

export type CrudField =
  | { type: 'text' | 'number' | 'date'; name: string; label: string; required?: boolean }
  | { type: 'textarea'; name: string; label: string; required?: boolean }
  | { type: 'select'; name: string; label: string; options: { value: string; label: string }[]; required?: boolean }
  | { type: 'image'; name: string; label: string; category: string; accept?: string }
  // Required only applies when creating — on edit the field is always optional
  // (blank = keep the current password) and never gets a "required" error.
  | { type: 'password'; name: string; label: string; required?: boolean; editHint?: string };

export interface CrudColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface CrudManagerProps<T extends { id: string }> {
  apiPath: string;
  entityLabel: string;
  columns: CrudColumn<T>[];
  fields: CrudField[];
  initialData: T[];
  defaultValues?: Record<string, any>;
}

const EMPTY_SENTINEL = '__none__';

function toDateInputValue(value: unknown) {
  if (!value) return '';
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export function CrudManager<T extends { id: string }>({
  apiPath,
  entityLabel,
  columns,
  fields,
  initialData,
  defaultValues = {},
}: CrudManagerProps<T>) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, control, reset, formState: { isSubmitting, errors } } = useForm<Record<string, any>>({
    defaultValues,
  });

  const openCreate = () => {
    setEditingRow(null);
    reset(defaultValues);
    setDialogOpen(true);
  };

  const openEdit = (row: T) => {
    setEditingRow(row);
    const values: Record<string, any> = { ...row };
    for (const field of fields) {
      if (field.type === 'date') values[field.name] = toDateInputValue(values[field.name]);
    }
    reset(values);
    setDialogOpen(true);
  };

  const onSubmit = async (rawData: Record<string, any>) => {
    // Blank password on edit means "keep the current one" — never send an
    // empty string, which would otherwise fail the backend's min-length check.
    const data = { ...rawData };
    for (const field of fields) {
      if (field.type === 'password' && !data[field.name]) delete data[field.name];
    }

    const url = editingRow ? `${apiPath}/${editingRow.id}` : apiPath;
    const method = editingRow ? 'PATCH' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message = typeof body?.error === 'string' ? body.error : `No se pudo guardar ${entityLabel.toLowerCase()}`;
      toast.error(message);
      return;
    }
    toast.success(editingRow ? 'Actualizado correctamente' : 'Creado correctamente');
    setDialogOpen(false);
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`${apiPath}/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleting(false);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      toast.error(typeof body?.error === 'string' ? body.error : 'No se pudo eliminar');
      return;
    }
    toast.success('Eliminado correctamente');
    setDeleteTarget(null);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Nuevo
        </Button>
      </div>

      {/* Mobile: stacked cards — a table's columns don't fit a phone screen
          without cutting off "Acciones" and forcing a sideways scroll. */}
      <div className="sm:hidden space-y-3">
        {initialData.length === 0 && (
          <div className="rounded-md border py-8 text-center text-sm text-muted-foreground">
            Sin registros todavía
          </div>
        )}
        {initialData.map((row) => (
          <div key={row.id} className="rounded-md border p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex items-start justify-between gap-3 text-sm">
                <span className="text-muted-foreground shrink-0">{col.label}</span>
                <span className="text-right break-words min-w-0">
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                </span>
              </div>
            ))}
            <div className="flex justify-end gap-1 border-t pt-2 mt-2">
              <Button variant="ghost" size="icon-sm" onClick={() => openEdit(row)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(row)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and up: table */}
      <div className="hidden sm:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                  Sin registros todavía
                </TableCell>
              </TableRow>
            )}
            {initialData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </TableCell>
                ))}
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => openEdit(row)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => setDeleteTarget(row)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRow ? `Editar ${entityLabel.toLowerCase()}` : `Nuevo ${entityLabel.toLowerCase()}`}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === 'textarea' && (
                  <Textarea id={field.name} rows={4} {...register(field.name, { required: field.required })} />
                )}
                {field.type === 'text' && (
                  <Input id={field.name} type="text" {...register(field.name, { required: field.required })} />
                )}
                {field.type === 'number' && (
                  <Input id={field.name} type="number" {...register(field.name, { required: field.required, valueAsNumber: true })} />
                )}
                {field.type === 'date' && (
                  <Input id={field.name} type="date" {...register(field.name, { required: field.required })} />
                )}
                {field.type === 'password' && (
                  <>
                    <Input
                      id={field.name}
                      type="password"
                      autoComplete="new-password"
                      placeholder={editingRow ? 'Dejar en blanco para no cambiarla' : undefined}
                      {...register(field.name, { required: field.required && !editingRow, minLength: { value: 8, message: 'Mínimo 8 caracteres' } })}
                    />
                    {editingRow && field.editHint && <p className="text-xs text-muted-foreground">{field.editHint}</p>}
                    {errors[field.name] && <p className="text-xs text-destructive">{String(errors[field.name]?.message)}</p>}
                  </>
                )}
                {field.type === 'select' && (
                  <Controller
                    name={field.name}
                    control={control}
                    rules={{ required: field.required }}
                    render={({ field: ctrlField }) => (
                      <Select
                        value={!ctrlField.value ? EMPTY_SENTINEL : ctrlField.value}
                        onValueChange={(v) => ctrlField.onChange(v === EMPTY_SENTINEL ? '' : v)}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((opt) => (
                            <SelectItem key={opt.value || EMPTY_SENTINEL} value={opt.value === '' ? EMPTY_SENTINEL : opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}
                {field.type === 'image' && (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: ctrlField }) => (
                      <ImageUploadField
                        value={ctrlField.value ?? ''}
                        onChange={ctrlField.onChange}
                        category={field.category}
                        accept={field.accept}
                      />
                    )}
                  />
                )}
              </div>
            ))}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar {entityLabel.toLowerCase()}?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
