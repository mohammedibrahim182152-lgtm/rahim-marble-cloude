import { prisma } from "@/lib/prisma";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function GalleryAdminPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return <GalleryAdminClient initialData={images} />;
}
