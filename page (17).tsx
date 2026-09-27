import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Answers to common questions about marble purchasing, customization, pricing, delivery and installation from Rahim Marble Company.",
};

export default function FaqPage() {
  return <FaqClient />;
}
