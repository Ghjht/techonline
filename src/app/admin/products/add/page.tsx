"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/productStore";
import { addProduct } from "@/data/productStore";
import MultiImageUpload from "@/components/MultiImageUpload";
import FeaturesSpecsEditor from "@/components/FeaturesSpecsEditor";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", category: "", brand: "", description: "", price: "", stock: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState<Record<string, string>>({ "": "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: form.name,
      category: form.category,
      brand: form.brand,
      description: form.description,
      price: parseInt(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      images,
      features: features.filter((f) => f.trim()),
      specs: Object.fromEntries(Object.entries(specs).filter(([k, v]) => k.trim() && v.trim())),
    });
    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select name="category" required value={form.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white">
              <option value="">Sélectionner</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
            <input type="text" name="brand" required value={form.brand} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" required value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (en DH)</label>
            <input type="number" name="price" required value={form.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input type="number" name="stock" required value={form.stock} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
          <div className="sm:col-span-2">
            <MultiImageUpload images={images} onChange={setImages} />
          </div>
          <div className="sm:col-span-2">
            <FeaturesSpecsEditor
              features={features}
              specs={specs}
              onFeaturesChange={setFeatures}
              onSpecsChange={setSpecs}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">Enregistrer</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">Annuler</button>
        </div>
      </form>
    </div>
  );
}
