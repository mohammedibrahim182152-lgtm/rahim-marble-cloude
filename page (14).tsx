import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete range of Italian marble, Onyx, Makrana, Rajnagar, imported marble, marble tables, handicrafts, mandirs, and customised marble designs.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
