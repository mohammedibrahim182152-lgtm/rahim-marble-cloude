import { prisma } from "@/lib/prisma";
import TestimonialsAdminClient from "./TestimonialsAdminClient";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return <TestimonialsAdminClient initialData={testimonials} />;
}
