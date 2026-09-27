"use client";

import { useState } from "react";
import { Trash2, CheckCircle, Search, Download } from "lucide-react";
import { formatDate, exportToCSV } from "@/lib/utils";

type Inquiry = {
  id: string; name: string; phone: string; email: string;
  product: string; message: string; status: string; contacted: boolean; createdAt: Date;
};

export default function InquiriesClient({ initialData }: { initialData: Inquiry[] }) {
  const [items, setItems] = useState(initialData);
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) =>
    [i.name, i.email, i.product].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const markContacted = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ contacted: true, status: "contacted" }), headers: { "Content-Type": "application/json" } });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, contacted: true, status: "contacted" } : i));
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Inquiries</h1>
        <button onClick={() => exportToCSV(items as unknown as Record<string, unknown>[], "inquiries")}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-sans rounded hover:bg-[#C9A84C]/20 transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>
      <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6">
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries…"
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5">
                {["Name","Phone","Email","Product","Message","Date","Status","Actions"].map(h => (
                  <th key={h} className="text-left pb-3 font-medium pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 text-white font-medium pr-4">{item.name}</td>
                  <td className="py-3 text-gray-400 pr-4">{item.phone}</td>
                  <td className="py-3 text-gray-400 pr-4 text-xs">{item.email}</td>
                  <td className="py-3 text-gray-400 pr-4 max-w-[120px] truncate">{item.product}</td>
                  <td className="py-3 text-gray-500 pr-4 max-w-[160px] truncate text-xs">{item.message}</td>
                  <td className="py-3 text-gray-500 pr-4 text-xs">{formatDate(item.createdAt)}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${item.contacted ? "bg-green-500/15 text-green-400" : "bg-blue-500/15 text-blue-400"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {!item.contacted && (
                        <button onClick={() => markContacted(item.id)} title="Mark contacted"
                          className="p-1.5 text-gray-500 hover:text-green-400 transition-colors">
                          <CheckCircle size={15} />
                        </button>
                      )}
                      <button onClick={() => deleteItem(item.id)} title="Delete"
                        className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-gray-600 font-sans text-sm py-8">No inquiries found</p>
          )}
        </div>
      </div>
    </div>
  );
}
