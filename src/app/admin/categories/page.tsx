"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { categories } from "@/data/productStore";
import { getAllProducts } from "@/data/productStore";

export default function AdminCategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { setProducts(getAllProducts()); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Catégories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat.id);
          const stockValue = catProducts.reduce((s, p) => s + p.price * p.stock, 0);
          return (
            <div key={cat.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{cat.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{catProducts.length} produits</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>Valeur stock: {new Intl.NumberFormat("fr-FR", { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: false }).format(stockValue)} DH</p>
                <p>Marques: {Array.from(new Set(catProducts.map((p) => p.brand))).join(", ")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
