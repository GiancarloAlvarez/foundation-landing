'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface SingletonField {
  type: 'text' | 'textarea';
  name: string;
  label: string;
}

interface SingletonFormProps {
  apiPath: string;
  fields: SingletonField[];
  initialData: Record<string, any>;
}

export function SingletonForm({ apiPath, fields, initialData }: SingletonFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: initialData });

  const onSubmit = async (data: Record<string, any>) => {
    const res = await fetch(apiPath, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error('No se pudo guardar');
      return;
    }
    toast.success('Guardado correctamente');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === 'textarea' ? (
            <Textarea id={field.name} rows={5} {...register(field.name)} />
          ) : (
            <Input id={field.name} type="text" {...register(field.name)} />
          )}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Guardar cambios
      </Button>
    </form>
  );
}
