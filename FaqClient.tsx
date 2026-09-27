"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { FAQS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const FAQ_CATEGORIES = [
  { label: "All", filter: null },
  { label: "Products", filter: "marble" },
  { label: "Ordering", filter: "order" },
  { label: "Delivery", filter: "deliver" },
  { label: "Installation", filter: "install" },
];

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-sans mb-4">
              Support
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 font-sans text-lg max-w-xl mx-auto">
              Everything you need to know about our marble products, ordering process, and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
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
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F8F6F0] transition-colors group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-serif font-semibold text-[#1A1A1A] pr-6 group-hover:text-[#C9A84C] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#C9A84C] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-[#C9A84C]/10">
                        <p className="text-gray-600 font-sans leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-[#F8F6F0]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 font-sans mb-8">
              Our marble experts are here to help. Reach us by phone or WhatsApp for immediate assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+91XXXXXXXXXX"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1A1A1A] text-white font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
              >
                <Phone size={17} />
                Call Us
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX?text=I have a question about marble"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 text-white font-medium font-sans rounded hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
