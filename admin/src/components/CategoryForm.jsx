import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../lib/api';
import { useNotification } from '../context/NotificationContext';

const CategoryForm = ({ category, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error } = useNotification();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image: null,
      });
      if (category.image) {
        setImagePreview(category.image);
      }
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      if (category?.id) {
        await api.put(`/api/admin/categories/${category.id}`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/api/admin/categories', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSuccess();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Appetizers"
            required
          />
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
            placeholder="Brief description of the category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Category Image
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
                  id="category-image"
                />
                <label
                  htmlFor="category-image"
                  className="cursor-pointer block text-secondary-500 hover:text-primary-600"
                >
                  <p className="text-sm">Click to upload an image</p>
                  <p className="text-xs text-secondary-400 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
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

export default CategoryForm;
