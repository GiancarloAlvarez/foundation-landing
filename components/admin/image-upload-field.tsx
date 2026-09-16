'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Cropper, { type Area } from 'react-easy-crop';
import { Loader2, Upload, X, Crop as CropIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getCroppedImageBlob } from '@/lib/crop-image';
import { toast } from 'sonner';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  category: string;
  accept?: string;
}

const ASPECT_OPTIONS: { label: string; value: number | undefined }[] = [
  { label: 'Libre', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];

export function ImageUploadField({ value, onChange, category, accept = 'image/*' }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropMimeType, setCropMimeType] = useState('image/jpeg');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const isImage = value && /\.(png|jpe?g|webp|gif)$/i.test(value);

  const upload = async (fileOrBlob: File | Blob, filename: string) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', fileOrBlob, filename);
      formData.append('category', category);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const body = await res.json();
      if (!res.ok) {
        toast.error(body?.error ?? 'No se pudo subir el archivo');
        return;
      }
      onChange(body.url);
    } catch {
      toast.error('No se pudo subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const openCropperForFile = (file: File) => {
    setCropMimeType(file.type);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropSrc(URL.createObjectURL(file));
  };

  const openCropperForCurrentImage = () => {
    if (!value) return;
    setCropMimeType(value.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropSrc(value);
  };

  const closeCropper = () => {
    if (cropSrc?.startsWith('blob:')) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  };

  const confirmCrop = async () => {
    if (!cropSrc || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImageBlob(cropSrc, croppedAreaPixels, cropMimeType);
      const ext = cropMimeType === 'image/png' ? 'png' : 'jpg';
      closeCropper();
      await upload(blob, `recorte.${ext}`);
    } catch {
      toast.error('No se pudo recortar la imagen');
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="flex items-center gap-3 rounded-md border p-2">
          {isImage ? (
            <div className="relative w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
              <Image src={value} alt="" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
              Archivo
            </div>
          )}
          <span className="text-xs text-muted-foreground truncate flex-1">{value}</span>
          {isImage && (
            <Button type="button" variant="ghost" size="icon-sm" title="Recortar / ajustar" onClick={openCropperForCurrentImage}>
              <CropIcon className="w-4 h-4" />
            </Button>
          )}
          <Button type="button" variant="ghost" size="icon-sm" onClick={() => onChange('')}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) openCropperForFile(file);
          e.target.value = '';
        }}
      />
      <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {value ? 'Reemplazar archivo' : 'Subir archivo'}
      </Button>

      <Dialog open={!!cropSrc} onOpenChange={(open) => !open && closeCropper()}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Ajustar imagen</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-[360px] bg-muted rounded-md overflow-hidden">
            {cropSrc && (
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {ASPECT_OPTIONS.map((opt) => (
              <Button
                key={opt.label}
                type="button"
                size="sm"
                variant={aspect === opt.value ? 'default' : 'outline'}
                onClick={() => setAspect(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground shrink-0">Zoom</span>
            <Slider min={1} max={3} step={0.01} value={[zoom]} onValueChange={([v]) => setZoom(v)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeCropper}>
              Cancelar
            </Button>
            <Button type="button" disabled={uploading} onClick={confirmCrop}>
              {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
              Guardar recorte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
