"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function TestimonialsClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-sans mb-4">Client Reviews</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
              What Our Clients Say
            </h1>
            <p className="text-gray-400 font-sans text-lg max-w-xl mx-auto">
              Over 5,000 satisfied customers across Delhi NCR and India trust Rahim Marble Company for their premium marble needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#F2EDE4]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "5000+", label: "Happy Clients" },
              { num: "4.9/5", label: "Average Rating" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "25+", label: "Years of Trust" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="font-serif text-4xl font-bold text-[#C9A84C]">{stat.num}</p>
                <p className="text-sm text-gray-600 font-sans mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#F8F6F0] p-7 rounded-lg relative group hover:shadow-lg transition-shadow"
              >
                <Quote size={40} className="text-[#C9A84C]/15 absolute top-5 right-5" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} fill="#C9A84C" className="text-[#C9A84C]" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans leading-relaxed mb-6 italic text-sm">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="border-t border-[#C9A84C]/20 pt-4 flex items-end justify-between">
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{t.location}</p>
                  </div>
                  {t.product && (
                    <span className="text-xs bg-[#C9A84C]/10 text-[#C9A84C] px-2.5 py-1 rounded font-sans">
                      {t.product}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Ready to Join Our Happy Clients?
            </h2>
            <p className="text-gray-400 font-sans mb-8">
              Experience the Rahim Marble difference. Premium quality, expert craftsmanship, unmatched service.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold font-sans rounded hover:bg-[#A07B0A] transition-colors"
            >
              Get Your Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
