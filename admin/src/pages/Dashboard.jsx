import React, { useState, useEffect } from 'react';
import { FiGrid, FiFolder, FiShoppingBag, FiStar, FiMonitor } from 'react-icons/fi';
import api from '../lib/api';
import { formatCurrency } from '../lib/utils';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="card hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-secondary-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-secondary-900">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '+' : ''}{trend.value}% from last month
          </p>
        )}
      </div>
      <div className={`p-4 rounded-xl ${color}`}>
        <Icon size={28} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    totalOrders: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch menu items count
      const itemsResponse = await api.get('/api/admin/items');
      const itemsCount = itemsResponse.data.items?.length || 0;

      // Fetch categories count
      const categoriesResponse = await api.get('/api/admin/categories');
      const categoriesCount = categoriesResponse.data.categories?.length || 0;

      setStats({
        totalItems: itemsCount,
        totalCategories: categoriesCount,
        totalOrders: 0, // Placeholder - orders endpoint not implemented yet
        averageRating: 0, // Placeholder - ratings endpoint not implemented yet
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-secondary-500 mt-1">Overview of your restaurant menu performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Menu Items"
          value={stats.totalItems}
          icon={FiGrid}
          color="bg-primary-500"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={FiFolder}
          color="bg-green-500"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FiShoppingBag}
          color="bg-orange-500"
          trend={null}
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={FiStar}
          color="bg-yellow-500"
          trend={null}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/menu-items"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <div className="p-2 bg-primary-100 rounded-lg">
                <FiGrid className="text-primary-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-secondary-900">Add Menu Item</p>
                <p className="text-sm text-secondary-500">Create a new menu item</p>
              </div>
            </a>
            <a
              href="/categories"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <FiFolder className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-secondary-900">Add Category</p>
                <p className="text-sm text-secondary-500">Organize your menu</p>
              </div>
            </a>
            <a
              href="/qr-codes"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiMonitor className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-secondary-900">Generate QR Code</p>
                <p className="text-sm text-secondary-500">Create QR for your menu</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-secondary-900">System initialized</p>
                <p className="text-xs text-secondary-500">Just now</p>
              </div>
            </div>
            <div className="text-center py-8 text-secondary-400">
              <p className="text-sm">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
