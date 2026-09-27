"use client";

import { useState } from "react";
import { Trash2, Download, Search } from "lucide-react";
import { formatDate, exportToCSV } from "@/lib/utils";

type Quotation = {
  id: string; name: string; phone: string; email: string; product: string;
  quantity?: string | null; budget?: string | null; message?: string | null; status: string; createdAt: Date;
};

const STATUSES = ["pending", "reviewing", "quoted", "closed"];

export default function QuotationsClient({ initialData }: { initialData: Quotation[] }) {
  const [items, setItems] = useState(initialData);
  const [search, setSearch] = useState("");

  const filtered = items.filter((i) =>
    [i.name, i.email, i.product].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/quotations/${id}`, { method: "PATCH", body: JSON.stringify({ status }), headers: { "Content-Type": "application/json" } });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this quotation request?")) return;
    await fetch(`/api/quotations/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Quotation Requests</h1>
        <button onClick={() => exportToCSV(items as unknown as Record<string, unknown>[], "quotations")}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-sans rounded hover:bg-[#C9A84C]/20 transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>
      <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6">
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotations…"
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-white/5">
                {["Name","Email","Product","Quantity","Budget","Date","Status","Actions"].map(h => (
                  <th key={h} className="text-left pb-3 font-medium pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 text-white font-medium pr-4">{item.name}</td>
                  <td className="py-3 text-gray-400 pr-4 text-xs">{item.email}</td>
                  <td className="py-3 text-gray-400 pr-4">{item.product}</td>
                  <td className="py-3 text-gray-500 pr-4">{item.quantity || "—"}</td>
                  <td className="py-3 text-gray-500 pr-4">{item.budget || "—"}</td>
                  <td className="py-3 text-gray-500 pr-4 text-xs">{formatDate(item.createdAt)}</td>
                  <td className="py-3 pr-4">
                    <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-gray-300 font-sans outline-none">
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3">
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-gray-600 font-sans text-sm py-8">No quotations found</p>}
        </div>
      </div>
    </div>
  );
}
