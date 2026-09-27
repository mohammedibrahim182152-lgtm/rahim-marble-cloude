"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Chrome, Lock } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A84C]/20">
            <Lock size={28} className="text-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-500 font-sans text-sm mt-2">Rahim Marble Company</p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#C9A84C]/10 rounded-xl p-8">
          <p className="text-gray-400 font-sans text-sm text-center mb-6">
            Sign in with the authorized Google account to access the dashboard.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-gray-800 font-semibold font-sans rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Chrome size={20} />
            Sign in with Google
          </button>
          <p className="text-center text-xs text-gray-600 font-sans mt-4">
            Only authorized administrators can access this panel.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
