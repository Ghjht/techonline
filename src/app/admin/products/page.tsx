"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { categories, formatPrice, deleteProduct } from "@/data/productStore";
import { getAllProducts } from "@/data/productStore";
import { useToast } from "@/components/Toast";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => { (async () => { setProducts(await getAllProducts()); })(); }, []);

  const refresh = async () => setProducts(await getAllProducts());

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteProduct(deleteTarget.id);
    await refresh();
    toast("Produit supprimé", "success");
    setDeleteTarget(null);
  };

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Produits ({products.length})</h1>
        <Link
          href="/admin/products/add"
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Ajouter
        </Link>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Desktop table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Produit</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Catégorie</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Marque</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Prix</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Stock</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 object-cover flex-shrink-0" />
                    <span className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{categories.find((c) => c.id === p.category)?.name}</td>
                <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{p.brand}</td>
                <td className="px-6 py-3 text-right font-medium text-gray-900 dark:text-gray-100">{formatPrice(p.price)}</td>
                <td className={`px-6 py-3 text-right font-medium ${p.stock <= 5 ? "text-red-600" : "text-gray-900 dark:text-gray-100"}`}>{p.stock}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">Modifier</Link>
                    <button onClick={() => setDeleteTarget(p)} className="text-red-600 hover:text-red-700 text-sm font-medium">Suppr.</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex gap-3">
              <img src={p.image} alt="" className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{categories.find((c) => c.id === p.category)?.name} · {p.brand}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{formatPrice(p.price)}</span>
                  <span className={`text-xs font-medium ${p.stock <= 5 ? "text-red-600" : "text-gray-600 dark:text-gray-400"}`}>
                    Stock: {p.stock}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Link href={`/admin/products/${p.id}/edit`} className="flex-1 text-center text-sm font-medium text-primary-600 hover:text-primary-700 py-2 border border-primary-200 dark:border-primary-800 rounded-lg">Modifier</Link>
              <button onClick={() => setDeleteTarget(p)} className="flex-1 text-sm font-medium text-red-600 hover:text-red-700 py-2 border border-red-200 dark:border-red-800 rounded-lg">Supprimer</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">Aucun produit trouvé</div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer le produit"
        message={`Voulez-vous vraiment supprimer "${deleteTarget?.name}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
