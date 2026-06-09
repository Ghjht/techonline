import { Product } from "@/types";
import { products as staticProducts, categories } from "./products";

const STORAGE_KEY = "techstore_products";

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return staticProducts;
}

function saveProducts(list: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductById(id: string): Product | undefined {
  return loadProducts().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return loadProducts().filter((p) => p.isFeatured);
}

export function getProductsByCategory(category: string): Product[] {
  return loadProducts().filter((p) => p.category === category);
}

export function addProduct(data: Pick<Product, "name" | "category" | "brand" | "description" | "price" | "stock" | "features" | "specs"> & { images: string[] }): Product {
  const list = loadProducts();
  const id = `prod-${Date.now()}`;
  const product: Product = {
    ...data,
    id,
    image: data.images[0] || "",
    slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    reviews: 0,
    rating: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  list.push(product);
  saveProducts(list);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | undefined {
  const list = loadProducts();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  list[idx] = { ...list[idx], ...data };
  saveProducts(list);
  return list[idx];
}

export function deleteProduct(id: string): boolean {
  const list = loadProducts();
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length === list.length) return false;
  saveProducts(filtered);
  return true;
}

export function resetProducts() {
  localStorage.removeItem(STORAGE_KEY);
}

export { categories, formatPrice } from "./products";
