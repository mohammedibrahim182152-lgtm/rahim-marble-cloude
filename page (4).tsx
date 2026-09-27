import { prisma } from "@/lib/prisma";
import ContactsClient from "./ContactsClient";

export default async function ContactsAdminPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return <ContactsClient initialData={contacts} />;
}
