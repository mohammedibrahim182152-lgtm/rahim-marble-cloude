"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, Star } from "lucide-react";

type Testimonial = { id: string; name: string; location: string; rating: number; review: string; product: string | null; active: boolean; order: number; };

const emptyForm = { name: "", location: "", rating: 5, review: "", product: "", active: true, order: 0 };

export default function TestimonialsAdminClient({ initialData }: { initialData: Testimonial[] }) {
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (editing) {
      const res = await fetch(`/api/testimonials/${editing}`, { method: "PATCH", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
      const updated = await res.json();
      setItems((prev) => prev.map((t) => t.id === editing ? updated : t));
      setEditing(null);
    } else {
      const res = await fetch("/api/testimonials", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (t: Testimonial) => {
    setForm({ name: t.name, location: t.location, rating: t.rating, review: t.review, product: t.product || "", active: t.active, order: t.order });
    setEditing(t.id);
    setShowForm(true);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors">
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-xl p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold text-white mb-4">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Customer Name", key: "name", placeholder: "e.g. Rajesh Sharma" },
              { label: "Location", key: "location", placeholder: "e.g. Delhi" },
              { label: "Product/Service", key: "product", placeholder: "e.g. Italian Marble Flooring" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-gray-400 font-sans mb-1.5">{label}</label>
                <input value={(form as Record<string, unknown>)[key] as string}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50" />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-400 font-sans mb-1.5">Rating</label>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map((r) => (
                  <button key={r} type="button" onClick={() => setForm((p) => ({ ...p, rating: r }))}>
                    <Star size={22} fill={form.rating >= r ? "#C9A84C" : "none"} className={form.rating >= r ? "text-[#C9A84C]" : "text-gray-600"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-400 font-sans mb-1.5">Review</label>
              <textarea value={form.review} onChange={(e) => setForm((p) => ({ ...p, review: e.target.value }))}
                rows={3} placeholder="Customer review text…"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="flex items-center gap-1.5 px-5 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors">
              <Check size={14} /> {editing ? "Update" : "Create"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }}
              className="flex items-center gap-1.5 px-5 py-2 bg-white/5 text-gray-400 text-sm font-sans rounded hover:bg-white/10 transition-colors">
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#1A1A1A] border border-white/5 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-medium font-sans">{item.name}</p>
                <p className="text-gray-500 text-xs font-sans">{item.location}</p>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => startEdit(item)} className="p-1.5 text-gray-500 hover:text-[#C9A84C] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: item.rating }).map((_, j) => (
                <Star key={j} size={13} fill="#C9A84C" className="text-[#C9A84C]" />
              ))}
            </div>
            <p className="text-gray-400 text-sm font-sans leading-relaxed line-clamp-3">{item.review}</p>
            {item.product && <p className="text-xs text-[#C9A84C] font-sans mt-2">{item.product}</p>}
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-gray-600 font-sans text-sm py-8">No testimonials yet</p>}
    </div>
  );
}
