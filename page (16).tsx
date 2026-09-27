import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rahim Marble Company — Delhi's premier marble dealer with 25+ years of excellence in Italian, Makrana, Onyx marble and handicrafts.",
};

export default function AboutPage() {
  return <AboutClient />;
}
