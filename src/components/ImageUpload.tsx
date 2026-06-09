"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState(value);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Veuillez sélectionner une image.");

    if (file.size > 5 * 1024 * 1024) return alert("L'image ne doit pas dépasser 5 Mo.");

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      onChange(dataUrl);
      setUploading(false);
    };
    reader.onerror = () => { setUploading(false); alert("Erreur lors de la lecture du fichier."); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Image</label>

      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-block bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              {uploading ? "Upload en cours..." : "Choisir un fichier"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>
            {preview && (
              <button
                type="button"
                onClick={() => { setPreview(""); onChange(""); if (fileRef.current) fileRef.current.value = ""; }}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Supprimer
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="border-t border-gray-300 flex-1" />
            <span>ou URL</span>
            <span className="border-t border-gray-300 flex-1" />
          </div>

          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
            placeholder="https://exemple.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
