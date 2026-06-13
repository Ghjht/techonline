import { Product } from "@/types";
import { categories, formatPrice } from "./products";

const API_BASE = "/api/products";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(API_BASE);
  return handleResponse(res);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (res.status === 404) return undefined;
  return handleResponse(res);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE}?category=${encodeURIComponent(category)}`);
  return handleResponse(res);
}

export async function addProduct(data: Pick<Product, "name" | "category" | "brand" | "description" | "price" | "stock" | "features" | "specs"> & { images: string[] }): Promise<Product> {
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const product = {
    ...data,
    slug,
    image: data.images[0] || "",
    isNew: true,
    isFeatured: false,
    rating: 0,
    reviews: 0,
  };
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.status === 404) return undefined;
  return handleResponse(res);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (res.status === 404) return false;
  await handleResponse(res);
  return true;
}

export { categories, formatPrice };
