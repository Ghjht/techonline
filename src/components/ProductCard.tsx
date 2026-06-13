"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/data/productStore";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1">
      <Link href={product.stock > 0 ? `/products/${product.slug}` : "#"} className="block">
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${product.stock === 0 ? "opacity-50" : ""}`}
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Nouveau</span>
            )}
            {product.stock === 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Rupture</span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.brand}</span>
        <Link href={product.stock > 0 ? `/products/${product.slug}` : "#"}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1 mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-sm mb-3">
          <span className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</span>
          <span className="text-gray-400 dark:text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</span>
          </div>
        </div>

        <Link
          href={product.stock > 0 ? `/product-inquiry/${product.slug}` : "#"}
          className={`mt-3 w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-colors ${
            product.stock === 0
              ? "bg-gray-300 dark:bg-gray-600 text-white cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {product.stock === 0 ? "Rupture de stock" : "Contacter via WhatsApp"}
        </Link>
      </div>
    </div>
  );
}
