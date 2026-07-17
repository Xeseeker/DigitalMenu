import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import api from '../lib/api';
import { useNotification } from '../context/NotificationContext';
import CategoryForm from '../components/CategoryForm';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { success, error } = useNotification();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/categories');
      setCategories(response.data.categories || []);
    } catch (err) {
      error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await api.delete(`/api/admin/categories/${id}`);
      success('Category deleted successfully');
      fetchCategories();
    } catch (err) {
      error('Failed to delete category');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
    success(editingCategory ? 'Category updated successfully' : 'Category created successfully');
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Categories</h1>
          <p className="text-secondary-500 mt-1">Manage your menu categories</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Category Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CategoryForm
              category={editingCategory}
              onSuccess={handleFormSuccess}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-secondary-500">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="card group">
              {category.image && (
                <div className="h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-900">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-secondary-500 mt-1 line-clamp-2">{category.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-secondary-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
