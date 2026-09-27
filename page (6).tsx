import { prisma } from "@/lib/prisma";
import ProductsAdminClient from "./ProductsAdminClient";

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return <ProductsAdminClient initialData={products} />;
}
