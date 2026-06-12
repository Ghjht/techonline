import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaviconSetter from "@/components/FaviconSetter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech-IT - Matériel Informatique Haut de Gamme",
  description: "Tech-IT - Votre boutique en ligne de matériel informatique professionnel : processeurs, cartes graphiques, RAM, stockage et plus.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <FaviconSetter />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
