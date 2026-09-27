"use client";

import { useState } from "react";
import { Trash2, CheckCircle, Download, Search, ChevronDown } from "lucide-react";
import { formatDate, exportToCSV } from "@/lib/utils";

type Contact = {
  id: string; name: string; email: string; phone?: string | null;
  subject: string; message: string; replied: boolean; createdAt: Date;
};

export default function ContactsClient({ initialData }: { initialData: Contact[] }) {
  const [items, setItems] = useState(initialData);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = items.filter((i) =>
    [i.name, i.email, i.subject].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  const markReplied = async (id: string) => {
    await fetch(`/api/contacts/${id}`, { method: "PATCH", body: JSON.stringify({ replied: true }), headers: { "Content-Type": "application/json" } });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, replied: true } : i));
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Contact Messages</h1>
        <button onClick={() => exportToCSV(items as unknown as Record<string, unknown>[], "contacts")}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-sans rounded hover:bg-[#C9A84C]/20 transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>
      <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6">
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages…"
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50" />
        </div>
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className="border border-white/5 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/3 transition-colors"
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.replied ? "bg-green-500" : "bg-blue-500"}`} />
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm font-sans truncate">{item.name}</p>
                    <p className="text-gray-500 text-xs font-sans truncate">{item.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className="text-gray-600 text-xs font-sans">{formatDate(item.createdAt)}</span>
                  <ChevronDown size={15} className={`text-gray-500 transition-transform ${expanded === item.id ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === item.id && (
                <div className="px-5 pb-4 pt-2 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs font-sans">
                    <div><span className="text-gray-500">Email: </span><span className="text-gray-300">{item.email}</span></div>
                    {item.phone && <div><span className="text-gray-500">Phone: </span><span className="text-gray-300">{item.phone}</span></div>}
                  </div>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed mb-4">{item.message}</p>
                  <div className="flex gap-3">
                    {!item.replied && (
                      <button onClick={() => markReplied(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-sans rounded hover:bg-green-500/20 transition-colors">
                        <CheckCircle size={13} /> Mark Replied
                      </button>
                    )}
                    <a href={`mailto:${item.email}?subject=Re: ${item.subject}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-sans rounded hover:bg-[#C9A84C]/20 transition-colors">
                      Reply by Email
                    </a>
                    <button onClick={() => deleteItem(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-sans rounded hover:bg-red-500/20 transition-colors">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-600 font-sans text-sm py-8">No messages found</p>}
        </div>
      </div>
    </div>
  );
}
