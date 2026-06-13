"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { categories, formatPrice } from "@/data/productStore";
import { getProductBySlug } from "@/data/productStore";
import { getAllProducts } from "@/data/productStore";
import { products as staticProducts } from "@/data/products";
import { ProductDetailSkeleton } from "@/components/Skeleton";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(staticProducts.find((p) => p.slug === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProduct(getProductBySlug(id));
    setLoading(false);
  }, [id]);

  const relatedProducts = product
    ? getAllProducts().filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Produit non trouvé</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">&larr; Retour à l&apos;accueil</Link>
      </div>
    );
  }

  const allImages = [product.image, ...product.images];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href={`/#produits`} className="hover:text-primary-600">{categories.find((c) => c.id === product.category)?.name || product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                    idx === selectedImage ? "border-primary-500" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.brand}</span>
            {product.isNew && <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Nouveau</span>}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} / 5</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">({product.reviews} avis)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 text-sm mb-6">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-gray-600 dark:text-gray-300">{product.stock > 0 ? "En stock" : "Rupture de stock"}</span>
          </div>

          <Link
            href={product.stock > 0 ? `/product-inquiry/${product.slug}` : "#"}
            className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-medium text-white transition-all ${
              product.stock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {product.stock === 0 ? "Rupture de stock" : "Contacter via WhatsApp"}
          </Link>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Caractéristiques</h3>
            <ul className="space-y-1">
              {product.features.map((f, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">Partager :</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${formatPrice(product.price)} ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Partager sur WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Partager sur Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Spécifications techniques</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {Object.entries(product.specs).map(([key, value], idx) => (
            <div key={key} className={`flex px-6 py-3 ${idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}`}>
              <span className="w-1/2 text-sm font-medium text-gray-900 dark:text-gray-100">{key}</span>
              <span className="w-1/2 text-sm text-gray-600 dark:text-gray-300">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Vous pourriez aussi aimer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
