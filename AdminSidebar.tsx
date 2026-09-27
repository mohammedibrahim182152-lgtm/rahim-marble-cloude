"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Mail,
  Image,
  Package,
  Star,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/quotations", label: "Quotations", icon: FileText },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1A1A1A] border-r border-[#C9A84C]/10 flex flex-col z-50">
      <div className="p-6 border-b border-[#C9A84C]/10">
        <h2 className="font-serif text-lg font-bold text-white">Rahim Marble</h2>
        <p className="text-xs text-[#C9A84C] font-sans mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sans transition-colors",
              pathname === href
                ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#C9A84C]/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sans text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={17} />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sans text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
