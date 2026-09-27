"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { products } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "Natural Marble", label: "Natural Marble" },
  { id: "Indian Marble", label: "Indian Marble" },
  { id: "Imported", label: "Imported" },
  { id: "Furniture", label: "Marble Furniture" },
  { id: "Handicrafts", label: "Handicrafts" },
  { id: "Religious", label: "Marble Mandir" },
  { id: "Custom", label: "Custom Designs" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

export default function ProductsClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=80"
          alt="Marble products"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 to-[#1A1A1A]/90" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Our Collection
              </span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
              Our Products
            </h1>
            <p className="text-gray-300 font-sans max-w-xl mx-auto">
              The world&apos;s finest marble, granite and natural stone — plus handcrafted marble
              furniture, mandirs and decorative creations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-sans transition-all ${
                activeCategory === cat.id
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-[#F2EDE4] text-gray-600 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                id={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1A1A1A]/80 text-[#C9A84C] text-[10px] font-sans font-medium px-2.5 py-1 rounded capitalize">
                    {product.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/contact?product=${product.name}`}
                      className="text-center py-2.5 bg-[#1A1A1A] text-white text-sm font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
                    >
                      Send Inquiry
                    </Link>
                    <Link
                      href={`/contact?product=${product.name}&type=quote`}
                      className="text-center py-2.5 border border-[#C9A84C] text-[#C9A84C] text-sm font-medium font-sans rounded hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      Get Quotation
                    </Link>
                  </div>

                  <a
                    href={`https://wa.me/91XXXXXXXXXX?text=Hello, I am interested in ${product.name}. Please share pricing details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 bg-green-50 text-green-700 text-sm font-medium font-sans rounded hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle size={14} />
                    WhatsApp Inquiry
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Need a Custom Marble Solution?
          </h2>
          <p className="text-gray-400 font-sans mb-8">
            We specialise in fully customised marble creations. Share your requirements and
            we&apos;ll craft exactly what you envision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold font-sans rounded hover:bg-[#A07B0A] transition-colors"
          >
            Request Custom Design <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
