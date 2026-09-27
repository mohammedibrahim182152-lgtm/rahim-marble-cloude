import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Rahim Marble Company at Kirti Nagar Marble Market, New Delhi. Get marble pricing, quotations and expert consultation.",
};

export default function ContactPage() {
  return <ContactClient />;
}
