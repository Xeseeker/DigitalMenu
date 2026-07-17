import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import api from '../lib/api';
import { useNotification } from '../context/NotificationContext';
import MenuItemForm from '../components/MenuItemForm';

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const { success, error } = useNotification();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse] = await Promise.all([
        api.get('/api/admin/items'),
        api.get('/api/admin/categories'),
      ]);
      setItems(itemsResponse.data.items || []);
      setCategories(categoriesResponse.data.categories || []);
    } catch (err) {
      error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;

    try {
      await api.delete(`/api/admin/items/${id}`);
      success('Menu item deleted successfully');
      fetchData();
    } catch (err) {
      error('Failed to delete menu item');
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      await api.put(`/api/admin/items/${item.id}`, {
        is_available: !item.is_available,
      });
      success(`Item ${item.is_available ? 'disabled' : 'enabled'} successfully`);
      fetchData();
    } catch (err) {
      error('Failed to update item availability');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchData();
    success(editingItem ? 'Menu item updated successfully' : 'Menu item created successfully');
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category_id === parseInt(filterCategory);
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="page-title">Menu Items</h1>
          <p className="text-secondary-500 mt-1">Manage your restaurant menu</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field pl-10"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <MenuItemForm
              item={editingItem}
              categories={categories}
              onSuccess={handleFormSuccess}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-secondary-500">No menu items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="card group">
              {item.image && (
                <div className="h-48 mb-4 rounded-lg overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {!item.is_available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Unavailable</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-900">{item.name}</h3>
                  <p className="text-sm text-secondary-500">{item.category_name}</p>
                </div>
                <span className="text-lg font-bold text-primary-600">${item.price}</span>
              </div>
              {item.description && (
                <p className="text-sm text-secondary-600 mb-4 line-clamp-2">{item.description}</p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
                <button
                  onClick={() => handleToggleAvailability(item)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    item.is_available
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {item.is_available ? 'Available' : 'Unavailable'}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default MenuItems;
