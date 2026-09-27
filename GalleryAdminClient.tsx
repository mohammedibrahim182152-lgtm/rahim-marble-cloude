"use client";

import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";

type GalleryImage = { id: string; url: string; alt: string; category: string; featured: boolean; order: number; };

const CATEGORIES = ["Italian Marble","Onyx Marble","Makrana Marble","Flooring","Tables","Handicrafts","Mandir","Custom Designs"];

export default function GalleryAdminClient({ initialData }: { initialData: GalleryImage[] }) {
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ url: "", alt: "", category: CATEGORIES[0], featured: false });
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const add = async () => {
    if (!form.url || !form.alt) return;
    setAdding(true);
    const res = await fetch("/api/gallery", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
    const img = await res.json();
    setItems((prev) => [img, ...prev]);
    setForm({ url: "", alt: "", category: CATEGORIES[0], featured: false });
    setShowForm(false);
    setAdding(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await fetch(`/api/gallery/${id}`, { method: "PATCH", body: JSON.stringify({ featured }), headers: { "Content-Type": "application/json" } });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, featured } : i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Gallery Management</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors">
          <Plus size={15} /> Add Image
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-xl p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold text-white mb-4">Add New Image</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Image URL", key: "url", placeholder: "https://..." },
              { label: "Alt Text", key: "alt", placeholder: "Description of image" },
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
              <label className="block text-xs text-gray-400 font-sans mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white outline-none focus:border-[#C9A84C]/50">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="featured" checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="accent-[#C9A84C]" />
              <label htmlFor="featured" className="text-sm text-gray-400 font-sans">Featured</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={add} disabled={adding}
              className="px-5 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors disabled:opacity-50">
              {adding ? "Adding…" : "Add Image"}
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2 bg-white/5 text-gray-400 text-sm font-sans rounded hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((img) => (
          <div key={img.id} className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden group">
            <div className="relative h-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => toggleFeatured(img.id, !img.featured)}
                  className={`p-2 rounded-full ${img.featured ? "bg-[#C9A84C] text-white" : "bg-white/20 text-white"}`}>
                  <Star size={14} fill={img.featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => deleteItem(img.id)} className="p-2 bg-red-500/80 text-white rounded-full">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-white text-xs font-sans truncate">{img.alt}</p>
              <p className="text-gray-500 text-xs font-sans mt-0.5">{img.category}</p>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-gray-600 font-sans text-sm py-12">No gallery images yet. Add your first image above.</p>}
    </div>
  );
}
