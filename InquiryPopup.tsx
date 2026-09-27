"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  product: z.string().min(1, "Please select a product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const PRODUCTS = [
  "Italian Marble",
  "Onyx Marble",
  "Makrana Marble",
  "Rajnagar Marble",
  "Imported Marble",
  "White Marble",
  "Green Marble",
  "Black Marble",
  "Granite",
  "Marble Tables",
  "Marble Handicrafts",
  "Marble Mandir",
  "Customized Designs",
  "Other",
];

export default function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const shown = sessionStorage.getItem("inquiry-popup-shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("inquiry-popup-shown", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Gold header */}
            <div className="bg-[#1A1A1A] px-6 pt-6 pb-5">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-0.5 bg-[#C9A84C]" />
                <span className="text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase font-sans">
                  Expert Assistance
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                Need Marble Pricing or Expert Assistance?
              </h2>
              <p className="text-sm text-gray-400 mt-2 font-sans">
                Submit your details and our team will contact you shortly.
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-2">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-5 px-6 py-2.5 bg-[#C9A84C] text-white text-sm font-medium font-sans rounded hover:bg-[#A07B0A] transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 font-sans">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 font-sans">
                        Phone *
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-sans">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-sans">
                      Product Requirement *
                    </label>
                    <select
                      {...register("product")}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors bg-white"
                    >
                      <option value="">Select a product</option>
                      {PRODUCTS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    {errors.product && (
                      <p className="text-xs text-red-500 mt-1">{errors.product.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 font-sans">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Tell us about your requirement..."
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded font-sans">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#C9A84C] text-white text-sm font-semibold font-sans rounded hover:bg-[#A07B0A] transition-colors disabled:opacity-70"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Submit Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 border border-gray-200 text-gray-600 text-sm font-medium font-sans rounded hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
