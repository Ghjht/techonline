"use client";

import { useState, useMemo, useEffect } from "react";
import { categories, formatPrice, getAllProducts, getFeaturedProducts } from "@/data/productStore";
import { products as staticProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "newest">("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(staticProducts);
  const [featured, setFeatured] = useState(staticProducts.filter((p) => p.isFeatured));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const all = await getAllProducts();
      setProducts(all);
      setFeatured(all.filter((p) => p.isFeatured));
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery, products]);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl animate-slideUp">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Matériel Informatique<br />Haut de Gamme
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Découvrez notre sélection de composants premium pour PC gaming, stations de travail et serveurs.
              Processeurs, cartes graphiques, RAM, stockage NVMe et plus encore.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#produits" className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                Voir les produits
              </a>
              <a href="#categories" className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg backdrop-blur-sm transition-colors">
                Parcourir par catégorie
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`animate-scaleIn flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700 shadow-sm"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-sm"
                }`}
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className={`text-xs font-medium text-center ${isActive ? "text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300"}`}>
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{count} produits</span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="produits" className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : "Tous les produits"}
            <span className="text-gray-400 dark:text-gray-500 text-lg font-normal ml-2">({filtered.length})</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="popular">Les plus populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">Aucun produit trouvé</p>
            <p className="text-sm mt-1">Essayez de modifier vos filtres de recherche.</p>
          </div>
        )}
      </section>

      {!selectedCategory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Produits en Vedette</h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </section>
      )}

      <section className="bg-primary-50 dark:bg-gray-800/50 mt-20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Besoin d&apos;aide ?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto">
            Notre équipe est disponible 7j/7 pour vous accompagner dans vos achats.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <span className="text-3xl block mb-3">📞</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Support Expert</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Service client 7j/7</p>
              <a href="tel:+212728697150" className="inline-block mt-3 text-sm font-medium text-primary-600 hover:text-primary-700">+212 7 28 69 71 50</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <span className="text-3xl block mb-3">✉️</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Réponse sous 24h</p>
              <a href="mailto:helpstechit@gmail.com" className="inline-block mt-3 text-sm font-medium text-primary-600 hover:text-primary-700">helpstechit@gmail.com</a>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <span className="text-3xl block mb-3">📍</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Notre Magasin</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rabat, Maroc</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rue Al Karam N°280 CYM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
