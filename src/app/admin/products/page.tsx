"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { categories, formatPrice, deleteProduct } from "@/data/productStore";
import { getAllProducts } from "@/data/productStore";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");

  useEffect(() => { setProducts(getAllProducts()); }, []);

  const refresh = () => setProducts(getAllProducts());

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Produits ({products.length})</h1>
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
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full max-w-xs"
        />
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Produit</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 hidden md:table-cell">Catégorie</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500 hidden sm:table-cell">Marque</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Prix</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Stock</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg bg-gray-100 object-cover flex-shrink-0" />
                    <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-500 hidden md:table-cell">{categories.find((c) => c.id === p.category)?.name}</td>
                <td className="px-6 py-3 text-gray-500 hidden sm:table-cell">{p.brand}</td>
                <td className="px-6 py-3 text-right font-medium text-gray-900">{formatPrice(p.price)}</td>
                <td className={`px-6 py-3 text-right font-medium ${p.stock <= 5 ? "text-red-600" : "text-gray-900"}`}>{p.stock}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => { if (confirm("Supprimer ce produit ?")) { deleteProduct(p.id); refresh(); } }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Suppr.
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
