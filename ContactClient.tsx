"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Loader2, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-28 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80"
          alt="Contact us"
          fill
          className="object-cover opacity-15"
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">Get In Touch</span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">Contact Us</h1>
            <p className="text-gray-300 font-sans mt-4 max-w-lg mx-auto">
              We&apos;re here to help with pricing, expert consultation and custom design requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-20 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">Get in Touch</h2>
              <p className="text-gray-600 font-sans leading-relaxed">
                Visit our showroom, call us, or send a message. We respond to all inquiries within
                24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">Showroom Address</p>
                    <p className="text-sm text-gray-600 font-sans mt-1">
                      A-1/2, WHS Kirti Nagar Marble Market,
                      <br />
                      New Delhi, Delhi 110015, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">Email</p>
                    <a
                      href="mailto:mohammedibrahim182152@gmail.com"
                      className="text-sm text-[#C9A84C] font-sans mt-1 hover:underline block"
                    >
                      mohammedibrahim182152@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[#1A1A1A]">Business Hours</p>
                    <p className="text-sm text-gray-600 font-sans mt-1">
                      Monday – Saturday: 9:00 AM – 7:00 PM
                      <br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white text-sm font-medium font-sans rounded hover:bg-[#C9A84C] transition-colors"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello, I need marble pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-sm font-medium font-sans rounded hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-3 bg-white rounded-lg shadow-sm p-8"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-[#C9A84C] mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 font-sans">
                    Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-[#C9A84C] text-white font-medium font-sans rounded hover:bg-[#A07B0A] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Your name"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                          Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                        Subject *
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="e.g. Marble pricing inquiry"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors"
                      />
                      {errors.subject && (
                        <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell us about your marble requirement..."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#C9A84C] font-sans transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded font-sans">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#C9A84C] text-white font-semibold font-sans rounded hover:bg-[#A07B0A] transition-colors disabled:opacity-70"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.9862932483673!2d77.1478!3d28.6526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d038a60000001%3A0x0!2sWHS%20Kirti%20Nagar%20Marble%20Market%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rahim Marble Company Location"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
