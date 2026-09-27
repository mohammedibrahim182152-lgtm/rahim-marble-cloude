import { prisma } from "@/lib/prisma";
import InquiriesClient from "./InquiriesClient";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return <InquiriesClient initialData={inquiries} />;
}
