"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, categories } from "@/data/productStore";
import { formatPrice } from "@/data/productStore";
import { products as staticProducts } from "@/data/products";

const STORE_INFO = {
  name: "Tech-IT",
  address: "Rue Al Karam N°280 CYM, Rabat, Maroc",
  phone: "+212 7 28 69 71 50",
  whatsapp: "212728697150",
  email: "helpstechit@gmail.com",
  hours: "Lun-Sam: 10h00 - 19h00",
  mapEmbed: "https://www.google.com/maps?q=Rue+Al+Karam+N%C2%B0280+CYM+Rabat+Maroc&output=embed",
};

export default function ProductInquiryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState(staticProducts.find((p) => p.slug === slug));

  useEffect(() => {
    (async () => {
      setProduct(await getProductBySlug(slug));
    })();
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Produit non trouvé</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">&larr; Retour à l&apos;accueil</Link>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Bonjour, je suis intéressé par le produit suivant :\n\n*${product.name}*\nPrix : ${formatPrice(product.price)}\n\nMerci de me contacter pour plus d'informations.`
  );
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Accueil</Link>
        <span className="mx-2">/</span>
        <Link href="/#produits" className="hover:text-primary-600">{categories.find((c) => c.id === product.category)?.name || product.category}</Link>
        <span className="mx-2">/</span>
        <Link href={`/products/${product.slug}`} className="hover:text-primary-600">{product.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">Contact</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{product.brand}</span>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 mb-3">{product.name}</h1>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating} / 5 ({product.reviews} avis)</span>
                </div>

                <div className="mb-3">
                  <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.price)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-gray-600 dark:text-gray-300">{product.stock > 0 ? "En stock" : "Rupture de stock"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          {product.features.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Caractéristiques</h2>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-primary-600 dark:text-primary-400 mt-0.5">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(product.specs).length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Spécifications techniques</h2>
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div key={key} className={`flex px-4 py-2.5 text-sm ${idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}`}>
                    <span className="w-1/2 font-medium text-gray-900 dark:text-gray-100">{key}</span>
                    <span className="w-1/2 text-gray-600 dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Vous êtes intéressé ?</h2>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3.5 rounded-lg transition-colors mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter via WhatsApp
            </a>

            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Adresse</p>
                  <p>{STORE_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📞</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Téléphone</p>
                  <p>{STORE_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📧</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                  <p>{STORE_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">🕐</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Horaires</p>
                  <p>{STORE_INFO.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                src={STORE_INFO.mapEmbed}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Tech-IT"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
