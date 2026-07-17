import React, { useEffect, useState } from "react";
import api from "../lib/api";
import ItemForm from "../components/ItemForm";

export default function MenuManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const data = await api.get("/admin/items");
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete item?")) return;
    try {
      await api.delete(`/admin/items/${id}`);
      load();
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <button
          onClick={() => setEditing({})}
          className="brand-btn px-3 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      {editing && (
        <ItemForm
          item={editing}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{it.name}</div>
            <div className="text-sm text-gray-500">{it.category_name}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-lg font-bold">${it.price}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(it)}
                  className="px-2 py-1 border rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="px-2 py-1 border rounded text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
