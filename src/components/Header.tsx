"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getLogo } from "@/data/settingsStore";

export default function Header() {
  const { totalItems } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => { setLogo(getLogo()); }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            {logo ? <img src={logo} alt="Logo" className="h-8 w-8 object-contain" /> : <img src="/logo.svg" alt="Tech-IT" className="h-8 w-auto" />}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Accueil</Link>
            <Link href="/#categories" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Catégories</Link>
            <Link href="/#produits" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">Produits</Link>
            {isAdmin && (
              <Link href="/admin" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Admin</Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden sm:inline text-gray-500">{user.name}</span>
                <button onClick={logout} className="text-gray-400 hover:text-red-600 transition-colors text-sm">Déco</button>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors hidden sm:inline">Connexion</Link>
            )}

            <button
              onClick={toggle}
              className="p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              aria-label={dark ? "Mode clair" : "Mode sombre"}
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 pt-2 animate-fadeIn">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Accueil</Link>
            <Link href="/#categories" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Catégories</Link>
            <Link href="/#produits" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Produits</Link>
            {!user && <Link href="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Connexion</Link>}
            {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-primary-600 hover:text-primary-700">Admin</Link>}
            {user && <button onClick={() => { logout(); setMenuOpen(false); }} className="block py-2 text-sm font-medium text-red-600">Déconnexion</button>}
            <button onClick={() => { toggle(); setMenuOpen(false); }} className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              {dark ? "Mode clair" : "Mode sombre"}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
