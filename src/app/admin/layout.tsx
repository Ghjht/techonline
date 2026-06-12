"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getLogo } from "@/data/settingsStore";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Produits", icon: "📦" },
  { href: "/admin/categories", label: "Catégories", icon: "🏷️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [logo, setLogo] = useState("");

  useEffect(() => { setLogo(getLogo()); }, []);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-5 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            {logo ? <img src={logo} alt="Logo" className="h-6 w-6 object-contain" /> : <img src="/logo.svg" alt="Tech-IT" className="h-6 w-auto" />}
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">Administration</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
              {user.name[0]}
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.role}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full text-xs text-gray-400 hover:text-white text-left transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-around py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center text-xs text-gray-500 hover:text-primary-600">
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <main className="flex-1 bg-gray-50 pb-16 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
