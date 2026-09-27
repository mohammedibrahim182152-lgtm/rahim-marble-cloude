import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rahimmarble.com"),
  title: {
    default: "Rahim Marble Company | Premium Marble & Handicraft Solutions",
    template: "%s | Rahim Marble Company",
  },
  description:
    "Rahim Marble Company — Delhi's premier marble dealer, manufacturer and supplier. Italian marble, Onyx, Makrana, Rajnagar, imported marble, marble handicrafts, mandirs and customised designs.",
  keywords: [
    "marble company Delhi",
    "Italian marble Delhi",
    "Makrana marble",
    "marble dealer Kirti Nagar",
    "marble supplier New Delhi",
    "onyx marble",
    "marble handicrafts",
    "marble mandir",
    "marble tables Delhi",
    "imported marble India",
  ],
  authors: [{ name: "Rahim Marble Company" }],
  creator: "Rahim Marble Company",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rahimmarble.com",
    siteName: "Rahim Marble Company",
    title: "Rahim Marble Company | Premium Marble & Handicraft Solutions",
    description:
      "Delhi's premier marble dealer offering Italian, Onyx, Makrana, Rajnagar and imported marble along with handcrafted marble creations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rahim Marble Company — Premium Marble & Handicraft Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahim Marble Company | Premium Marble & Handicraft Solutions",
    description:
      "Delhi's premier marble dealer offering Italian, Onyx, Makrana, Rajnagar and imported marble.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Rahim Marble Company",
              description: "Premium Marble & Handicraft Solutions",
              url: "https://rahimmarble.com",
              telephone: "+91-XXXXXXXXXX",
              email: "mohammedibrahim182152@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "A-1/2, WHS Kirti Nagar Marble Market",
                addressLocality: "New Delhi",
                addressRegion: "Delhi",
                postalCode: "110015",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 28.6526,
                longitude: 77.1503,
              },
              openingHours: "Mo-Sa 09:00-19:00",
              priceRange: "₹₹₹",
              image: "https://rahimmarble.com/og-image.jpg",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen antialiased font-sans",
          "text-gray-900 bg-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}
