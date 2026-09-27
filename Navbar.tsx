"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-[#1A1A1A] text-xs text-gray-400 py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-sans">
            A-1/2, WHS Kirti Nagar Marble Market, New Delhi 110015
          </span>
          <div className="flex gap-6">
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors"
            >
              <Phone size={12} />
              +91-XXXXXXXXXX
            </a>
            <a
              href="mailto:mohammedibrahim182152@gmail.com"
              className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors"
            >
              <Mail size={12} />
              mohammedibrahim182152@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#C9A84C]/20"
            : "bg-white border-b border-[#C9A84C]/10"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
                Rahim Marble
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-sans font-medium">
                Company
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium font-sans transition-colors duration-200",
                    pathname === link.href
                      ? "text-[#C9A84C]"
                      : "text-[#1A1A1A] hover:text-[#C9A84C]"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A84C]"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors duration-200"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded text-[#1A1A1A] hover:text-[#C9A84C] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-[#C9A84C]/20"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded text-sm font-medium font-sans transition-colors",
                        pathname === link.href
                          ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                          : "text-[#1A1A1A] hover:bg-[#F2EDE4] hover:text-[#C9A84C]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 border-t border-[#C9A84C]/20">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 bg-[#C9A84C] text-white text-sm font-medium font-sans rounded hover:bg-[#A07B0A] transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
                <div className="pt-3 pb-1 border-t border-gray-100 space-y-2">
                  <a
                    href="tel:+91XXXXXXXXXX"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600"
                  >
                    <Phone size={14} className="text-[#C9A84C]" />
                    +91-XXXXXXXXXX
                  </a>
                  <a
                    href="mailto:mohammedibrahim182152@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-600"
                  >
                    <Mail size={14} className="text-[#C9A84C]" />
                    mohammedibrahim182152@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
