import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../lib/api';
import { useNotification } from '../context/NotificationContext';

const MenuItemForm = ({ item, categories, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_available: true,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        category_id: item.category_id || '',
        is_available: item.is_available !== undefined ? item.is_available : true,
        image: null,
      });
      if (item.image) {
        setImagePreview(item.image);
      }
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item?.id) {
        // Update existing item
        const updateData = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category_id: formData.category_id,
          is_available: formData.is_available,
        };
        
        if (formData.image) {
          const formPayload = new FormData();
          Object.keys(updateData).forEach(key => {
            formPayload.append(key, updateData[key]);
          });
          formPayload.append('image', formData.image);
          
          await api.put(`/api/admin/items/${item.id}`, formPayload, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          await api.put(`/api/admin/items/${item.id}`, updateData);
        }
      } else {
        // Create new item
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('description', formData.description);
        formPayload.append('price', formData.price);
        formPayload.append('categoryId', formData.category_id);
        formPayload.append('is_available', formData.is_available);
        if (formData.image) {
          formPayload.append('image', formData.image);
        }
        
        await api.post('/api/admin/items', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSuccess();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">
          {item ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Grilled Salmon"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="input-field"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Category *
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field resize-none"
            rows={3}
            placeholder="Describe the dish..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Item Image
          </label>
          <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: null }));
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="item-image"
                />
                <label
                  htmlFor="item-image"
                  className="cursor-pointer block text-secondary-500 hover:text-primary-600"
                >
                  <p className="text-sm">Click to upload an image</p>
                  <p className="text-xs text-secondary-400 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_available"
            id="is_available"
            checked={formData.is_available}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="is_available" className="text-sm font-medium text-secondary-700">
            Item is available for ordering
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : item ? 'Update Item' : 'Create Item'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;
