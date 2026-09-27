"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, Gem, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const VALUES = [
  {
    icon: Award,
    title: "25+ Years of Excellence",
    desc: "Since our founding, we have been supplying premium marble to thousands of homes, hotels, and commercial spaces across India and beyond.",
  },
  {
    icon: Gem,
    title: "Quality Assurance",
    desc: "Every marble slab we supply undergoes rigorous quality inspection for purity, finish, structural integrity, and colour consistency before delivery.",
  },
  {
    icon: Users,
    title: "Artisan Craftsmanship",
    desc: "Our master craftsmen carry generations of knowledge in marble carving, inlay work, and sculpture — producing pieces that are truly one of a kind.",
  },
  {
    icon: CheckCircle2,
    title: "Customer Satisfaction",
    desc: "We have built our reputation on trust. With personalised service, transparent pricing, and reliable delivery, client satisfaction is our measure of success.",
  },
];

export default function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1600&q=80"
          alt="About Rahim Marble"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/80" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                Our Story
              </span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">About Us</h1>
          </motion.div>
        </div>
      </section>

      {/* Company intro */}
      <section className="py-20 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="luxury-divider">
                <span className="text-[11px] tracking-[0.25em] text-[#C9A84C] uppercase font-sans">
                  Rahim Marble Company
                </span>
              </div>
              <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] mt-5 mb-6">
                Delhi&apos;s Most Trusted Marble Company
              </h2>
              <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
                <p>
                  Rahim Marble Company is a premier marble dealer, manufacturer and supplier based
                  in the heart of Delhi&apos;s renowned Kirti Nagar Marble Market. For over two
                  decades, we have been the go-to destination for architects, interior designers,
                  builders and homeowners seeking the world&apos;s finest natural stone.
                </p>
                <p>
                  Our showroom displays an extraordinary range spanning Italian Carrara and Calacatta
                  marble, translucent Onyx varieties, India&apos;s legendary Makrana marble, premium
                  Rajnagar stone, and a curated collection of imported marble from Turkey, Spain,
                  Portugal and Greece.
                </p>
                <p>
                  Beyond supplying raw marble, we house a team of master craftsmen who create
                  bespoke marble furniture, temple carvings, decorative handicrafts, and customised
                  architectural elements — all crafted with the same devotion that built the Taj
                  Mahal from Makrana marble.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-medium font-sans rounded hover:bg-[#A07B0A] transition-colors"
                >
                  Talk to Us <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              <div className="relative h-[480px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
                  alt="Our marble showroom"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C9A84C] text-white p-6 rounded-lg shadow-gold">
                <p className="font-serif text-4xl font-bold">25+</p>
                <p className="text-sm font-sans font-medium mt-1">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-4xl font-bold text-white">Our Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 border border-[#C9A84C]/20 rounded-lg hover:border-[#C9A84C]/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-3">{v.title}</h3>
                <p className="text-sm text-gray-400 font-sans leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#F2EDE4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "25+", label: "Years in Business" },
              { num: "5,000+", label: "Projects Delivered" },
              { num: "100+", label: "Marble Varieties" },
              { num: "15+", label: "States Served" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <p className="font-serif text-5xl font-bold text-[#C9A84C]">{stat.num}</p>
                <p className="text-sm text-gray-600 font-sans mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-4">Visit Our Showroom</h2>
            <p className="text-gray-600 font-sans mb-6">
              Located at Delhi&apos;s premier marble market, our showroom displays over 100 marble
              varieties and hundreds of handcrafted products.
            </p>
            <div className="bg-[#F8F6F0] border border-[#C9A84C]/20 rounded-lg p-6 inline-block">
              <p className="font-serif text-lg font-semibold text-[#1A1A1A]">
                A-1/2, WHS Kirti Nagar Marble Market
              </p>
              <p className="text-gray-600 font-sans">New Delhi, Delhi 110015, India</p>
              <p className="text-sm text-[#C9A84C] font-sans mt-2">Mon–Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
