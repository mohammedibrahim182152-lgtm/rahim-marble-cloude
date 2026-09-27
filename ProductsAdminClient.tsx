"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

type Product = { id: string; name: string; category: string; description: string; image: string | null; featured: boolean; active: boolean; order: number; };

const CATEGORIES = ["Natural Marble","Indian Marble","Imported","Furniture","Handicrafts","Religious","Custom"];

const emptyForm = { name: "", category: CATEGORIES[0], description: "", image: "", featured: false, active: true, order: 0 };

export default function ProductsAdminClient({ initialData }: { initialData: Product[] }) {
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (editing) {
      const res = await fetch(`/api/products/${editing}`, { method: "PATCH", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
      const updated = await res.json();
      setItems((prev) => prev.map((p) => p.id === editing ? updated : p));
      setEditing(null);
    } else {
      const res = await fetch("/api/products", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, description: p.description, image: p.image || "", featured: p.featured, active: p.active, order: p.order });
    setEditing(p.id);
    setShowForm(true);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Products Management</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-xl p-6 mb-6">
          <h2 className="font-serif text-lg font-semibold text-white mb-4">{editing ? "Edit Product" : "Add New Product"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Product Name", key: "name", placeholder: "e.g. Italian Carrara Marble" },
              { label: "Image URL", key: "image", placeholder: "https://..." },
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
            <div className="flex gap-4 items-center mt-2">
              {[["featured","Featured"],["active","Active"]].map(([key,label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={(form as Record<string, unknown>)[key] as boolean}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.checked }))}
                    className="accent-[#C9A84C]" />
                  <span className="text-sm text-gray-400 font-sans">{label}</span>
                </label>
              ))}
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-400 font-sans mb-1.5">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={3} placeholder="Product description…"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-sans text-white placeholder:text-gray-600 outline-none focus:border-[#C9A84C]/50 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="flex items-center gap-1.5 px-5 py-2 bg-[#C9A84C] text-white text-sm font-sans rounded hover:bg-[#A07B0A] transition-colors">
              <Check size={14} /> {editing ? "Update" : "Create"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm); }}
              className="flex items-center gap-1.5 px-5 py-2 bg-white/5 text-gray-400 text-sm font-sans rounded hover:bg-white/10 transition-colors">
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-white/5">
              {["Name","Category","Featured","Active","Actions"].map(h => (
                <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-3 text-white font-medium">{item.name}</td>
                <td className="px-5 py-3 text-gray-400">{item.category}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${item.featured ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-white/5 text-gray-500"}`}>
                    {item.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${item.active ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(item)} className="p-1.5 text-gray-500 hover:text-[#C9A84C] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-center text-gray-600 font-sans text-sm py-8">No products yet</p>}
      </div>
    </div>
  );
}
