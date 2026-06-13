"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Product } from "@/types";
import { categories } from "@/data/productStore";
import { getProductById, updateProduct } from "@/data/productStore";
import Link from "next/link";
import { useToast } from "@/components/Toast";

const MultiImageUpload = dynamic(() => import("@/components/MultiImageUpload"), { ssr: false });
const FeaturesSpecsEditor = dynamic(() => import("@/components/FeaturesSpecsEditor"), { ssr: false });

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | undefined>();
  const [form, setForm] = useState({
    name: "", category: "", brand: "", description: "", price: "", stock: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState<Record<string, string>>({ "": "" });

  useEffect(() => {
    (async () => {
    const found = await getProductById(id);
    if (found) {
      setProduct(found);
      setForm({
        name: found.name,
        category: found.category,
        brand: found.brand,
        description: found.description,
        price: String(found.price),
        stock: String(found.stock),
      });
      setImages([found.image, ...found.images.filter((img) => img !== found.image)]);
      setFeatures(found.features.length > 0 ? found.features : [""]);
      setSpecs(Object.keys(found.specs).length > 0 ? found.specs : { "": "" });
    }
    })();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Produit non trouvé</h1>
        <Link href="/admin/products" className="text-primary-600 hover:text-primary-700">&larr; Retour</Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(id, {
      name: form.name,
      category: form.category,
      brand: form.brand,
      description: form.description,
      price: parseInt(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      image: images[0] || "",
      images,
      features: features.filter((f) => f.trim()),
      specs: Object.fromEntries(Object.entries(specs).filter(([k, v]) => k.trim() && v.trim())),
    });
    toast("Produit modifié avec succès", "success");
    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Modifier le produit</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
            <select name="category" required value={form.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marque</label>
            <input type="text" name="brand" required value={form.brand} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea name="description" required value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix (en DH)</label>
            <input type="number" name="price" required value={form.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
            <input type="number" name="stock" required value={form.stock} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
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
          <button type="button" onClick={() => router.back()} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">Annuler</button>
        </div>
      </form>
    </div>
  );
}
