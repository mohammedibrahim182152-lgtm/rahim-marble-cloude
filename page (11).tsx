import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Customer Testimonials",
  description: "Read what our clients say about Rahim Marble Company's premium marble products and services.",
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
