"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Shield,
  Truck,
  Award,
  ChevronDown,
  Phone,
  MessageCircle,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { products, testimonials, faqs } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "25+ Years Experience",
    desc: "Two decades of excellence in premium marble supply and craftsmanship.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "Every slab is rigorously inspected for purity, finish, and structural integrity.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    desc: "Safe, insured delivery to any location across India and international exports.",
  },
  {
    icon: Star,
    title: "Artisan Craftsmanship",
    desc: "Master craftsmen with generational expertise in marble carving and inlay.",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A]"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1800&q=80"
            alt="Premium marble background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>

        {/* Overlay patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent" />

        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent opacity-40" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 py-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-sans font-medium">
                Premium Marble & Handicraft Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 max-w-3xl"
            >
              Transform Your Space with{" "}
              <span className="text-gold-gradient italic">Premium Marble</span>{" "}
              Excellence
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-300 max-w-xl mb-10 font-sans leading-relaxed"
            >
              Rahim Marble Company offers the finest collection of Italian, Onyx, Makrana, Rajnagar
              and imported marbles along with handcrafted marble creations.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold font-sans rounded hover:bg-[#A07B0A] transition-all duration-200 hover:shadow-gold"
              >
                View Collection
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold font-sans rounded border border-white/30 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200"
              >
                Get Quote
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hello, I need marble pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold font-sans rounded hover:bg-green-700 transition-all duration-200"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex gap-10">
              {[
                { num: "25+", label: "Years Experience" },
                { num: "5000+", label: "Projects Completed" },
                { num: "100+", label: "Marble Varieties" },
                { num: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-bold text-[#C9A84C]">{stat.num}</p>
                  <p className="text-xs text-gray-400 font-sans mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Our Collection
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-4">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto font-sans">
              Explore our curated selection of the world&apos;s finest marble and stone varieties.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/products#${product.id}`}
                      className="block w-full text-center py-2 bg-[#C9A84C] text-white text-xs font-medium font-sans rounded"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1.5 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <Link
                      href={`/contact?product=${product.name}`}
                      className="flex-1 text-center py-2 bg-[#1A1A1A] text-white text-xs font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
                    >
                      Inquire
                    </Link>
                    <Link
                      href={`/contact?product=${product.name}&type=quote`}
                      className="flex-1 text-center py-2 border border-[#C9A84C] text-[#C9A84C] text-xs font-medium font-sans rounded hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] text-white font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#C9A84C] to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Our Advantage
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4">
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 border border-[#C9A84C]/20 rounded-lg hover:border-[#C9A84C]/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <item.icon size={22} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              "Italian Marble",
              "Onyx Marble",
              "Makrana Marble",
              "Rajnagar Marble",
              "Imported Marble",
              "Marble Tables",
              "Marble Mandirs",
              "Custom Designs",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#C9A84C] flex-shrink-0" />
                <span className="text-sm text-gray-300 font-sans">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Client Reviews
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-4">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-6 rounded-lg shadow-sm relative"
              >
                <Quote size={32} className="text-[#C9A84C]/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#C9A84C" className="text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-sans leading-relaxed mb-5 italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-xs text-gray-400 font-sans">{t.location}</p>
                  </div>
                  <p className="text-xs text-[#C9A84C] font-sans font-medium">{t.product}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-medium font-sans hover:gap-4 transition-all"
            >
              Read More Reviews <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Common Questions
              </span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] mt-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.slice(0, 5).map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-gray-100 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F8F6F0] transition-colors"
                >
                  <span className="font-serif font-medium text-[#1A1A1A] pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#C9A84C] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-gray-600 font-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-8"
          >
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-medium font-sans hover:gap-4 transition-all"
            >
              View All FAQs <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Our Work
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-4">
              Gallery
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80",
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
              "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80",
              "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80",
              "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80",
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
              "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
            ].map((src, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative overflow-hidden rounded group cursor-pointer ${i === 0 || i === 4 ? "row-span-2" : ""}`}
                style={{ height: i === 0 || i === 4 ? "360px" : "175px" }}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] text-white font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80"
            alt="Marble background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="luxury-divider justify-center">
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Get in Touch
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-5">
              Ready to Transform Your Space?
            </h2>
            <p className="text-gray-400 font-sans mb-10 leading-relaxed">
              Visit our showroom at Kirti Nagar Marble Market, New Delhi or get in touch for pricing
              and expert consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+91XXXXXXXXXX"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold font-sans rounded hover:bg-[#A07B0A] transition-colors"
              >
                <Phone size={18} />
                Call Us Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold font-sans rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
