"use client";

import { useRef } from "react";
import Image from "next/image";

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({ images, onChange, maxImages = 10 }: MultiImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > maxImages) {
      return alert(`Maximum ${maxImages} images.`);
    }
    const remaining = maxImages - images.length;
    const toProcess = files.slice(0, remaining);
    const newImages: string[] = [];
    let done = 0;

    toProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" dépasse 5 Mo.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImages.push(ev.target?.result as string);
        done++;
        if (done === toProcess.length) {
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = "";
  };

  const addUrl = () => {
    const url = urlRef.current?.value?.trim();
    if (!url) return;
    if (images.length >= maxImages) return alert(`Maximum ${maxImages} images.`);
    onChange([...images, url]);
    if (urlRef.current) urlRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const arr = [...images];
    [arr[from], arr[to]] = [arr[to], arr[from]];
    onChange(arr);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Images ({images.length}/{maxImages})</label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="group relative aspect-square bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
              <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => moveImage(idx, idx - 1)}
                  disabled={idx === 0}
                  className="p-1 bg-white/90 rounded text-gray-700 hover:bg-white disabled:opacity-30 text-xs"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(idx, idx + 1)}
                  disabled={idx === images.length - 1}
                  className="p-1 bg-white/90 rounded text-gray-700 hover:bg-white disabled:opacity-30 text-xs"
                >
                  ▶
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1 bg-red-500/90 rounded text-white hover:bg-red-600 text-xs"
                >
                  ✕
                </button>
              </div>
              {idx === 0 && <span className="absolute bottom-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Principale</span>}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Ajouter des fichiers
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        </label>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span className="border-t border-gray-300 w-8" />
          <span>ou</span>
          <span className="border-t border-gray-300 w-8" />
        </div>

        <div className="flex-1 flex gap-2">
          <input ref={urlRef} type="url" placeholder="URL image..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          <button type="button" onClick={addUrl} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">Ajouter</button>
        </div>
      </div>
    </div>
  );
}
