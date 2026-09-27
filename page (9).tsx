import { prisma } from "@/lib/prisma";
import { MessageSquare, FileText, Mail, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getStats() {
  const [inquiries, quotations, contacts] = await Promise.all([
    prisma.inquiry.count(),
    prisma.quotation.count(),
    prisma.contact.count(),
  ]);
  const recent = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, product: true, createdAt: true, status: true },
  });
  return { inquiries, quotations, contacts, recent };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-500 font-sans text-sm mb-8">Welcome back, Administrator</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-blue-400" },
          { label: "Quotation Requests", value: stats.quotations, icon: FileText, color: "text-purple-400" },
          { label: "Contact Messages", value: stats.contacts, icon: Mail, color: "text-green-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 font-sans text-sm">{stat.label}</p>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="font-serif text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-[#C9A84C]" />
          <h2 className="font-serif text-lg font-semibold text-white">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5">
                <th className="text-left pb-3 font-medium">Name</th>
                <th className="text-left pb-3 font-medium">Product</th>
                <th className="text-left pb-3 font-medium">Date</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats.recent.map((item) => (
                <tr key={item.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 text-white font-medium">{item.name}</td>
                  <td className="py-3 text-gray-400">{item.product}</td>
                  <td className="py-3 text-gray-500">{formatDate(item.createdAt)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      item.status === "new" ? "bg-blue-500/15 text-blue-400" : "bg-green-500/15 text-green-400"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
