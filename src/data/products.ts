import { Product } from "@/types";

export const categories = [
  { id: "hardware", name: "Hardware", icon: "🖥️" },
  { id: "software", name: "Software", icon: "⚙️" },
];

export const products: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false,
  }).format(price) + " DH";
}
