"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/productStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Explorez notre catalogue et ajoutez des produits.</p>
        <Link href="/" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Votre Panier ({totalItems} articles)</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Vider le panier
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex gap-4">
            <Link href={`/products/${item.product.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.product.slug}`}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.product.brand}</p>
              <p className="font-bold text-gray-900 dark:text-gray-100 mt-1">{formatPrice(item.product.price * item.quantity)}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-medium text-gray-900 dark:text-gray-100 border-x border-gray-300 dark:border-gray-600 min-w-[2.5rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  aria-label="Supprimer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 dark:text-gray-300">Sous-total</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Livraison</span>
          <span>Offerte</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Total</span>
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(totalPrice)}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-3 rounded-lg transition-colors"
        >
          Commander
        </Link>
      </div>
    </div>
  );
}
