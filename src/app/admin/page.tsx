"use client";

import { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import { categories, formatPrice } from "@/data/productStore";
import { getAllProducts } from "@/data/productStore";
import { getLogo, setLogo, removeLogo } from "@/data/settingsStore";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [logo, setLogoState] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => { (async () => { setProducts(await getAllProducts()); })(); setLogoState(getLogo()); }, []);

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Veuillez sélectionner une image.");
    if (file.size > 2 * 1024 * 1024) return alert("L'image ne doit pas dépasser 2 Mo.");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setLogo(dataUrl);
      setLogoState(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    removeLogo();
    setLogoState("");
  };

  const stockLow = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const newThisMonth = products.filter((p) => {
    const d = new Date(p.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { label: "Produits total", value: products.length, icon: "📦" },
    { label: "Catégories", value: categories.length, icon: "🏷️" },
    { label: "Stock < 10", value: stockLow, icon: "⚠️" },
    { label: "Rupture stock", value: outOfStock, icon: "🚫" },
    { label: "Valeur stock", value: formatPrice(totalValue), icon: "💰" },
    { label: "Nouveautés", value: newThisMonth, icon: "✨" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Logo du site</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden flex items-center justify-center flex-shrink-0">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <span className="text-xs text-gray-400">Aucun</span>
            )}
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              {logo ? "Changer" : "Ajouter"}
              <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoFile} className="hidden" />
            </label>
            {logo && (
              <button onClick={handleRemoveLogo} className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Produits par catégorie</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {categories.map((cat, idx) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const value = products.filter((p) => p.category === cat.id).reduce((s, p) => s + p.price * p.stock, 0);
            return (
              <div key={cat.id} className={`flex items-center justify-between px-6 py-3 ${idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{cat.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{count} produits</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{formatPrice(value)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Stock faible</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Produit</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Catégorie</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Stock</th>
                <th className="text-right px-6 py-3 font-medium text-gray-500 dark:text-gray-400">Prix</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((p) => p.stock <= 10)
                .sort((a, b) => a.stock - b.stock)
                .map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"}>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">{p.name}</td>
                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{categories.find((c) => c.id === p.category)?.name}</td>
                    <td className={`px-6 py-3 text-right font-medium ${p.stock === 0 ? "text-red-600" : "text-yellow-600"}`}>{p.stock}</td>
                    <td className="px-6 py-3 text-right text-gray-700 dark:text-gray-300">{formatPrice(p.price)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
