import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  products: [
    { href: "/products#italian-marble", label: "Italian Marble" },
    { href: "/products#onyx-marble", label: "Onyx Marble" },
    { href: "/products#makrana-marble", label: "Makrana Marble" },
    { href: "/products#rajnagar-marble", label: "Rajnagar Marble" },
    { href: "/products#marble-tables", label: "Marble Tables" },
    { href: "/products#marble-handicrafts", label: "Marble Handicrafts" },
    { href: "/products#marble-mandir", label: "Marble Mandir" },
    { href: "/products#customized-designs", label: "Custom Designs" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300">
      {/* Gold accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-white">Rahim Marble</h3>
              <p className="text-[10px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans mt-0.5">
                Company
              </p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-sans">
              Delhi&apos;s premier marble dealer, manufacturer and supplier. Offering the finest
              Italian, Onyx, Makrana and imported marble since decades.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX"}?text=Hello, I am interested in your marble products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium font-sans rounded hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A84C]" />
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A84C]" />
              Products
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A84C]" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 font-sans leading-relaxed">
                  A-1/2, WHS Kirti Nagar Marble Market,
                  <br />
                  New Delhi, Delhi 110015, India
                </p>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#C9A84C] transition-colors font-sans"
                >
                  <Phone size={16} className="text-[#C9A84C] flex-shrink-0" />
                  +91-XXXXXXXXXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:mohammedibrahim182152@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#C9A84C] transition-colors font-sans break-all"
                >
                  <Mail size={16} className="text-[#C9A84C] flex-shrink-0" />
                  mohammedibrahim182152@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 border border-[#C9A84C]/20 rounded">
              <p className="text-xs text-gray-500 font-sans">Business Hours</p>
              <p className="text-sm text-gray-300 font-sans mt-1">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-xs text-gray-500 font-sans mt-0.5">Sunday: By Appointment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600 font-sans">
            © {new Date().getFullYear()} Rahim Marble Company. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/sitemap.xml"
              className="text-xs text-gray-600 hover:text-[#C9A84C] transition-colors font-sans"
            >
              Sitemap
            </Link>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-600 font-sans">
              Premium Marble & Handicraft Solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
