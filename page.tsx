import { prisma } from "@/lib/prisma";
import QuotationsClient from "./QuotationsClient";

export default async function QuotationsPage() {
  const quotations = await prisma.quotation.findMany({ orderBy: { createdAt: "desc" } });
  return <QuotationsClient initialData={quotations} />;
}
