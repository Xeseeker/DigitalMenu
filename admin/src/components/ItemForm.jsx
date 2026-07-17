import React, { useState, useEffect } from "react";
import api from "../lib/api";

export default function ItemForm({ item = {}, onSaved, onCancel }) {
  const [name, setName] = useState(item.name || "");
  const [price, setPrice] = useState(item.price || "");
  const [categoryId, setCategoryId] = useState(item.category_id || "");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const d = await api.get("/admin/categories");
        setCategories(d.categories || []);
      } catch (e) {}
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("categoryId", categoryId);
    if (image) form.append("image", image);

    try {
      if (item.id) {
        await api.put(`/admin/items/${item.id}`, {
          name,
          price,
          category_id: categoryId,
        });
      } else {
        await api.postForm("/admin/items", form);
      }
      onSaved && onSaved();
    } catch (err) {
      alert("Save failed");
    }
  };

  return (
    <div className="mb-4 bg-white p-4 rounded shadow">
      <form onSubmit={submit} className="grid grid-cols-2 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border px-3 py-2 rounded"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border px-3 py-2 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <div className="col-span-2 flex gap-2 mt-2">
          <button className="brand-btn px-3 py-2 rounded">Save</button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
