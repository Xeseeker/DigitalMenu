import React from "react";

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="font-semibold">{item.name}</div>
      <div className="text-sm text-gray-500">{item.category_name}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-lg font-bold">${item.price}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="px-2 py-1 border rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-2 py-1 border rounded text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
