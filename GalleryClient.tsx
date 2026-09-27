"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80", category: "marble", title: "Onyx Marble" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", category: "italian", title: "Italian Marble" },
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", category: "furniture", title: "Marble Table" },
  { src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80", category: "marble", title: "Makrana Marble" },
  { src: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80", category: "marble", title: "Rajnagar Marble" },
  { src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", category: "imported", title: "Imported Marble" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", category: "marble", title: "Green Marble" },
  { src: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=800&q=80", category: "marble", title: "Black Marble" },
  { src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80", category: "handicraft", title: "Marble Handicraft" },
  { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80", category: "flooring", title: "Marble Flooring" },
  { src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", category: "custom", title: "Custom Design" },
  { src: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800&q=80", category: "mandir", title: "Marble Mandir" },
  { src: "https://images.unsplash.com/photo-1538688273852-e29027c0c176?w=800&q=80", category: "flooring", title: "Luxury Flooring" },
  { src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80", category: "furniture", title: "Marble Dining Table" },
  { src: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&q=80", category: "italian", title: "Carrara Marble" },
  { src: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80", category: "handicraft", title: "Marble Art" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "marble", label: "Marble" },
  { id: "italian", label: "Italian" },
  { id: "imported", label: "Imported" },
  { id: "furniture", label: "Furniture" },
  { id: "handicraft", label: "Handicrafts" },
  { id: "flooring", label: "Flooring" },
  { id: "mandir", label: "Mandir" },
  { id: "custom", label: "Custom" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-28 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=1600&q=80"
          alt="Gallery"
          fill
          className="object-cover opacity-15"
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">Our Work</span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">Gallery</h1>
            <p className="text-gray-300 font-sans mt-4 max-w-lg mx-auto">
              A showcase of our finest marble installations, handcrafted pieces and bespoke designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
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

      {/* Masonry grid */}
      <section className="py-12 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  variants={fadeUp}
                  className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.title}
                      width={400}
                      height={i % 3 === 0 ? 500 : 300}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
                      <ZoomIn
                        size={28}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                      <p className="text-white text-sm font-serif font-medium">{img.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            >
              <X size={28} />
            </button>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white/70 hover:text-white z-10 p-2"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white/70 hover:text-white z-10 p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain rounded"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b">
                <p className="text-white font-serif text-lg">{filtered[lightboxIndex].title}</p>
                <p className="text-gray-300 text-sm font-sans">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
