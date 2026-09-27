import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery of premium marble installations, handicrafts, marble tables, mandirs and customised marble designs.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
